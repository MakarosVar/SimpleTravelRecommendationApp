import { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useDestinations } from '../../hooks/useDestinations';
import DestinationCard from '../../components/cards/DestinationCard';
import PackageCard from '../../components/cards/PackageCard';
import { usePackages } from '../../hooks/usePackages';
import useAddToTravelPlan from '../../hooks/useAddToTravelPlan';
import { AddToTravelPlanModal } from '../../components/trips/AddToTravelPlanModal';
import { useSearchParams } from 'react-router-dom';

export default function Discover() {
  const addToPlan = useAddToTravelPlan();
  const [destinationQuery, setDestinationQuery] = useState({
    search: '',
    type: 'all',
    sort: 'default',
    page: 1,
    limit: 9,
  });
  const [packageQuery, setPackageQuery] = useState({
    search: '',
    travelStyle: 'all',
    duration: 'all',
    sort: 'default',
    page: 1,
    limit: 9,
  });
  const { destinations, pagination, filters, isLoading, error } =
    useDestinations(destinationQuery);
  const {
    packages,
    packagePagination,
    packageFilters,
    isPackagesLoading,
    packagesError,
  } = usePackages(packageQuery);
  const tabBase =
    'rounded-t-2xl border px-6 py-3 text-sm font-semibold transition';

  const activeTabClass =
    'bg-black/30 text-white border-white/20 border-b-transparent';

  const inactiveTabClass =
    'bg-white/10 text-white/70 border-white/10 hover:bg-white/20';
  function goToDestinationPage(nextPage) {
    setDestinationQuery((current) => ({
      ...current,
      page: nextPage,
    }));
  }
  function goToPackagePage(nextPage) {
    setPackageQuery((current) => ({
      ...current,
      page: nextPage,
    }));
  }
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab =
    searchParams.get('tab') === 'packages'
      ? 'packages'
      : 'destinations';

  function handleTabChange(tab) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('tab', tab);
      return nextParams;
    });
  }
  return (
    <PageContainer className="max-w-screen-2xl">
      <section className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Discover Travel Experiences
          </h1>
          <p className="mt-2 max-w-2xl text-white">
            Explore destinations and curated packages, then turn them
            into personal travel plans.
          </p>
          <div className="mt-8">
            <div className="flex items-end gap-1">
              <button
                className={`${tabBase} ${
                  activeTab === 'destinations'
                    ? activeTabClass
                    : inactiveTabClass
                }`}
                onClick={() => handleTabChange('destinations')}
              >
                Destinations
              </button>

              <button
                className={`${tabBase} ${
                  activeTab === 'packages'
                    ? activeTabClass
                    : inactiveTabClass
                }`}
                onClick={() => handleTabChange('packages')}
              >
                Packages
              </button>
            </div>
            <div className="rounded-b-3xl rounded-tr-3xl bg-black/30 p-6">
              {activeTab === 'destinations' && (
                <div className="min-h-130">
                  <div className="mb-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <input
                        type="text"
                        value={destinationQuery.search}
                        onChange={(event) =>
                          setDestinationQuery((current) => ({
                            ...current,
                            search: event.target.value,
                            page: 1,
                          }))
                        }
                        placeholder="Search destinations by name, country, type, or tag..."
                        className="w-full rounded-full bg-white px-4 py-2 text-sm text-slate-900 outline-none lg:max-w-md"
                      />

                      <select
                        value={destinationQuery.sort}
                        onChange={(event) =>
                          setDestinationQuery((current) => ({
                            ...current,
                            sort: event.target.value,
                            page: 1,
                          }))
                        }
                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 outline-none"
                      >
                        <option value="default">Default</option>
                        <option value="newest">Newest</option>
                        <option value="name">Name</option>
                        <option value="country">Country</option>
                      </select>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {['all', ...filters.types].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setDestinationQuery((current) => ({
                              ...current,
                              type,
                              page: 1,
                            }))
                          }
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            destinationQuery.type === type
                              ? 'bg-teal-500 text-white'
                              : 'bg-white/15 text-white hover:bg-white/25'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  {isLoading && (
                    <p className="text-white">
                      Loading destinations...
                    </p>
                  )}
                  {error && <p className="text-red-600">{error}</p>}
                  {destinations.length === 0 ? (
                    <div className="rounded-2xl bg-white/90 p-8 shadow-sm">
                      <h2 className="text-xl font-semibold text-slate-900">
                        No destinations found.
                      </h2>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {destinations.map((place) => (
                        <DestinationCard
                          key={place._id}
                          place={place}
                          onAddToPlan={addToPlan.openAddToPlan}
                        />
                      ))}
                    </div>
                  )}
                  {pagination.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <button
                        type="button"
                        disabled={pagination.page <= 1}
                        onClick={() =>
                          goToDestinationPage(pagination.page - 1)
                        }
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <span className="text-sm font-medium text-white">
                        Page {pagination.page} of{' '}
                        {pagination.totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={
                          pagination.page >= pagination.totalPages
                        }
                        onClick={() =>
                          goToDestinationPage(pagination.page + 1)
                        }
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'packages' && (
                <div className="min-h-130">
                  <div className="mb-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <input
                        type="text"
                        value={packageQuery.search}
                        onChange={(event) =>
                          setPackageQuery((current) => ({
                            ...current,
                            search: event.target.value,
                            page: 1,
                          }))
                        }
                        placeholder="Search packages by title or travel style..."
                        className="w-full rounded-full bg-white px-4 py-2 text-sm text-slate-900 outline-none lg:max-w-md"
                      />

                      <select
                        value={packageQuery.sort}
                        onChange={(event) =>
                          setPackageQuery((current) => ({
                            ...current,
                            sort: event.target.value,
                            page: 1,
                          }))
                        }
                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 outline-none"
                      >
                        <option value="default">Default</option>
                        <option value="newest">Newest</option>
                        <option value="title">Title</option>
                        <option value="travelStyle">
                          Travel Style
                        </option>
                      </select>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {['all', ...packageFilters.travelStyles].map(
                        (travelStyle) => (
                          <button
                            key={travelStyle}
                            type="button"
                            onClick={() =>
                              setPackageQuery((current) => ({
                                ...current,
                                travelStyle,
                                page: 1,
                              }))
                            }
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                              packageQuery.travelStyle === travelStyle
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/15 text-white hover:bg-white/25'
                            }`}
                          >
                            {travelStyle}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  {isPackagesLoading && (
                    <p className="text-white">Loading packages...</p>
                  )}
                  {packagesError && (
                    <p className="text-red-600">{packagesError}</p>
                  )}
                  {packages.length === 0 ? (
                    <div className="rounded-2xl bg-white/90 p-8 shadow-sm">
                      <h2 className="text-xl font-semibold text-slate-900">
                        No packages available yet.
                      </h2>
                      <p className="mt-2 text-slate-600">
                        Published travel packages will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {packages.map((packageItem) => (
                        <PackageCard
                          key={packageItem._id}
                          packageItem={packageItem}
                        />
                      ))}
                    </div>
                  )}{' '}
                  {packagePagination.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <button
                        type="button"
                        disabled={packagePagination.page <= 1}
                        onClick={() =>
                          goToPackagePage(packagePagination.page - 1)
                        }
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <span className="text-sm font-medium text-white">
                        Page {packagePagination.page} of{' '}
                        {packagePagination.totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={
                          packagePagination.page >=
                          packagePagination.totalPages
                        }
                        onClick={() =>
                          goToPackagePage(packagePagination.page + 1)
                        }
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <AddToTravelPlanModal {...addToPlan.modalProps} />
    </PageContainer>
  );
}
