import { useState } from "react";
import "./sass/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./components/product/Product";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Product />
      <ToastContainer />
    </>
  );
}

export default App;
