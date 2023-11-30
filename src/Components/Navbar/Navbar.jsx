import { NavContainer, NavHeader, StyledLink } from "./Navbar.styles"


const Navbar = () => {
  return (
    <NavContainer>
        <StyledLink to="/"><NavHeader>MERN AUTH</NavHeader></StyledLink>
        <div>
          <StyledLink to="/register">Register</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </div>
    </NavContainer>
  )
}

export default Navbar