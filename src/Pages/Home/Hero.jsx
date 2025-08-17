import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import fullHappyFamily1 from '../../assets/full-happy-family.jpg';
import fullHappyFamily2 from '../../assets/full-happy-family2.jpg';
import fullHappyFamily3 from '../../assets/full-happy-family3.jpg';
import fullHappyFamily4 from '../../assets/full-happy-family4.jpg';
import fullHappyFamily5 from '../../assets/full-happy-family5.jpg';
import fullHappyFamily6 from '../../assets/full-happy-family6.jpg';
import fullHappyFamily7 from '../../assets/full-happy-family7.jpg';
import fullHappyFamily8 from '../../assets/full-happy-family8.jpg';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    showArrows={false}
                    interval={5000}
                    transitionTime={1000}
                    axis="horizontal"
                    swipeable={false}
                    emulateTouch={false}
                    stopOnHover={false}>
                    {[fullHappyFamily1, fullHappyFamily2, fullHappyFamily3, fullHappyFamily4, fullHappyFamily5, fullHappyFamily6, fullHappyFamily7, fullHappyFamily8].map((img, index) => (
                        <div key={index} className="relative h-[70vh] md:h-[80vh] w-full group overflow-hidden">
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="h-[70vh] md:h-[80vh] w-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-700/30 via-black/30 to-green-700/30 animate-gradient-x"></div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center md:px-10 lg:px-32 xl:max-w-3xl">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6">
                        Protect What Matters Most with Confidence.
                    </h1>
                    <p className="text-lg text-white/90 mb-8 max-w-lg">
                        Comprehensive insurance solutions for families, individuals, and businesses.
                        Because peace of mind shouldn't be optional.
                    </p>

                    <div className="flex flex-wrap justify-center">
                        <Link to="/all-policies">
                            <button className="animate-float hover:scale-105 lg:px-12 px-6 lg:py-3 py-2 m-2 text-lg bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] shadow-[#078338]/30 text-white transition duration-500 transform active:scale-95 rounded-xl font-medium cursor-pointer">
                                Get a Free Quote
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute top-10 left-10 w-20 h-20 bg-green-600/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-green-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow"></div>
        </section>
    );
};

export default Hero;
