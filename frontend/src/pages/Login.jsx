import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });

            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/customer-dashboard");
                }
            } else {
                alert(response.data.error);
            }

        } catch (error) {
            if(error.message) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6'>
            <h2 className='text-3xl text-white'>Inventory Management System</h2>
            <div className='border shadow-lg p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                {error && (
                    <div className='bg-red-200 text-red-700 p-2 mb-4 rounded'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" className='w-full px-3 py-2 border' name='email' required onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password</label>
                        <input type="password" className='w-full px-3 py-2 border' name='password' required onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-green-600 text-white py-2'>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;
