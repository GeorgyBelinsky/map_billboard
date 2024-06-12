import React, { useState, useEffect } from 'react';
import './index.css';

const UserChat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

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

    const handleSendMessage = (message) => {
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
