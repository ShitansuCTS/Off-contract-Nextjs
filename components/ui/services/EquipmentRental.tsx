"use client";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect } from "react";
import { BadgeCheck, BadgeX } from "lucide-react";



// Data for slides
const slides = [
  {
    img: "/assets/img/all-images/products/5.jpeg",
    status: "Available",
    location: "Jcb",
  },
  {
    img: "/assets/img/all-images/products/9.jpeg",
    status: "Not Available",
    location: "Crane",
  },
  {
    img: "/assets/img/all-images/products/10.jpeg",
    status: "Available",
    location: "Dumper Truck",
  },
  {
    img: "/assets/img/all-images/products/11.jpeg",
    status: "Available",
    location: "Excavator",
  },
  {
    img: "/assets/img/all-images/products/8.jpeg",
    status: "Not Available",
    location: "Crane",
  },
  {
    img: "/assets/img/all-images/products/7.jpeg",
    status: "Available",
    location: "Concrete Mixer",
  },
];

export default function EquipmentRental() {
  const swiperRef = useRef<any>(null); // Ref to control Swiper

  // Log Swiper instance when initialized for debugging
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      console.log("Swiper initialized:", swiperRef.current.swiper);
    }
  }, []);

  return (
    <>
      <div className="property-location-section-area sp1" id="equipment-rental">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="property-headeing heading1 space-margin60 text-center">
                <h5>Rental</h5>
                <div className="space20" />
                <h2 className="text-anime-style-3">Construction Equipment's</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-12"
              data-aos="fade-up"
              data-aos-duration={1000}
            >
              {/* FIRST SLIDER (Right -> Left) */}
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                speed={4000}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 30 },
                  575: { slidesPerView: 2, spaceBetween: 30 },
                  767: { slidesPerView: 2, spaceBetween: 30 },
                  991: { slidesPerView: 3, spaceBetween: 30 },
                  1199: { slidesPerView: 5, spaceBetween: 30 },
                  1350: { slidesPerView: 5, spaceBetween: 30 },
                }}
                className="property-single-slider second-slider"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index} className="propety-single-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src={slide.img}
                        alt="housebox"
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background:
                          slide.status === "Available" ? "#16a34a" : "#dc2626",
                        color: "#fff",
                        padding: "4px 14px",
                        borderRadius: "5px",
                        fontSize: "10px",
                        fontWeight: "500",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      {slide.status === "Available" ? (
                        <BadgeCheck size={16} />
                      ) : (
                        <BadgeX size={16} />
                      )}

                      {slide.status}
                    </div>
                    <Link
                      href="/property-details-v1"
                      style={{ padding: "8px", fontSize: "15px" }}
                    >
                      {slide.location}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* SPACE */}
              <div style={{ height: "30px" }} />

              {/* SECOND SLIDER (Left -> Right) */}
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: true, // IMPORTANT
                }}
                speed={4000}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 30 },
                  575: { slidesPerView: 2, spaceBetween: 30 },
                  767: { slidesPerView: 2, spaceBetween: 30 },
                  991: { slidesPerView: 3, spaceBetween: 30 },
                  1199: { slidesPerView: 5, spaceBetween: 30 },
                  1350: { slidesPerView: 5, spaceBetween: 30 },
                }}
                className="property-single-slider second-slider"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index} className="propety-single-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src={slide.img}
                        alt="housebox"
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background:
                          slide.status === "Available" ? "#16a34a" : "#dc2626",
                        color: "#fff",
                        padding: "4px 14px",
                        borderRadius: "5px",
                        fontSize: "10px",
                        fontWeight: "500",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      {slide.status === "Available" ? (
                        <BadgeCheck size={16} />
                      ) : (
                        <BadgeX size={16} />
                      )}

                      {slide.status}
                    </div>
                    <Link
                      href="/products-details"
                      style={{ padding: "8px", fontSize: "15px" }}
                    >
                      {slide.location}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
