import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import RINGS from 'vanta/dist/vanta.rings.min';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Login.css';

const supabase = createClient('https://appqqpxjhiehvcgtivvs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcHFxcHhqaGllaHZjZ3RpdnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5ODQ4MzYsImV4cCI6MjAzNTU2MDgzNn0._jdG1rPRq6J62pYxJX-XYGirQhOXUSVmLaNi7l8y9rQ');

const Login = () => {
    const vantaRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const vantaEffect = RINGS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            scale: 1.00,
            backgroundColor: 0x000000,
            scaleMobile: 1.00,
            THREE: THREE
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const handleLogin = async () => {
        const { data: user, error } = await supabase
            .from('user')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error || !user) {
            alert('Login failed: Invalid username or password');
        } else {
            navigate('/'); // Redirect to home page on successful login
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const { data, error } = await supabase
            .from('user')
            .insert([{ Name, username, password }]);

        if (error) {
            alert('Signup failed: ' + error.message);
        } else {
            navigate('/'); // Redirect to home page on successful signup
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <div ref={vantaRef} className="container">
                <input type="checkbox" id="signup_toggle" />
                <form className="form">
                    <div className="form_front">
                        <div className="form_details">Login</div>
                        <input
                            placeholder="Username"
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <span className="switch">
                            Don't have an account?
                            <label className="signup_tog" htmlFor="signup_toggle">
                                &nbsp;&nbsp; Sign Up
                            </label>
                        </span>
                    </div>
                    <div className="form_back">
                        <div className="form_details">Sign Up</div>
                        <input
                            placeholder="Name"
                            className="input"
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder="Username"
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            placeholder="Confirm Password"
                            className="input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="btn"
                            type="button"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                        <span className="switch">
                            Already have an account?
                            <label className="signup_tog" htmlFor="signup_toggle">
                                &nbsp;&nbsp; Sign In
                            </label>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;