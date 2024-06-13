import { useState, useEffect } from 'react';
import AdminChat from './AdminChat/AdminChat';
import UserChat from './UserChat/UserChat';
import * as SignalR from '@microsoft/signalr';

import './index.css';
const signalRService = {
    connection: null,
    startConnection: (hubUrl) => {
        signalRService.connection = new HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();

        signalRService.connection.start().then(() => {
            console.log('SignalR connection established.');
        }).catch((err) => {
            console.error('Error starting SignalR connection:', err);
        });
    },

    onReceiveMessage: (callback) => {
        signalRService.connection.on('ReceiveMessage', (user, message) => {
            callback(user, message);
        });
    },

    sendMessage: (user, message) => {
        signalRService.connection.invoke('SendMessage', user, message)
            .catch((err) => {
                console.error('Error sending message:', err);
            });
    },
};

const Support = () => {
/*     const [message, setMessage] = useState('');
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://billboards-backend.azurewebsites.net/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', (user, message) => {
                        const newMessage = `${user}: ${message}`;
                        setMessages(messages => [...messages, newMessage]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]); */


    return (
        <div className='chats_container'>
            {localStorage.getItem('isAdminSupport') === 'true' ?
                <AdminChat />
                :
                <UserChat />
            }
        </div>
    );
}

export default Support;
