import React from 'react';

const Contact = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div className="field-row-stacked" style={{ width: '100%' }}>
                <label htmlFor="email">To:</label>
                <input id="email" type="text" value="me@example.com" readOnly style={{ width: '100%' }} />
            </div>
            <div className="field-row-stacked" style={{ width: '100%' }}>
                <label htmlFor="subject">Subject:</label>
                <input id="subject" type="text" style={{ width: '100%' }} />
            </div>
            <div className="field-row-stacked" style={{ width: '100%' }}>
                <label htmlFor="message">Message:</label>
                <textarea id="message" rows={8} style={{ width: '100%' }}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button onClick={() => alert('Sent to the ether!')}>Send</button>
            </div>
        </div>
    );
};

export default Contact;
