'use client'

import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Socket } from "socket.io-client";
import { useFirebase } from "@/Context/FirebaseContext";
import { signOut } from "firebase/auth";

import dynamic from 'next/dynamic';

import { useSocket } from "@/Context/SocketContext";
import Chat from "@/components/Chat/Chat";
// import AudioCall from "@/components/Call/AudioCall";
import Calling from "@/components/OutgoingCall/Calling";
import IncomingCall from "@/components/IncomingCall/IncomingCall";


const AudioCall = dynamic(() => import('@/components/Call/AudioCall'), { ssr: false });


function Friends() {
  const socket = useSocket();

  const firebase = useFirebase();

  const { auth, singedInUser } = firebase;

  const { displayName, email, photoURL } = singedInUser;

  const [requests, setrequests] = useState([]);

  const [friends, setfriends] = useState([]);

  const [chat, setchat] = useState({});

  const [call, setcall] = useState();

  const acceptRequest = (to) => {
    socket.emit("accept_request", { to, from: email });
  };

  const startChat = (friendEmail, name) => {
    setchat({ friendEmail, name });
  };

  const startCall = (friendEmail, name) => {
    setcall({ friendEmail, name });
  };

  useEffect(() => {
    socket.emit("friend_request_list", { email: email, id: socket.id });

    socket.emit("friend_list", { email: email, id: socket.id });

    socket.on("friend_request_list", (list) => {
      const { data } = list;
      console.log("data is : ", data);

      // if  data is not null then set the connected users in the state connectedUsers
      if (data) {
        const newreq = { user: data };

        const addUniqueEntry = (newreq) => {
          const isUnique = !requests.some(
            (item) => item.user.email === data.email
          );

          if (isUnique) {
            requests.push(newreq);
            setrequests([...requests]);
            console.log("requests are : ", requests);
          }
        };
        addUniqueEntry(newreq);
      } else {
        console.log("no data from the server");
      }
    });

    socket.on("friend_list", (list) => {
      const { data } = list;
      console.log("data is : ", data);

      // if  data is not null then set the connected users in the state connectedUsers
      if (data) {
        const newFriend = { user: data };

        const addUniqueEntry = (newFriend) => {
          const isUnique = !friends.some(
            (item) => item.user.email === data.email
          );

          if (isUnique) {
            friends.push(newFriend);
            setfriends([...friends]);
            console.log("Friends are : ", friends);
          }
        };
        addUniqueEntry(newFriend);
      } else {
        console.log("no data from the server");
      }
    });

    socket.on("call_pre_req", (data) => {
      const { email,displayName,photoURL } = data;
      console.log("Pre call request came: ", data);

      setincomingCallPopup({email,displayName,photoURL});
     
    });



  }, [email,friends,requests,socket]);


  const [popup, setpopup] = useState(false);

  const [incomingCallPopup, setincomingCallPopup] = useState(false);

  const [currentCall, setCurrentCall] = useState();

function callUser(email,displayName,photoURL) {
  setpopup(true);
  setCurrentCall({email,displayName,photoURL});
  startCall(
    email,
    displayName
  )
}

const  setCurrentCallFalse = () => {
  setCurrentCall(false);
}

  return (
    <Fragment>
      {popup ? (<Calling email={currentCall.email} displayName={currentCall.displayName} photoURL={currentCall.photoURL} setCurrentCallFalse={setCurrentCallFalse} />) : (<></>)}
      
      {incomingCallPopup ? (<IncomingCall email={incomingCallPopup.email} displayName={incomingCallPopup.displayName} photoURL={incomingCallPopup.photoURL} startCall={startCall}  />) : (<></>)}


      <div className="g-sidenav-show">
        <nav
          className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start position-absolute ms-3 bg-white"
          id="sidenav-main"
        >
          <div className="sidenav-header">
            <i
              className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute right-0 top-0 d-none d-xl-none"
              aria-hidden="true"
              id="iconSidenav"
            />
            <Link className="navbar-brand m-0" href="/">
              <Image
                src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/logo-ct.png"
                className="navbar-brand-img h-100"
                height={65}
                width={65}
                alt="..."
              />
              <span className="ms-1 font-weight-bold">Webapp</span>
            </Link>
          </div>
          <hr className="horizontal dark mt-0" />
          <div
            className="collapse navbar-collapse  w-auto"
            id="sidenav-collapse-main"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link  active" href="/">
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 45 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>shop </title>
                      <g
                        id="Basic-Elements"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                        data-darkreader-inline-stroke
                        style={{ darkreaderInlineStroke: "none" }}
                      >
                        <g
                          id="Rounded-Icons"
                          transform="translate(-1716.000000, -439.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                          // style={{ darkreaderInlineFill: "#e8e6e3" }}
                          // data-darkreader-inline-fill
                        >
                          <g
                            id="Icons-with-opacity"
                            transform="translate(1716.000000, 291.000000)"
                          >
                            <g
                              id="shop-"
                              transform="translate(0.000000, 148.000000)"
                            >
                              <path
                                className="color-background"
                                d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                                id="Path"
                                opacity="0.598981585"
                              />
                              <path
                                className="color-background"
                                d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"
                                id="Path"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  " href="/dashboard/friends">
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>office</title>
                      <g
                        id="Basic-Elements"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                        data-darkreader-inline-stroke
                        style={{ darkreaderInlineStroke: "none" }}
                      >
                        <g
                          id="Rounded-Icons"
                          transform="translate(-1869.000000, -293.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                          style={{ darkreaderInlineFill: "#e8e6e3" }}
                          data-darkreader-inline-fill
                        >
                          <g
                            id="Icons-with-opacity"
                            transform="translate(1716.000000, 291.000000)"
                          >
                            <g
                              id="office"
                              transform="translate(153.000000, 2.000000)"
                            >
                              <path
                                className="color-background"
                                d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                id="Path"
                                opacity="0.6"
                              />
                              <path
                                className="color-background"
                                d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                                id="Shape"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="nav-link-text ms-1">Friends</span>
                </Link>
              </li>
            </ul>
          </div>
        
        </nav>
        <div className="main-content" id="panel">
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 mt-3 shadow-none border-radius-xl"
            id="navbarTop"
          >
            <div className="container-fluid">
              <a
                className="navbar-brand"
                href="/"
                rel="tooltip"
                title="Designed and Coded by Creative Tim"
                data-placement="bottom"
                target="_blank"
              >
                WEBAPP
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav navbar-nav-hover ms-auto">
                  <div className="row">
                    <div className="col-auto m-auto">
                      <a className="cursor-pointer">
                        <i
                          className="fa fa-cog fixed-plugin-button-nav"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <div className="col-auto m-auto">
                      <div className="dropdown">
                        <a
                          className="cursor-pointer"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa fa-bell" aria-hidden="true" />
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-right px-2 py-3 ms-n4"
                          aria-labelledby="dropdownMenuButton"
                        >
                          ...
                        </ul>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="bg-white border-radius-lg d-flex me-2">
                        <input
                          type="text"
                          className="form-control border-0 ps-3"
                          placeholder="Type here..."
                        />
                        <button
                          className="btn bg-gradient-primary my-1 me-1"
                          onClick={() => {
                            signOut(auth);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid pt-3">
            {/* U need to add the components from here */}

            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Friend Request</h6>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          User
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Name
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Date
                        </th>
                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {/* we will render the conneteduser list here */}
                      {/* <h1>This is my name : {props.connectedUsers}</h1> */}

                      {requests.map((user) => (
                        <tr key={user.user.email}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <Image
                                  src={user.user.photoURL}
                                  alt="DP"
                                  height={65}
                                  width={65}
                                  className="avatar avatar-sm me-3"
                                />
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {user.user.displayName}
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  {user.user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0">
                              {user.user.displayName}
                            </p>
                            <p className="text-xs text-secondary mb-0"></p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="badge badge-sm bg-gradient-success">
                              Online
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              23/04/18
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-primary btn-sm"
                              data-original-title="Add Friend"
                              type="button"
                              onClick={() => acceptRequest(user.user.email)}
                            >
                              Accept Request
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* The friends list is here */}

            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Friends</h6>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Country
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Joined
                        </th>
                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {/* we will render the conneteduser list here */}
                      {/* <h1>This is my name : {props.connectedUsers}</h1> */}

                      {friends.map((user) => (
                        <tr key={user.user.email}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <Image
                                  src={user.user.photoURL}
                                  alt="DP"
                                  height={65}
                                  width={65}
                                  className="avatar avatar-sm me-3"
                                />
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {user.user.displayName}
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  {user.user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0">
                              {user.user.displayName}
                            </p>
                            <p className="text-xs text-secondary mb-0">
                              India
                            </p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="badge badge-sm bg-gradient-success">
                              Online
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              23/04/18
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-primary btn-sm"
                              data-original-title="Add Friend"
                              type="button"
                              onClick={() =>
                                startChat(
                                  user.user.email,
                                  user.user.displayName
                                )
                              }
                            >
                              Chat
                            </button>
                            <span>    </span>

                            {/* model */}

                            

                            {/* to make the calling feature */}
                            <button
                              type="button"
                              className="btn-primary btn btn-sm"
                            onClick={() => callUser( user.user.email, user.user.displayName,user.user.photoURL)}
                            >
                              Video Call
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {chat ? (
              <>
                <Chat chatWith={chat}></Chat>
              </>
            ) : (
              <></>
            )}

            {call ? (
              <>
                <AudioCall callWith={call}></AudioCall>
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
      </Fragment>
    
  );
}

export default Friends;
