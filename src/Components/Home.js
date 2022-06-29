import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate()
  return (
    <div className="container ">
      <div className="grid mt-5">
        <div className="inner-box">
          <div>
            <img src="https://cdn-icons.flaticon.com/png/512/863/premium/863823.png?token=exp=1656335128~hmac=92cc8eff23bdd888449f2dbed045be06" alt="create Account" height="64px" width="64px"/><br></br><br></br>
          <button className="btn btn-outline-success" onClick={()=>{navigate('/create-account')}}>Create Account</button>
          </div>
        </div>
        <div className="inner-box">
        <img src="https://cdn-icons-png.flaticon.com/512/2721/2721121.png" alt="Deposit" height="64px" width="64px"/><br></br><br></br>
          <button className="btn btn-outline-success" onClick={()=>{navigate('/deposit')}}>Deposit</button>
        </div>
        <div className="inner-box">
        <img src="https://cdn-icons.flaticon.com/png/512/2953/premium/2953536.png?token=exp=1656335210~hmac=8c6cc1f920cf422b4f4d52cdf51465c6" alt="Balance" height="64px" width="64px"/><br></br><br></br>
          <button className="btn btn-outline-secondary" onClick={()=>{navigate('/balance')}}>Balance</button>
        </div>
        <div className="inner-box">
        <img src="https://cdn-icons-png.flaticon.com/512/1682/1682382.png" alt="Withdraw" height="64px" width="64px"/><br></br><br></br>
          <button className="btn btn-outline-warning" onClick={()=>{navigate('/withdrawl')}}>Withdraw</button>
        </div>
        <div className="inner-box">
        <img src="https://cdn-icons-png.flaticon.com/512/1790/1790213.png" alt="Transfer" height="64px" width="64px"/><br></br><br></br>
          <button className="btn btn-outline-success" onClick={()=>{navigate('/transfer')}}>Transfer</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
