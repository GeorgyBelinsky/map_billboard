import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import './index.css';
import AdminChat from './AdminChat/AdminChat';
import UserChat from './UserChat/UserChat';
const Support = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://billboardsignalrservice.service.signalr.net")
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
    }, [connection]);

    return (
        <div className='chats_container'>
            {localStorage.getItem('isAdminSupport')===true ?
                <AdminChat/>
                :
                <UserChat/>
            }
        </div>
    )
}

export default Support;