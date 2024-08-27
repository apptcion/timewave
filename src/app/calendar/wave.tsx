'use client';
import styles from '../../css/WAVE.module.css';
import React, { useRef, useEffect, useState } from 'react';

export default function WAVE() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const XRef = useRef(0);

    const [speed, setSpeed] = useState(2)
    const [height, setHeight] = useState(80)
    const [diff, setDiff] = useState(120)

    useEffect(() => {
        XRef.current += 0

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight-4;
            cancelAnimationFrame(animationFrameId);
            draw(); // Resize 후에 새로 그리도록 호출
        };
        let animationFrameId: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            
            DrawWave(ctx, 3, 1, XRef.current, 'rgba(155,211,224,0.3)'); //노랑
            DrawWave(ctx, 3, 2, XRef.current, 'rgba(166, 217, 226, 0.35'); // 빨강
            DrawWave(ctx, 3, 3, XRef.current, 'rgba(195, 229, 234, 0.2)'); // 파랑
            XRef.current += speed;

            animationFrameId = requestAnimationFrame(draw);
        };

        resizeHandler(); // 초기 설정을 위해 한 번 호출
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            cancelAnimationFrame(animationFrameId);
        };

    }, [speed, height, diff]);

    const SpeedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value))
    }

    const HeightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(event.target.value))

    }

    const DiffHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiff(Number(event.target.value))
    }

    const ResetHandler = () => {
        setSpeed(3)
        setHeight(100)
        setDiff(100)
    }

    function DrawWave(ctx: CanvasRenderingContext2D, points: number, unique: number, X: number, color : string) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        
        ctx.beginPath()
        ctx.lineTo(0, window.innerHeight/2 + 300 + unique*30)
    
        for (let i = window.innerWidth/((points-1)*2); i < window.innerWidth; i += window.innerWidth / (points-1)) {
            let index = (i- window.innerWidth/((points-1)*2))/(window.innerWidth/(points-1)) + 1
            ctx.quadraticCurveTo(i , Math.sin(calcRadian(X + index*90 + unique*diff))*(height) +  window.innerHeight/2 + 360 , i + window.innerWidth/((points-1)*2),  (Math.sin(calcRadian(X + index*90 + unique*diff))*(height) + Math.sin(calcRadian(X + (index+ 1)*90  + unique*diff))*(height))/2 + window.innerHeight/2 + 360)
            
        }
        ctx.lineTo(window.innerWidth, window.innerHeight/2 )
        
        ctx.lineTo(window.innerWidth, window.innerHeight)
        ctx.lineTo(0, window.innerHeight)
        ctx.fill()
        ctx.closePath()
    }

    return (
        <div>
        <canvas
            className={styles.canvas}
            ref={canvasRef}
        /></div>
    );
}


function calcRadian(x: number) {
    return x * Math.PI / 180;
}