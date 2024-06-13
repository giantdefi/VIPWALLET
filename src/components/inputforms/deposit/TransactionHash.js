import React, { useEffect, useState, useRef } from "react";

import TronWeb from 'TronWeb'


//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setTransactionHash } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//-------------------------------------------------------


export default function TransactionHash() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { transactionHash } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 100) {
            dispatch(setTransactionHash(value))
        }
    }

    const handleMaxReset = () => {
        dispatch(setError(false))
        dispatch(setPlaySound('click'))
        dispatch(setTransactionHash(false))
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'transactionHash') {
            //    inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])

    // console.log(username)

    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <div className="flex justify-between mb-2">
                        <p className="mb-2 text-sm"> Copy paste Transaction Hash </p>
                        <div className="flex justify-between gap-2">
                            <button onClick={handleMaxReset} className="mb-2 text-sm border px-2 rounded-sm"> Reset </button>
                        </div>
                    </div>

                    <textarea type="text" className="text-sm bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="transactionHash"
                        value={transactionHash || ''}
                        onChange={handleChange}>

                    </textarea>
                    {formError && formError.path === 'transactionHash' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }

                    <div className="flex justify-end mb-2">
                        {transactionHash &&
                            <a href={`https://bscscan.com/tx/${transactionHash}`} target="_blank" rel={"noreferrer"}
                                className="mb-2 text-sm border px-2 py-1 bg-green-700 rounded-sm uppercase mt-4"
                            > CHECK ON bscscan</a>
                        }
                        {!transactionHash &&
                            <button
                                className="mb-2 text-sm border px-2 py-1 bg-red-700 rounded-sm uppercase mt-4"
                            > CHECK BEP-20 Scan</button>
                        }
                    </div>
                </div>
            </div>


        </>

    )
}



