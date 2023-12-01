import tw from 'tailwind-styled-components'
import { ImSpinner8 } from "react-icons/im";


export const FlexColumn = tw.div`
    flex
    flex-col
    items-center
    w-full
`


export const ButtonSpinner = tw(ImSpinner8)`
    text-white
    w-6
    h-6
    animate-spin
    self-center
`
