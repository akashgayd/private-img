import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../utils/auth';
import api from '../utils/api';
import AuthFormContainer from '../components/Auth/AuthFormContainer';
import AuthForm from '../components/Auth/AuthForm';
import FormInput from '../components/Auth/FormInput';
import AuthFooter from '../components/Auth/AuthFooter';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });

      if (!res.data.token) throw new Error('No token received');
      console.log('Login response:', res.data);

      handleLogin(res.data.token); // store token in cookie/localStorage
      navigate('/dashboard'); // go to dashboard
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Welcome Back" subtitle="Sign in to your account">
      <AuthForm
        onSubmit={handleSubmit}
        error={error}
        buttonText="Sign In"
        loading={loading}
      >
        <FormInput
          label="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          autoComplete="current-password"
        />
      </AuthForm>
      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        linkTo="/signup"
      />
    </AuthFormContainer>
  );
}
