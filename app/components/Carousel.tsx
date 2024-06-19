'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  data: {
    image: string;
    title: string;
  }[];
  setCategory: (category: string) => void;
  dataCategory: string;
}

const Carousel: React.FC<CarouselProps> = ({ data, setCategory, dataCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleItems = Math.floor(carouselWidth / 100);  
  const maxIndex = Math.max(data.length - visibleItems, 0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };


  return (
    <div className="relative flex items-center mt-2 md:mt-16 lg:mt-20">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`absolute left-0 z-20  px-2 py-1 bg-gray-100 hover:bg-gray-200 transition border border-gray-200 shadow-lg rounded-full ${currentIndex === 0 && 'opacity-50'}`}
      >
        {'<'}
      </button>
      <div className="overflow-hidden w-full" ref={carouselRef}>
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}px)` }}  
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center w-16 mx-8 cursor-pointer border-b-2 ${dataCategory === item.title ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
              onClick={() => setCategory(item.title)}
            >
              <Image
                src={item.image}
                alt={`carousel-image-${index}`}
                width={30}
                height={30}
                className="filter grayscale"
              />
              <span className="text-xs text-gray-500 mt-2 whitespace-nowrap">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        className={`absolute right-0 px-2 py-1 bg-gray-100 hover:bg-gray-200 transition border border-gray-200 shadow-lg rounded-full ${currentIndex === maxIndex && 'opacity-50'}`}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
