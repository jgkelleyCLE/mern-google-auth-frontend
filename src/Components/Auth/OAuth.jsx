import { GoogleButton } from "./Auth.styles"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth"
import { app } from "../../firebase/firebase"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/authSlice"
import { useGoogleLoginMutation } from "../../redux/authApi"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const OAuth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [googleLogin, { data: googleData, isLoading, isSuccess, isError, error }] = useGoogleLoginMutation()

    

    const handleGoogleAuth = async() => {

        try {
            
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const formData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }

            googleLogin(formData)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=> {

        if(isSuccess){
            dispatch(setUser(googleData))
            toast(`Logged in as ${googleData.username}`, toastCard)
              navigate('/')
        
        }

    }, [isSuccess])

    useEffect(()=> {

        if(isError){
            toast(error?.data?.message, toastCard)
        
        }

    }, [isError])

  return (
    <GoogleButton type="button" onClick={handleGoogleAuth}>OAuth</GoogleButton>
  )
}

export default OAuth

const toastCard = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

// const handleGoogleClick = async() => {

    //     try {
            
    //         const provider = new GoogleAuthProvider()
    //         const auth = getAuth(app)
    //         const result = await signInWithPopup(auth, provider)

    //         console.log("RESULT: ", result)

    //         const res = await fetch('http://localhost:3001/api/auth/google', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 name: result.user.displayName,
    //                 email: result.user.email,
    //                 photo: result.user.photoURL
    //             })
    //         })
    //         const data = await res.json()
    //         console.log("DATA:", data)
    //         dispatch(setUser(data))

    //     } catch (error) {
    //         console.log("Could not login with google", error)
    //     }

    // }