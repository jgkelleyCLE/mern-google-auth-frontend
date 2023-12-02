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

export const NavButton = tw.div`
    flex
    flex-row
    items-center
    p-1
    border-2
    border-white
    rounded-md
`

export const NavButtonText = tw.p`
    text-white
    text-md
    ml-2
`

export const NavButtonIcon = tw.img`
    w-10
    h-10
    rounded-full
    object-cover
    mr-2
`