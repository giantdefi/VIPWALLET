import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormPhone } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function Phone() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const { userPhone } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { phone } = useSelector((state) => state.AuthReducer)


    useEffect(() => {
        if (phone) {
            dispatch(setFormPhone(phone))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phone])

    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 18) {
            dispatch(setFormPhone(value))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'userPhone') {
            //   inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <p className="mb-1 text-sm">Phone / WhatApps with country code (+XX)   </p>

                    <input type="text" autoComplete="off" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="userPhone"
                        value={userPhone || ''}
                        onChange={handleChange}
                    />
                    {formError && formError.path === 'userPhone' ?
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



