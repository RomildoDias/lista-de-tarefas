import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";

import RoutesApp from "./routes";

function App() {
  return (

    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <RoutesApp />
      <Footer/>
    </BrowserRouter>


  );
}

export default App;
