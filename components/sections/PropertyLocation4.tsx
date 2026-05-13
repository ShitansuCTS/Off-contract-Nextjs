"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/styles/custom.css";
const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 25000,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
};

const services = [
  {
    id: 1,
    title: "Cement",
    image: "/assets/img/all-images/products/1.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 2,
    title: "Steel",
    image: "/assets/img/all-images/products/2.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 3,
    title: "Electrical",
    image: "/assets/img/all-images/products/3.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 4,
    title: "Plumbing",
    image: "/assets/img/all-images/products/4.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 5,
    title: "Cranes",
    image: "/assets/img/all-images/products/8.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 6,
    title: "Mixers",
    image: "/assets/img/all-images/products/7.jpeg",
    link: "/property-details-v1",
  },
  {
    id: 7,
    title: "Excavators",
    image: "/assets/img/all-images/products/5.jpeg",
    link: "/property-details-v1",
  },
];

export default function PropertyLocation4() {
  return (
    <>
      <div className="property-loaction3-section sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="project-heading heading1 space-margin60 text-center">
                <h5>Products</h5>
                <div className="space20" />
                <h2 className="text-anime-style-3">Our Featured Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper
              {...swiperOptions}
              className="loaction-slider-property owl-carousel"
            >
              {services.map((service) => (
                <SwiperSlide className="propety-loaction" key={service.id}>
                  <div className="img1" style={{ backgroundColor: "red" }}>
                    <img
                      src={service.image}
                      alt="housebox"
                      className="service-img"
                    />
                  </div>
                  <div className="content-area">
                    <Link href="/property-details-v1">{service.title}</Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
