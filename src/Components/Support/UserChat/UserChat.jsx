import React, { useState } from 'react';
import './index.css';

const UserChat = ({ messages, connection }) => {
    const [messageInput, setMessageInput] = useState('');

    const handleSendMessage = async (message) => {
        try {
            await connection.invoke('SendMessage', message);
            setMessageInput('');
        } catch (e) {
            console.error('Error sending message:', e);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(messageInput);
        }
    };

    return (
        <div className="user_chat_container">
            <div className="user_chat_window">
                <div className="chat_header">
                </div>
                <div className="chat_messages">
                    {messages.map((m, index) => (
                        <div className='chat_message' key={index}><strong>{m.user}:</strong> {m.message}</div>
                    ))}
                </div>
                <div className="chat_input">
                    <textarea
                        placeholder="Type a message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        id="messageInput"
                    />
                    <button onClick={() => handleSendMessage(messageInput)}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default UserChat;
