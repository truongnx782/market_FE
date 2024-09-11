import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    // Giá trị cố định cho sender và receiver
    const senderId = "20"; // Gán cứng giá trị sender là 20
    const receiverId = "21"; // Gán cứng giá trị receiver là 21

    // Lấy tin nhắn giữa sender và receiver
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8888/market_trade/message/${senderId}/${receiverId}`);
                if (!response.ok) throw new Error("Không thể tải tin nhắn.");
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchMessages();
    }, [senderId, receiverId]);

    // Gửi tin nhắn
    const sendMessage = async () => {
        if (content.trim() === "") return; // Không gửi tin nhắn rỗng

        try {
            const response = await fetch('http://localhost:8888/market_trade/message/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: senderId,
                    receiverId: receiverId,
                    content: content
                })
            });

            if (!response.ok) throw new Error("Không thể gửi tin nhắn.");

            const newMessage = await response.json();
            setMessages([...messages, newMessage]);
            setContent(""); // Xóa nội dung sau khi gửi
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.senderId == senderId ? 'flex-start' : 'flex-end', // Căn trái/phải dựa trên senderId
                            marginBottom: '10px'
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.senderId == senderId ? '#d1f7c4' : '#f1f0f0', // Màu khác nhau cho mỗi bên
                                padding: '10px',
                                borderRadius: '10px',
                                maxWidth: '60%',
                                wordWrap: 'break-word'
                            }}
                        >
                            <strong>{msg.senderId}</strong>: {msg.content} 
                            <div style={{ fontSize: '0.8em', textAlign: 'right', marginTop: '5px' }}>
                                {new Date(msg.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd', backgroundColor: '#fff' }}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập tin nhắn"
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <button
                    onClick={sendMessage}
                    style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default Chat;
