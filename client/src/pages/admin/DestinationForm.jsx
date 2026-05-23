import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addDestination,
  getAdminDestination,
  updateDestination,
  uploadDestinationImage,
} from '../../services/adminService';
import { useToast } from '../../context/ToastContext';

import PageContainer from '../../components/layout/PageContainer';
import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { destinationId } = useParams();
  const isEditMode = Boolean(destinationId);
  const {
    data: destination,
    isPending: isLoading,
    isError: isDestinationError,
  } = useQuery({
    queryKey: ['adminDestination', destinationId],
    queryFn: () => getAdminDestination(destinationId),
    enabled: isEditMode,
  });

  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!destination) return;

    setForm({
      name: destination.name || '',
      country: destination.country || '',
      type: destination.type || '',
      description: destination.description || '',
      imageUrl: destination.imageUrl || '',
      tags: destination.tags?.join(', ') || '',
    });
  }, [destination]);

  const saveDestinationMutation = useMutation({
    mutationFn: (destination) => {
      if (isEditMode) {
        return updateDestination(destinationId, destination);
      }
      return addDestination(destination);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminDestinations'],
      });
      addToast('Destination saved successfully', 'success');
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      let finalImageUrl = form.imageUrl;

      if (selectedImage) {
        const uploadResult =
          await uploadDestinationImage(selectedImage);
        finalImageUrl = uploadResult.imageUrl;
      }
      const payload = {
        ...form,
        imageUrl: finalImageUrl,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await saveDestinationMutation.mutateAsync(payload);

      navigate('/admin/destinations');
    } catch {
      addToast('Could not save destination', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isEditMode && isLoading) {
    return (
      <p className="px-6 py-8 text-white">Loading destination...</p>
    );
  }
  if (isEditMode && isDestinationError) {
    return (
      <p className="px-6 py-8 text-white">
        Could not load destination.
      </p>
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
            type="file"
            className="w-full rounded-lg border border-slate-300 p-2 
            file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-white file:font-medium
          hover:file:bg-teal-700"
            accept="image/*"
            onChange={(e) =>
              setSelectedImage(e.target.files?.[0] || null)
            }
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
