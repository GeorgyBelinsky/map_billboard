import React, { useState, useEffect } from 'react';
import './index.css';

const AdminChat = ({ messages, connection, activeUsers }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveMessage', (user, message) => {
                console.log('Admin received message:', user, message);
                if (selectedChat && selectedChat === user) {
                    setMessages(messages => [...messages, { user, message }]);
                }
            });
        }
    }, [connection, selectedChat]);

    const handleChatSelect = (userEmail) => {
        setSelectedChat(userEmail);
        // You might want to load chat history here if needed
        setMessages([]);
    };

    const handleSendMessage = async (message) => {
        const groupName = `chat-${selectedChat}`;
        if (message) {
            try {
                await connection.invoke('SendMessageToGroup', groupName, message);
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

    const handleCloseTicket = (userEmail) => {
        // Handle closing the chat, e.g., removing from active users
        setActiveUsers(users => users.filter(user => user !== userEmail));
        if (selectedChat === userEmail) {
            setSelectedChat(null);
            setMessages([]);
        }
    };

    return (
        <div className="admin_chat_container">
            <div className="sidebar">
                <h2>Users</h2>
                <ul>
                    {activeUsers.map(userEmail => (
                        <li key={userEmail} onClick={() => handleChatSelect(userEmail)}>
                            {userEmail}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat_window">
                {selectedChat ? (
                    <>
                        <div className="chat_header">
                            <h2>{selectedChat}</h2>
                            <button onClick={() => handleCloseTicket(selectedChat)}>Close Ticket</button>
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
                    </>
                ) : (
                    <div className="no_chat_selected">
                        <h2>Select a chat to view messages</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
