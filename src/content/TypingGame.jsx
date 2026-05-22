import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const WORDS = [
    'react', 'javascript', 'portfolio', 'developer', 'component', 'function',
    'variable', 'keyboard', 'monitor', 'browser', 'website', 'coding',
    'program', 'windows', 'desktop', 'system', 'network', 'server',
    'database', 'frontend', 'backend', 'fullstack', 'algorithm', 'software',
    'engineer', 'compile', 'deploy', 'testing', 'debug', 'terminal',
    'package', 'module', 'import', 'export', 'interface', 'abstract',
    'spring', 'docker', 'python', 'express', 'mongodb', 'postgres',
    'github', 'commit', 'branch', 'merge', 'request', 'review',
    'coffee', 'pixel', 'cursor', 'scroll', 'buffer', 'stream',
    'render', 'layout', 'widget', 'toggle', 'canvas', 'vector',
];

const GAME_DURATION = 60;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const generateWords = (count) => Array.from({ length: count }, () => getRandomWord());

const TypingGame = () => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, finished
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [charCorrect, setCharCorrect] = useState(0);
    const inputRef = useRef(null);

    const startGame = useCallback(() => {
        setWords(generateWords(200));
        setCurrentIndex(0);
        setTypedWord('');
        setCorrectCount(0);
        setWrongCount(0);
        setCharCorrect(0);
        setTimeLeft(GAME_DURATION);
        setGameState('playing');
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;
        if (timeLeft <= 0) {
            setGameState('finished');
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    const handleInput = (e) => {
        const val = e.target.value;

        if (val.endsWith(' ')) {
            const trimmed = val.trim();
            if (trimmed === words[currentIndex]) {
                setCorrectCount(c => c + 1);
                setCharCorrect(c => c + trimmed.length);
            } else {
                setWrongCount(w => w + 1);
            }
            setCurrentIndex(i => i + 1);
            setTypedWord('');
        } else {
            setTypedWord(val);
        }
    };

    const wpm = Math.round((charCorrect / 5) / ((GAME_DURATION - timeLeft) / 60)) || 0;
    const accuracy = (correctCount + wrongCount) > 0
        ? Math.round((correctCount / (correctCount + wrongCount)) * 100)
        : 100;

    const containerStyle = {
        padding: '12px',
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
        fontSize: '13px',
    };

    if (gameState === 'idle') {
        return (
            <div style={containerStyle}>
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                    <h3 style={{ margin: '0 0 10px' }}>⌨️ Typing Speed Test</h3>
                    <p style={{ margin: '0 0 20px', color: '#555' }}>
                        Test your typing speed! You have {GAME_DURATION} seconds.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{ padding: '6px 20px', cursor: 'pointer', fontSize: '13px' }}
                    >
                        Start Test
                    </motion.button>
                </div>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div style={containerStyle}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '20px 10px' }}
                >
                    <h3 style={{ margin: '0 0 15px' }}>⏱️ Time's Up!</h3>
                    <fieldset style={{ textAlign: 'left', marginBottom: '10px' }}>
                        <legend>Results</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '5px' }}>
                            <div>
                                <div style={{ color: '#666', fontSize: '11px' }}>WPM</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000080' }}>{wpm}</div>
                            </div>
                            <div>
                                <div style={{ color: '#666', fontSize: '11px' }}>Accuracy</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: accuracy >= 90 ? '#008000' : '#cc0000' }}>
                                    {accuracy}%
                                </div>
                            </div>
                            <div>
                                <div style={{ color: '#666', fontSize: '11px' }}>Correct</div>
                                <div style={{ fontSize: '18px', color: '#008000' }}>✓ {correctCount}</div>
                            </div>
                            <div>
                                <div style={{ color: '#666', fontSize: '11px' }}>Wrong</div>
                                <div style={{ fontSize: '18px', color: '#cc0000' }}>✗ {wrongCount}</div>
                            </div>
                        </div>
                    </fieldset>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{ padding: '6px 20px', cursor: 'pointer', fontSize: '13px' }}
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                padding: '4px 8px',
                backgroundColor: '#e8e8e8',
                border: '1px solid #808080',
            }}>
                <span>⏱ <strong>{timeLeft}s</strong></span>
                <span>WPM: <strong>{wpm}</strong></span>
                <span>✓ {correctCount} | ✗ {wrongCount}</span>
            </div>

            <div style={{
                border: '2px solid #808080',
                boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a',
                padding: '10px',
                minHeight: '100px',
                lineHeight: '1.8',
                fontSize: '15px',
                fontFamily: '"Consolas", "Courier New", monospace',
                backgroundColor: '#fff',
                marginBottom: '8px',
                overflow: 'hidden',
            }}>
                {words.slice(Math.max(0, currentIndex - 3), currentIndex + 20).map((word, i) => {
                    const actualIndex = Math.max(0, currentIndex - 3) + i;
                    let color = '#666';
                    let fontWeight = 'normal';
                    let bg = 'transparent';

                    if (actualIndex < currentIndex) {
                        color = '#aaa';
                    } else if (actualIndex === currentIndex) {
                        color = '#000';
                        fontWeight = 'bold';
                        bg = '#e0e8ff';
                    }

                    return (
                        <span key={actualIndex} style={{
                            color,
                            fontWeight,
                            backgroundColor: bg,
                            padding: actualIndex === currentIndex ? '1px 4px' : '0',
                            borderRadius: '2px',
                            marginRight: '6px',
                        }}>
                            {word}
                        </span>
                    );
                })}
            </div>

            <input
                ref={inputRef}
                type="text"
                value={typedWord}
                onChange={handleInput}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '15px',
                    fontFamily: '"Consolas", "Courier New", monospace',
                    boxSizing: 'border-box',
                    borderColor: typedWord && !words[currentIndex]?.startsWith(typedWord)
                        ? '#cc0000' : undefined,
                }}
                placeholder="Type the highlighted word and press space..."
            />
        </div>
    );
};

export default TypingGame;
