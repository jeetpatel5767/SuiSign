"use client";

import { useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
    folderPath: string;
    frameCount: number;
    scrollYProgress: MotionValue<number>;
    children?: ReactNode;
}

export default function ProductScrollCanvas({
    folderPath,
    frameCount,
    scrollYProgress,
    children,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Map scroll → frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // PRELOAD IMAGES
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNumber = String(i).padStart(3, "0");
            img.src = `${folderPath}/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loaded++;
                if (loaded === frameCount) {
                    setImages(imgs);
                    setIsLoaded(true);
                }
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${i} at ${img.src}`);
                loaded++;
                if (loaded === frameCount) {
                    setImages(imgs);
                    setIsLoaded(true);
                }
            };

            imgs.push(img);
        }
    }, [folderPath, frameCount]);

    // CANVAS RENDER
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const dpr = window.devicePixelRatio || 1;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, width, height);

            if (!isLoaded || images.length === 0) return;

            const index = Math.max(0, Math.min(frameCount - 1, Math.floor(frameIndex.get())));
            const img = images[index];

            if (!img || !img.complete || img.naturalWidth === 0) return;

            const imgAspect = img.width / img.height;
            const canvasAspect = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                drawWidth = height * imgAspect;
                drawHeight = height;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = width;
                drawHeight = width / imgAspect;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        const resizeObserver = new ResizeObserver(() => {
            render();
        });

        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
        }

        if (isLoaded) render();

        return () => {
            unsubscribe();
            resizeObserver.disconnect();
        };
    }, [frameIndex, images, isLoaded, frameCount]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-3xl transform scale-95 z-0" />

            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain glass-card rounded-2xl lg:rounded-3xl shadow-elevated z-10"
            />

            {/* Overlays */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {children}
            </div>

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-50 text-white/30 bg-black/50 backdrop-blur-sm rounded-3xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        <div className="animate-pulse font-medium">Initializing Experience…</div>
                    </div>
                </div>
            )}
        </div>
    );
}
