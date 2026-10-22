import React, { useEffect, useRef, useState } from "react";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./aurora-shader";

const MAX_PIXELS = 1.2e6;   // cap canvas size so big monitors and weak gpus stay smooth
const FRAME_MS = 1000 / 30; // a slow painting doesn't need 60fps
const BRUSH_SIZE = 56;      // spacing of the broadest brushstrokes, in css px

const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
};

const createProgram = (gl) => {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
};

// the original css aurora, used when webgl isn't available
const CssAurora = () => (
    <div className="aurora" aria-hidden="true">
        <span className="aurora__layer aurora__layer--one" />
        <span className="aurora__layer aurora__layer--two" />
        <span className="aurora__layer aurora__layer--three" />
    </div>
);

const Aurora = () => {
    const canvasRef = useRef(null);
    const [webglFailed, setWebglFailed] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas && canvas.getContext("webgl", { antialias: false, alpha: false });
        if (!gl) {
            setWebglFailed(true);
            return;
        }

        let program;
        try {
            program = createProgram(gl);
        } catch (err) {
            console.warn("aurora shader failed, using css fallback", err);
            setWebglFailed(true);
            return;
        }
        gl.useProgram(program);

        // one triangle that covers the whole screen
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(program, "uRes");
        const uTime = gl.getUniformLocation(program, "uTime");
        const uCell = gl.getUniformLocation(program, "uCell");

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // start mid-painting so the first frame isn't the same every visit
        const timeOffset = Math.random() * 1000;
        let frameId = 0;
        let lastFrame = 0;

        const draw = (now) => {
            gl.uniform1f(uTime, timeOffset + now / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (w * h)));
            canvas.width = Math.round(w * scale);
            canvas.height = Math.round(h * scale);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uCell, BRUSH_SIZE * scale);
            draw(performance.now());
        };

        const loop = (now) => {
            frameId = requestAnimationFrame(loop);
            if (document.hidden || now - lastFrame < FRAME_MS) return;
            lastFrame = now;
            draw(now);
        };

        resize();
        window.addEventListener("resize", resize);
        if (!reducedMotion) frameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    if (webglFailed) return <CssAurora />;
    return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />;
};

export default Aurora;
