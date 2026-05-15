"use client";
import Layout from "@/components/layout/Layout";

import Link from "next/link";

const blogPosts = [
  {
    image: "/assets/img/all-images/products/2.jpeg",
    date: "8 December 2024",
    author: "OF Contractor",
    title: "Cement",
    link: "/construction/cement",
  },
  {
    image: "/assets/img/all-images/products/1.jpeg",
    date: "9 December 2024",
    author: "OF Contractor",
    title: "Steel",
    link: "/construction/steel",
  },
  {
    image: "/assets/img/all-images/products/3.jpeg",
    date: "10 December 2024",
    author: "OF Contractor",
    title: "Hardware",
    link: "/construction/hardware",
  },
  {
    image: "/assets/img/all-images/products/4.jpeg",
    date: "11 December 2024",
    author: "OF Contractor",
    title: "Electrical",
    link: "/construction/electrical",
  },
  {
    image: "/assets/img/all-images/products/5.jpeg",
    date: "12 December 2024",
    author: "OF Contractor",
    title: "Plumbing",
    link: "/construction/plumbing",
  },
  {
    image: "/assets/img/all-images/products/6.jpeg",
    date: "13 December 2024",
    author: "OF Contractor",
    title: "Tiles",
    link: "/construction/tiles",
  },
  {
    image: "/assets/img/all-images/products/7.jpeg",
    date: "14 December 2024",
    author: "OF Contractor",
    title: "Paints",
    link: "/construction/paints",
  },
  {
    image: "/assets/img/all-images/products/8.jpeg",
    date: "15 December 2024",
    author: "OF Contractor",
    title: "Plywood",
    link: "/construction/plywood",
  },
  {
    image: "/assets/img/all-images/products/1.jpeg",
    date: "16 December 2024",
    author: "OF Contractor",
    title: "Roofing",
    link: "/construction/roofing",
  },
  {
    image: "/assets/img/all-images/products/2.jpeg",
    date: "17 December 2024",
    author: "OF Contractor",
    title: "Excavators",
    link: "/construction/excavators",
  },
  {
    image: "/assets/img/all-images/products/3.jpeg",
    date: "18 December 2024",
    author: "OF Contractor",
    title: "Cranes",
    link: "/construction/cranes",
  },
  {
    image: "/assets/img/all-images/products/4.jpeg",
    date: "19 December 2024",
    author: "OF Contractor",
    title: "Insurance",
    link: "/construction/insurance",
  },
];

// Blog post component
const BlogPost = ({
  image,
  date,
  author,
  title,
  link,
}: (typeof blogPosts)[0]) => (
  <div className="col-6 col-md-6 col-lg-2">
    <div className="blog-single-boxarea">
      <div className="img1 image-anime">
        <img
          src={image}
          alt="housebox"
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
            borderRadius: "2px",
          }}
        />
      </div>

      <div
        className="content-area"
        style={{
          padding: "10px 5px",
          textAlign: "center",
        }}
      >
        <Link
          href={link}
          className="head"
          style={{
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "20px",
            display: "block",
          }}
        >
          {title}
        </Link>
      </div>
    </div>
  </div>
);

export default function HomeCategory() {
  return (
    <>
      {/* Blog Grid Section */}
      <div
        className="blog-grid-section-area sp1"
        style={{
          backgroundImage: "url(assets/img/all-images/bg/bg1.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop:"-40px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="project-heading heading1 space-margin60 text-center">
                <h5>Categories</h5>
                <div className="space20" />
                <h2 className="text-anime-style-3">Featured Categories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
