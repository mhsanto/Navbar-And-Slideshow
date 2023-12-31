import { useState, useEffect, useMemo } from "react";
import wall2 from "../../../public/wall2.jpg";
import wall3 from "../../../public/wall3.jpg";
import wall4 from "../../../public/wall4.jpg";
import wall5 from "../../../public/wall5.jpg";
import {
  BsArrowRightCircleFill,
  BsArrowLeftCircleFill,
  BsFillPlayCircleFill,
  BsFillPauseFill,
} from "react-icons/bs";
function Slider() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const images = useMemo(() => [wall3, wall2, wall4, wall5], []);

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const forward = () => {
    if (currentIndex < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    let interval: number;

    if (isAutoPlay) {
      interval = setInterval(() => {
        if (currentIndex < images.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(1);
        }
      }, 3000); // Auto play interval (adjust as needed)
    }

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, images]);

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <main className="grid min-h-[90vh] bg-gray-900 overflow-hidden">
      <div className="relative mx-auto   rounded-md bg-gray-100 ">
        <div className="absolute right-5 top-5 z-10 rounded-full  px-2 text-center text-sm text-black">
          <span>{currentIndex}</span>/{images.length}
        </div>

        <button
          onClick={previous}
          className="absolute left-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
        >
          <BsArrowLeftCircleFill size={40} />
        </button>

        <button
          onClick={forward}
          className="absolute right-5 top-1/2 z-10 bg-gray-100  flex -translate-y-1/2 items-center justify-center rounded-full  shadow-md"
        >
          <BsArrowRightCircleFill size={40} />
        </button>

        <button
          onClick={toggleAutoPlay}
          className="absolute right-10 top-16 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 shadow-md"
        >
          {isAutoPlay ? <BsFillPauseFill /> : <BsFillPlayCircleFill />}
        </button>

        <div
          className="relative h-screen overflow-hidden"
          style={{ width: "100vw" }}
        >
          <div
            className="absolute h-full transition-transform duration-300 ease-in-out"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${
                ((currentIndex - 1) / images.length) * 100
              }%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="absolute top-0 h-full w-full"
                style={{ left: `${(index / images.length) * 100}%` }}
              >
                <img
                  src={image}
                  alt="image"
                  className="h-full w-screen  object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Slider;
