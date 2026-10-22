// romantic aurora: long sweeping brushstrokes carried by wind and swell, turning
// in a golden spiral around a warm light at the golden point of the canvas.
// the pieces are shared: the fluid simulation reuses the palette, wind and sky,
// and paints its flow with the same brushstrokes

export const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// palette, noise, and the golden point
export const COMMON = `
precision highp float;

uniform vec2 uRes;    // size of whatever this pass draws into, in px
uniform float uTime;  // seconds

const float PHI = 1.6180339;
// a golden spiral grows by φ every quarter turn, so its tangent sits at a fixed
// angle atan(1 / b) from the radius, where b = ln(φ) / (π / 2)
const float GOLDEN_PITCH = 1.2735;

const vec3 CREAM = vec3(0.980, 0.980, 0.965);
const vec3 BLUE  = vec3(0.45, 0.66, 0.93);
const vec3 LILAC = vec3(0.74, 0.64, 0.97);
const vec3 CORAL = vec3(1.00, 0.64, 0.55);
const vec3 ROSE  = vec3(0.93, 0.67, 0.90);
const vec3 GLOW  = vec3(1.00, 0.88, 0.74);

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = m * p;
        a *= 0.5;
    }
    return v;
}

// the golden point: 1/φ across, 1/φ² up from the bottom
vec2 goldenPoint() {
    return vec2(uRes.x / uRes.y / PHI, 1.0 / (PHI * PHI));
}
`;

// wind, the golden spiral, and the sky's color. p is in screen heights
export const SKY = `
// wind and swell: long gentle undulations, like lines of wind over open water
vec2 wind(vec2 p, float t) {
    float a = 0.12
            + 0.28 * sin(p.x * 2.0 + p.y * 1.5 - t * 0.28)
            + 0.16 * sin(p.x * 4.3 - p.y * 0.8 + t * 0.18 + 1.3)
            + (noise(p * 1.4 + vec2(t * 0.07, 0.0)) - 0.5) * 0.5;
    return vec2(cos(a), sin(a));
}

// the direction of a golden spiral passing through p, around the golden point
vec2 goldenSpiral(vec2 p) {
    vec2 r = p - goldenPoint();
    float a = atan(r.y, r.x) + GOLDEN_PITCH;
    return vec2(cos(a), sin(a));
}

// near the golden point the wind gathers into a slow golden spiral
vec2 current(vec2 p, float t) {
    vec2 r = p - goldenPoint();
    // strongest on a ring around the point, easing off at its heart so it never knots
    float pull = exp(-dot(r, r) / 0.11) * smoothstep(0.0, 0.09, length(r)) * 0.75;
    return normalize(mix(wind(p, t), goldenSpiral(p), pull) + 1e-4);
}

// the sky underneath: soft drifting color, lit warmly from the golden point
vec3 sky(vec2 p, float t) {
    vec2 q = vec2(fbm(p + vec2(0.0, t * 0.015)),
                  fbm(p + vec2(5.2, 1.3) - t * 0.012));
    float n = fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 0.01);

    vec3 c = CREAM;
    c = mix(c, BLUE,  smoothstep(0.30, 0.70, q.x) * 0.55);
    c = mix(c, LILAC, smoothstep(0.40, 0.75, n) * 0.50);
    c = mix(c, ROSE,  smoothstep(0.30, 0.55, n * q.x) * 0.30);

    vec2 r = p - goldenPoint();
    c = mix(c, GLOW, exp(-dot(r, r) / 0.06) * 0.55);
    return c;
}
`;

