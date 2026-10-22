// a small gpu fluid simulation ("stable fluids") behind the painting. wind blows in
// layers of different speeds; where they shear, eddies roll up on their own. a gentle
// stir keeps a golden spiral forming at the golden point, and the sky's color is
// carried along like ink in water. needs webgl2 with renderable float textures

import { createProgram } from "./aurora-gl";
import { VERTEX_SHADER, COMMON, SKY } from "./aurora-shader";

const SIM_ROWS = 128;            // the air is simulated coarsely; the brushwork adds detail
const DYE_ROWS = 256;            // the color it carries
const PRESSURE_ITERATIONS = 20;  // how incompressible the air is
const VELOCITY_DISSIPATION = 0.12; // air friction, per second: keeps the weather calm
const DYE_RELAX = 0.2;           // how quickly carried color settles back into the sky, per second
const WARM_UP_SECONDS = 3;       // let the wind blow before the first frame, so eddies already exist
const STEP = 1 / 30;

// every pass reads neighbours one texel away
const PASS = COMMON + SKY + `
varying vec2 vUv;
uniform vec2 uTexel;
uniform float uDt;
`;

const CURL = PASS + `
uniform sampler2D uVelocity;
void main() {
    float l = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).y;
    float r = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).y;
    float b = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).x;
    float t = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).x;
    gl_FragColor = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
}
`;

const FORCES = PASS + `
uniform sampler2D uVelocity;
uniform sampler2D uCurl;

const float WIND_SPEED = 5.5;  // texels per second
const float WIND_GRIP = 0.08;  // how quickly the air settles back into the wind, per second
const float SHEAR = 1.0;       // speed difference between wind layers; shear rolls up eddies
const float VORTICITY = 0.4;   // curl confinement: keeps eddies from smoothing away
const float VORTEX = 3.0;      // the golden spiral's steady stir, texels per second²
const float GUST = 3.5;        // small wandering gusts that seed new eddies
const float MAX_SPEED = 40.0;

void main() {
    // vorticity confinement: push along the edges of each eddy to keep it spinning
    float cl = texture2D(uCurl, vUv - vec2(uTexel.x, 0.0)).x;
    float cr = texture2D(uCurl, vUv + vec2(uTexel.x, 0.0)).x;
    float cb = texture2D(uCurl, vUv - vec2(0.0, uTexel.y)).x;
    float ct = texture2D(uCurl, vUv + vec2(0.0, uTexel.y)).x;
    float c = texture2D(uCurl, vUv).x;
    vec2 n = 0.5 * vec2(abs(ct) - abs(cb), abs(cr) - abs(cl));
    n /= length(n) + 1e-4;
    vec2 confinement = VORTICITY * c * vec2(n.x, -n.y);

    vec2 p = vUv * vec2(uRes.x / uRes.y, 1.0);
    float layers = 1.0 + SHEAR * sin(p.y * 7.0 + 2.0 * sin(p.x * 1.3 + uTime * 0.05));
    vec2 target = wind(p, uTime) * WIND_SPEED * layers;

    vec2 r = p - goldenPoint();
    float ring = exp(-dot(r, r) / 0.06) * smoothstep(0.0, 0.08, length(r));
    vec2 gust = vec2(noise(p * 2.0 + uTime * 0.15), noise(p * 2.0 + vec2(5.2, 1.3) - uTime * 0.15)) - 0.5;

    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel += (target - vel) * (1.0 - exp(-uDt * WIND_GRIP));
    vel += (confinement + goldenSpiral(p) * VORTEX * ring + gust * GUST) * uDt;
    vel *= min(1.0, MAX_SPEED / (length(vel) + 1e-4));
    gl_FragColor = vec4(vel, 0.0, 1.0);
}
`;

const DIVERGENCE = PASS + `
uniform sampler2D uVelocity;
void main() {
    float l = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
    float r = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
    float b = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
    float t = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
    gl_FragColor = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
}
`;

// one jacobi step towards the pressure that makes the air incompressible
const PRESSURE = PASS + `
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
    float l = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float r = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float b = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float t = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4(0.25 * (l + r + b + t - div), 0.0, 0.0, 1.0);
}
`;

const GRADIENT = PASS + `
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
    float l = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float r = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float b = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float t = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    vec2 vel = texture2D(uVelocity, vUv).xy - 0.5 * vec2(r - l, t - b);
    gl_FragColor = vec4(vel, 0.0, 1.0);
}
`;

// carry a field along the air: look back to where this texel's contents came from
const ADVECT = PASS + `
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform float uDissipation;
void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexel;
    gl_FragColor = texture2D(uSource, coord) / (1.0 + uDissipation * uDt);
}
`;

// carry the color like ink, while it slowly settles back into the sky
const DYE = PASS + `
uniform sampler2D uVelocity;
uniform sampler2D uDye;
uniform vec2 uVelocityTexel;
uniform float uRelax;
void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uVelocityTexel;
    vec3 ink = texture2D(uDye, coord).rgb;
    vec2 p = vUv * vec2(uRes.x / uRes.y, 1.0);
    gl_FragColor = vec4(mix(ink, sky(p, uTime), uRelax), 1.0);
}
`;

