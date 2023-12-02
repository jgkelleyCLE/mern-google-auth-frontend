
import { Dialog } from '@headlessui/react'
import { FlexRow } from '../UI'
import { toastCard } from '../toastCard'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/authSlice'

const SignoutModal = ({ open, setOpen }) => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        console.log('logout')
        dispatch(logoutUser())
        toast('Logged out successfully', toastCard)
      }

  return (
    <div>
        <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 backdrop-blur-sm bg-black/40" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-11/12 max-w-[500px] rounded bg-white flex flex-col items-center p-3">
          <Dialog.Title>Are you sure you want to sign out?</Dialog.Title>

          

          <FlexRow>
            <button className="bg-gray-400 hover:bg-gray-500 transition duration-300 text-white rounded-md p-2 m-2 focus:outline-none">Cancel</button>
            <button className="bg-red-500 hover:bg-red-600 transition duration-300 text-white rounded-md p-2 m-2 focus:outline-none" onClick={logoutHandler}>Sign out</button>
          </FlexRow>
        </Dialog.Panel>
      </div>
    </Dialog>
    </div>
  )
}

export default SignoutModal