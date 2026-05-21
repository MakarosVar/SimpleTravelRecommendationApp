import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/shared/ErrorMessage';

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const { confirmPassword, ...fields } = form;
    if (fields.password != confirmPassword) {
      setError({ message: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }
    try {
      await register(fields);
      navigate('/login');
    } catch (error) {
      setError({
        message:
          error.response?.data?.message || 'Registration failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow w-80"
      >
        <h2 className="text-xl mb-4">Register</h2>

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Username"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="w-full mb-2 p-2 border"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && <ErrorMessage message={error.message} />}
        <button
          disabled={isLoading}
          className="w-full bg-teal-500 text-white p-2 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
