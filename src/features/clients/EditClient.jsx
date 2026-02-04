import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateClient } from '../../api/clientService';

const EditClient = ({ user, onSuccess, onClose }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('username', user.username);
            setValue('email', user.email);
            // Password is not usually pre-filled for security. 
            // If the backend requires it, we might need a different approach, 
            // but for now assuming update doesn't require password unless changing it.
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        setSuccessMsg('');
        setErrorMsg('');
        try {
            // Only send fields that are present
            await updateClient(user.id, data);
            setSuccessMsg('Client updated successfully!');
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (error) {
            console.error("Failed to update client", error);
            setErrorMsg("Failed to update client. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {successMsg && (
                <div style={{ padding: '10px', backgroundColor: '#D1E7DD', color: '#0F5132', borderRadius: '8px', marginBottom: '15px' }}>
                    {successMsg}
                </div>
            )}
            {errorMsg && (
                <div style={{ padding: '10px', backgroundColor: '#F8D7DA', color: '#842029', borderRadius: '8px', marginBottom: '15px' }}>
                    {errorMsg}
                </div>
            )}

            {/* Name Field */}
            <div className="form-group">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="error-msg">{errors.name.message}</span>}
            </div>

            {/* Username Field */}
            <div className="form-group">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("username", { required: "Username is required" })}
                />
                {errors.username && <span className="error-msg">{errors.username.message}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-input"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                />
                {errors.email && <span className="error-msg">{errors.email.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="submit" className="btn-primary-soft" style={{ flex: 1 }}>Update Client</button>
                <button type="button" className="btn-secondary-soft" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            </div>
        </form>
    );
};

export default EditClient;
