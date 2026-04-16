"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [step, setStep] = useState('login'); // 'login', 'forgot', 'otp'
  
  // States
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid password.');
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    const res = await fetch('/api/auth/otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    setLoading(false);
    
    if (res.ok) {
      setMessage(data.message);
      setStep('login');
    } else {
      setError(data.error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      body: JSON.stringify({ otp, newPassword }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    setLoading(false);
    
    if (res.ok) {
      setMessage('Password successfully reset! You can now log in.');
      setStep('login');
      setPassword('');
    } else {
      setError(data.error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '0.5rem' }}>CMS Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to manage your site</p>
        </div>
        
        {error && (
          <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}
        
        {message && (
          <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}
        
        {step === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input" 
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Login</button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => setStep('forgot')} style={{ background: 'none', border: 'none', color: 'var(--primary-light)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                Forgot Password?
              </button>
            </div>
          </form>
        )}

        {step === 'forgot' && (
          <form onSubmit={handleRequestOtp}>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              Enter the administration email address to receive a new system password.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input" 
                placeholder="kakya1123@gmail.com"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send New Password'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => setStep('login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
