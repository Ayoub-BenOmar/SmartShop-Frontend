import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("User already authenticated, redirecting...");
            if (role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/catalog');
            }
        }
    }, [isAuthenticated, role, navigate]);

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(result)) {
            const userRole = result.payload.role;

            if (userRole === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/catalog');
            }
        } else {
            console.error("Login failed", result);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                {/* Left Side - Login Form */}
                <div className="login-left" style={{ alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Please enter your details to sign in.</p>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '350px' }}>
                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your username"
                                {...register("username", { required: "Username is required" })}
                                style={{ height: '50px' }}
                            />
                            {errors.username && <span className="error-msg">{errors.username.message}</span>}
                        </div>

                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                style={{ height: '50px' }}
                            />
                            {errors.password && <span className="error-msg">{errors.password.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn-primary-soft"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '10px', height: '50px', fontSize: '16px' }}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        {error && (
                            <div style={{ marginTop: '20px', color: '#E14D2A', textAlign: 'center', backgroundColor: '#Fdeded', padding: '10px', borderRadius: '8px' }}>
                                {error}
                            </div>
                        )}
                    </form>

                    <div style={{ marginTop: 'auto', fontSize: '12px', color: '#A3AED0', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <span>© SmartShop</span>
                        <a href="#" style={{ color: '#A3AED0', textDecoration: 'none' }}>Terms of Use</a>
                        <a href="#" style={{ color: '#A3AED0', textDecoration: 'none' }}>Privacy Policy</a>
                    </div>
                </div>

                {/* Right Side - Brand & 3D Title */}
                <div className="login-right" style={{ justifyContent: 'space-between', padding: '100px 40px 60px 40px' }}>
                    <div style={{ zIndex: 1, marginTop: '40px', position: 'relative' }}>
                        <div className="login-right-decor"></div>
                        <h1 className="text-3d" style={{ marginBottom: '0', position: 'relative' }}>
                            SMART<br />SHOP
                        </h1>
                    </div>

                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        maxWidth: '90%',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        position: 'relative',
                        zIndex: 1,
                        marginBottom: '20px'
                    }}>
                        Experience the future of management with our intuitive dashboard.
                        Seamlessly manage your products, clients, and orders in one place.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;