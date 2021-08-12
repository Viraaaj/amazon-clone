import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required
import carouselImage1 from "../assets/carousel1.jpg";
import carouselImage2 from "../assets/carousel2.jpg";
import carouselImage3 from "../assets/carousel3.jpg";
import carouselImage4 from "../assets/carousel4.jpg";
import carouselImage5 from "../assets/carousel5.jpg";
import carouselImage6 from "../assets/carousel6.jpg";

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
          <Image loading="lazy" src={carouselImage1} alt="Carousel_Image" />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage2} alt="Carousel_Image" />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage3} alt="Carousel_Image" />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage4} alt="Carousel_Image" />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage5} alt="Carousel_Image" />
        </div>

        <div>
          <Image loading="lazy" src={carouselImage6} alt="Carousel_Image" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
