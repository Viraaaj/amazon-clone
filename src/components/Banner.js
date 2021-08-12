import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required
// import carouselImage1 from "../assets/carousel1.jpg";
// import carouselImage2 from "../assets/carousel2.jpg";
// import carouselImage3 from "../assets/carousel3.jpg";
// import carouselImage4 from "../assets/carousel4.jpg";
// import carouselImage5 from "../assets/carousel5.jpg";
// import carouselImage6 from "../assets/carousel6.jpg";

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
          <Image
            loading="lazy"
            src="/carousel1.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>

        <div>
          <Image
            loading="lazy"
            src="/carousel2.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>

        <div>
          <Image
            loading="lazy"
            src="/carousel3.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>

        <div>
          <Image
            loading="lazy"
            src="/carousel4.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>

        <div>
          <Image
            loading="lazy"
            src="/carousel5.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>

        <div>
          <Image
            loading="lazy"
            src="/carousel6.jpg"
            alt="Carousel_Image"
            height={650}
            width={1560}
            objectFit="cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
