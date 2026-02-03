import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert('Registration successful, please login');
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 flex  justify-center px-2 py-2">
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 leading-tight animate-fadeIn flex justify-center">
          Registration Page <br />
          </h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Signup</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;