import { ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { Users } from "lucide-react";

const WhyChooseUs = () => {
    const cards = [
        {
            icon: <ShieldCheck size={36} className="text-[#078338]" />,
            title: "Trusted Protection",
            desc: "Comprehensive policies backed by top insurers. We safeguard your peace of mind."
        },
        {
            icon: <Clock size={36} className="text-[#078338]" />,
            title: "Quick & Easy",
            desc: "Fast claim settlements with transparent processes. No stress, just speed."
        },
        {
            icon: <ThumbsUp size={36} className="text-[#078338]" />,
            title: "Customer First",
            desc: "24/7 expert support with personalized care. Because you always come first."
        },
        {
            icon: <Users size={36} className="text-[#078338]" />,
            title: "Community Focused",
            desc: "We give back to the community and ensure our clients feel valued."
        }
    ];

    return (
        <section className="relative py-10 bg-gradient-to-br from-[#f7fdf9] via-white to-[#f2fbf5] dark:from-[#0f0f0f] dark:via-[#171717] dark:to-[#0f0f0f] overflow-hidden rounded-3xl">
            <div className="absolute top-[-40px] left-[-40px] w-60 h-60 
                bg-gradient-to-br from-[#078338]/40 via-green-400/20 to-transparent 
                rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 
                bg-gradient-to-tr from-green-600/30 via-[#078338]/20 to-transparent 
                rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] transition-transform duration-700 ease-in-out"
            />

            <div className="relative max-w-7xl mx-auto text-center px-4 lg:px-8 z-10">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Why Choose <span className="text-[#078338]">Us?</span>
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Insurance designed for the future. Transparent, affordable, and built to protect what matters most.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                    {cards.map((item, i) => (
                        <div
                            key={i}
                            className="relative group bg-white dark:bg-[#171717] rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden">

                            <div className="absolute inset-0 bg-gradient-to-r from-[#078338]/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                            <div className="mb-4 flex justify-center">
                                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/40 group-hover:scale-110 transform transition">
                                    {item.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-[#078338] to-black rounded-full transition-all duration-500 group-hover:w-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
