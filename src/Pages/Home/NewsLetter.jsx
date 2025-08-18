import { Input } from '@/components/ui/input';
import useAxios from '@/Hooks/useAxios';
import React, { useState } from 'react';

const NewsLetter = () => {
    const axios = useAxios();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.name || !formData.email) {
            setError('Please fill in both name and email.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('/newsletter', formData);
            setSuccess('Thank you for subscribing!');
            setFormData({ name: '', email: '' });
        } catch (err) {
            console.log(err);
            setError('Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="max-w-7xl mx-auto px-8 py-16 bg-gradient-to-r from-[#078338] to-black rounded-3xl shadow-xl">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">

                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-white/90 text-lg max-w-md mx-auto md:mx-0">
                        Get the latest updates, exclusive offers, and insights straight to your inbox.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row flex-1 gap-4 w-full max-w-lg items-center">
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        className="flex-grow rounded-lg shadow-md bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#078338] transition"
                        required />
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="flex-grow rounded-lg shadow-md bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#078338] transition"
                        required />
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl font-semibold px-6 py-2 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] cursor-pointer shadow-md text-white shadow-[#078338]/30 transition duration-500 disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? 'Submitting...' : 'Subscribe'}
                    </button>


                     
                </form>
            </div>

            {(success || error) && (
                <p
                    className={`mt-6 text-center text-lg font-semibold transition-all ${success ? 'text-white' : 'text-red-200'
                        }`}>
                    {success || error}
                </p>
            )}
        </section>
    );
};

export default NewsLetter;
