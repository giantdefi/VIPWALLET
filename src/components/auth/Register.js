import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import axios from 'axios';
import Head from 'next/head'

import Sponsor from "components/inputforms/auth/Sponsor";
import UsernameReg from "components/inputforms/auth/UsernameReg";
import Phone from "components/inputforms/auth/Phone";
import Email from "components/inputforms/auth/Email";
import Password from "components/inputforms/auth/Password";
import ConfirmPassword from "components/inputforms/auth/ConfirmPassword";

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setUsername, setToken, setIsActive } from 'redux/reducers/AuthReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { resetForm } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
import { setRefLink } from 'redux/reducers/ReferralReducer';
//--------------------------------------

export default function Register() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    //  const [successReg, setSuccesReg] = useState(false)

    const { sponsor, username, phone,email,  password, confirmPassword } = useSelector((state) => state.FormReducer)
    const { isLogin } = useSelector((state) => state.AuthReducer)

    const handleRegister = async () => {

        dispatch(setPlaySound('click'))

        setSpinner(true)

        if (isLogin) return false

        const data = {
            sponsor: sponsor,
            username: username,
            phone: phone,
            email: email,
            password: password,
        }

       

        if (!data.sponsor) {
            setSpinner(false)
            return dispatch(setError({ path: "sponsor", message: 'Sponsor is missing' }))
        }
        if (!data.username) {
            setSpinner(false)
            return dispatch(setError({ path: "username", message: 'USERNAME is missing' }))
        }

        if (!data.phone) {
            setSpinner(false)
            return dispatch(setError({ path: "phone", message: 'PHONE is missing' }))
        }
        
        if (!data.email) {
            setSpinner(false)
            return dispatch(setError({ path: "email", message: 'EMAIL is missing' }))
        }

        if (!data.password) {
            setSpinner(false)
            return dispatch(setError({ path: "password", message: 'PASSWORD is missing' }))
        }

        if (data.password !== confirmPassword) {
            setSpinner(false)
            return dispatch(setError({ path: "confirmPassword", message: "Confirm password problem!" }))
        }

        console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/users/register`,
            method: 'POST',
            data
        })
            .then(async response => {

                if (response.data.isSuccess) {

                    const userData = response.data.data

                    dispatch(setLogin(userData.isLogin))
                    dispatch(setUsername(userData.username))        
                    dispatch(setToken(response.data.token))
                    dispatch(setIsActive(false))
                    setSpinner(false)
                    dispatch(resetForm())
                    dispatch(setPlaySound('success'))

                    dispatch(setRefLink(userData.username)) // make it as next sponsor

                    return dispatch(setModalMessage({ type: 'success', title: "REGISTRATION Success!", message: 'Now You are Login' }))

                } else {


                    setSpinner(false)
                    dispatch(setPlaySound('error'))
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

            }).catch(function (error) {
                //  setSpinnerBtn(false)
                console.log(error)
                setSpinner(false)

                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }


    return (
        <>


            <div className="mt-6 px-4 mb-20 border border-slate-500 rounded">


                <div className="text-center mb-3">
                    <h5>Create your Account</h5>
                </div>

                <div className="text-center mb-3 w-10/12 mx-auto">
                    <Sponsor />
                </div>

                <form autoComplete="off" >
                    <UsernameReg />
                    <Phone />
                    <Email/>
                    <Password />
                    <ConfirmPassword />
                </form>



                <div className="flex justify-center mt-10 mb-10">
                    <button onClick={handleRegister} className="_btn_submit_green py-2 px-8 border-2 border-gray-400  text-lg">
                        {spinner &&
                            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        }

                        REGISTER ACCOUNT</button>
                </div>
            </div>




        </>
    )
}



