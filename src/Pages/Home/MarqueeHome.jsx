import React from 'react';
import Marquee from "react-fast-marquee";

import img1 from '../../assets/CompanyLogos/ADA-Logo.png'
import img2 from '../../assets/CompanyLogos/American-Express-logo.png'
import img3 from '../../assets/CompanyLogos/Banco-Popular-Logo.png'
import img4 from '../../assets/CompanyLogos/Bank-of-America-Logo.png'
import img5 from '../../assets/CompanyLogos/Bank-of-Baroda-logo.png'
import img6 from '../../assets/CompanyLogos/Bank-of-China-logo.png'
import img7 from '../../assets/CompanyLogos/BCI-logo.png'
import img8 from '../../assets/CompanyLogos/BlackRock-logo.png'
import img9 from '../../assets/CompanyLogos/Chase-logo.png'
import img10 from '../../assets/CompanyLogos/GEICO-logo.png'
import img11 from '../../assets/CompanyLogos/HDFC-Bank-logo.png'
import img12 from '../../assets/CompanyLogos/Humana-logo.png'
import img13 from '../../assets/CompanyLogos/IDBI-Bank-logo.png'
import img14 from '../../assets/CompanyLogos/Prudential-Financial-logo.png'
import img15 from '../../assets/CompanyLogos/Sun-Life-Financial-Logo.png'
import img16 from '../../assets/CompanyLogos/United-Healthcare-Logo.png'
import img17 from '../../assets/CompanyLogos/VISA-logo.png'

const logos = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12, img13, img14, img15, img16, img17
];

const MarqueeHome = () => {
    return (
        <div className="w-full py-5 bg-gray-200 dark:bg-[#292727d3]">
            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover={true}
                className="flex items-center">
                {logos.map((logo, index) => (
                    <div key={index} className="mx-10 flex items-center justify-center">
                        <img
                            src={logo}
                            alt={`Company logo ${index + 1}`}
                            className="h-8 lg:h-16 w-auto object-contain cursor-pointer transition-all duration-300"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default MarqueeHome;
