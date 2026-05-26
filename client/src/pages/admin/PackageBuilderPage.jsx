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

const emptyForm = {
  title: '',
  description: '',
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
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!packageItem) return;
    setForm({
      title: packageItem.title || '',
      description: packageItem.description || '',
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
      <section className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-3xl font-bold text-white">
          {isEditMode ? 'Edit Package' : 'Create Package'}
        </h1>

        <p className="mt-1 text-white/80">
          {isEditMode
            ? 'Update package content shown to users.'
            : 'Add a new package to the TravelBloom catalog.'}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
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
          <button
            disabled={savePackageMutation.isPending}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {savePackageMutation.isPending
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Package'
                : 'Create Package'}
          </button>
        </form>
      </section>
    </PageContainer>
  );
}
