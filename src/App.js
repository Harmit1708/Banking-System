import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import CreateAccount from "./Components/CreateAccount";
import Deposit from "./Components/Deposit";
import Transfer from "./Components/Transfer";
import Withdraw from "./Components/Withdraw";
import Balance from './Components/Balance'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path='/balance' element={<Balance/>}/>
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/withdrawl" element={<Withdraw />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
