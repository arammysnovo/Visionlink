import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import banner1 from '../assets/Banner1.png';
import banner2 from '../assets/Banner2.jpeg';
import banner3 from '../assets/Banner3.jpeg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    { src: banner1, alt: 'Banner 1' },
    { src: banner2, alt: 'Banner 2' },
    { src: banner3, alt: 'Banner 3' }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Banner Slider */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Ultimate Gear, sans-serif' }}
          >
            VisionLink
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 font-light leading-relaxed"
          >
            Internet de alta qualidade com suporte inteligente 24/7
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={() => window.open('https://wa.me/558182409612', '_blank')}
            >
              Assinar Agora
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Planos
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Role para baixo</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

