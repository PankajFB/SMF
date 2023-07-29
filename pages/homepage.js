import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";



function Homepage() {
  return (
    <>

    

    <Navbar></Navbar>


    <div className="container col-xxl-8 px-4 py-5 ">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 justify-content-md-start">
        <div className="col-10 col-sm-8  col-lg-6">
          <Image
            src="/assets/community.png"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width={400}
            height={400}
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Welcome to our meeting platform!
          </h1>
          <p className="lead">
            Welcome to our meeting platform This platform is designed to
            facilitate smooth and efficient communication between all
            participants. Whether you are joining us from across the room or
            across the world, we created an environment that fosters
            collaboration and engagement.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              Primary
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Homepage;
