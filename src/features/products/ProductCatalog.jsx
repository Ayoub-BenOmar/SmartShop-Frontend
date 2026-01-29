// src/features/products/ProductCatalog.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, getAdminProducts, deleteProduct } from '../../api/productService';
import { logoutUser } from '../../store/authSlice';
import Modal from '../../components/common/Modal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => navigate('/login'));
    };

    useEffect(() => {
        loadProducts();
    }, [page]);

    const loadProducts = async () => {
        try {
            if (role === 'ADMIN') {
                const data = await getAdminProducts(page, 10);
                setProducts(data.content || []);
                setTotalPages(data.totalPages || 0);
            } else {
                const data = await getProducts();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to load products", error);
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete.id);
                loadProducts();
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            } catch (error) {
                console.error("Failed to delete product", error);
                alert("Failed to delete product.");
            }
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Hardware Catalog</h2>
                {role === 'ADMIN' && (
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="btn-primary-soft"
                    >
                        + Add Product
                    </button>
                )}
            </div>

            {/* Product Grid */}
            <div className={role === 'ADMIN' ? "dashboard-grid" : ""} style={
                role === 'CLIENT' ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                } : {}
            }>
                {products.map(product => (
                    <div key={product.id} className="card-soft" style={{
                        boxShadow: role === 'CLIENT' ? '0 4px 12px rgba(0,0,0,0.03)' : 'var(--shadow-soft)',
                        border: role === 'CLIENT' ? '1px solid #F3F0FF' : 'none'
                    }}>
                        <div className="card-icon-container" style={{ backgroundColor: '#F3F0FF', color: '#492991', alignSelf: 'center', marginBottom: '20px' }}>
                            📦
                        </div>
                        <h3 style={{ margin: '0 0 10px 0', color: '#2B125A', fontSize: '18px' }}>{product.name}</h3>
                        <p style={{ margin: '0 0 5px 0', color: '#A3AED0', fontSize: '14px' }}>Unit Price</p>
                        <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: '#492991' }}>{product.unitPrice} MAD</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <span className={`badge ${product.availableQuantity > 0 ? 'badge-success' : 'badge-danger'}`}>
                                {product.availableQuantity > 0 ? `${product.availableQuantity} in Stock` : 'Out of Stock'}
                            </span>
                        </div>

                        {role === 'CLIENT' && (
                            <button
                                disabled={product.availableQuantity <= 0}
                                className="btn-primary-soft"
                                style={{ width: '100%', opacity: product.availableQuantity <= 0 ? 0.5 : 1 }}
                            >
                                Add to Cart
                            </button>
                        )}

                        {role === 'ADMIN' && (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEditClick(product)} className="btn-secondary-soft" style={{ flex: 1, padding: '8px' }}>Edit</button>
                                <button onClick={() => handleDeleteClick(product)} style={{ flex: 1, padding: '8px', border: 'none', background: '#FFEBEE', color: '#D50000', borderRadius: '12px', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls for Admin */}
            {role === 'ADMIN' && totalPages > 1 && (
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)} className="btn-secondary-soft">Previous</button>
                    <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#2B125A' }}>Page {page + 1} of {totalPages}</span>
                    <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="btn-secondary-soft">Next</button>
                </div>
            )}

            {/* Add Product Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Product"
            >
                <AddProduct
                    onSuccess={() => {
                        setIsAddModalOpen(false);
                        loadProducts();
                    }}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Modal>

            {/* Edit Product Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Product"
            >
                {selectedProduct && (
                    <EditProduct
                        product={selectedProduct}
                        onSuccess={() => {
                            setIsEditModalOpen(false);
                            loadProducts();
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
                title="Delete Product"
                message={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default ProductCatalog;