import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import Modal from '../../components/common/Modal';
import AddProduct from '../products/AddProduct';
import AddClient from '../clients/AddClient';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => navigate('/login'));
    };
    // In a real app, you'd fetch these counts from a summary API endpoint
    const stats = [
        { label: 'Total Users', count: 150, icon: '👥', link: '/admin/users' },
        { label: 'Active Products', count: 45, icon: '📦', link: '/admin/products' },
        { label: 'Pending Orders', count: 12, icon: '🛒', link: '/admin/orders' },
        { label: 'Total Earnings', count: '$240.50', icon: '💰', link: '/admin/orders' },
    ];

    return (
        <div>
            {/* Stats Grid */}
            <div className="dashboard-grid">
                {stats.map(stat => (
                    <div key={stat.label} className="card-soft">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div className="card-icon-container" style={{ backgroundColor: '#F3F0FF', color: '#492991' }}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-value">{stat.count}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Charts Placeholder */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="card-soft">
                    <h3 style={{ marginTop: 0, color: '#2B3674' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => setIsAddProductModalOpen(true)} className="btn-primary-soft">
                            + New Product
                        </button>
                        <button onClick={() => setIsAddClientModalOpen(true)} className="btn-secondary-soft">
                            + Add Client
                        </button>
                    </div>
                </div>

                <div className="card-soft">
                    <h3 style={{ marginTop: 0, color: '#2B3674' }}>Recent Activity</h3>
                    <p style={{ color: '#A3AED0' }}>No recent activity to show.</p>
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                title="Add New Product"
            >
                <AddProduct
                    onSuccess={() => setIsAddProductModalOpen(false)}
                    onClose={() => setIsAddProductModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isAddClientModalOpen}
                onClose={() => setIsAddClientModalOpen(false)}
                title="Add New Client"
            >
                <AddClient
                    onSuccess={() => setIsAddClientModalOpen(false)}
                    onClose={() => setIsAddClientModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default AdminDashboard;