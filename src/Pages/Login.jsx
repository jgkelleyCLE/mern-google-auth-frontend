import { FormCard, StyledInput, FormButton, GoogleButton, StyledForm } from '../Components/Auth/Auth.styles'
import { ButtonSpinner, FlexColumn } from '../Components/UI'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLoginUserMutation } from '../redux/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import OAuth from '../Components/Auth/OAuth'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginUser, { data: loginData, isLoading, isSuccess, isError, error }] = useLoginUserMutation()

  const submitHandler = (e) => {
    e.preventDefault()

    if(formData.email && formData.password){
      loginUser(formData)
      
    }else {
      toast("All fields required", {
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

  }

  useEffect(()=> {

    if(isSuccess){
      dispatch(setUser(loginData))
      toast(`Logged in as ${loginData.username}`, {
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
      toast(error?.data?.message, {
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
          <h1 className="text-2xl my-2">Login</h1>
          <StyledForm onSubmit={submitHandler}>
          
          <StyledInput placeholder='Email' value={formData.email} onChange={(e)=> setFormData({ ...formData, email: e.target.value })} />
          <StyledInput type="password" placeholder='Password' value={formData.password} onChange={(e)=> setFormData({ ...formData, password: e.target.value })} />
          <FormButton type="submit">{isLoading ? <ButtonSpinner /> : "Login" }</FormButton>
          
          <OAuth />
          </StyledForm>
        </FormCard>
        <h1 className="mt-4">Need an account? <Link className="text-blue-500" to="/register">Register</Link></h1>

      </FlexColumn>
    </div>
  )
}

export default Login