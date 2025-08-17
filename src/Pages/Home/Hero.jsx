/* eslint-disable no-unused-vars */
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
import { motion } from 'framer-motion';

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
                    showArrows={false}
                    interval={5000}
                    transitionTime={1000}
                    axis="horizontal"
                    swipeable={false}
                    emulateTouch={false}
                    stopOnHover={false}>
                    {[fullHappyFamily1, fullHappyFamily2, fullHappyFamily3, fullHappyFamily4, fullHappyFamily5, fullHappyFamily6, fullHappyFamily7, fullHappyFamily8].map((img, index) => (
                        <div key={index} className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
                            <motion.img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="h-[70vh] md:h-[80vh] w-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8 }}
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-700/30 via-black/30 to-green-700/30"></div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <motion.div
                className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center md:px-10 lg:px-32 xl:max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <motion.div className="flex flex-col items-center" initial="hidden" animate="visible" variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } }
                }}>
                    <motion.h1
                        className="text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}>
                        Protect What Matters Most with Confidence.
                    </motion.h1>
                    <motion.p
                        className="text-lg text-white/90 mb-8 max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}>
                        Comprehensive insurance solutions for families, individuals, and businesses.
                        Because peace of mind shouldn't be optional.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}>

                        <Link to="/all-policies">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(7,131,56,0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="lg:px-12 px-6 lg:py-3 py-2 m-2 text-lg bg-gradient-to-r from-[#078338]/80 to-black/80 text-white rounded-xl font-medium cursor-pointer backdrop-blur-md hover:from-black hover:to-[#078338] transition duration-500">
                                Get a Free Quote
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute top-10 left-10 w-20 h-20 bg-green-600/20 rounded-full"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div
                className="absolute bottom-20 right-16 w-32 h-32 bg-green-500/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            <motion.div
                className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <motion.button
                className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-green-500/10 rounded-full shadow-lg backdrop-blur-md border border-white/20"
                animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        </section>
    );
};

export default Hero;
