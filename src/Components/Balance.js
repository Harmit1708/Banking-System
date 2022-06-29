import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Balance() {

  let [balance,setBalance] = React.useState();

  let handleSubmit = async(values) => {
    let res = await axios.post("http://localhost:8080/users/check-balance",values);
    setBalance(res.data.balance);
  }

  const formik = useFormik({
    initialValues: {
      accountHolderName:"",
      accountNumber:"",
    },
    validationSchema: Yup.object({
      accountHolderName:Yup.string().required('Required'),
      accountNumber: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  return (
    <div className='container'>
      <h2 className='mt-5'>Check Balance</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mt-5'>
        <label className='fw-bold' htmlFor='accountHolderName'>Enter Your Account Holder Name</label><br></br>
          <input type="text" className='form-control w-50'id="accountHolderName"
            name="accountHolderName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountHolderName}/> {formik.touched.accountHolderName && formik.errors.accountHolderName ? (
            <div style={{ color: "red"}}>
              {formik.errors.accountHolderName}
            </div>
          ) : null}<br></br>
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
          {balance ? <div><p className='fw-bold' style={{color:"green"}}>Your Balance is : {balance}</p></div>:null}
          <button type="submit" className='btn btn-success'>Check Balance</button>
        </div>
      </form>
    </div>
  )
}

export default Balance