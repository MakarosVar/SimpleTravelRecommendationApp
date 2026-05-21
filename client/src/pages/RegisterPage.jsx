import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/shared/ErrorMessage';
import { useToast } from '../context/ToastContext';

export default function RegisterPage() {
  const { register, isAuthenticated, authLoading } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { confirmPassword, ...fields } = form;
    if (fields.password !== confirmPassword) {
      setError({ message: 'Passwords do not match' });
      addToast('Passwords do not match', 'error');
      setIsLoading(false);
      return;
    }
    try {
      await register(fields);
      addToast(
        'Account created successfully. Please login.',
        'success',
      );
      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      setError({ message });
      addToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Create a new account
          </h2>
        </div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Username"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && <ErrorMessage message={error.message} />}
        <button
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-teal-600 p-3 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
