import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePackageDetails } from '../../hooks/usePackageDetails.js';
import PageContainer from '../../components/layout/PageContainer.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTripFromPackage } from '../../services/user/tripService.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function PackageDetails() {
  const { isAuthenticated } = useAuth();
  const { packageId } = useParams();
  const { packageItem, isLoading, error } =
    usePackageDetails(packageId);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const createTripMutation = useMutation({
    mutationFn: (packageId) => createTripFromPackage(packageId),

    onSuccess: async (createdTrip) => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });

      addToast('Trip created successfully', 'success');

      navigate(`/trip/${createdTrip._id}`);
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ?? 'Could not create trip',
        'error',
      );
    },
  });
  function handleCreateTripFromPackage() {
    createTripMutation.mutate(packageId);
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white">Loading package...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-red-600">{error}</p>
        <Link
          to="/discover?tab=packages"
          className="mt-4 inline-flex text-teal-400 hover:underline"
        >
          Back to packages
        </Link>
      </section>
    );
  }

  if (!packageItem) {
    return null;
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/discover?tab=packages"
          className="mb-6 inline-flex text-sm font-medium text-teal-400  hover:underline"
        >
          ← Back to discover
        </Link>

        <div className="mb-8 rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className=" text-3xl font-bold text-slate-950">
            {packageItem.title}
          </h1>

          {packageItem.description && (
            <p className="mt-3 max-w-3xl text-slate-600">
              {packageItem.description}
            </p>
          )}
          {(packageItem.travelStyle || packageItem.duration) && (
            <p className="mb-2 text-sm font-semibold text-teal-600">
              {packageItem?.travelStyle} • {packageItem?.duration}
            </p>
          )}

          <p className="mt-4 text-sm text-slate-500">
            {packageItem.destinations?.length ?? 0} destinations
            included
          </p>

          <div>
            <button
              disabled={!isAuthenticated}
              onClick={handleCreateTripFromPackage}
              type="button"
              className={`mt-6 rounded-lg px-5 py-2 font-medium text-white 
              ${isAuthenticated ? 'hover:bg-teal-500 bg-teal-600' : 'bg-slate-500'}`}
            >
              Create custom trip from package
            </button>
            {!isAuthenticated && (
              <p className="ml-10 mb-6 inline-flex text-sm font-medium text-teal-400">
                Login to Create Trip form Package!
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white underline">
            Included destinations
          </h2>

          {packageItem.destinations?.length === 0 ? (
            <p className="text-slate-600">
              This package has no destinations.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packageItem.destinations.map((destination) => (
                <article
                  key={destination._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                >
                  {destination.imageUrl && (
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="h-44 w-full object-cover"
                    />
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-slate-950">
                      {destination.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {destination.country}
                    </p>

                    {destination.description && (
                      <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                        {destination.description}
                      </p>
                    )}

                    <Link
                      to={`/destinations/${destination._id}`}
                      className="mt-auto inline-flex self-start pt-4 text-sm font-medium text-blue-600 hover:underline"
                    >
                      View destination
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
