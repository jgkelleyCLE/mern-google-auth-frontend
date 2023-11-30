import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

export const NavContainer = tw.div`
    h-16
    bg-gray-600
    flex
    items-center
    justify-between
    p-2
`

export const StyledLink = tw(Link)`
    text-white
    m-2
`

export const NavHeader = tw.h1`
    text-white
    text-2xl
`