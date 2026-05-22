import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

const socials = [
    {
        name: 'Gmail',
        desc: 'madhur.mu5@gmail.com',
        href: 'mailto:madhur.mu5@gmail.com',
        icon: 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png',
    },
    {
        name: 'GitHub',
        desc: 'github.com/Madhurq',
        href: 'https://github.com/Madhurq',
        icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png',
    },
    {
        name: 'LinkedIn',
        desc: 'linkedin.com/in/madhur-mundra-867bb2277',
        href: 'https://www.linkedin.com/in/madhur-mundra-867bb2277',
        icon: 'https://win98icons.alexmeub.com/icons/png/msn1-2.png',
    },
    {
        name: 'Resume',
        desc: 'Download my resume (PDF)',
        href: '/Resume.pdf',
        icon: 'https://win98icons.alexmeub.com/icons/png/write_wordpad-0.png',
        download: true,
    },
];

const Contact = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ padding: '10px' }}
        >
            <motion.p variants={itemVariants} style={{ margin: '0 0 10px 0', fontSize: '13px' }}>
                Connect with me through any of the links below:
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {socials.map((social) => (
                    <motion.a
                        key={social.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={social.href}
                        target={social.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        download={social.download ? true : undefined}
                        className="contact-link"
                    >
                        <img src={social.icon} alt={social.name} />
                        <div className="contact-link-info">
                            <span className="contact-link-name">{social.name}</span>
                            <span className="contact-link-desc">{social.desc}</span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

export default Contact;