const createTarget = (gl, w, h) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error("float render targets unsupported");
    }
    return { texture, fbo, w, h };
};

// a field that's read and rewritten every step needs two textures to ping-pong between
const createDoubleTarget = (gl, w, h) => {
    let read = createTarget(gl, w, h);
    let write = createTarget(gl, w, h);
    return {
        get read() { return read; },
        get write() { return write; },
        swap() { [read, write] = [write, read]; },
    };
};

// returns null when the device can't run the simulation; the painting then falls back to formulas
export const createFluid = (gl) => {
    const isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
    if (!isWebGL2 || !gl.getExtension("EXT_color_buffer_float")) return null;

    const programs = {
        curl: createProgram(gl, VERTEX_SHADER, CURL),
        forces: createProgram(gl, VERTEX_SHADER, FORCES),
        divergence: createProgram(gl, VERTEX_SHADER, DIVERGENCE),
        pressure: createProgram(gl, VERTEX_SHADER, PRESSURE),
        gradient: createProgram(gl, VERTEX_SHADER, GRADIENT),
        advect: createProgram(gl, VERTEX_SHADER, ADVECT),
        dye: createProgram(gl, VERTEX_SHADER, DYE),
    };

    // run one pass into a target; textures go to successive units, pairs are vec2s
    const draw = ({ program, uniforms }, target, values) => {
        gl.useProgram(program);
        let unit = 0;
        Object.entries(values).forEach(([name, value]) => {
            const location = uniforms[name];
            if (location === undefined) return;
            if (value.texture) {
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, value.texture);
                gl.uniform1i(location, unit++);
            } else if (Array.isArray(value)) {
                gl.uniform2f(location, value[0], value[1]);
            } else {
                gl.uniform1f(location, value);
            }
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.w, target.h);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let grid = null;

    const step = (dt, time) => {
        const { velocity, dye, curl, divergence, pressure } = grid;
        const sim = { uRes: [velocity.read.w, velocity.read.h], uTexel: grid.texel, uTime: time, uDt: dt };

        draw(programs.curl, curl, { ...sim, uVelocity: velocity.read });
        draw(programs.forces, velocity.write, { ...sim, uVelocity: velocity.read, uCurl: curl });
        velocity.swap();

        // project: remove whatever would compress the air, which is what makes it swirl
        draw(programs.divergence, divergence, { ...sim, uVelocity: velocity.read });
        for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
            draw(programs.pressure, pressure.write, { ...sim, uPressure: pressure.read, uDivergence: divergence });
            pressure.swap();
        }
        draw(programs.gradient, velocity.write, { ...sim, uPressure: pressure.read, uVelocity: velocity.read });
        velocity.swap();

        draw(programs.advect, velocity.write, {
            ...sim, uVelocity: velocity.read, uSource: velocity.read, uDissipation: VELOCITY_DISSIPATION,
        });
        velocity.swap();

        draw(programs.dye, dye.write, {
            uRes: [dye.read.w, dye.read.h], uTexel: grid.texel, uVelocityTexel: grid.texel, uTime: time, uDt: dt,
            uVelocity: velocity.read, uDye: dye.read, uRelax: 1 - Math.exp(-dt * DYE_RELAX),
        });
        dye.swap();
    };

    // the grid only rebuilds when the shape of the screen really changes, so a phone's
    // address bar sliding away doesn't restart the weather
    const resize = (aspect, time) => {
        if (grid && Math.abs(aspect / grid.aspect - 1) < 0.15) return;
        const simW = Math.max(1, Math.round(SIM_ROWS * aspect));
        const dyeW = Math.max(1, Math.round(DYE_ROWS * aspect));
        grid = {
            aspect,
            texel: [1 / simW, 1 / SIM_ROWS],
            velocity: createDoubleTarget(gl, simW, SIM_ROWS),
            pressure: createDoubleTarget(gl, simW, SIM_ROWS),
            curl: createTarget(gl, simW, SIM_ROWS),
            divergence: createTarget(gl, simW, SIM_ROWS),
            dye: createDoubleTarget(gl, dyeW, DYE_ROWS),
        };

        // start from the settled sky, then let the wind blow for a few seconds
        draw(programs.dye, grid.dye.write, {
            uRes: [dyeW, DYE_ROWS], uTexel: grid.texel, uVelocityTexel: grid.texel, uTime: time, uDt: 0,
            uVelocity: grid.velocity.read, uDye: grid.dye.read, uRelax: 1,
        });
        grid.dye.swap();
        const warmUpSteps = Math.round(WARM_UP_SECONDS / STEP);
        for (let i = 0; i < warmUpSteps; i++) step(STEP, time - WARM_UP_SECONDS + i * STEP);
    };

    return {
        resize,
        step,
        get velocity() { return grid.velocity.read; },
        get dye() { return grid.dye.read; },
    };
};
