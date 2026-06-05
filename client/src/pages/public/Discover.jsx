import { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useDestinations } from '../../hooks/useDestinations';
import DestinationCard from '../../components/destination/DestinationCard';

export default function Discover() {
  const { destinations, isLoading, error, reloadDestinations } =
    useDestinations();
  const [activeTab, setActiveTab] = useState('destinations');
  return (
    <PageContainer>
      <section className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Curated Travel Packages
          </h1>
          <p className="mt-2 max-w-2xl text-white">
            Explore travel experienses
          </p>
          <div className="mt-5 flex gap-3">
            <button
              className={
                activeTab === 'destinations'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }
              onClick={() => setActiveTab('destinations')}
            >
              Destinations
            </button>

            <button
              className={
                activeTab === 'packages'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }
              onClick={() => setActiveTab('packages')}
            >
              Packages
            </button>
          </div>
          {activeTab === 'destinations' && (
            <div className="mt-10">
              {!isLoading && (
                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {destinations.map((place) => (
                    <DestinationCard key={place._id} place={place} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'packages' && (
            <div>Package results here</div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
