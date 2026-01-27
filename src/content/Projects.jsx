import React from 'react';

const projects = [
    {
        name: "Retro Portfolio",
        desc: "This website! A Windows 98 themed portfolio.",
        tech: "React, 98.css",
        icon: "https://win98icons.alexmeub.com/icons/png/html-1.png"
    },
    {
        name: "E-Commerce App",
        desc: "A full-stack shopping platform.",
        tech: "Next.js, Stripe",
        icon: "https://win98icons.alexmeub.com/icons/png/msagent-1.png"
    },
    {
        name: "Chat Application",
        desc: "Real-time messaging app.",
        tech: "Socket.io, Node.js",
        icon: "https://win98icons.alexmeub.com/icons/png/chat-1.png"
    }
];

const Projects = () => {
    return (
        <div style={{ padding: '1px' }}>
            <p style={{ margin: '5px' }}>Total {projects.length} object(s)</p>
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
                {projects.map((proj, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                        className="hover-highlight"
                    >
                        <img src={proj.icon} alt="icon" style={{ width: '32px', height: '32px' }} />
                        <span style={{ fontSize: '12px', marginTop: '2px' }}>{proj.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <p>Double-click icon to view details (Simulated)</p>
            </div>
        </div>
    );
};

export default Projects;
