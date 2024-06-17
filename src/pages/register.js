import React, { useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

import axios from 'axios'
import Head from 'next/head'

import Name from "components/inputforms/auth/Name"
import Sponsor from "components/inputforms/auth/Sponsor"
import VIPuserid from "components/inputforms/auth/VIPuserid"
import Phone from "components/inputforms/auth/Phone"
import Email from "components/inputforms/auth/Email"
import PasswordReg from "components/inputforms/auth/PasswordReg"
import ConfirmPassword from "components/inputforms/auth/ConfirmPassword"
import Mastercard from "components/inputforms/auth/MasterCard"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setFormPhone } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setIsLogin, setUserID, setIsActive, setFullName, setPhone, setEmail, setToken } from 'redux/reducers/AuthReducer'
import { resetCard,setCardNo, setJoinDate, setName, setUserid, setAllowAnimated } from 'redux/reducers/CreditCardReducer'
import { setToggleLogin } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { sponsor, username, userPhone, userEmail, userCountry, password, confirmPassword } = useSelector((state) => state.FormReducer)
    const { isLogin, token } = useSelector((state) => state.AuthReducer)
    const { cardNo, joinDate, name, userid, allowAnimated, nametitle, random1, random2, random3, random4, usersCount, idLength, VIPID } = useSelector((state) => state.CreditCardReducer)
    const { toggleLogin } = useSelector((state) => state.MainmenuReducer)
    // on visiting page
    useEffect(() => {
        dispatch(setError(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isLogin) {
            router.push('/users')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])


    const handleRegister = async () => {

        setSpinner(true)

        dispatch(setError(false))
           
        if (!sponsor) {
            setSpinner(false)
            return dispatch(setError({ path: "sponsor", message: 'Sponsor is missing' }))
        }

        if (!name) {
            setSpinner(false)
            return dispatch(setError({ path: "name", message: 'Full Name is missing' }))
        }

        if (!userEmail) {
            setSpinner(false)
            return dispatch(setError({ path: "userEmail", message: 'Email is missing' }))
        }
        if (!userPhone) {
            setSpinner(false)
            return dispatch(setError({ path: "userPhone", message: 'Phone is missing' }))
        }
       
        if (userPhone === '+62') {
            setSpinner(false)
            return dispatch(setError({ path: "userPhone", message: 'Phone is missing' }))
        }
        if (userPhone === '+62') {
            setSpinner(false)
            return dispatch(setError({ path: "userPhone", message: 'Phone is missing' }))
        }
        if (userPhone.length < 12) {
            setSpinner(false)
            return dispatch(setError({ path: "userPhone", message: 'Invalid phone format' }))
        }
      
        if (userPhone.toString().substring(0, 1) != '+') {
            dispatch(setFormPhone('+62'+userPhone.substring(1)))
            setSpinner(false)
            return dispatch(setError({ path: "userPhone", message: 'Invalid phone format. Please Edit if required' }))
        } 
       
        if (!password) {
            setSpinner(false)
            return dispatch(setError({ path: "password", message: 'Password is missing' }))
        }

        if (password.length < 8) {
            setSpinner(false)
            return dispatch(setError({ path: "password", message: 'Password min 8 characters' }))
        }

        if (!confirmPassword) {
            setSpinner(false)
            return dispatch(setError({ path: "confirmPassword", message: 'Confirm Password is missing' }))
        }

        if (password !== confirmPassword) {
            setSpinner(false)
            return dispatch(setError({ path: "confirmPassword", message: 'Confirm Password does not matched' }))
        }

       
        //setSpinner(true)
      
        const data = {
            sponsor, 
            name,
            nametitle,
            phone: userPhone,
            password,
            VIPID,
            userEmail,

            random1, 
            random2, 
            random3, 
            random4,
        }

       console.log(data)


       
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/register`,
            method: 'POST',
            data
        })
            .then(async response => {

                if (response.data.isSuccess) {

                    const token = response.data.token
                    const dataLogin = response.data.dataLogin
                   
                    dispatch(setIsLogin(true))
                    dispatch(setToken(token))
                    dispatch(setUserID(dataLogin.userID))
                    dispatch(setFullName(dataLogin.fullname))
                    dispatch(setPhone(dataLogin.phone))
                    dispatch(setEmail(dataLogin.email))
                    dispatch(setIsActive(dataLogin.setIsActive))
                   
                    setSpinner(false)
                   return dispatch(setModalMessage({ type: 'success', title: "Registration Success!", message: 'Now You are Login' }))

                } else {
                    setSpinner(false)
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))

                }

            }).catch(function (error) {
                setSpinnerBtn(false)
                console.log(error)
                setSpinner(false)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }


    const handleToggle = () => {
        dispatch(setToggleLogin(true))
    }

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="flex mb-20 ">

                <div className="w-full  mt-4 py-6 px-1 mx-auto   animated fadeIn">

                    <h1 className="text-2xl bold  text-center pb-2 uppercase text-gray-100">Registration</h1>

               {/* <Mastercard/> */}


                    <p className="text-center mb-2 text-sm mt-1">Make sure you have a sponsor</p>
                    <hr className="border-gray-700" />

                    <div className="flex mb-2  bg-gray-700">
                        <Sponsor />
                    </div>
                 

                    <hr className="border-gray-700" />
                    <Name />
                    <VIPuserid />
                    
                    <Email/>
                    <Phone />
                    <PasswordReg />
                    <ConfirmPassword />

                    <hr className="border-gray-700" />

                  

                    <div className="flex justify-center mt-10">
                        {spinner ?
                            <button className="bg-green-900 hover:bg-green-800 text-white rounded-full py-2 px-8 border-2 border-gray-400  text-xl">

                                <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>  REGISTER </button>
                            :
                            <button onClick={handleRegister} className="bg-green-900 hover:bg-green-800 text-white rounded-full py-2 px-8 border-2 border-gray-400  text-xl">
                                REGISTER </button>
                        }
                    </div>

                    <div className="text-center mt-10 ">
                        <p>Already have an account?</p>
                        <button  onClick={() => router.push('/login')} className="border border-gray-500 bg-gray-600 hover:bg-gray-700 py-1 px-4 rounded-lg w-1/2 mx-auto mt-4">
                            Login here</button>
                    </div>


                </div>
            </div>



        </>
    )
}




