"use client"

// // pages/auth/signup.js


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import config from '@/utils/config';

export default function SignUp() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  const validateForm = () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${config.apiUrl}/api/auth/signup`, {
        email: form.email,
        password: form.password
      });

      const data = res.data;
      if (data.error) {
        setError(data.error || 'An error occurred during signup');
      } else {
        // Clear form after successful submission
        setForm({ email: '', password: '', confirmPassword: '' });
        router.push('/auth/signin');
      }
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className='flex flex-center wh_100'><Spinner /></div>;
  }

  return (
    <div className='flex flex-center full-h'>
      <div className="loginform">
        <div className="heading">Sign Up Create Admin</div>
        {loading ? <div className='flex flex-center w-100 flex-col'><Spinner /> Processing...</div> : (
          <form className="form" onSubmit={handleSubmit}>          
            <input 
              required
              type="email" 
              className="input" 
              name="email" 
              value={form.email}
              placeholder="Email" 
              onChange={handleChange} 
            />
            <input 
              required
              type="password" 
              className="input" 
              name="password" 
              value={form.password}
              placeholder="Password (min. 8 characters)" 
              onChange={handleChange} 
            />
            <input 
              required
              type="password" 
              className="input" 
              name="confirmPassword" 
              value={form.confirmPassword}
              placeholder="Confirm Password" 
              onChange={handleChange} 
            />
            <button className="login-button" type="submit">Sign Up</button>
            {error && <p className='redcolor'>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

// export default function singup(){
//   return <>

//     <h1>You Don't Have permision to Signup To this Admin Dashboard</h1>
  
//   </>
// }