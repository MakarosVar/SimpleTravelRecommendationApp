export function AddToTravelPlanModal({
  isOpen,
  onClose,
  trips,
  isTripsLoading,
  isTripsError,
  selectedTripId,
  onSelectTrip,
  onSubmit,
  isPending,
  destinationId,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-950">
            Add to travel plan
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a travel plan where you want to add this
            destination. You can edit notes and priority afterward.
          </p>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            {isTripsLoading ? (
              <p className="text-sm text-slate-500">
                Loading travel plans...
              </p>
            ) : isTripsError ? (
              <p className="text-sm text-red-600">
                Could not load your travel plans
              </p>
            ) : trips.length === 0 ? (
              <p className="text-sm text-slate-600">
                You have not created any travel plans yet.
              </p>
            ) : (
              <div className="max-h-64 space-y-2 px-6 py-5 overflow-y-auto border border-slate-200 p-3">
                {trips.map((trip) => {
                  const alreadyInPlan = trip.items?.some((item) => {
                    const itemDestinationId =
                      item.destination?._id ?? item.destination;
                    return itemDestinationId === destinationId;
                  });
                  return (
                    <div
                      key={trip._id}
                      onClick={() => {
                        if (alreadyInPlan) return;
                        onSelectTrip(trip._id);
                      }}
                      className={`flex rounded-xl  border  justify-between ${
                        alreadyInPlan
                          ? 'opacity-50 cursor-not-allowed bg-slate-100'
                          : 'cursor-pointer hover:bg-slate-50'
                      }${selectedTripId === trip._id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white'} `}
                    >
                      <div className="flex w-full items-center justify-between px-5 py-3">
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900">
                            {trip.title}
                          </p>

                          <p className="text-sm text-slate-500">
                            Destinations: {trip.items?.length}
                          </p>
                        </div>
                        {alreadyInPlan && (
                          <span className="ml-auto text-xs text-slate-500">
                            Already in this plan
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                disabled={!selectedTripId || isPending}
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isPending
                  ? 'Adding to plan...'
                  : 'Add to selected plan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
