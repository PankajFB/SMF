import React from "react";
import { useSocket } from "@/Context/SocketContext";
import { useFirebase } from "@/Context/FirebaseContext";
import Image from "next/image";


// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function Calling({ email, displayName, photoURL, setCurrentCallFalse }) {
  const [modalOpen, setModalOpen] = React.useState(true);

  const socket = useSocket();

  const firebase = useFirebase();

  const { auth, singedInUser } = firebase;

  React.useEffect(() => {
    try {
      socket.emit("call_pre_req", {
        targetEmail: email,
        email: singedInUser.email,
        displayName: singedInUser.displayName,
        photoURL: singedInUser.photoURL,
      });
      console.log("call_pre_req" + "emitted by socket");
    } catch (error) {
      console.log(error);
    }

    socket.on("call_pre_req_ans", (data) => {
      console.log("Pre call request answer came: ", data);

      setModalOpen(!modalOpen);

      setCurrentCallFalse();
    });

    return () => {
      socket.off("call_pre_req");
    };
  }, [email,modalOpen,setCurrentCallFalse,singedInUser.displayName,singedInUser.email,singedInUser.photoURL,socket]);

  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Calling {displayName}
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
           alt="DP" 
           height={65}
           width={65}
           className="avatar avatar-xxl me-3" />

          <hr />
          <h4>Wait for {displayName} to respond</h4>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Cancel Call
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Calling;
