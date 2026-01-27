import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';

const ClientLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => navigate('/login'));
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FDF2F8' }}>
            {/* Navbar */}
            <nav style={{
                height: '80px',
                backgroundColor: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 40px',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #FF4B91 0%, #492991 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>
                        S
                    </div>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        background: 'linear-gradient(90deg, #2B125A 0%, #492991 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        SmartShop
                    </span>
                </div>

                {/* Shared Gradient Definition */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="logoutIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e11d48" />
                            <stop offset="100%" stopColor="#be123c" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Right Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <NavLink
                        to="/catalog"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: isActive ? '#492991' : '#A3AED0',
                            fontWeight: isActive ? '700' : '500',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            backgroundColor: isActive ? '#F3F0FF' : 'transparent',
                            transition: 'all 0.3s'
                        })}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/profile"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: isActive ? '#492991' : '#A3AED0',
                            fontWeight: isActive ? '700' : '500',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            backgroundColor: isActive ? '#F3F0FF' : 'transparent',
                            transition: 'all 0.3s'
                        })}
                    >
                        Profile
                    </NavLink>

                    <div style={{ height: '30px', width: '1px', backgroundColor: '#E0E7FF', margin: '0 10px' }}></div>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#e11d48',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px',
                            borderRadius: '12px',
                            transition: 'background 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF1F2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="url(#logoutIconGradient)" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                        Logout
                    </button>

                    <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(73, 41, 145, 0.2)',
                        border: '2px solid white'
                    }}>
                        <img
                            src="/man-with-t-shirt.png"
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default ClientLayout;
