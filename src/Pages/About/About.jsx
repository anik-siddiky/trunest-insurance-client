/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import img1 from '../../assets/The-Mills-Building-exterior.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200">
            <section className="relative flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 lg:px-12 py-16 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2">
                    <img
                        src={img1}
                        alt="Our Building"
                        className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-primary dark:text-green-400">
                        About TruNest Insurance
                    </h1>
                    <p className="text-lg leading-relaxed">
                        At TruNest, we believe in more than just policies. We believe in building a nest of trust, care, and security
                        around our clients. Since our founding, our mission has been to simplify the complexities of insurance while
                        offering protection that feels personal and reliable.
                    </p>
                    <p className="text-lg leading-relaxed">
                        With decades of combined industry expertise, we have crafted policies tailored to families, individuals,
                        and businesses who want more than just coverage, they want peace of mind. We go beyond contracts by
                        delivering exceptional service, innovative solutions, and a customer experience that truly stands out.
                    </p>
                </motion.div>
            </section>

            <section className="bg-gray-50 dark:bg-zinc-900 py-16 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto text-center space-y-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary dark:text-green-400">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-3">Trust</h3>
                            <p>
                                Every policy we design is built on transparency, integrity, and honesty — ensuring that
                                your confidence in us remains unshakable.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                            <p>
                                We embrace modern tools and evolving needs, offering innovative coverage that adapts to
                                today’s challenges and tomorrow’s opportunities.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-3">Care</h3>
                            <p>
                                Insurance is more than paperwork; it’s about people. We put empathy at the core of
                                everything we do to protect what matters most to you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 text-center px-6">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Building Security, Together
                </h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                    Join thousands of individuals and businesses who trust TruNest Insurance to safeguard their
                    homes, assets, and dreams. Our promise is simple: to provide reliable coverage and unwavering
                    support, no matter where life takes you.
                </p>
                <Link to="/all-policies">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer">
                        Choose Policy
                    </motion.button>
                </Link>
            </section>
        </div>
    );
};

export default About;
