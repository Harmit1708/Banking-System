import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function Deposit() {

  let [amount,setAmount] = React.useState();
  let [currentBalance,setCurrentBalance] = React.useState();

  let handleSubmit = async(values) => {
    if(formik.values.amount >= 500 && formik.values.amount <= 50000){
      let res = await axios.post("http://localhost:8080/users/deposit",values);
      setAmount(res.data.amount);
      setCurrentBalance(res.data.cb);
      formik.resetForm();
    }
    else{
      alert("Minimun Deposit Amount is 500 & Maximum Deposit Amount is 50000")
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
      <h2 className='mt-5'>Deposit</h2>
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
          {amount ? <div><p style={{color:"green"}} className="fw-bold">Deposit Money Value is : {amount}</p></div>:null}
          {currentBalance ? <div><p style={{color:"green"}} className="fw-bold">Your Current Balance is  : {currentBalance}</p></div>:null}
          <p>Note : Minimun Deposit Amount is 500 & Maximum Deposit Amount is 50000</p>
          <button type="submit" className='btn btn-success'>Deposit Amount</button>
        </div>
      </form>
    </div>
  )
}

export default Deposit