import Navbar from "@/components/navbar/Navbar";
import Homepage from "@/pages/homepage";
import Login from "@/pages/login";
import About from "@/pages/about.js";
import Contact from "@/pages/contact";
import Dashboard from "@/components/Dashboard/Dashboard";
import {useFirebase} from "@/Context/FirebaseContext";


function App() {
  // initialize the firebase context
  const firebase = useFirebase();

// conditionally render the components based uopn the user logged in or not
// we are using the firebase context to check if the user is logged in or not
  if (firebase.singedInUser === null) {
    return (
      <div className="App">
        <main>
          {/* <Navbar></Navbar> */}

          <Homepage />
         
        </main>
      </div>
    );
  } else {
    return <Dashboard></Dashboard>;
   
  }
}

export default App;
