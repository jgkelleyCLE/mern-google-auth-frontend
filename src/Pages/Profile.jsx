import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FlexColumn} from '../Components/UI'
import { ProfileImg } from "../Components/Profile/Profile.styles"
import { FormButton, FormCard, StyledForm, StyledInput } from "../Components/Auth/Auth.styles"
import { logoutUser } from "../redux/authSlice"
import { toast } from 'react-toastify'

const Profile = () => {

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(user)

  useEffect(()=> {
      
      if(!user){
        navigate('/login')
      }
  
    }, [user])

    const updateHandler = (e) => {
      e.preventDefault()
      console.log('update')
    }

    const deleteHandler = () => {
      console.log('delete')
    }

    const logoutHandler = () => {
      console.log('logout')
      dispatch(logoutUser())
      toast('Logged out successfully', {
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

  return (
    <div>
      <FlexColumn>
      <h1 className="text-3xl my-4">Profile</h1>
      <FormCard className="mt-2">
        <StyledForm onSubmit={updateHandler}>
        <ProfileImg src={user?.profilePicture} alt="" />
        <StyledInput defaultValue={user?.username} />
        <StyledInput defaultValue={user?.email} />
        <StyledInput placeholder="Password" />
        <FormButton type="submit">Update</FormButton>
        </StyledForm>
      </FormCard>
      
      <div className="flex items-center justify-between w-11/12 max-w-[600px] self-center mt-5">
        <span onClick={deleteHandler} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={logoutHandler} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      
      </FlexColumn>
      
      
    </div>
  )
}

export default Profile