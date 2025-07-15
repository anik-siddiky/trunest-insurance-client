import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import fullHappyFamily1 from '../../assets/full-happy-family.jpg';
import fullHappyFamily2 from '../../assets/full-happy-family2.jpg';
import fullHappyFamily3 from '../../assets/full-happy-family3.jpg';

const Hero = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    showArrows={false} // ✅ hides side buttons
                    interval={5000}
                    transitionTime={1000}
                    axis="horizontal"
                    swipeable={false}
                    emulateTouch={false}
                    stopOnHover={false}
                >
                    {[fullHappyFamily1, fullHappyFamily2, fullHappyFamily3].map((img, index) => (
                        <div key={index} className="relative h-[60vh] w-full">
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="h-[60vh] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                    Protect What Matters Most with Confidence
                </h1>
                <p className="px-8 mt-6 mb-10 text-lg text-white/90">
                    Comprehensive insurance solutions for families, individuals, and businesses.
                    Because peace of mind shouldn't be optional.
                </p>
                <div className="flex flex-wrap justify-center">
                    <button className="lg:px-8 px-4 lg:py-3 py-2 m-2 text-lg bg-primary text-white rounded transition transform active:scale-95 shadow-sm cursor-pointer">
                        Get a Free Quote
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
