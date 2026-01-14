import React from "react";
import { Leaf, Droplets, Sun, Calendar, Shield, Users } from "lucide-react";

const Services = () => {
    const services = [
        {
            icon: Leaf,
            title: "Plant Identification",
            description:
                "Advanced AI-powered plant recognition to identify species, diagnose diseases, and provide personalized care recommendations.",
            features: ["30k+ Species Database", "Disease Detection", "Care Guides"],
        },
        {
            icon: Droplets,
            title: "Smart Watering",
            description:
                "Intelligent watering schedules based on plant type, climate, and soil conditions. Never over or under-water again.",
            features: ["Automated Reminders", "Weather Integration", "Custom Schedules"],
        },
        {
            icon: Sun,
            title: "Growth Tracking",
            description:
                "Monitor your plants' growth journey with detailed analytics and photo timelines to celebrate every milestone.",
            features: ["Photo Journals", "Growth Analytics", "Health Reports"],
        },
        {
            icon: Calendar,
            title: "Seasonal Planner",
            description:
                "Get expert guidance on what to plant and when, tailored to your location and climate zone.",
            features: ["Crop Calendar", "Zone Mapping", "Harvest Planning"],
        },
        {
            icon: Shield,
            title: "Pest Management",
            description:
                "Identify pests and diseases early with our comprehensive library and receive organic treatment solutions.",
            features: ["Pest ID", "Organic Solutions", "Prevention Tips"],
        },
        {
            icon: Users,
            title: "Community Hub",
            description:
                "Connect with fellow gardeners, share experiences, and learn from master cultivators worldwide.",
            features: ["Expert Q&A", "Photo Sharing", "Local Groups"],
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4F5F0] text-[#1A2F1C]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-20 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="font-mono text-[#C77D63] tracking-[0.2em] text-xs uppercase mb-6 block animate-fade-in">
                        Our Services
                    </span>
                    <h1 className="font-serif text-5xl sm:text-5xl md:text-6xl leading-[1] mb-8">
                        Cultivate smarter with <br />
                        <span className="italic text-[#4A6741] sm:text-5xl">
                            our tools.
                        </span>
                    </h1>
                    <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        From novice gardeners to expert farmers, our comprehensive suite of
                        services helps you grow healthier plants and harvest better yields.
                    </p>
                </div>

                <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A6741]/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C77D63]/5 rounded-full blur-3xl -z-10"></div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6 md:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group p-8 border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-[#F4F5F0]/30"
                            >
                                <div className="bg-[#1A2F1C] w-14 h-14 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-[#C77D63] transition-colors duration-300">
                                    <service.icon size={24} />
                                </div>

                                <h3 className="font-serif text-2xl font-bold mb-4 text-[#1A2F1C]">
                                    {service.title}
                                </h3>

                                <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <ul className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="flex items-center gap-2 text-sm text-gray-500"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A6741]"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-20 bg-[#1A2F1C] text-[#F4F5F0]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">
                        Ready to transform your garden?
                    </h2>
                    <p className="font-sans text-[#F4F5F0]/70 text-lg mb-10 max-w-2xl mx-auto">
                        Join thousands of growers who are already cultivating smarter with
                        our platform. Start your journey today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group flex items-center gap-3 px-8 py-4 bg-[#C77D63] rounded-full text-white hover:bg-[#C77D63]/90 transition-all duration-300 hover:scale-105">
                            <span className="text-sm tracking-widest font-sans">
                                GET STARTED FREE
                            </span>
                        </button>

                        <button className="group flex items-center gap-3 px-8 py-4 border border-[#F4F5F0]/30 rounded-full text-[#F4F5F0] hover:bg-[#F4F5F0]/10 transition-all duration-300">
                            <span className="text-sm tracking-widest font-sans">
                                VIEW PRICING
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Final Quote */}
            <section className="py-32 px-6 text-center bg-[#F4F5F0] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 w-px h-20 bg-[#1A2F1C]/10 -translate-x-1/2"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1A2F1C] mb-6 leading-tight">
                        || कृषिः सर्वेषां शिल्पाः प्रधानम् ||
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-[#C77D63]"></span>
                        <p className="font-mono text-[#C77D63] text-sm tracking-[0.3em] uppercase">
                            Agriculture is the foundation of all crafts
                        </p>
                        <span className="h-px w-12 bg-[#C77D63]"></span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;