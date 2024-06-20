import React, { useEffect, useState } from 'react';
import './index.css';

const UserChat = ({ messages, connection }) => {
    const [messageInput, setMessageInput] = useState('');
    const [userNickname, setUserNickname] = useState('');

    useEffect(()=>{
        getUserNickname();
    },[])

    const getUserNickname = async () => {
        try {
            const response = await fetch(`https://billboards-backend.azurewebsites.net/api/User/UserCheck`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();

            setUserNickname(result);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSendMessage = async (message) => {
        if (message) {
            try {
                await connection.invoke('SendMessage', userNickname, message);
                setMessageInput('');
            } catch (e) {
                console.error('Error sending message:', e);
            }
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
                        <div className='chat_message' key={index}><strong>{m.user}</strong> {m.message}</div>
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
