import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface Image {
  src: string;
}

interface CarouselProps {
  images: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handlePrevClick = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide(prevSlide => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hidden duration-700 ease-in-out ${index === currentSlide ? 'block' : ''}`}
            data-carousel-item=""
          >
            <img
              src={image.src}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          />
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevClick}
        data-carousel-prev=""
      >
        <BackwardIcon className="w-5 h-5 text-white group-hover:text-gray-300" />
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNextClick}
        data-carousel-next=""
      >
        <ForwardIcon className="w-5 h-5 text-white group-hover:text-gray-300" />
      </button>
    </div>
  );
};

export default Carousel;
