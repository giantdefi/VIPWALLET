import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormPassword } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function PasswordReg() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { password } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormPassword(value))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'password') {
            // inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    const togglePassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    {/* <p className="mb-2 text-sm"> Buat password min 8 karakter </p> */}
                    <div className="flex justify-between">
                        <p className="mb-2 text-sm"> Create Secure Password min 8 characters </p>
                        {!showPassword ?
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer ">
                                <p className="text-sm text-yellow-300"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2 text-yellow-300" /></p>
                            </div> :
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                                <p className="text-sm text-yellow-300"> Show </p><p>   <i className="icofont-eye text-xl ml-2 text-yellow-300" /></p>
                            </div>}
                    </div>

                    <input autoComplete="off" type={!showPassword ? "password" : "text"} className="bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="password"
                        value={password || ''}
                        onChange={handleChange}


                    />
                    {formError && formError.path === 'password' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



