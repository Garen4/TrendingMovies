import React, { useState } from 'react'
import styles from './Register.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'




export default function Register() {
  async function sendRegisterData(values) {
    setLoding(true)
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values).catch((err) => {
      setLoding(false)
      console.log(err);
      setErrors(err.response.data.message)
    })

    if (data.message === 'success') {
      setLoding(false)
      navigate('/login')
    }

  }
  const [errors, setErrors] = useState('')
  const [loding, setLoding] = useState(false)
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, 'Must be 3 characters or less ').max(25, 'Must be 25 characters or max'),
    email: Yup.string().required("Email is required").email('Invalid email address'),
    phone: Yup.string().required("phone is required").matches(/^\+?[0-9]\d{1,20}$/, 'Phone invalid'),
    password: Yup.string().required("password is required").matches(/^^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must start with uppercase'),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref('password')], 'rePasword dosent match password')
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: sendRegisterData
  })






  return <>
    <div className="w-75 mx-auto py-5 ">
      {errors ? <div className="alert alert-danger">{errors}</div> : ''}
      <h2 className='h1'> Register Now</h2>
      <form onSubmit={formik.handleSubmit} >
        {/* Name Field */}
        <label htmlFor='name'>Name : </label>
        <input type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' className='form-control my-2' id='name' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}

        {/* Email Field */}
        <label htmlFor='email'>Email : </label>
        <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' className='form-control my-2' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


        {/* Password Field */}
        <label htmlFor='password'>password : </label>
        <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' className='form-control my-2' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}


        {/* rePassword Field */}
        <label htmlFor='rePassword'>rePassword : </label>
        <input type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name='rePassword' className='form-control my-2' id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}


        {/* phone Field */}
        <label htmlFor='phone'>Phone : </label>
        <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' className='form-control my-2' id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

        {/* button register */}
        {loding ?
          <button className='spiner'></button> :
          <button type='submit' className='btn bg-main my-3 px-3 text-white '>Register</button>

        }

      </form>
    </div>
  </>
}
