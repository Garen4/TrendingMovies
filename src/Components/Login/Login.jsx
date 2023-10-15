import React, { useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Login({ saveUserData }) {
  
  async function getUserData(values) {
    setloding(true)
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).catch((err) => {
      setloding(false)
      setCatchErros(err.response.data.message)
    })
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      saveUserData();
      setloding(false)
      navigate('/home')
    }
  }
  
  const [CatchErros, setCatchErros] = useState('')
  const [loding, setloding] = useState(false)
  let navigate = useNavigate();



  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email('Invalid email address'),
    password: Yup.string().required("password is required").matches(/^^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must start with uppercase'),

  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: getUserData
  })



  return <>
    <div className="w-75 py-5">
      <h2 className='h1'>Go To Login</h2>
      <form onSubmit={formik.handleSubmit}>
        {CatchErros ? <div className="alert-danger"> {CatchErros} </div> : ''}

        <label htmlFor="email">Email :</label>
        <input type="email" name='email' id='email' className=' form-control my-2 ' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger "> {formik.errors.email} </div> : null}

        <label htmlFor="password">Password :</label>
        <input type="password" name='password' id='password' className=' form-control my-2 ' value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger"> {formik.errors.password} </div> : null}

        {loding ?
          <button className='spiner'></button> :
          <button type='submit' className='btn bg-main text-white'>Login</button>
        }



      </form>
    </div>
  </>
}
