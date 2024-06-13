import React, { useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

import axios from 'axios'
import Head from 'next/head'
import Login from './login'
import Register from './register'

import dynamic from 'next/dynamic'
const Username = dynamic(() => import("components/inputforms/auth/Username"), {
    ssr: false,
})

import Password from "components/inputforms/auth/Password"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setLogin, setPhone, setEmail, setCountry, setAvatar } from 'redux/reducers/AuthReducer'
import { setSpinnerAtLogo, setSpinnerAtVisitor } from 'redux/reducers/LoaderReducer'
import { setToggleLogin } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()


    const [spinner, setSpinner] = useState(false)
    const [barWidth, setBarWidth] = useState(0)
    const [loginAttemp, setLoginAttemp] = useState(0)
    const { username, userToken, password } = useSelector((state) => state.FormReducer)
    const { isLogin, phone, email, country, avatar } = useSelector((state) => state.AuthReducer)
    const { toggleLogin } = useSelector((state) => state.MainmenuReducer)


    useEffect(() => {
        dispatch(setError(false))
     
     //   dispatch(setSpinnerAtVisitor(false)) // sidebar menu
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if is Login the redirect
    useEffect(() => {
        if (isLogin) {
            router.push('/users')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])





    

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

{toggleLogin ? 
           <Login/>
:
           <Register/>
}
        </>
    )
}



