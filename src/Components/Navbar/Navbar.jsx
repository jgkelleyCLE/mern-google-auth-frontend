import { useDispatch, useSelector } from "react-redux"
import { NavContainer, NavHeader, StyledLink } from "./Navbar.styles"
import { logoutUser } from "../../redux/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'


const Navbar = () => {

  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutUser())
    toast('Successfully logged out!', {
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

  useEffect(()=> {
    if(!user){
      navigate('/login')
      
    }

  }, [user])

  return (
    <NavContainer>
        <StyledLink to="/"><NavHeader>MERN AUTH</NavHeader></StyledLink>

        {
          user ?  (
            <div>
          
          <StyledLink to="/profile">{user.username}</StyledLink>
          <StyledLink onClick={logoutHandler}>Logout</StyledLink>
          </div>
          ) : (
          <div>
          <StyledLink to="/register">Register</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </div>
          )
        }
        
    </NavContainer>
  )
}

export default Navbar