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
                    <h3 style={{ marginTop: 0 }}>Welcome to My Retro Portfolio!</h3>
                    <p>
                        Hi! I'm a developer who loves the retro aesthetic of the 90s.
                        This site is built with <strong>React</strong> and <strong>98.css</strong>.
                    </p>
                    <p>
                        I specialize in building interactive web applications with a unique touch.
                        Feel free to browse around my desktop!
                    </p>
                </div>
            </div>

            <fieldset style={{ marginTop: '10px' }}>
                <legend>Skills</legend>
                <ul style={{ listStyleType: 'square' }}>
                    <li>JavaScript / TypeScript</li>
                    <li>React.js / Next.js</li>
                    <li>Node.js / Express</li>
                    <li>Retro UI Design</li>
                </ul>
            </fieldset>
        </div>
    );
};

export default AboutMe;
