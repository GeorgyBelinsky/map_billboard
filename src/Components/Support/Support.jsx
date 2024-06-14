import { useState, useEffect } from 'react';
import AdminChat from './AdminChat/AdminChat';
import UserChat from './UserChat/UserChat';
import * as SignalR from '@microsoft/signalr';
import './index.css';

const Support = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const newConnection = new SignalR.HubConnectionBuilder()
            .withUrl("https://billboards-backend.azurewebsites.net/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', (user, message) => {
                        console.log('Received message:', user, message);
                        setMessages(messages => [...messages, { user, message }]);
                    });

                    connection.on('UpdateAdminGroups', (users) => {
                        console.log('Active users:', users);
                        setActiveUsers(users);
                    });

                    if (localStorage.getItem('isAdminSupport') === 'true') {
                        connection.invoke('GetActiveUsers')
                            .catch(e => console.log('Error getting active users:', e));
                    }
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <div className='chats_container'>
            {localStorage.getItem('isAdminSupport') === 'true' ?
                <AdminChat messages={messages} connection={connection} activeUsers={activeUsers} />
                :
                <UserChat messages={messages} connection={connection} />
            }
        </div>
    );
}

export default Support;
