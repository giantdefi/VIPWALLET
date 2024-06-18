import React, { useEffect, useRef } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios';

//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { setIsLogin,  setFullName, setUserID, setLevel, setBoardNo, setToken, setPhone, setEmail, setIsActive, setAllowReloadData, setWallet } from 'redux/reducers/AuthReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//--------------------------------------

export default function TopNavigation() {

    //  const soundClick = useRef(null)

    const router = useRouter();
    const dispatch = useDispatch();

    //  const { allowSound } = useSelector((state) => state.SettingReducer)
    const { isLogin, userID, token, allowReloadData } = useSelector((state) => state.AuthReducer)
   
  
    const handleUserClick = () => {
        dispatch(setPlaySound('click'))
           if(isLogin){
            router.push('/users')
           }else{
             router.push('/auth')
           }
            
       
    }

    useEffect( () => {
        if (isLogin ) {
           loadUserData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])


    useEffect( () => {
        if (allowReloadData ) {
           loadUserData()
           setAllowReloadData(false) // reset
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowReloadData])

    //--------- REFRESH BALANCE AND BONUS -------

    const loadUserData = async () => {

        dispatch(setAllowReloadData(false))

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
      
        return axios({
            url: `${URL}/users/userdata?userID=${userID}`,
            method: 'get',
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                if (response.data.isSuccess) {
                    const userData = response.data.data
                  
                   dispatch(setFullName(userData.fullname))
                    dispatch(setPhone(userData.phone))
                    dispatch(setEmail(userData.email))
                    dispatch(setLevel(userData.level))
                    dispatch(setBoardNo(userData.boardNo))
                    dispatch(setIsActive(userData.isActive))
                    dispatch(setWallet(userData.wallet))
               
                   
                   
                } else {
                    console.log(response)
                }

            }).catch(function (error) {
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }

  
    // console.log(router.pathname)
    const handleLogoClick = () => {
        if (router.pathname !== '/') { // if page not on main page
          //  dispatch(setSpinnerAtLogo(true)) // spiining loader
        }
        setTimeout(() => {
            router.push('/') // redirect to main page settimeout
        }, 200)

    }

    return (
        <>

<div className="_gradient_blue sticky top-0  rounded-bl-[40%] shadow-md shadow-gray-700 w-full bg-gray-900 z-10">

              
              
        <nav className="p-3 flex flex-grow relative justify-between z-10 items-center mx-auto h-18">

                 
                      
                  
                    <Link href="/"><a className="flex-initial  w-[52px] h-[52px] p-2 rounded-full _gradient_slate">
                        <img className="animate-spin-logo" src="/assets/img/logo-sm.png" alt="logo" />
                    </a></Link>

                    <a onClick={handleLogoClick} className="cursor-pointer  flex centered  w-[200px] mt-2 ">
                     
                            <img src="/assets/img/logo-Z.png" className="px-1 animated fadeInDown" alt="VIPWALLET" />
                      
                    </a>

                    <div className="rounded-full w-[64px] flex justify-center items-center ">
                       


                           
                            <div onClick={handleUserClick} className="flex-col centered w-16 h-16  cursor-pointer">

                                {!isLogin ?
                                    <img src="/assets/img/user-red.png" className="rounded-full w-12 h-12" alt="users" />
                                    :
                                   
                                        <img src="/assets/img/user.jpg" className="rounded-full w-12 h-12" alt="users" />
                                }
                                <div className="flex w-12 centered">
                                <p className="text-xs">{userID || 'visitor'}</p>
                                </div>
                            </div>
                       

                    </div>

                </nav>

            </div>
        </>
    )
}
