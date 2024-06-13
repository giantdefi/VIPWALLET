import React, { useEffect, useState, useRef } from "react"
import axios from 'axios';

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalSponsorHistorySearch, setModalMessage, setModalPleaseLogin } from 'redux/reducers/ModalReducer';
import { setError } from 'redux/reducers/ErrorReducer'
import { setBonusSponsorHistory, setTotalBonusSponsorTsx, setTotalBonusSponsor } from 'redux/reducers/HistoryReducer'
import { setSearchUsername } from 'redux/reducers/FormReducer'

//-------------------------------------------------------


export default function BonusSponsorSearchUsername() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)

    const { username, isLogin, token, isBinary } = useSelector((state) => state.AuthReducer)
    const { searchUsername } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        if (value.length <= 10) {
            dispatch(setSearchUsername(value.toUpperCase().trim()))
        }
    }


    const handleCheckDelay = async () => {
        //  console.log('delayed........')
        setSpinner(true)
        dispatch(setError(false))
        setTimeout(() => {
            chseckUserInBinary(searchUsername)
        }, 500)
    }

    const chseckUserInBinary = async (searchUsername) => {

        if (!searchUsername) {
            setSpinner(false)
            return false
            // return dispatch(setModalPleaseLogin(true))
        }

        if (!isLogin) {
            setSpinner(false)
            return dispatch(setError({ path: "searchUsername", message: 'Username not found' }))
        }

        if (!isBinary) {
            setSpinner(false)
            return dispatch(setError({ path: "searchUsername", message: 'Username not found' }))
        }

        setSpinner(true)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/search-from-bonus-sponsor?username=${username}&user=${searchUsername}`,
            method: 'GET',
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }

        })
            .then(async response => {

                const data = response.data

                if (data.isSuccess) {
                    dispatch(setBonusSponsorHistory(data.dataLimit))
                    dispatch(setTotalBonusSponsorTsx(data.totalAllTxs))
                    dispatch(setTotalBonusSponsor(data.totalAllBonus))
                } else {
                    dispatch(setModalMessage({ type: 'warning', title: "User Not Found!", message: 'Search User is not found' }))
                }

                setSpinner(false)
                return dispatch(setModalSponsorHistorySearch(false))

            }).catch(function (error) {
                setSpinner(false)
                dispatch(setModalSponsorHistorySearch(false))
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }


    return (
        <>
            <div className="w-full  mt-2">
                <p className="mb-2  text-gray-300">Enter Username : </p>
                <div className="flex flex-row gap-5">
                    <div className="w-7/12">
                        <input type="text" autoComplete="off" className="bg-gray-600 w-full  border text-white
                        border-gray-600 rounded-md py-2 px-3" ref={inputRef}
                            name="searchUsername"
                            value={searchUsername || ''}
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



                {formError && formError.path === 'searchUsername' ?
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



