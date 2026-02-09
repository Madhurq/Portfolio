import React from 'react';

const AboutMe = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <img
                    src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                    alt="Avatar"
                    style={{ width: '64px', height: '64px', border: '2px solid gray' }}
                />
                <div>
                    <h3 style={{ marginTop: 0 }}>Welcome to My Portfolio!</h3>
                    <p>
                        Hi! I'm Madhur Mundra, a Software Developer living in India.
                        This site was built using <strong>React</strong> and <strong>98.css</strong>.
                    </p>
                    <p>
                        I specialize in building interactive web applications with a unique touch.
                        Feel free to browse around my desktop!
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <fieldset style={{ flex: 1 }}>
                    <legend>Skills:-</legend>
                    <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                        <li>Java</li>
                        <li>Spring Boot</li>
                        <li>JavaScript</li>
                        <li>MongoDB/PostgreSQL/MySQL</li>
                        <li>React.js</li>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>Python</li>
                        <li>C++</li>
                        <li>Git</li>
                    </ul>
                </fieldset>
                <fieldset style={{ flex: 1 }}>
                    <legend>Core:-</legend>
                    <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                        <li>DBMS</li>
                        <li>DSA</li>
                        <li>OS</li>
                        <li>CN</li>
                        <li>Algorithms</li>
                        <li>TOC</li>
                    </ul>
                </fieldset>
            </div>

        </div>
    );
};

export default AboutMe;
