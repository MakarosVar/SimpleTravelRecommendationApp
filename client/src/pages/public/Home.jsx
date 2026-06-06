import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-screen px-16 pt-30">
      <div className="ml-15 max-w-130">
        <h1 className="mb-6 text-5xl md:text-[72px] leading-[1.05] font-black text-white uppercase">
          Explore Dream Destinations!
        </h1>

        <p className="mb-6 rounded-md bg-black/25 p-4 text-lg leading-[1.8] text-white">
          TravelBloom encourages exploration of unfamiliar
          territories, embracing diverse cultures and landscapes,
          while pursuing the desired destination that captivates the
          heart and ignites a sense of wonder.
        </p>
        <div className="mt-8 mb-10 flex justify-center">
          <Link to="/discover" className="mt-auto w-fit">
            <button className="w-full rounded-full bg-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-teal-500">
              Start Discovering!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
