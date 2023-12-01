import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const Home = () => {

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  useEffect(()=> {

    if(!user){
      navigate('/login')
    }

  }, [])

  return (
    <div>
        Home
    </div>
  )
}

export default Home