import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDestination } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';

const initialForm = {
  name: '',
  country: '',
  type: '',
  description: '',
  imageUrl: '',
  tags: '',
};

export default function CreateDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      await addDestination(payload);
      addToast('Destination created successfully', 'success');
      navigate('/admin/destinations');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Could not create destination';

      addToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Create Destination
          </h2>
          <p className="mt-1 text-slate-500">
            Add a new destination to the public TravelBloom catalog.
          </p>
        </div>
        {Object.keys(form).map((field) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
            </label>

            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder={`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mt-2 flex justify-center items-center">
          <button
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create Destination'}
          </button>
        </div>
      </form>
    </div>
  );
}
