import PageContainer from '../../components/layout/PageContainer';

export default function Contact() {
  return (
    <PageContainer className="min-h-[calc(100vh-70px)] py-24">
      <section className="flex items-center justify-center">
        <div className=" flex w-full max-w-7xl flex-col gap-10 rounded-3xl bg-black/25 p-8 md:flex-row md:items-center md:justify-between md:p-12 ">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h1 className="mb-6 text-5xl font-black text-white uppercase md:text-7xl">
              Contact Us
            </h1>
            <p className="text-lg text-white">
              Get in touch with us.
            </p>
          </div>

          <div className="w-full max-w-md rounded-2xl bg-black/35 p-8 backdrop-blur-sm mx-auto md:mx-0">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="font-bold text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="rounded border border-white/70 bg-transparent px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-teal-400"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-bold text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="rounded border border-white/70 bg-transparent px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-teal-400"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className=" font-bold text-white"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  rows="5"
                  className="rounded border border-white/70 bg-transparent px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-teal-400"
                  id="message"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button
                className="rounded bg-teal-700 px-6 py-3 font-bold text-white transition hover:bg-teal-600"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
