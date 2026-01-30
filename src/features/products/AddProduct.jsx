import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../api/productService';

const AddProduct = ({ onSuccess, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        setSuccessMsg('');
        setErrorMsg('');
        try {
            await createProduct(data);
            setSuccessMsg('Product created successfully!');
            setTimeout(() => {
                onSuccess(); // Close or refresh parent after delay
            }, 1000);
        } catch (error) {
            console.error("Failed to create product", error);
            setErrorMsg("Failed to create product. Please try again.");
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

            <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="error-msg">{errors.name.message}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Unit Price</label>
                <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    {...register("unitPrice", { required: "Price is required", min: 0 })}
                />
                {errors.unitPrice && <span className="error-msg">{errors.unitPrice.message}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Available Quantity</label>
                <input
                    type="number"
                    className="form-input"
                    {...register("availableQuantity", { required: "Quantity is required", min: 1 })}
                />
                {errors.availableQuantity && <span className="error-msg">{errors.availableQuantity.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="submit" className="btn-primary-soft" style={{ flex: 1 }}>Create Product</button>
                <button type="button" onClick={onClose} className="btn-secondary-soft" style={{ flex: 1 }}>Cancel</button>
            </div>
        </form>
    );
};

export default AddProduct;
