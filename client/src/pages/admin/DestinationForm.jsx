import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addDestination,
  getAdminDestination,
  updateDestination,
} from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useEffect } from 'react';
import PageContainer from '../../components/layout/PageContainer';

const emptyForm = {
  name: '',
  country: '',
  type: '',
  description: '',
  imageUrl: '',
  tags: '',
};
export default function DestinationForm() {
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { destinationId } = useParams();
  const isEditMode = Boolean(destinationId);

  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isEditMode) return;

    async function loadDestination() {
      try {
        setIsLoading(true);

        const destination = await getAdminDestination(destinationId);

        setForm({
          name: destination.name || '',
          country: destination.country || '',
          type: destination.type || '',
          description: destination.description || '',
          imageUrl: destination.imageUrl || '',
          tags: destination.tags?.join(', ') || '',
        });
      } catch {
        addToast('Could not load destination', 'error');
      } finally {
        setIsLoading(false);
      }
    }

    loadDestination();
  }, [destinationId, isEditMode, addToast]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      setIsSubmitting(true);

      if (isEditMode) {
        await updateDestination(destinationId, payload);
        addToast('Destination updated successfully', 'success');
      } else {
        await addDestination(payload);
        addToast('Destination created successfully', 'success');
      }

      navigate('/admin/destinations');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (isEditMode
          ? 'Could not update destination'
          : 'Could not create destination');

      addToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <p className="px-6 py-8 text-white">Loading destination...</p>
    );
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-3xl font-bold text-white">
          {isEditMode ? 'Edit Destination' : 'Create Destination'}
        </h1>

        <p className="mt-1 text-white/80">
          {isEditMode
            ? 'Update destination content shown to users.'
            : 'Add a new destination to the TravelBloom catalog.'}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full rounded-lg border px-4 py-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags comma separated"
            className="w-full rounded-lg border px-4 py-2"
          />

          <button
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Destination'
                : 'Create Destination'}
          </button>
        </form>
      </section>
    </PageContainer>
  );
}
