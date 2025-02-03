const Hero = () => {
    return (
        <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-white to-indigo-50 opacity-90"
          style={{
            backgroundImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pnvtek5Km2IbmgQjHKX8DEedeEzVgD.png",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container text-center py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-gray-900">
            <h1 className="text-4xl text-center md:text-5xl lg:text-5xl  font-bold mb-6">
              New Approach to
              <br />
              Application Process
            </h1>
            <p className="text-lg text-center md:text-xl text-gray-600 opacity-90">
              Complete your rental application once and use it until you're home.
            </p>
          </div>
        </div>
      </section>
    );
}

export default Hero;