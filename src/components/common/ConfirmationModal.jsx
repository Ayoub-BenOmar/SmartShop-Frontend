import React from 'react';
import Modal from './Modal';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div style={{ padding: '10px 0' }}>
                <p style={{ color: '#5C5C5C', fontSize: '16px', lineHeight: '1.5', margin: '0 0 25px 0' }}>
                    {message}
                </p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={onConfirm}
                        className="btn-primary-soft"
                        style={{
                            flex: 1,
                            backgroundColor: '#FFE5E5',
                            color: '#D32F2F',
                            border: '1px solid #FFCDCD'
                        }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="btn-secondary-soft"
                        style={{ flex: 1 }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
