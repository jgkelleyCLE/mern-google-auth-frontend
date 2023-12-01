import tw from 'tailwind-styled-components'

export const FormCard = tw.div`
    w-11/12
    max-w-[600px]
    bg-gray-200
    p-2
    flex
    flex-col
    items-center
    rounded-md
    mt-20
`

export const StyledInput = tw.input`
    w-11/12
    m-2
    p-2
    text-lg
    rounded-md
    focus:outline-none
`

export const FormButton = tw.button`
    bg-blue-800
    hover:bg-blue-700
    transition
    duration-500
    rounded-md
    p-2
    text-white
    w-11/12
    m-2
    flex
    items-center
    justify-center
`

export const GoogleButton = tw(FormButton)`
    bg-red-700
    hover:bg-red-600
`

export const StyledForm = tw.form`
    flex
    flex-col
    items-center
    w-full
`