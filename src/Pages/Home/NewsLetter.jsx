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
        <section className="max-w-7xl mx-auto px-8 py-12 bg-primary rounded-2xl shadow-sm mb-10">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-primary-200 text-lg max-w-md mx-auto md:mx-0">
                        Get the latest updates, exclusive offers, and insights straight to your inbox.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row flex-1 gap-4 w-full max-w-lg items-center"
                >
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        className="flex-grow rounded-md shadow-lg focus:ring-white focus:ring-2 transition bg-white text-black"
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="flex-grow rounded-md shadow-lg focus:ring-white focus:ring-2 transition bg-white text-black"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary px-6 py-3 rounded-lg shadow-lg font-semibold text-white bg-indigo-700 hover:bg-indigo-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Subscribe'}
                    </button>
                </form>
            </div>

            {(success || error) && (
                <p
                    className={`mt-6 text-center text-lg font-semibold ${success ? 'text-green-300' : 'text-red-300'
                        }`}
                >
                    {success || error}
                </p>
            )}
        </section>
    );
};

export default NewsLetter;
