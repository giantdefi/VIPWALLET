import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setUserclone } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function CloneUsername() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { userClone } = useSelector((state) => state.FormReducer)

    // handle on input value change
    const handleChange = async (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 10) {
            const re = /^[0-9a-zA-Z]*$/
            if (re.test(value)) {
                if (value.length <= 10) {
                    dispatch(setUserclone((value.toUpperCase().trim())))
                }
            }
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'userClone') {
            // inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    return (
        <>
            <div className="w-full  px-2 mt-5">
                <div className="relative w-full mb-3">
                    <p className="mb-2 text-sm">  Buat Username baru min 6 - 10 karakter </p>
                    <input type="text" autoComplete="off" className="bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="userClone"
                        value={userClone || ''}
                        onChange={handleChange}
                    />

                    {formError && formError.path === 'userClone' ?
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



