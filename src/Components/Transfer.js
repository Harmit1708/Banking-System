import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function Transfer() {
  let [msg,setMsg] = React.useState();
  let handleSubmit = async(values) => {
    let res = await axios.post("https://banking-system0.herokuapp.com/users/transfer",values);
    setMsg(res.data.message)
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      creditAccountHolderName: "",
      debitAccountHolderName: "",
      creditAccountNumber: "",
      debitAccountNumber:"",
      transferAmount: "",
    },
    validationSchema: Yup.object({
      creditAccountHolderName:Yup.string().required("Required"),
      debitAccountHolderName:Yup.string().required("Required"),
      creditAccountNumber:Yup.string().required("Required"),
      debitAccountNumber:Yup.string().required("Required"),
      transferAmount: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="container">
      <h2 className="mt-5">Transfer Money</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-5">
          {" "}
          <label className="fw-bold" htmlFor='creditAccountHolderName'>Credit Account Holder Name</label>
          <br></br>
          <input type="text" className="form-control w-50" id="creditAccountHolderName"
            name="creditAccountHolderName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.creditAccountHolderName}/> {formik.touched.creditAccountHolderName && formik.errors.creditAccountHolderName ? (
            <div style={{ color: "red"}}>
              {formik.errors.creditAccountHolderName}
            </div>
          ) : null}<br></br>
          <label className="fw-bold" htmlFor='creditAccountNumber'>Credit Account Number</label>
          <br></br>
          <input type="text" className="form-control w-50" id="creditAccountNumber"
            name="creditAccountNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.creditAccountNumber}/> {formik.touched.creditAccountNumber && formik.errors.creditAccountNumber ? (
            <div style={{ color: "red"}}>
              {formik.errors.creditAccountNumber}
            </div>
          ) : null} <br></br>
          <p className="text-center w-50 fw-bold" style={{ fontSize: "20px" }}>
            To
          </p>
          <label className="fw-bold" htmlFor='debitAccountHolderName'>Debit  Account Holder Name </label>
          <br></br>
          <input type="text" className="form-control w-50" id="debitAccountHolderName"
            name="debitAccountHolderName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.debitAccountHolderName}/> {formik.touched.debitAccountHolderName && formik.errors.debitAccountHolderName ? (
            <div style={{ color: "red"}}>
              {formik.errors.debitAccountHolderName}
            </div>
          ) : null} <br></br>
          <label className="fw-bold" htmlFor='debitAccountNumber'>Debit  Account Number </label>
          <br></br>
          <input type="text" className="form-control w-50" id="debitAccountNumber"
            name="debitAccountNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.debitAccountNumber}/> {formik.touched.debitAccountNumber && formik.errors.debitAccountNumber ? (
            <div style={{ color: "red"}}>
              {formik.errors.debitAccountNumber}
            </div>
          ) : null}  <br></br>
          <label className="fw-bold" htmlFor='transferAmount'>Transfer Amount</label>
          <br></br>
          <input type="text" className="form-control w-50" id="transferAmount"
            name="transferAmount"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.transferAmount}/> {formik.touched.transferAmount && formik.errors.transferAmount ? (
            <div style={{ color: "red"}}>
              {formik.errors.transferAmount}
            </div>
          ) : null} <br></br>
          {msg ? <div><p style={{color:"green"}} className="fw-bold">{msg}</p></div> : null}
          <button type="submit" className="btn btn-success">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Transfer;
