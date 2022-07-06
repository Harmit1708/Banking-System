import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Withdraw() {

  let [withdrawAmount,setWithdrawAmount] = React.useState();
  let [msg,setMsg] = React.useState();


  let handleSubmit = async(values) => {
    if(formik.values.amount >= 500){
      let res = await axios.post("https://banking-system0.herokuapp.com/users/withdraw",values);
      setWithdrawAmount(res.data.wdAmount);
      setMsg(res.data.message)

      formik.resetForm();
    }
    else{
      alert("Minumum Withdraw Amount is 500");
    }
  }

  const formik = useFormik({
    initialValues: {
      accountHolderName:"",
      accountNumber:"",
      amount: "",
    },
    validationSchema: Yup.object({
      accountHolderName:Yup.string().required('Required'),
      accountNumber: Yup.number().required("Required"),
      amount:Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  return (
    <div className='container'>
      <h2 className='mt-5'>Withdraw</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mt-5'>
        <label className='fw-bold' htmlFor='accountHolderName'>Enter Your Account Holder Name</label><br></br>
          <input type="text" className='form-control w-50' id="accountHolderName"
            name="accountHolderName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountHolderName}/> {formik.touched.accountHolderName && formik.errors.accountHolderName ? (
            <div style={{ color: "red"}}>
              {formik.errors.accountHolderName}
            </div>
          ) : null} <br></br>
          <label className='fw-bold' htmlFor='accountNumber'>Enter Your Account Number</label><br></br>
          <input type="text" className='form-control w-50' id="accountNumber"
            name="accountNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountNumber}/> {formik.touched.accountNumber && formik.errors.accountNumber ? (
            <div style={{ color: "red"}}>
              {formik.errors.accountNumber}
            </div>
          ) : null} <br></br>
          <label className='fw-bold' htmlFor='amount'>Enter Amount</label><br></br>
          <input type="text" className='form-control w-50' id="amount" name="amount" onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.amount}/> {formik.touched.amount && formik.errors.amount ? (
            <div style={{ color: "red"}}>
              {formik.errors.amount}
            </div>
          ) : null} <br></br>
          {withdrawAmount? <div><p className='fw-bold' style={{color:"green"}}>Your Current Balance is : {withdrawAmount}</p></div> : null}
          <p>Note : Minimun Withdraw Amount is 1000</p>
          {msg ? <div><p style={{color:"green"}} className="fw-bold">{msg}</p></div> : null}
          <button type="submit" className='btn btn-warning'>Withdraw Amount</button>
        </div>
      </form>
    </div>
  )
}

export default Withdraw;