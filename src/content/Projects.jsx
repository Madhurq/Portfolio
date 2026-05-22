import React from 'react';
import { motion } from 'framer-motion';

import codeDuelZLogo from '../assets/logo1.png';

const projects = [
    {
        name: "CloudCanvas-Architect",
        desc: "A full-stack AWS architecture design platform with drag-and-drop canvas, real-time cost estimation for 40+ AWS services across 25+ regions, and one-click CloudFormation deployment.",
        tech: "React, Node.js, Express, PostgreSQL, Firebase Auth, Supabase, XyFlow, AWS CloudFormation",
        icon: "☁️",
        github: "https://github.com/Madhurq/CloudCanvas-Architect",
        demo: "https://cloudcanvas-architect-1.onrender.com/",
        bullets: [
            "Built a full-stack AWS architecture design platform with React, Node.js, and PostgreSQL, featuring a drag-and-drop canvas, real-time cost estimation, and one-click CloudFormation deployment.",
            "Integrated the AWS Price List API to enable real-time cost estimation for 40+ AWS services, supporting configurable pricing models across 25+ regions and instance types.",
            "Implemented a decentralized Marketplace feature allowing 50+ concurrent users to seamlessly buy, sell, and share custom system designs.",
            "Engineered an AI-driven design assistant utilizing the Gemini API to automatically generate complete, deployable AWS architectures from natural language prompts, reducing manual design time by 85%."
        ]
    },
    {
        name: "CodeDuelZ",
        desc: "A 1v1 competitive coding platform — like chess.com but for competitive coders. Real-time matchmaking with sub-50ms latency and live match synchronization via WebSockets.",
        tech: "React.js, Spring Boot, PostgreSQL/Supabase, STOMP, Monaco Editor",
        icon: codeDuelZLogo,
        github: "https://github.com/Madhurq/CodeDuelZFront",
        demo: "https://codeduelz.vercel.app/",
        bullets: [
            "Developed a real-time 1v1 competitive coding platform using Spring Boot and React, featuring WebSocket (STOMP) matchmaking that pairs users in under 2 seconds with sub-50ms latency for live match synchronization.",
            "Highly responsive RESTful APIs designed for user profiles, leaderboards, and code submissions using Spring Boot and JPA/Hibernate, achieving average response times of <100ms.",
            "Engineered an automated problem-ingestion service to parse and index a 2000+ LeetCode problem JSON dataset in under 5 seconds; utilized regular expressions for O(1) database retrieval, accelerating real-time code evaluation by 60%."
        ]
    },
    {
        name: "Java-Shell",
        desc: "A fully-functional shell interpreter built from scratch in Java with 15+ built-in commands, a Swing GUI with tab completion, command history, and customizable themes.",
        tech: "Java, JShell, Java Swing, JDeploy",
        icon: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTWMB_dL16m-L-krUXlI7v1mAbbblcFvm2nX9Qho1eE9ZHL1KA3",
        github: "https://github.com/Madhurq/Java-Shell",
        demo: null,
        demoNote: "Windows EXE",
        bullets: [
            "Developed a fully-functional shell interpreter from scratch in Java supporting 15+ built-in commands (ls, cd, cat, mkdir, rm, touch, etc.) with output redirection, argument parsing, and external command execution via ProcessBuilder.",
            "Designed a Swing-based GUI interface with real-time tab completion, command history navigation, context menus, and persistent user customization (colors, themes) stored via a singleton configuration manager.",
            "Engineered a 'start' command to open any .exe or .out file, utilizing ProcessBuilder and an optimized file search using HashMap."
        ]
    },
    {
        name: "CareerCompass",
        desc: "An AI-powered career guidance platform using Google Gemini 1.5 Pro for personalized career recommendations, skill-gap identification, resume evaluation, and an interactive career mentor chatbot.",
        tech: "React, Node.js, Express.js, Google Gemini API, NLP",
        icon: "🧭",
        github: "https://github.com/Maharsh-Nayak/AI-career-advisor",
        demo: "https://career-compass-dyqc.onrender.com/",
        bullets: [
            "Built an AI-powered career guidance platform leveraging Google Gemini 1.5 Pro & Flash for personalized, data-driven career recommendations based on resumes, academic records, and aptitude assessments.",
            "Developed a skill-gap identification engine that evaluates the user's current skills against career goals, identifies areas for improvement, and suggests relevant learning paths.",
            "Implemented a resume evaluation and plagiarism detection module using NLP to analyze and score resumes for quality and originality.",
            "Engineered an interactive career mentor chatbot for continuous, conversational career advice and insights."
        ]
    },
    {
        name: "Inquiro",
        desc: "A platform to help students prepare for various entrance exams with AI-powered practice, personalized study paths, and performance analytics.",
        tech: "React.js, Express.js, Node.js, MongoDB",
        icon: "https://win98icons.alexmeub.com/icons/png/notepad-4.png",
        github: "https://github.com/Maharsh-Nayak/Inquiro",
        demo: "https://inquiro-1.onrender.com/",
        bullets: [
            "Built a comprehensive student exam preparation platform with React.js and Node.js, featuring practice tests, performance tracking, and study resources.",
            "Designed an intuitive interface for students to access question banks and track their preparation progress across multiple exam categories."
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
        },
    },
};

const Projects = ({ onOpenProject }) => {
    return (
        <div style={{ padding: '1px' }}>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{ margin: '5px' }}
            >
                Total {projects.length} object(s)
            </motion.p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '10px',
                padding: '10px',
                backgroundColor: 'white',
                border: '2px solid #808080',
                boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a',
                height: '250px',
                overflowY: 'auto'
            }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'contents' }}
                >
                    {projects.map((proj, i) => (
                        <motion.div
                            key={i}
                            variants={iconVariants}
                            whileHover={{
                                scale: 1.12,
                                transition: { type: 'spring', stiffness: 400, damping: 15 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: '6px',
                                borderRadius: '4px',
                                transition: 'background-color 0.15s ease',
                            }}
                            className="hover-highlight"
                            onDoubleClick={() => onOpenProject && onOpenProject(proj)}
                        >
                            {(typeof proj.icon === 'string' && (proj.icon.startsWith('http') || proj.icon.startsWith('/'))) ? (
                                <img src={proj.icon} alt={proj.name} style={{ width: '32px', height: '32px' }} />
                            ) : typeof proj.icon === 'string' && proj.icon.length <= 4 ? (
                                <span style={{ fontSize: '32px' }}>{proj.icon}</span>
                            ) : (
                                <img src={proj.icon} alt={proj.name} style={{ width: '32px', height: '32px' }} />
                            )}
                            <span style={{ fontSize: '12px', marginTop: '2px' }}>{proj.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '10px' }}
            >
                <p>Double-click icon to view details</p>
            </motion.div>
        </div>
    );
};

export default Projects;
