import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/shared/ErrorMessage';
import { useToast } from '../../context/ToastContext';
import { useFavorites } from '../../hooks/useFavorites';

export default function LoginPage() {
  const { login, isAuthenticated, authLoading } = useAuth();

  const { reloadFavorites } = useFavorites();
  const [form, setForm] = useState({ email: '', password: '' });
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
    try {
      await login(form);
      addToast('Login successful', 'success');
      await reloadFavorites();

      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError({ message });
      addToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Login to manage your trips and favorites.
          </p>
        </div>
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
        {error && <ErrorMessage message={error.message} />}
        <button
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-teal-600 p-3 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don&apos;t have an account?
          <Link to="/register" className="font-medium text-teal-600">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
