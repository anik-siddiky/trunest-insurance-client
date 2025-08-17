"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What types of insurance do you offer?",
        answer:
            "We provide a wide range of insurance including health, life, auto, home, and business coverage. Each policy is tailored to meet your specific needs.",
    },
    {
        question: "How do I get a free quote?",
        answer:
            "Simply click on the 'Get a Free Quote' button on our homepage, fill in a few details, and one of our expert agents will provide a personalized estimate instantly.",
    },
    {
        question: "Can I manage my policies online?",
        answer:
            "Yes, our digital platform allows you to view, update, and manage all your policies in one secure dashboard, accessible anytime, anywhere.",
    },
    {
        question: "How fast are claims processed?",
        answer:
            "Most claims are processed within 24–48 hours, depending on the complexity. We prioritize quick settlements to ensure you get the support you need right away.",
    },
    {
        question: "Do you offer customer support 24/7?",
        answer:
            "Absolutely! Our dedicated customer support team is available 24/7 via phone, email, or live chat to assist you at any time.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <section className="group relative rounded-3xl py-14 lg:py-20 bg-gradient-to-b from-white to-[#f7fdf9] dark:from-[#0f0f0f] dark:to-[#171717] overflow-hidden">

            <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-gradient-to-br from-[#078338]/40 via-green-400/20 to-transparent rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] transition-transform duration-700 ease-in-out group-hover:-translate-x-12 group-hover:translate-y-12" />

            <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-gradient-to-tr from-green-600/30 via-[#078338]/20 to-transparent rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] transition-transform duration-700 ease-in-out group-hover:translate-x-16 group-hover:-translate-y-16" />

            <div className="relative max-w-4xl mx-auto px-4 lg:px-12 text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                    Frequently Asked <span className="text-[#078338]">Questions</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
                    Have questions about our insurance services? Here are the most commonly asked questions answered for your convenience.
                </p>

                <div className="space-y-6 text-left relative z-10">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#171717] rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-6 h-6 text-[#078338] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`} />
                            </button>

                            <div
                                className={`px-6 pb-5 text-gray-600 dark:text-gray-400 text-base leading-relaxed transition-all duration-500 ${openIndex === index
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                    } overflow-hidden`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
