import React from 'react';

import codeDuelZLogo from '../assets/logo1.png';

const projects = [
    {
        name: "CloudCanvas-Architect",
        desc: "A full-stack website where you can design,estimate and deploy your own cloud infrastructure to AWS.",
        tech: "Node.js, Express.js, React.js, AWS, PostgreSQL",
        icon: "☁️"
    },
    {
        name: "Java-Shell",
        desc: "A Shell implemented in Java with customized sound, colors and commands to start apps",
        tech: "Java, JShell, Swing, JDeploy",
        icon: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTWMB_dL16m-L-krUXlI7v1mAbbblcFvm2nX9Qho1eE9ZHL1KA3"
    },
    {
        name: "CodeDuelZ",
        desc: "A 1v1 competitive programming platform where users can compete with each other in real-time just like chess.com but for competitive coders .",
        tech: "React.js, Spring Boot, STOMP, Supabase/PostgreSQL, Monaco Editor",
        icon: codeDuelZLogo
    },
    {
        name: "Inquiro",
        desc: "A platform to help Students prepare for various entrance exams",
        tech: "React.js, Express.js, Node.js, MongoDB",
        icon: "https://win98icons.alexmeub.com/icons/png/notepad-4.png"
    }
];

const Projects = ({ onOpenProject }) => {
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
                        onDoubleClick={() => onOpenProject && onOpenProject(proj)}
                    >
                        {proj.icon.startsWith('http') || proj.icon.startsWith('/') ? (
                            <img src={proj.icon} alt="icon" style={{ width: '32px', height: '32px' }} />
                        ) : (
                            <span style={{ fontSize: '32px' }}>{proj.icon}</span>
                        )}
                        <span style={{ fontSize: '12px', marginTop: '2px' }}>{proj.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <p>Double-click icon to view details</p>
            </div>
        </div>
    );
};

export default Projects;
