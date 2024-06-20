import React, { useState, useEffect } from 'react';
import './index.css';

const AdminChat = ({ messages, connection }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [userMessages, setUserMessages] = useState({});

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveMessage', (user, message) => {
                setActiveUsers(prevUsers => {
                    if (!prevUsers.includes(user)) {
                        return [...prevUsers, user];
                    }
                    return prevUsers;
                });

                console.log('Admin received message:', user, message);
                
                setUserMessages(prevMessages => {
                    const updatedMessages = { ...prevMessages };
                    if (!updatedMessages[user]) {
                        updatedMessages[user] = [];
                    }
                    updatedMessages[user].push({ user, message });
                    return updatedMessages;
                });
            });
        }
    }, [connection]);

    const handleChatSelect = (userEmail) => {
        setSelectedChat(userEmail);
    };

    const handleSendMessage = async (message) => {
        if (message) {
            try {
                await connection.invoke('SendMessage', selectedChat, message);
                setMessageInput('');

                // Add the sent message to the chat window immediately
                setUserMessages(prevMessages => {
                    const updatedMessages = { ...prevMessages };
                    if (!updatedMessages[selectedChat]) {
                        updatedMessages[selectedChat] = [];
                    }
                    updatedMessages[selectedChat].push({ user: 'Admin', message });
                    return updatedMessages;
                });
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

    const handleCloseTicket = async (userEmail) => {
        const groupName = userEmail;
        try {
            await connection.invoke('LeaveGroup', groupName);

            setActiveUsers(users => users.filter(user => user !== userEmail));
            if (selectedChat === userEmail) {
                setSelectedChat(null);
            }
        } catch (e) {
            console.error('Error closing ticket:', e);
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
                            {userMessages[selectedChat]?.map((m, index) => (
                                <div className='chat_message' key={index}><strong>{m.user}:</strong>{m.message}</div>
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
