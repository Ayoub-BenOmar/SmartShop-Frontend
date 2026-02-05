import React, { useEffect, useState } from 'react';
import { getMyProfile, getMyOrders, getMyStats } from '../../api/clientService';

const ClientProfile = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, statsRes, ordersRes] = await Promise.all([
                    getMyProfile(),
                    getMyStats(),
                    getMyOrders()
                ]);

                setUser(profileRes);

                // Format stats for display
                setStats([
                    { label: "Total Orders", value: statsRes.totalOrders || 0, icon: "📦", color: "#492991", bg: "#F3F0FF" },
                    { label: "Total Spent", value: `${statsRes.totalSpent || 0} MAD`, icon: "💳", color: "#FF4B91", bg: "#FFF0F5" },
                ]);

                setOrders(ordersRes || []);
            } catch (error) {
                console.error("Failed to load profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'DELIVERED': return { color: '#0F5132', bg: '#D1E7DD' };
            case 'PROCESSING': return { color: '#856404', bg: '#FFF3CD' };
            case 'SHIPPED': return { color: '#084298', bg: '#CFE2FF' };
            case 'CANCELLED': return { color: '#842029', bg: '#F8D7DA' };
            default: return { color: '#666', bg: '#EEE' };
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: '#492991' }}>Loading profile...</div>;
    }

    if (!user) return null;

    return (
        <div>
            {/* Top Section: Profile & Stats Split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginBottom: '30px' }}>

                {/* Left: Profile Card */}
                <div className="card-soft" style={{ textAlign: 'center', padding: '30px' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 20px auto',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}>
                        <img
                            src="/man-with-t-shirt.png"
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <h2 style={{ margin: '0 0 5px 0', color: '#2B125A', fontSize: '22px' }}>{user.name}</h2>
                    <p style={{ margin: '0 0 15px 0', color: '#A3AED0', fontSize: '14px' }}>{user.email}</p>
                    <span className="badge badge-purple" style={{ display: 'block', padding: '4px 10px', fontSize: '11px', width: 'fit-content', margin: '0 auto' }}>{user.loyaltyLevel || 'BASIC'} MEMBER</span>
                </div>

                {/* Right: Stats */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    {stats.map((stat, index) => (
                        <div key={index} className="card-soft" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '30px', flex: 1, textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '15px',
                                backgroundColor: stat.bg,
                                color: stat.color,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '28px'
                            }}>
                                {stat.icon}
                            </div>
                            <div>
                                <p style={{ margin: '0 0 5px 0', color: '#A3AED0', fontSize: '14px' }}>{stat.label}</p>
                                <h3 style={{ margin: 0, color: '#2B125A', fontSize: '28px' }}>{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom: Orders Table */}
            <div className="card-soft">
                <h3 style={{ margin: '0 0 20px 0', color: '#2B125A' }}>Recent Orders</h3>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#A3AED0' }}>
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛍️</div>
                        <p style={{ fontSize: '16px' }}>No orders yet.</p>
                        <p style={{ fontSize: '14px' }}>Start shopping to see your history here!</p>
                    </div>
                ) : (
                    <table className="table-soft">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                const statusStyle = getStatusStyle(order.status);
                                return (
                                    <tr key={order.id}>
                                        <td style={{ fontWeight: 'bold', color: '#492991' }}>#{order.id}</td>
                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td style={{ fontWeight: 'bold' }}>{order.totalAmount} MAD</td>
                                        <td>
                                            <span style={{
                                                padding: '5px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.color
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ClientProfile;
