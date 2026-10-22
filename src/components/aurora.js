import React, { useEffect, useRef, useState } from "react";
import { createProgram, createScreenTriangle } from "./aurora-gl";
import { VERTEX_SHADER, FRAGMENT_SHADER, FLUID_PAINT_SHADER } from "./aurora-shader";
import { createFluid } from "./aurora-fluid";

const MAX_PIXELS = 1.2e6;   // cap canvas size so big monitors and weak gpus stay smooth
const FRAME_MS = 1000 / 30; // a slow painting doesn't need 60fps
const SIM_STEP = 1 / 30;    // seconds of weather simulated per frame
const BRUSH_SIZE = 56;      // spacing of the broadest brushstrokes, in css px

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
        const options = { antialias: false, alpha: false };
        const gl = canvas && (canvas.getContext("webgl2", options) || canvas.getContext("webgl", options));
        if (!gl) {
            setWebglFailed(true);
            return;
        }
        createScreenTriangle(gl);

        // the real fluid where the gpu supports it; otherwise the flow comes from formulas
        let fluid = null;
        try {
            fluid = createFluid(gl);
        } catch (err) {
            console.warn("aurora fluid unavailable, painting without it", err);
        }

        let painter;
        try {
            painter = createProgram(gl, VERTEX_SHADER, fluid ? FLUID_PAINT_SHADER : FRAGMENT_SHADER);
        } catch (err) {
            console.warn("aurora shader failed, using css fallback", err);
            setWebglFailed(true);
            return;
        }
        const { uniforms } = painter;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // start mid-painting so the first frame isn't the same every visit
        const timeOffset = Math.random() * 1000;
        let brush = BRUSH_SIZE;
        let frameId = 0;
        let lastFrame = 0;

        const draw = (now) => {
            const time = timeOffset + now / 1000;
            if (fluid) fluid.step(SIM_STEP, time);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(painter.program);
            gl.uniform2f(uniforms.uRes, canvas.width, canvas.height);
            gl.uniform1f(uniforms.uTime, time);
            gl.uniform1f(uniforms.uCell, brush);
            if (fluid) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, fluid.velocity.texture);
                gl.uniform1i(uniforms.uVelocity, 0);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, fluid.dye.texture);
                gl.uniform1i(uniforms.uDye, 1);
            }
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (w * h)));
            canvas.width = Math.round(w * scale);
            canvas.height = Math.round(h * scale);
            brush = BRUSH_SIZE * scale;
            const now = performance.now();
            if (fluid) fluid.resize(w / h, timeOffset + now / 1000);
            draw(now);
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
