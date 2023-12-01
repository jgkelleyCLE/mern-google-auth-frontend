import { useDispatch, useSelector } from "react-redux"
import { NavButton, NavButtonIcon, NavButtonText, NavContainer, NavHeader, StyledLink } from "./Navbar.styles"
import { logoutUser } from "../../redux/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FlexRow } from "../UI"


const Navbar = () => {

  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  

  useEffect(()=> {
    if(!user){
      navigate('/login')
      
    }

  }, [user])

  return (
    <NavContainer>
        <StyledLink to={user ? "/" : "/login"}><NavHeader>MERN AUTH</NavHeader></StyledLink>

        {
          user ?  (
            <FlexRow>
          
          <StyledLink to="/profile">
              <NavButton>
              <NavButtonIcon src={user?.profilePicture} alt="" />
                <NavButtonText className="capitalize">{user?.username}</NavButtonText>
              </NavButton>
            </StyledLink>
         
          </FlexRow>
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