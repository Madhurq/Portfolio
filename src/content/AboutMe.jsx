import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 },
    },
};

const languages = ['C/C++', 'Java', 'JavaScript', 'SQL', 'Python'];
const technologies = ['AWS', 'Spring/SpringBoot', 'Node.js/Express.js', 'React.js', 'Java Swing', 'Linux', 'TailwindCSS'];
const core = ['DSA', 'OOP', 'DBMS', 'Software Engineering', 'Operating Systems', 'Machine Learning', 'PyTorch'];

const AboutMe = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ padding: '10px' }}
        >
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <motion.img
                    src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                    alt="Avatar"
                    style={{ width: '64px', height: '64px', border: '2px solid gray' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                />
                <div>
                    <h3 style={{ marginTop: 0 }}>Madhur Mundra</h3>
                    <p style={{ margin: '2px 0', fontSize: '13px' }}>
                        Full-stack developer crafting interactive web experiences with a unique touch.
                        From architecting AWS cloud platforms to building real-time competitive coding arenas — I love turning complex ideas into polished, production-ready applications.
                    </p>
                </div>
            </motion.div>

            {/* Education */}
            <motion.fieldset variants={itemVariants} style={{ marginTop: '10px' }}>
                <legend>Education</legend>
                <div style={{ fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong>Dharmsinh Desai University, Nadiad</strong>
                        <span style={{ fontSize: '11px', color: '#666' }}>2023 – 2027</span>
                    </div>
                    <p style={{ margin: '2px 0' }}>B.Tech in Information Technology — CGPA: 8.75/10</p>
                    <p style={{ margin: '2px 0', fontSize: '11px', color: '#555' }}>
                        Coursework: OOP, DBMS, Data Structures & Algorithms, OS, Computer Networks, Compiler Design
                    </p>
                    <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '6px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong>Delhi Public School, Vadodara</strong>
                        <span style={{ fontSize: '11px', color: '#666' }}>2013 – 2023</span>
                    </div>
                    <p style={{ margin: '2px 0' }}>Higher Secondary — 85%</p>
                </div>
            </motion.fieldset>

            {/* Skills */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <motion.fieldset variants={itemVariants} style={{ flex: 1 }}>
                    <legend>Languages</legend>
                    <motion.ul
                        style={{ listStyleType: 'square', paddingLeft: '20px', margin: '4px 0', fontSize: '12px' }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {languages.map((skill, i) => (
                            <motion.li key={i} variants={listItemVariants}>
                                {skill}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.fieldset>
                <motion.fieldset variants={itemVariants} style={{ flex: 1 }}>
                    <legend>Technologies</legend>
                    <motion.ul
                        style={{ listStyleType: 'square', paddingLeft: '20px', margin: '4px 0', fontSize: '12px' }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {technologies.map((tech, i) => (
                            <motion.li key={i} variants={listItemVariants}>
                                {tech}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.fieldset>
                <motion.fieldset variants={itemVariants} style={{ flex: 1 }}>
                    <legend>Core</legend>
                    <motion.ul
                        style={{ listStyleType: 'square', paddingLeft: '20px', margin: '4px 0', fontSize: '12px' }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {core.map((subj, i) => (
                            <motion.li key={i} variants={listItemVariants}>
                                {subj}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.fieldset>
            </div>

            {/* Resume Download */}
            <motion.div variants={itemVariants} style={{ marginTop: '10px', textAlign: 'center' }}>
                <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <button style={{ padding: '6px 20px', cursor: 'pointer', fontSize: '12px' }}>
                        📄 Download Resume
                    </button>
                </a>
            </motion.div>
        </motion.div>
    );
};

export default AboutMe;
