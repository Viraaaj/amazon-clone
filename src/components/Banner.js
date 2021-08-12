import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required
import carouselImage1 from "../assets/carousel1.jpg";
import carouselImage2 from "../assets/carousel2.jpg";
import carouselImage3 from "../assets/carousel3.jpg";

const Banner = () => {
  return (
    <div className="relative">
      {/* <div className="absolute w-full h-20 bg-gradient-to-t from-gray-100 to-black bottom-0 z-20 " /> */}
      <Carousel
        autoplay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image loading="lazy" src={carouselImage1} />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage2} />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
