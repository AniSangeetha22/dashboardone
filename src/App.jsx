import { Link, Route, Routes } from "react-router-dom";
import { RightSidebar } from "./components/globalBars/RightSidebar";
import { LeftSidebar } from "./components/globalBars/LeftSidebar";
import { Navbar } from "./components/globalBars/Navbar";
import { UserLoginProvider } from "./context/LoginContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <div className="App">
      <UserLoginProvider>
        <ProductProvider>
          <Navbar />
          <div className="side-left-bar">
            <LeftSidebar />
            <RightSidebar />
          </div>
        </ProductProvider>
      </UserLoginProvider>
    </div>
  );
}

export default App;
