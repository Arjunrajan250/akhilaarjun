import React, { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars with warm champagne, subtle blush, and starlight ivory tones
    const starCount = Math.floor((width * height) / 4800);
    const starColors = ['#FAF7F2', '#E8C99B', '#F3D8B0', '#F2C5D0', '#CBD2E1'];
    
    const stars = Array.from({ length: Math.min(starCount, 260) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.75 + 0.15,
      speed: Math.random() * 0.04 + 0.015,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Shooting stars with champagne/gold trail
    let shootingStar = null;
    const spawnShootingStar = () => {
      if (Math.random() < 0.012 && !shootingStar) {
        shootingStar = {
          x: Math.random() * width * 0.85,
          y: Math.random() * height * 0.35,
          len: Math.random() * 90 + 50,
          speed: Math.random() * 9 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.15,
          life: 1,
        };
      }
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial midnight sapphire & subtle warm starlight aura
      const grad1 = ctx.createRadialGradient(width * 0.25, height * 0.2, 50, width * 0.25, height * 0.2, width * 0.7);
      grad1.addColorStop(0, 'rgba(40, 52, 85, 0.09)');
      grad1.addColorStop(1, 'rgba(8, 9, 14, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.75, 50, width * 0.8, height * 0.75, width * 0.65);
      grad2.addColorStop(0, 'rgba(217, 107, 130, 0.045)');
      grad2.addColorStop(0.6, 'rgba(232, 201, 155, 0.035)');
      grad2.addColorStop(1, 'rgba(8, 9, 14, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        const currentAlpha = star.alpha + Math.sin(tick * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.95, currentAlpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      // Render shooting star if active
      spawnShootingStar();
      if (shootingStar) {
        ctx.save();
        ctx.globalAlpha = shootingStar.life;
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len
        );
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.3, '#E8C99B');
        grad.addColorStop(0.7, '#D96B82');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.life -= 0.018;
        if (shootingStar.life <= 0) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08090e]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08090e]/30 to-[#08090e]/85 pointer-events-none" />
    </div>
  );
}