// the brushwork: layers of long tapered strokes laid along a direction field
const STROKES = `
uniform float uCell;  // spacing of the broadest strokes, in canvas px

// broken color: each stroke leans slightly toward one palette hue
vec3 tint(float h) {
    if (h < 0.30) return BLUE;
    if (h < 0.55) return LILAC;
    if (h < 0.70) return ROSE;
    if (h < 0.80) return CORAL;
    return GLOW;
}

// one layer of brushstrokes, each a long tapered sweep that lives on its own clock:
// it fades in, travels with the current, and fades out. overlaps blend like wet paint
vec4 strokes(vec2 px, mat2 toFlow, vec3 under, float cell, float seed, float t) {
    vec2 grid = floor(px / cell);
    vec3 paintSum = vec3(0.0);
    float weightSum = 0.0;
    float coverage = 0.0;
    for (int j = -2; j <= 2; j++) {
        for (int i = -2; i <= 2; i++) {
            vec2 id = grid + vec2(float(i), float(j)) + seed;
            float r1 = hash(id);
            float r2 = hash(id + 7.7);
            vec2 c = (grid + vec2(float(i), float(j)) + 0.5 + 0.6 * (vec2(r1, r2) - 0.5)) * cell;

            float life = fract(t * 0.15 + hash(id + 11.1));
            float fade = smoothstep(0.0, 0.3, life) * (1.0 - smoothstep(0.6, 1.0, life));

            vec2 d = toFlow * (px - c);
            d.x -= (life - 0.5) * cell * 2.0;            // carried by the current
            float len = cell * (1.1 + 0.6 * r2);
            d.y -= (r1 - 0.5) * 0.5 * d.x * d.x / len;   // the sweep of the wrist

            float along = clamp(abs(d.x) / len, 0.0, 1.0);
            float wid = cell * (0.12 + 0.08 * r1) * (1.0 - 0.65 * along * along); // tapered ends
            float e = length(vec2(d.x / len, d.y / wid));
            float mask = (1.0 - smoothstep(0.55, 1.0, e)) * fade;

            if (mask > 0.0) {
                // dry brush: bristles leave streaks along the stroke
                mask *= 0.7 + 0.3 * noise(vec2(d.y / wid * 5.0, id.x * 3.0 + id.y * 7.0));
                float lift = hash(id + 3.3) < 0.8 ? 1.0 : -0.5; // mostly light, a little shadow
                vec3 paint = mix(under, tint(hash(id + 9.9)), 0.12);
                paint *= 1.0 + lift * (0.03 + 0.04 * hash(id + 1.7));

                float w = mask * exp(5.0 * hash(id + 17.3));
                paintSum += paint * w;
                weightSum += w;
                coverage = max(coverage, mask);
            }
        }
    }
    vec3 paint = weightSum > 0.0 ? paintSum / weightSum : under;
    return vec4(paint, coverage);
}

// broad to fine, like a painter: each layer's strokes are 1/φ the size of the last
vec3 painting(vec2 px, vec2 dir, vec3 under, float t) {
    // strokes are measured in the flow's frame, so they bend as it bends
    mat2 toFlow = mat2(dir.x, -dir.y, dir.y, dir.x);
    vec3 col = under;
    vec4 broad = strokes(px, toFlow, col, uCell, 0.0, t);
    col = mix(col, broad.rgb, broad.a);
    vec4 middle = strokes(px, toFlow, col, uCell / PHI, 31.0, t);
    col = mix(col, middle.rgb, middle.a * 0.8);
    vec4 fine = strokes(px, toFlow, col, uCell / (PHI * PHI), 67.0, t);
    col = mix(col, fine.rgb, fine.a * 0.6);
    return col + (hash(floor(px)) - 0.5) * 0.015; // canvas grain
}
`;

// fallback painting: the flow is drawn from formulas (wind + golden spiral)
export const FRAGMENT_SHADER = COMMON + SKY + STROKES + `
void main() {
    vec2 px = gl_FragCoord.xy;
    vec2 p = px / uRes.y;
    gl_FragColor = vec4(painting(px, current(p, uTime), sky(p, uTime), uTime), 1.0);
}
`;

// fluid painting: strokes follow the simulated air, colored by the ink it carries
export const FLUID_PAINT_SHADER = COMMON + STROKES + `
uniform sampler2D uVelocity;
uniform sampler2D uDye;

void main() {
    vec2 px = gl_FragCoord.xy;
    vec2 uv = px / uRes;
    vec2 dir = normalize(texture2D(uVelocity, uv).xy + vec2(1e-3, 0.0));
    gl_FragColor = vec4(painting(px, dir, texture2D(uDye, uv).rgb, uTime), 1.0);
}
`;
