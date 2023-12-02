import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FlexColumn} from '../Components/UI'
import { ProfileImg } from "../Components/Profile/Profile.styles"
import { FormButton, FormCard, StyledForm, StyledInput } from "../Components/Auth/Auth.styles"
import { setUser } from "../redux/authSlice"
import { toast } from 'react-toastify'
import { toastCard } from "../Components/toastCard"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { app } from "../firebase/firebase"
import SignoutModal from "../Components/Modals/SignoutModal"
import { useUpdateUserMutation } from "../redux/userApi"

const Profile = () => {
  const user = useSelector(state => state.auth.user)

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(undefined)
  const [uploadPercent, setUploadPercent] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log("FORMDATA: ", formData)

  const id = useSelector(state => state.auth.user?._id)
  const fileRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const [updateUser, { data: userData }] = useUpdateUserMutation()

  console.log("USER:", user)

  // const handleChange = (e) => {

  //   setFormData({ ...formData, [e.target.id]: e.target.value });

  // }

  useEffect(()=> {
      
      if(!user){
        navigate('/login')
      }
  
    }, [user])

    const updateHandler = (e) => {
      e.preventDefault()

        updateUser(id, formData)

        dispatch(setUser(formData))
        console.log("USER DATA: ", userData)
        toast('Profile updated successfully', toastCard)
      
      
    }

    const deleteHandler = () => {
      console.log('delete')
    }


    useEffect(()=> {

      if(image){
        handleFileUpload(image)
      }

    }, [image])

    const handleFileUpload = async (image) => {
      console.log(image)

      const storage = getStorage(app)
      const fileName = new Date().getTime() + image.name
     const storageRef = ref(storage, fileName)

     const uploadTask = uploadBytesResumable(storageRef, image)
     uploadTask.on('state_changed',
        (snapshot)=> {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadPercent(progress)
          console.log(progress)
        },
        (error) => {
      setImageError(error) 
     },
     ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setFormData({ ...formData, profilePicture: downloadURL }))
     }
     );
    }

  return (
    <div>
      <FlexColumn>
      <h1 className="text-3xl my-4">Profile</h1>
      <FormCard className="mt-2">
        <StyledForm onSubmit={updateHandler}>
          <input type="file" className="hidden" ref={fileRef} accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
        <ProfileImg src={formData.profilePicture || user?.profilePicture} alt="" onClick={()=> fileRef.current.click()} />

        {
          imageError ? (
          <h1 className="text-red-500">Error uploading image (File size must be less than 3 MB)</h1> 
          ) : uploadPercent > 0 && uploadPercent < 100 ? (
          <h1 className={`${uploadPercent < 100 ? 'text-gray-500' : 'text-green-500'}`}>{Math.trunc(uploadPercent)}% uploaded</h1>
          ) : uploadPercent === 100 ? (
                <h1 className="text-green-500">Image uploaded successfully!</h1>
              ) : <h1 className="text-sm italic text-gray-400">Click avatar to choose new image</h1>
        }
        
        
        
        <StyledInput id="username" defaultValue={user?.username} onChange={(e)=> setFormData({ ...formData, username: e.target.value })} />
        <StyledInput id="email" defaultValue={user?.email} onChange={(e)=> setFormData({ ...formData, email: e.target.value })} />
        <StyledInput id="password" placeholder="Password" onChange={(e)=> setFormData({ ...formData, password: e.target.value })} />
        <FormButton type="submit">Update</FormButton>
        </StyledForm>
      </FormCard>
      
      <div className="flex items-center justify-between w-11/12 max-w-[600px] self-center mt-5">
        <span onClick={deleteHandler} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={()=> setOpen(true)} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      
      </FlexColumn>
      <SignoutModal open={open} setOpen={setOpen} />
      
      
    </div>
  )
}

export default Profile