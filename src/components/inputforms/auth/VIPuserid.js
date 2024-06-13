import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Router, { useRouter } from "next/router";


//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setSendDestUsername, setIsAlreadyChecked, setShowCaptcha } from 'redux/reducers/FormReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setAttemps, setBtnCheckDisabled } from 'redux/reducers/SettingReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
import { resetCard,setCardNo, setJoinDate, setNametitle, setName, setVIPID, setAllowAnimated, setUsersCount } from 'redux/reducers/CreditCardReducer'
//-------------------------------------------------------


export default function Destination() {

    const router = useRouter();
 
    const inputRef = useRef()

    const [timer, setTimer] = useState(100) // set timer here. only variable
    const [destData, setDestData] = useState(false)
    const [currentSeconds, setCurrent] = useState(0)
    const [check, setCheck] = useState(false) // local
    const [isCheck, setIdCheck] = useState(false) // local
    const [spinnerCheck, setSpinnerCheck] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { sendDestUsername } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { isLogin, username, balance, token } = useSelector((state) => state.AuthReducer)
    const { attemps, btnCheckDisabled } = useSelector((state) => state.SettingReducer)
    const { VIPID } = useSelector((state) => state.CreditCardReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const re = /^[0-9]*\.?[0-9]*$/; // only number
        const { name, value } = e.target
        if (re.test(value.substring(3))) { // remove 3 chard to get only number
        if (value.length <= 15 && value.length >= 8) {
            dispatch(setVIPID(value))
        }
    }
    }

    // scroll to top and focus
    useEffect(() => {
        if (formError && formError.path === 'VIPID') {
             inputRef.current.focus()
         //   inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
             
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])

    const handleCheck = async () => {

        dispatch(setError(false))

        setSpinnerCheck(true)

        if (!VIPID) {
            setSpinnerCheck(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "setVIPID", message: 'VIP-ID is missing' }))
        }

      
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        console.log(URL)
        return axios({
            url: `${URL}/users/check-id-available?username=${VIPID}`,
            method: 'get',
            'headers': {
               // 'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                setIdCheck(true)

                if (response.data.isSuccess) {
                    const userData = response.data.data;
                  //  console.log(userData)
                    setTimeout(() => {
                        // dispatch(setPlaySound('pling'))
                        setSpinnerCheck(false)
                        setDestData(userData)
                        setCheck(true)
                       
                    }, 500)
                } else {
                    //  console.log(response.data)
                    dispatch(setError({ path: response.data.path, message: response.data.message }))
                    setDestData(false)
                    setSpinnerCheck(false)
                    setCheck(false)
                    return dispatch(setPlaySound('error'))
                }
            }).catch(function (error) {
                console.log(error)
                setSpinnerCheck(false)
                alert(error) // test in mobile
            });
    }

    //  console.log(destData)

    return (
        <>
            <div className="w-full px-4 mt-5">
             
                {btnCheckDisabled && <p className="text-sm">Wait for next : {currentSeconds} of {timer} sec </p>}
                <div className="w-full px-4 mt-5">

                    <p className="mb-2 text-sm"> You can create your own custom VIP-ID </p>
                    <p className="mb-2 text-xs"> Only If available {!spinnerCheck && isCheck ? check? <i className="icofont-check-circled text-green-500 text-lg"/>:<i className="icofont-close-circled text-red-600 text-lg"/> : ''}</p>
                    <p className="mb-2 text-xs"> Edit the last 6 digits : </p>
                    <div className="flex w-full justify-between gap-20">

                        <div className="flex w-10/12">

                            <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                                name="VIPID"
                                value={VIPID || ''}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="flex w-2/12">

                            {spinnerCheck ?
                                <button className="w-full border border-gray-500 px-4 py-2 rounded-md bg-green-800 hover:bg-green-900">
                                    <svg role="status" className="mr-1 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> </button> :

                                btnCheckDisabled ? <button className="border border-gray-500 px-4 py-2 rounded-md bg-red-800 hover:bg-red-900">
                                    CHECK</button>
                                    :
                                    <button onClick={handleCheck} className="_gradient_green px-4 py-2 rounded-md bg-green-800 hover:bg-green-900">
                                        CHECK</button>
                            }

                        </div>
                    </div>

                    {formError && formError.path === 'VIPID' ?
                        <p className="text-yellow-300 ml-2 text-xs mt-1">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p>
                        : null
                    }
                    {destData &&
                        <div className="border-2 border-dashed mt-2 py-2 pl-4 border-gray-500 rounded-lg text-sm">
                            <p>WhatsApp : {destData.phone}</p>
                            <p>Total Receive : $ {parseFloat(destData.total_receive).toFixed(2)}</p>
                            <p>Current EWallet : $ {parseFloat(destData.e_wallet).toFixed(2)}</p>
                            <p>Current RWallet : $ {parseFloat(destData.r_wallet).toFixed(2)}</p>
                            <p>Status : {destData.active_status ? "Active" : "Not Active"}</p>
                        </div>
                    }


                </div>
            </div>

        </>

    )
}



