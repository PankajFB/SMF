import React from "react";
import { useSocket } from "@/Context/SocketContext";
import Image from "next/image";



// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function IncomingCall({ startCall ,setpopup ,setCurrentCallFalse,email, displayName, photoURL }) {

    const socket = useSocket();


  const [modalOpen, setModalOpen] = React.useState(true);

  const acceptCallAction = () => {
    startCall(email,displayName)
    setModalOpen(!modalOpen)

    socket.emit("call_pre_req_ans", {
        email: email,
       response : "success"
      });


  }



  return (
    <>
    
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
          {displayName} Calling... 
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          {" "}
          <Image src={photoURL}
          height={65}
          width={65}
          alt="DP" className="avatar avatar-xxl me-3" />
          <hr />
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => acceptCallAction()}
          >
            Accept Call
          </Button>
          
        </ModalFooter>
      </Modal>
    </>
  );
}

export default IncomingCall;
