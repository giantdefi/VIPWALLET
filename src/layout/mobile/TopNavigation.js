import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'


//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'

import { setSpinnerAtLogo, setSpinnerAtVisitor } from 'redux/reducers/LoaderReducer'

import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setLoaderBalance } from 'redux/reducers/LoaderReducer'


//--------------------------------------

export default function TopNavigation() {


    const router = useRouter()
    const dispatch = useDispatch()
    const { spinnerAtLogo } = useSelector((state) => state.LoaderReducer)
    const { isLogin, isBinary, userid, token, username, avatar } = useSelector((state) => state.AuthReducer)

    const { spinnerAtVisitor } = useSelector((state) => state.LoaderReducer)


    // console.log(router.pathname)
    const handleLogoClick = () => {
        if (router.pathname !== '/') { // if page not on main page
            dispatch(setSpinnerAtLogo(true)) // spiining loader
        }
        setTimeout(() => {
            router.push('/') // redirect to main page settimeout
        }, 200)

    }

    const handleUserClick = () => {
        if (router.pathname !== '/auth') {
            dispatch(setSpinnerAtVisitor(true))
        }
        setTimeout(() => {
            //   dispatch(setSpinnerAtVisitor(false))
            router.push('/auth')
        }, 1000)
    }


    //==============================================

    return (
        <>

       

         
            <div className="_gradient_blue sticky top-0  rounded-bl-[40%] shadow-md shadow-gray-700 w-full bg-gray-900 z-10">

                <nav className="rounded-bl-[40%] px-3 pt-2 flex flex-grow relative justify-between z-10  mx-auto">

                    <Link href="/"><a className="flex-initial  w-[52px] h-[52px] p-2 rounded-full  bg-gray-700">
                        <img className="animate-spin-logo" src="/assets/img/logo-sm.png" alt="banner" />
                    </a></Link>

                    <a onClick={handleLogoClick} className="cursor-pointer  flex centered  w-[200px] mt-2 ">
                        {spinnerAtLogo ?
                            <svg style={{ maxWidth: 40 }} role="status" className="inline w-[36px] h-[36px] text-yellow-400 animate-spin fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> :
                            <img src="/assets/img/logo-Z.png" className="px-1 animated fadeInDown" alt="VIPWALLET" />
                        }
                    </a>

                    <div className="rounded-full w-[60px] h-[60px] flex justify-center items-center ">

                        {spinnerAtVisitor ?
                            <svg style={{ maxWidth: 40 }} role="status" className="inline w-[30px] h-[30px] text-yellow-400 animate-spin  fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            :

                            !isLogin ?
                                <button onClick={handleUserClick} className="rounded-full cursor-pointer border-2 border-gray-400">
                                    <img src="/assets/img/avatar.webp" className="rounded-full" alt="users" />
                                </button>
                                :
                                <button onClick={handleUserClick} className="rounded-full cursor-pointer border-2 border-gray-400">
                                    {avatar ?
                                        <img src={avatar} className="rounded-full animated fadeIn" alt="AVATAR" />
                                        :
                                        <img src="/assets/img/avatar.webp" className="rounded-full animated fadeIn" alt="VISITOR" />
                                    }
                                </button>
                        }
                    </div>
                </nav>
                <p className="text-right mr-4 text-xs mt-1 ">{username || 'GUEST'}</p>
            </div>
        </>
    )
}
