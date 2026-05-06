function Contact() {
  return (
    <section className="min-h-screen px-16 pt-30 pb-12.5">
      <div className="max-w-275 ml-15 p-9 rounded-2xl bg-black/45 ">
        <div className="grid grid-cols-2 gap-12.5 items-center">
          <div>
            <h1 className="mb-6 text-6xl text-white font-bold uppercase">
              Contact Us
            </h1>
            <p className="text-lg text-white leading-[1.7] mb-9">
              Get in touch with us.
            </p>
          </div>

          <form className="p-6.25 rounded-xl bg-black/45">
            <label
              className="block mb-2 font-bold text-white"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full border rounded text-white text-xl mb-5 border-solid border-b-gray-300
               bg-white/10 p-3 outline-none placeholder:text-white/60 placeholder:text-xl"
              type="text"
              id="name"
              placeholder="Enter your name"
            />

            <label
              className="block mb-2 font-bold text-white"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border rounded text-white text-xl mb-5 border-solid border-b-gray-300
               bg-white/10 p-3 outline-none placeholder:text-white/60 placeholder:text-xl"
              type="email"
              id="email"
              placeholder="Enter your email"
            />

            <label
              className="block mb-2 font-bold text-white"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full border rounded text-white text-xl mb-5 border-solid border-b-gray-300
               bg-white/10 p-3 h-32 resize-none outline-none placeholder:text-white/60 placeholder:text-xl"
              id="message"
              placeholder="Enter your message"
            ></textarea>

            <button
              className="w-full text-white text-base cursor-pointer rounded font-bold p-3 border-none bg-teal-700 transition hover:bg-teal-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Contact;
