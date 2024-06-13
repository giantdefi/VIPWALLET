import React, { useEffect, useState, useRef } from "react"
import axios from 'axios';

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalBinarySearch, setModalMessage, setModalPleaseLogin } from 'redux/reducers/ModalReducer';
import { setError } from 'redux/reducers/ErrorReducer'
import { setLoadUsername } from 'redux/reducers/MtreeReducer'
//-------------------------------------------------------


export default function ActivateUsernamed() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)

    const { isLogin, isBinary } = useSelector((state) => state.AuthReducer)

    const { formError } = useSelector((state) => state.ErrorReducer)

    const [usernamed, setUsernamed] = useState()


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 10) {
            setUsernamed(value.toUpperCase().trim())
        }
    }


    const handleCheckDelay = async () => {
        //  console.log('delayed........')
        setSpinner(true)

        dispatch(setError(false))

        setTimeout(() => {
            chseckUserInBinary(usernamed)
        }, 500)
    }

    // console.log(attemp)


    const chseckUserInBinary = async (usernamed) => {

        if (!usernamed) {
            setSpinner(false)
            return false
            // return dispatch(setModalPleaseLogin(true))
        }

        // if (!isBinary) {
        //     setSpinner(false)
        //     return dispatch(setModalPleaseLogin(true))
        // }

        setSpinner(true)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/binary/isBinary?user=${usernamed}`,
            method: 'GET',
            // 'headers': {
            //     'Authorization': token,
            //     accept: 'application/json',
            //     'content-type': 'application/json',
            // }

        })
            .then(async response => {

                if (response.data.isSuccess) {


                    dispatch(setLoadUsername(usernamed))
                    dispatch(setModalBinarySearch(false))

                } else {
                    dispatch(setModalBinarySearch(false))
                    dispatch(setModalMessage({ type: 'warning', title: "Search Fail", message: 'Username not found or not Active' }))
                }

                setSpinner(false)
            }).catch(function (error) {
                dispatch(setModalBinarySearch(false))
                setSpinner(false)
                return dispatch(setModalMessage({ type: 'danger', title: "Request Fail!", message: 'Please check your Internet connection' }))
            });
    }


    return (
        <>
            <div className="w-full mt-2">
                <p className="mb-2  text-white">Username to search </p>
                <div className="flex flex-row gap-2">
                    <div className="w-7/12">
                        <input type="text" autoComplete="off" className="bg-gray-600 w-full  border text-white
                        border-gray-600 rounded-md py-2 px-3" ref={inputRef}
                            name="usernamed"
                            value={usernamed || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-5/12">
                        {spinner ?
                            <button className="_btn_select_epins hover:bg-blue-900 border border-gray-500 px-4 py-2 rounded-md  ">
                                <svg role="status" className=" inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg> SEARCH</button> :

                            <button onClick={handleCheckDelay} className="_btn_select_epins hover:bg-blue-900 px-4 py-2 rounded-md ">
                                <i className="icofont-arrow-right"></i>  SEARCH</button>
                        }
                    </div>
                </div>



                {formError && formError.path === 'activateUsername' ?
                    <p className="text-yellow-300 ml-2 text-sm">
                        <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-2" />
                        {formError.message}
                    </p>
                    : null
                }
            </div>


        </>

    )
}



