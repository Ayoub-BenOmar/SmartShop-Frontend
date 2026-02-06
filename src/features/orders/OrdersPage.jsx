import React from 'react';

const OrdersPage = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
            {/* Animated Icon Container */}
            <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #F3F0FF 0%, #FDF2F8 100%)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '30px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px dashed #492991',
                    opacity: '0.2',
                    animation: 'spin 10s linear infinite'
                }}></div>
                <span style={{ fontSize: '50px' }}>📦</span>
            </div>

            <h1 style={{
                color: '#2B125A',
                fontSize: '36px',
                margin: '0 0 15px 0',
                fontWeight: 'bold'
            }}>
                Coming Soon...
            </h1>

            <p style={{
                color: '#A3AED0',
                fontSize: '18px',
                maxWidth: '500px',
                lineHeight: '1.6'
            }}>
                We are currently building a powerful Order Management System for you.
                Stay tuned for updates!
            </p>

            <div style={{ marginTop: '40px' }}>
                <span style={{
                    padding: '10px 20px',
                    background: '#F3F0FF',
                    color: '#492991',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                }}>
                    Work in Progress
                </span>
            </div>

            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default OrdersPage;
