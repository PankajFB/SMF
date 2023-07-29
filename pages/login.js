import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useFirebase } from "@/Context/FirebaseContext";
import { signInWithPopup } from "firebase/auth";
import Dashboard from "@/components/Dashboard/Dashboard";

function Login() {
  // initialize the firebase context
  const firebase = useFirebase();

  const {
    auth,
    googleProvider,
    singedInUser,
    setSingedInUser,
    signupUserWithEmailandPassword,
    signInUserWithEmailandPassword,
  } = firebase;

  //  email and the password state
  //   these states are for the sign up form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   these states are for the sign in form
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  //  handle the login with google
  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const { email, displayName, photoURL } = result.user;
        setSingedInUser({ email, displayName, photoURL });
      });
    } catch (error) {
      console.log(error);
    }
  };


  // conditionally render the components based upon the user logged in or not
  if (firebase.singedInUser === null) {
    return (
      <>
        <Navbar></Navbar>
        <div className="container col-xxl-8  p-5 border rounded-3 shadow-lg ">
          <div className="row   flex-lg-row-reverse align-items-center g-5 py-5 p-5 justify-content-md-start ">
            <div className="col-10 col-sm-8 p-5  col-lg-6 border rounded-3 shadow-lg">
              {/* make the component one here */}
              <h1 className="h3 mb-3 fw-normal">Please Sign Up Here</h1>
              <br />
              {/* <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div> */}
              <br />
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <br />
              <div className="checkbox mb-3"></div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() => signupUserWithEmailandPassword(email, password)}
              >
                Sign Up
              </button>
              <br />
            </div>
            <div className="col-lg-6 p-5    border rounded-3 shadow-lg">
              {/* make the second compoentn */}

              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <br />
              <div className="form-floating">
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => {
                    setSignInEmail(e.target.value);
                  }}
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  value={signInPassword}
                  onChange={(e) => {
                    setSignInPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <br />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3"></div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={() =>
                  signInUserWithEmailandPassword(signInEmail, signInPassword)
                }
              >
                Sign in
              </button>
              <br />
              <br />
              <button
                className="w-100 btn btn-lg btn-primary"
                onClick={handleLoginWithGoogle}
              >
                Sign in With Google
              </button>

              {/* this is our responcive buttons */}
              {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start">
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
          </div> */}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Dashboard></Dashboard>;
  }
}

export default Login;
