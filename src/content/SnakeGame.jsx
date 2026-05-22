import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const CELL_SIZE = 18;
const INITIAL_SPEED = 120;

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [gameState, setGameState] = useState('idle');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        try { return parseInt(localStorage.getItem('snake-highscore')) || 0; } catch { return 0; }
    });

    const gridW = useRef(20);
    const gridH = useRef(15);
    const snake = useRef([{ x: 10, y: 7 }]);
    const dir = useRef({ x: 1, y: 0 });
    const nextDir = useRef({ x: 1, y: 0 });
    const food = useRef({ x: 15, y: 7 });
    const loopRef = useRef(null);
    const speedRef = useRef(INITIAL_SPEED);
    const touchStart = useRef(null);

    const placeFood = useCallback(() => {
        const occupied = new Set(snake.current.map(s => `${s.x},${s.y}`));
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * gridW.current),
                y: Math.floor(Math.random() * gridH.current),
            };
        } while (occupied.has(`${pos.x},${pos.y}`));
        food.current = pos;
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = gridW.current * CELL_SIZE;
        const h = gridH.current * CELL_SIZE;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = '#0a0a0a';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < gridW.current; x++) {
            for (let y = 0; y < gridH.current; y++) {
                ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        snake.current.forEach((seg, i) => {
            const ratio = 1 - (i / snake.current.length) * 0.5;
            ctx.fillStyle = i === 0
                ? '#00ff41'
                : `rgba(0, ${Math.floor(200 * ratio)}, ${Math.floor(50 * ratio)}, 1)`;
            ctx.fillRect(
                seg.x * CELL_SIZE + 1,
                seg.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );

            if (i === 0) {
                ctx.fillStyle = '#000';
                const eyeSize = 3;
                if (dir.current.x === 1) {
                    ctx.fillRect(seg.x * CELL_SIZE + 12, seg.y * CELL_SIZE + 4, eyeSize, eyeSize);
                    ctx.fillRect(seg.x * CELL_SIZE + 12, seg.y * CELL_SIZE + 11, eyeSize, eyeSize);
                } else if (dir.current.x === -1) {
                    ctx.fillRect(seg.x * CELL_SIZE + 3, seg.y * CELL_SIZE + 4, eyeSize, eyeSize);
                    ctx.fillRect(seg.x * CELL_SIZE + 3, seg.y * CELL_SIZE + 11, eyeSize, eyeSize);
                } else if (dir.current.y === -1) {
                    ctx.fillRect(seg.x * CELL_SIZE + 4, seg.y * CELL_SIZE + 3, eyeSize, eyeSize);
                    ctx.fillRect(seg.x * CELL_SIZE + 11, seg.y * CELL_SIZE + 3, eyeSize, eyeSize);
                } else {
                    ctx.fillRect(seg.x * CELL_SIZE + 4, seg.y * CELL_SIZE + 12, eyeSize, eyeSize);
                    ctx.fillRect(seg.x * CELL_SIZE + 11, seg.y * CELL_SIZE + 12, eyeSize, eyeSize);
                }
            }
        });

        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        const fx = food.current.x * CELL_SIZE + CELL_SIZE / 2;
        const fy = food.current.y * CELL_SIZE + CELL_SIZE / 2;
        ctx.arc(fx, fy, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff6666';
        ctx.beginPath();
        ctx.arc(fx - 2, fy - 2, 3, 0, Math.PI * 2);
        ctx.fill();
    }, []);

    const gameLoop = useCallback(() => {
        dir.current = nextDir.current;
        const head = {
            x: snake.current[0].x + dir.current.x,
            y: snake.current[0].y + dir.current.y,
        };

        if (
            head.x < 0 || head.x >= gridW.current ||
            head.y < 0 || head.y >= gridH.current ||
            snake.current.some(s => s.x === head.x && s.y === head.y)
        ) {
            setGameState('dead');
            setHighScore(prev => {
                const newHigh = Math.max(prev, score);
                try { localStorage.setItem('snake-highscore', newHigh); } catch {}
                return newHigh;
            });
            return;
        }

        snake.current = [head, ...snake.current];

        if (head.x === food.current.x && head.y === food.current.y) {
            setScore(s => s + 10);
            placeFood();
            speedRef.current = Math.max(60, speedRef.current - 2);
        } else {
            snake.current.pop();
        }

        draw();
        loopRef.current = setTimeout(gameLoop, speedRef.current);
    }, [draw, placeFood, score]);

    const startGame = useCallback(() => {
        snake.current = [{ x: 10, y: 7 }];
        dir.current = { x: 1, y: 0 };
        nextDir.current = { x: 1, y: 0 };
        speedRef.current = INITIAL_SPEED;
        setScore(0);
        placeFood();
        setGameState('playing');
        draw();
        if (loopRef.current) clearTimeout(loopRef.current);
        loopRef.current = setTimeout(gameLoop, speedRef.current);
    }, [draw, placeFood, gameLoop]);

    useEffect(() => {
        return () => {
            if (loopRef.current) clearTimeout(loopRef.current);
        };
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleKey = (e) => {
            const cur = dir.current;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (cur.y !== 1) nextDir.current = { x: 0, y: -1 };
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (cur.y !== -1) nextDir.current = { x: 0, y: 1 };
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (cur.x !== 1) nextDir.current = { x: -1, y: 0 };
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (cur.x !== -1) nextDir.current = { x: 1, y: 0 };
                    e.preventDefault();
                    break;
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gameState]);

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
        if (!touchStart.current) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.current.x;
        const dy = touch.clientY - touchStart.current.y;
        const minSwipe = 20;

        if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

        const cur = dir.current;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && cur.x !== -1) nextDir.current = { x: 1, y: 0 };
            else if (dx < 0 && cur.x !== 1) nextDir.current = { x: -1, y: 0 };
        } else {
            if (dy > 0 && cur.y !== -1) nextDir.current = { x: 0, y: 1 };
            else if (dy < 0 && cur.y !== 1) nextDir.current = { x: 0, y: -1 };
        }
        touchStart.current = null;
    };

    const containerStyle = {
        padding: '8px',
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
        fontSize: '13px',
    };

    const canvasWidth = gridW.current * CELL_SIZE;
    const canvasHeight = gridH.current * CELL_SIZE;

    return (
        <div style={containerStyle} ref={containerRef}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
                padding: '4px 8px',
                backgroundColor: '#e8e8e8',
                border: '1px solid #808080',
            }}>
                <span>🐍 Score: <strong>{score}</strong></span>
                <span>🏆 Best: <strong>{highScore}</strong></span>
            </div>

            <div
                style={{
                    border: '2px solid #808080',
                    boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    position: 'relative',
                    minHeight: canvasHeight + 4,
                    touchAction: 'none',
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    style={{ display: 'block', imageRendering: 'pixelated' }}
                />

                {gameState === 'idle' && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        color: '#00ff41',
                        fontFamily: '"Consolas", monospace',
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🐍 SNAKE</div>
                        <div style={{ fontSize: '12px', marginBottom: '15px', color: '#888' }}>
                            Arrow keys / WASD / Swipe
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            style={{
                                padding: '6px 24px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                backgroundColor: '#000',
                                color: '#00ff41',
                                border: '1px solid #00ff41',
                            }}
                        >
                            START
                        </motion.button>
                    </div>
                )}

                {gameState === 'dead' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.85)',
                            color: '#ff3333',
                            fontFamily: '"Consolas", monospace',
                        }}
                    >
                        <div style={{ fontSize: '20px', marginBottom: '8px' }}>GAME OVER</div>
                        <div style={{ fontSize: '16px', marginBottom: '4px', color: '#fff' }}>
                            Score: {score}
                        </div>
                        <div style={{ fontSize: '12px', marginBottom: '15px', color: '#888' }}>
                            Best: {highScore}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            style={{
                                padding: '6px 24px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                backgroundColor: '#000',
                                color: '#00ff41',
                                border: '1px solid #00ff41',
                            }}
                        >
                            PLAY AGAIN
                        </motion.button>
                    </motion.div>
                )}
            </div>

            <div style={{
                marginTop: '6px',
                fontSize: '11px',
                color: '#888',
                textAlign: 'center',
            }}>
                {gameState === 'playing' ? 'Use arrow keys, WASD, or swipe to move' : ''}
            </div>
        </div>
    );
};

export default SnakeGame;
