import React, { useState } from "react";
import axios from 'axios';

//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux';
import { setBalance, setBonusSponsor } from 'redux/reducers/AuthReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//--------------------------------------


export default function BtnConvertBonusToWallet() {

    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch();

    const { username, bonusSponsor } = useSelector((state) => state.AuthReducer)


    const getUserBalance = async () => {

        const data = {
            action: 'GET_USER_BALANCE_BONUS', // get balance and bonus_sponsor
            username: username,
        }

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/users`,
            method: 'POST',
            data
        })
            .then(async response => {
                if (response.data.isSuccess) {
                    const data = response.data.userData
                    dispatch(setBalance(data.balance))
                    dispatch(setBonusSponsor(data.bonus_sponsor))
                } else {
                    console.log(response.data)
                }
            }).catch(function (error) {

                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }


    //----------------------------------------------------
    const ConvertToWallet = async () => {

        setSpinner(true)

        const data = {
            action: 'CONVERT_BONUS_TO_WALLET',
            username: username,
        }

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/users`,
            method: 'POST',
            data
        })
            .then(async response => {

                if (response.data.isSuccess) {
                    await getUserBalance()
                    window.scrollTo({
                        left: 0,
                        top: 0,
                        behavior: 'instant',
                    });
                    dispatch(setPlaySound('success'))
                    dispatch(setModalMessage({ type: 'success', title: "Request Success!", message: 'Request Convertion successful' }))

                } else {
                    console.log(response.data)

                }

                setSpinner(false)
            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }


    return (
        <>

            <div className="container px-1  mx-auto">
                <div className="flex flex-col">

                    {spinner ?
                        <button
                            className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
                            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>  PROCESSING....</button>
                        :

                        !bonusSponsor ?
                            <button
                                className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
                                <i className="icofont-ban mr-2 text-2xl text-red-500"></i>  CONVERT TO WALLET
                            </button> :

                            <button onClick={ConvertToWallet}
                                className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
                                <i className="icofont-rounded-double-right  mr-2 text-2xl"></i>
                                CONVERT TO WALLET
                            </button>
                    }


                </div>
            </div>

        </>
    )
}



