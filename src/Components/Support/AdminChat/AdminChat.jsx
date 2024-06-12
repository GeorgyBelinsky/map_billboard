import React, { useState, useEffect } from 'react';
import './index.css';

const AdminChat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    // Simulate SignalR connection and hardcoded data
    useEffect(() => {
        // const newConnection = new signalR.HubConnectionBuilder()
        //     .withUrl('https://<your-azure-backend-url>/chathub')
        //     .withAutomaticReconnect()
        //     .build();

        // setConnection(newConnection);

        // Simulate initial chats
        setChats([
            { id: 1, user: 'User1' },
            { id: 2, user: 'User2' },
        ]);
    }, []);

    // useEffect(() => {
    //     if (connection) {
    //         connection.start()
    //             .then(result => {
    //                 console.log('Connected!');
                    
    //                 connection.on('ReceiveMessage', (user, message) => {
    //                     setMessages(messages => [...messages, { user, message }]);
    //                 });

    //                 // Replace with actual API call to fetch initial chats
    //                 setChats([{ id: 1, user: 'User1' }, { id: 2, user: 'User2' }]);
    //             })
    //             .catch(e => console.log('Connection failed: ', e));
    //     }
    // }, [connection]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        // Replace with actual API call to fetch messages for selected chat
        setMessages([
            { user: chat.user, message: 'Hello!' },
            { user: 'Admin', message: 'Hi! How can I help you?' },
        ]);
    };

    const handleSendMessage = (user, message) => {
        // Simulate sending a message
        // if (connection.connectionStarted) {
        //     try {
        //         await connection.send('SendMessage', user, message);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // } else {
        //     alert('No connection to server yet.');
        // }
        setMessages([...messages, { user: 'Admin', message }]);
        setMessageInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(selectedChat.user, messageInput);
        }
    };

    const handleCloseTicket = (chatId) => {
        setChats(chats.filter(chat => chat.id !== chatId));
        if (selectedChat && selectedChat.id === chatId) {
            setSelectedChat(null);
            setMessages([]);
        }
    };

    return (
        <div className="admin_chat_container">
            <div className="sidebar">
                <h2>Users</h2>
                <ul>
                    {chats.map(chat => (
                        <li key={chat.id} onClick={() => handleChatSelect(chat)}>
                            {chat.user}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat_window">
                {selectedChat ? (
                    <>
                        <div className="chat_header">
                            <h2>{selectedChat.user}</h2>
                            <button onClick={() => handleCloseTicket(selectedChat.id)}>Close Ticket</button>
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
                            <button onClick={() => handleSendMessage(selectedChat.user, messageInput)}>Send</button>
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
