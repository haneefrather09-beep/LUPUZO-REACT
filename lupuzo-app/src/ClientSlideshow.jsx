import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaPlay } from 'react-icons/fa';
import { getTestimonials } from './Store';
import './ClientSlideshow.css';

export default function ClientSlideshow() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  useEffect(() => {
    const loadSlides = async () => {
      const data = await getTestimonials();
      setSlides(data);
    };
    loadSlides();
  }, []);

  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "s1",
      name: "Omar Al-Faruq",
      role: "CEO, Riyadh Innovates",
      text: "Lupuzo completely redefined our branding and mobile app. The UI is sleek, the performance is flawless, and the AI integration pushed our user retention up by 400%.",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "s2",
      name: "Fatima Zahra",
      role: "Marketing Director, Luxe Arabia",
      text: "The 3D animations and the overall website aesthetic completely wowed our clients. What impressed me most was their dedication to high-level security.",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "s3",
      name: "James Mitchell",
      role: "CEO, FinTech Global",
      text: "We hired Lupuzo to develop a smart AI chatbot for our customer service. It now handles 80% of our daily queries automatically. It is a masterpiece of engineering.",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "s4",
      name: "Aisha Noor",
      role: "Creative Lead, Echo Studios",
      text: "Working with Lupuzo was the best decision for our digital transition. Their premium design approach gave us an enterprise-grade platform on a startup budget.",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  const slideVariants = {
    hidden: (dir) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: dir > 0 ? 'right' : 'left',
      scale: 0.8
    }),
    visible: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center',
      transition: { duration: 0.8, ease: [0.64, 0.04, 0.35, 1] }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: dir > 0 ? 'left' : 'right',
      scale: 0.8,
      transition: { duration: 0.8, ease: [0.64, 0.04, 0.35, 1] }
    })
  };

  const current = displaySlides[currentIndex];

  return (
    <section className="section slideshow-section" style={{ perspective: '2000px' }}>
      <div className="container">
        <div className="section-header">
          <motion.span className="section-tag" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <FaPlay /> Real Client Experiences
          </motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            Trust from Our <span className="text-gradient">Clients</span>
          </motion.h2>
        </div>

        <div className="slideshow-wrapper">
          <button className="slider-nav prev" onClick={prevSlide}><FaChevronLeft /></button>

          <div className="slide-track">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="slide-content"
              >
                <div className="slide-media-container">
                  {current.mediaType === 'video' ? (
                    <video src={current.media} controls className="slide-media" />
                  ) : current.mediaType === 'image' ? (
                    <img src={current.media} alt={current.name} className="slide-media" />
                  ) : (
                    <div className="slide-media-placeholder">No Media</div>
                  )}
                </div>
                
                <div className="slide-text-container">
                  <span className="quote-icon"><FaQuoteLeft /></span>
                  <p className="slide-testimonial">"{current.text}"</p>
                  <div className="slide-author">
                    <div className="author-name">{current.name}</div>
                    <div className="author-role">{current.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="slider-nav next" onClick={nextSlide}><FaChevronRight /></button>
        </div>
        
        <div className="slider-dots">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
