import { useState, useEffect } from "react"
import { useSelector , useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email , password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Password mismatch')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center custom-h">
        <h1 className="text-4xl font-bold">Register</h1>
        <p className="text-md font-medium mt-6">Create an account</p>
        <form className="flex flex-col gap-8 mt-14" onSubmit={onSubmit}>
          <input type="text" className="border-2 border-gray-400 rounded-md w-80 p-2" id="name" name="name" value={name} placeholder='enter name' onChange={onChange}/>
          <input type="email" className="border-2 border-gray-400 rounded-md w-80 p-2" id="email" name="email" value={email} placeholder='enter email' onChange={onChange}/>
          <input type="password" className="border-2 border-gray-400 rounded-md w-80 p-2" id="password" name="password" value={password} placeholder='enter password' onChange={onChange}/>
          <input type="password" className="border-2 border-gray-400 rounded-md w-80 p-2" id="password2" name="password2" value={password2} placeholder='confirm password' onChange={onChange}/>
          <div className="flex justify-center">
            <button className="bg-black text-white px-4 py-2 rounded-md">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register