import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormUsername, setFormUserToken } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function Username() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = async (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
                  //  const userUppercase = (value)
                    dispatch(setFormUsername(value))
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'username') {
            //    inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    return (
        <>

            <p className="mb-2  text-white"> Email or VIP ID </p>
            <input type="text" autoComplete="off" className="w-100 mt-2 py-3 px-3 rounded-full shadow-2xl bg-gray-800  border border-gray-400 
                     text-gray-50  focus:border-blue-500 focus:outline-none"  ref={inputRef}
                name="username"
                value={username || ''}
                onChange={handleChange}
            />
            {formError && formError.path === 'username' ?
                <p className="text-yellow-300 ml-2 mt-2 text-sm">
                    <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                    {formError.message}
                </p> : null
            }



        </>

    )
}



