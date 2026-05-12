import PageContainer from '../components/layout/PageContainer';

export default function About() {
  return (
    <PageContainer>
      <section className="min-h-screen">
        <div className="max-w-275 ml-15 p-9 rounded-2.5 bg-black/45">
          <h1 className="mb-6 text-6xl text-white font-bold uppercase">
            About Us
          </h1>
          <p className="text-lg text-white font-semibold leading-[1.7] mb-9">
            Welcome to TravelBloom! We are passionate about helping
            travelers discover unforgettable destinations around the
            world. Our mission is to provide reliable travel
            recommendations that inspire exploration, cultural
            discovery, and adventure.
          </p>
          <h1 className="text-6xl mb-6 text-white font-bold uppercase">
            Our Team
          </h1>
          <div className="flex gap-6 flex-wrap ">
            <div className="min-w-64 bg-black/55 flex-1 p-6 rounded-xl">
              <h3 className="text-2xl text-white font-bold mb-3">
                John Doe
              </h3>
              <p className="text-white mb-9 text-lg">
                John leads our company strategy and travel
                partnerships.
              </p>
              <span className="inline-block text-white  font-bold px-5 py-2 rounded-xs bg-blue-800">
                CEO
              </span>
            </div>
            <div className="min-w-64 bg-black/55 flex-1 p-6 rounded-xl">
              <h3 className="text-2xl text-white font-bold mb-3">
                Celina Thomas
              </h3>
              <p className="text-white mb-9 text-lg">
                Celina manages travel research and customer
                experience.
              </p>
              <span className="inline-block text-white font-bold px-5 py-2 rounded-xs bg-blue-800">
                Team Lead
              </span>
            </div>
            <div className="min-w-64 bg-black/55 flex-1 p-6 rounded-xl">
              <h3 className="text-2xl text-white font-bold mb-3">
                Mike Tyson
              </h3>
              <p className="text-white mb-9 text-lg">
                Mike handles destination curation and recommendation
                quality.
              </p>
              <span className="inline-block text-white font-bold px-5 py-2 rounded-xs bg-blue-800">
                Delivery Head
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
