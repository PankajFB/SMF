import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

function About() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="px-4 pt-5 my-5 text-center ">
        <h1 className="display-4 fw-bold">About Us</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            At [Social Media App], we believe in connecting people from all
            corners of the world, allowing them to express themselves, share
            their stories, and build meaningful connections. Our app was created
            with the goal of fostering a positive and inclusive community where
            users can feel safe to be their true selves.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Primary button
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <Image
              src="/assets/community.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width={300}
              height={500}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
