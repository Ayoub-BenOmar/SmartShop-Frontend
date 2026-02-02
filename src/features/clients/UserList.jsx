import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../../api/clientService';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import AddClient from './AddClient';
import EditClient from './EditClient';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const loadClients = () => {
        getClients()
            .then(data => setUsers(data))
            .catch(err => setError("You do not have permission or the server is down."));
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            try {
                await deleteClient(userToDelete.id);
                setUsers(users.filter(u => u.id !== userToDelete.id));
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
            } catch (error) {
                console.error("Failed to delete client", error);
                alert("Failed to delete client. " + error.message);
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    // Helper for Loyalty Styling
    const getLoyaltyStyle = (level) => {
        const styles = {
            PLATINUM: { color: '#e5e4e2', fontWeight: 'bold' },
            GOLD: { color: '#ffd700', fontWeight: 'bold' },
            SILVER: { color: '#c0c0c0', fontWeight: 'bold' },
            BASIC: { color: '#cd7f32', fontWeight: 'bold' }
        };
        return styles[level] || {};
    };

    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">User Management</h2>
                <button className="btn-primary-soft" onClick={() => setIsAddModalOpen(true)}>
                    + Add Client
                </button>
            </div>

            <div className="table-container">
                <table className="table-soft">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Loyalty Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>#{user.id}</td>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{user.name}</div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-purple' : 'badge-info'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span style={getLoyaltyStyle(user.loyaltyLevel)}>
                                        {user.loyaltyLevel || 'N/A'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                border: 'none',
                                                background: '#F3F0FF',
                                                color: '#492991',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.2s'
                                            }}
                                            title="Edit Client"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                border: 'none',
                                                background: '#FFF5F5',
                                                color: '#E14D2A',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.2s'
                                            }}
                                            title="Delete Client"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Client Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Client"
            >
                <AddClient
                    onSuccess={() => {
                        setIsAddModalOpen(false);
                        loadClients();
                    }}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Modal>

            {/* Edit Client Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Client"
            >
                {selectedUser && (
                    <EditClient
                        user={selectedUser}
                        onSuccess={() => {
                            setIsEditModalOpen(false);
                            loadClients();
                        }}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Client"
                message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default UserList;