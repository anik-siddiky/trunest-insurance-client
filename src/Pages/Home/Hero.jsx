import fullHappyFamily from '../../assets/full-happy-family.jpg';

const Hero = () => {
    return (
        <section
            className="relative h-[60vh] flex items-center justify-center text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${fullHappyFamily})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container mx-auto flex flex-col items-center justify-center px-4 text-center md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                    Protect What Matters Most with Confidence
                </h1>
                <p className="px-8 mt-6 mb-10 text-lg text-white/90">
                    Comprehensive insurance solutions for families, individuals, and businesses. Because peace of mind shouldn't be optional.
                </p>
                <div className="flex flex-wrap justify-center">
                    <button className="lg:px-8 px-4 lg:py-3 py-2 m-2 text-lg bg-primary text-white rounded transition transform active:scale-95 shadow-sm cursor-pointer">
                        Get Started
                    </button>
                    <button className="lg:px-8 px-4 lg:py-3 py-2 m-2 text-lg border text-white border-white rounded transition transform active:scale-95 shadow-sm cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
