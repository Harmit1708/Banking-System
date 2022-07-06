import React ,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateAccount() {
  let generateAccountNumber =  Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  var [accountNumebrOriginal,setAccountNumebrOriginal] = useState() ;
  let handleSubmit = async (values) => {
    generateAccountNumber++;
    values['accountNumber'] = generateAccountNumber;
    let res = await axios.post('https://banking-system0.herokuapp.com/users/create-account',values);
    setAccountNumebrOriginal(res.data.accountNumber);
    formik.resetForm()
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });


  return (
    <div className="container">
      <h2 className="mt-5">Create Account</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-5">
          <label className="fw-bold" htmlFor="name">
            Enter Your Name
          </label>
          <br></br>
          <input
            className="form-control w-50"
            type="text"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red"}}>
              {formik.errors.name}
            </div>
          ) : null}
          <br></br>
          {accountNumebrOriginal ? <div><p style={{color:"green"}} className="fw-bold">Your Account Number Is : {accountNumebrOriginal}</p></div> : null}
          <button type="submit" className="btn btn-success">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
