import React, { useState } from "react";
//import Link from 'next/link'
//import Router, { useRouter } from "next/router";

import axios from 'axios';

import Username from "components/inputforms/auth/Username";
import Password from "components/inputforms/auth/Password";

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setUsername, setPhone, setIsActive,setTotalWallet, setBonusSponsor, setTotalSend, setTotalRecieve, setToken } from 'redux/reducers/AuthReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { resetForm, setShowCaptcha } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//--------------------------------------

export default function Login() {

    // const router = useRouter();
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)

    const [captchaError, setCaptchaError] = useState(false) // if error then show login button
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { username, password, showCaptcha } = useSelector((state) => state.FormReducer)

    //------------------------------------------
    const handleShowCaptcha = () => {


        if (!username) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "username", message: 'USERNAME is missing' }))
        }

        if (!password) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "password", message: 'Password is missing' }))
        }


        if (formError) { return false }

        //   dispatch(setPlaySound('pling'))

        const script = document.createElement('script');
        script.src = "/js/captcha.js";
        script.async = true;
        document.body.appendChild(script);
        setTimeout(() => {
            const elmId = document.getElementById('captchaLOGIN');
            elmId.innerHTML = ''; // fill by empty
            if (!window.sliderCaptcha || window.sliderCaptcha === 'undefined') {
                setCaptchaError(true) // just show button
            }
            let captcha = window.sliderCaptcha;
            setTimeout(() => {
                if (typeof captcha !== 'function') { return setCaptchaError(true) } // just show button
                captcha({
                    id: 'captchaLOGIN',
                    repeatIcon: 'icofont-refresh',
                    onSuccess: () => {
                        var handler = setTimeout(() => {
                            window.clearTimeout(handler);
                            // captcha.reset(); // erro not a function???
                            // alert('success.....!')
                            // dispatch(setPlaySound('pling'))
                            return handleLogin();
                        }, 500);
                    }
                })
            }, 100)
        }, 500)

        dispatch(setShowCaptcha(true))
        return () => {
            document.body.removeChild(script); // remove
        }
    }

    const handleLogin = async () => {


        if (!username) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "username", message: 'USERNAME is missing' }))
        }

        if (!password) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "password", message: 'Password is missing' }))
        }

        setSpinner(true)

        const data = {
            username: username,
            password: password
        }

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/users/login`,
            method: 'POST',
            data
        })
            .then(async response => {

                if (response.data.isSuccess) {

                    const userData = response.data.data;

                    dispatch(setLogin(true))
                    dispatch(setToken(response.data.token))
                    dispatch(setUsername(userData.username))
                    dispatch(setIsActive(userData.isActive))
                    dispatch(setTotalWallet(data.total_wallet))
                    dispatch(setBonusSponsor(userData.bonus_sponsor))
                    dispatch(setTotalSend(userData.total_send))
                    dispatch(setTotalRecieve(userData.total_receive))

                    dispatch(resetForm())
                    dispatch(setPlaySound('verified'))
                    dispatch(setModalMessage({ type: 'success', title: "Login Success!", message: 'Now You are Login' }))
                } else {
                    console.log(response.data)
                    dispatch(setError({ path: response.data.path, message: response.data.message }))
                    dispatch(setPlaySound('error'))
                }

                dispatch(setShowCaptcha(false))
                setSpinner(false)
            }).catch(function (error) {
                //  setSpinnerBtn(false)
                console.log(error)
                setSpinner(false)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }


    return (
        <>

            <div className="mt-6 px-4 border border-slate-500 rounded">

                <div className="text-center mb-3 mt-10">
                    <h5>Please Login </h5>
                </div>

                <form autoComplete="off" >
                    <Username />

                    <Password />

                </form>



                {!captchaError ? <>

<div className="flex justify-center py-5">
    <button className="rounded-full py-2 px-8 border-2 border-gray-500  text-lg" onClick={handleShowCaptcha}>
        {!showCaptcha ? <><i className="icofont-puzzle text-2xl mr-2" /> VERIFY LOGIN </> :
            <><i className="icofont-recycle-alt text-2xl mr-2" />Reload Puzzle</>}
    </button>
</div>

{showCaptcha && <>
    {username && password && !formError &&
        <div className="text-center  border-gray-500 ">
            <div className="slidercaptcha p-0" >
                <div id="captchaLOGIN" className="min-h-[200px]" />
            </div>
        </div>
    }
</>
}
</> :
<div className="flex justify-center mt-10 ">
    <button onClick={handleLogin} className="_btn_submit_green py-2 px-8 border-2 border-gray-400  text-lg">
        {spinner &&
            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        }

        LOGIN ACCOUNT</button>
</div>
}
               
            </div>
        </>
    )
}



