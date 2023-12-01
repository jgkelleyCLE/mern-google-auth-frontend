import { FormCard, StyledInput, FormButton, GoogleButton, StyledForm } from '../Components/Auth/Auth.styles'
import { ButtonSpinner, FlexColumn } from '../Components/UI'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRegisterUserMutation } from '../redux/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import OAuth from '../Components/Auth/OAuth'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [registerUser, { data: registerData, isLoading, isError, isSuccess, error }] = useRegisterUserMutation()

  const registerHandler = (e) => {
    e.preventDefault()

    if(formData.username && formData.email && formData.password){
      registerUser(formData)
    }else {
      toast("All fields required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }

    
  }

  useEffect(()=> {

    if(isSuccess){
      dispatch(setUser(registerData))
      toast(`Successfully registered as ${registerData.username}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      navigate('/')
    }

  }, [isSuccess])


  useEffect(()=> {

    if(isError){
      toast(error?.message?.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }

  }, [isError])

 

  return (
    <div>
      <FlexColumn>
        <FormCard>
          <h1 className="text-2xl my-2">Register</h1>
          <StyledForm onSubmit={registerHandler}>
          <StyledInput placeholder='Username' value={formData.username} onChange={(e)=> setFormData({ ...formData, username: e.target.value })} />
          <StyledInput placeholder='Email' value={formData.email} onChange={(e)=> setFormData({ ...formData, email: e.target.value })} />
          <StyledInput placeholder='Password' value={formData.password} onChange={(e)=> setFormData({ ...formData, password: e.target.value })} />
          <FormButton type="submit">{isLoading ? <ButtonSpinner /> : 'Register'}</FormButton>
          
          <OAuth />
          </StyledForm>
        </FormCard>
        <h1 className="mt-4">Have an account? <Link className="text-blue-500" to="/login">Sign in</Link></h1>

      </FlexColumn>
      </div>
  )
}

export default Register