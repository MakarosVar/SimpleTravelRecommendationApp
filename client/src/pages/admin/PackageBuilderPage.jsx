import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import PageContainer from '../../components/layout/PageContainer';
import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import {
  createAdminPackage,
  getAdminPackage,
  updateAdminPackage,
} from '../../services/admin/adminPackageService';
import { useDestinations } from '../../hooks/useDestinations';

const emptyForm = {
  title: '',
  description: '',
  destinations: [],
};
export default function PackageBuilderPage() {
  const [form, setForm] = useState(emptyForm);
  const { packageId } = useParams();
  const isEditMode = Boolean(packageId);
  const {
    data: packageItem,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['adminPackage', packageId],
    queryFn: () => getAdminPackage(packageId),
    enabled: isEditMode,
  });
  const {
    destinations,
    isLoading: isDestinationsLoading,
    error: destinationsError,
  } = useDestinations();
  const selectedDestinationItems = destinations.filter(
    (destination) => form.destinations.includes(destination._id),
  );

  const availableDestinationItems = destinations.filter(
    (destination) => !form.destinations.includes(destination._id),
  );
  function handleAddDestination(destinationId) {
    setForm((current) => {
      if (current.destinations.includes(destinationId)) {
        return current;
      }

      return {
        ...current,
        destinations: [...current.destinations, destinationId],
      };
    });
  }

  function handleRemoveDestination(destinationId) {
    setForm((current) => ({
      ...current,
      destinations: current.destinations.filter(
        (id) => id !== destinationId,
      ),
    }));
  }
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!packageItem) return;
    setForm({
      title: packageItem.title || '',
      description: packageItem.description || '',
      destinations:
        packageItem.destinations?.map(
          (destination) => destination._id,
        ) ?? [],
    });
  }, [packageItem]);

  const savePackageMutation = useMutation({
    mutationFn: (payload) => {
      if (isEditMode) {
        return updateAdminPackage(packageId, payload);
      } else {
        return createAdminPackage(payload);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['adminPackages'],
      });

      if (isEditMode) {
        await queryClient.invalidateQueries({
          queryKey: ['adminPackage', packageId],
        });
      }
      addToast('Package saved successfully', 'success');
      navigate('/admin/packages');
    },
    onError: () => {
      addToast('Could not save package', 'error');
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
    await savePackageMutation.mutateAsync(form);
  }

  if (isEditMode && isPending) {
    return <p className="px-6 py-8 text-white">Loading package...</p>;
  }
  if (isEditMode && isError) {
    return (
      <p className="px-6 py-8 text-white">Could not load package.</p>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto max-w-5xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="sticky top-18 z-20 -mx-6 border-b bg-white/90 px-6 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditMode ? 'Edit package' : 'Create package'}
                </h1>
                <p className="text-sm text-gray-500">
                  Build a curated travel experience from existing
                  destinations.
                </p>
              </div>

              <button
                type="submit"
                disabled={savePackageMutation.isPending}
                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savePackageMutation.isPending
                  ? 'Saving...'
                  : isEditMode
                    ? 'Update package'
                    : 'Create package'}
              </button>
            </div>
          </div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
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
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-3 font-semibold">
                Available destinations
              </h2>

              {isDestinationsLoading && (
                <p>Loading destinations...</p>
              )}
              {destinationsError && (
                <p className="text-red-600">{destinationsError}</p>
              )}

              <div className="space-y-2">
                {availableDestinationItems.map((destination) => (
                  <div
                    key={destination._id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {destination.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {destination.country}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddDestination(destination._id)
                      }
                      className="rounded-lg border px-3 py-1 text-sm"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-semibold">
                Selected destinations
              </h2>

              <div className="space-y-2">
                {selectedDestinationItems.map((destination) => (
                  <div
                    key={destination._id}
                    className="flex items-center justify-between rounded-lg border bg-blue-50 p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {destination.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {destination.country}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveDestination(destination._id)
                      }
                      className="rounded-lg border px-3 py-1 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {selectedDestinationItems.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No destinations selected yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    </PageContainer>
  );
}
