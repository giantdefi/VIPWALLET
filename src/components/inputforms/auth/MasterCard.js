import React, { useEffect, useState, useRef } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

import axios from 'axios'
import Head from 'next/head'
const moment = require('moment')
import Sponsor from "components/inputforms/auth/Sponsor"
import UsernameReg from "components/inputforms/auth/UsernameReg"
import Phone from "components/inputforms/auth/Phone"
import PasswordReg from "components/inputforms/auth/PasswordReg"
import ConfirmPassword from "components/inputforms/auth/ConfirmPassword"
//
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setLogin, setPhone, setCountry } from 'redux/reducers/AuthReducer'
import { resetCard,setCardNo, setJoinDate, setNametitle, setName, setVIPID, setAllowAnimated, setUsersCount } from  'redux/reducers/CreditCardReducer' 
//import { setReloadBalance } from 'redux/reducers/FinanceReducer'
//--------------------------------------

export default function Home() {

    const overlayRef = useRef(null)
    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const [barWidth, setBarWidth] = useState(0)
    const { sponsor, username, userPhone, userCountry, password, confirmPassword } = useSelector((state) => state.FormReducer)
    const { isLogin } = useSelector((state) => state.AuthReducer)
    const { cardNo, joinDate, name, userid, allowAnimated, nametitle, random1, random2, random3, random4, usersCount, idLength, VIPID } = useSelector((state) => state.CreditCardReducer)
   
    const timeNow = parseInt(Date.now() / 1000)

    const handleModalClose = () => {
     //   document.body.classList.remove('overflow-hidden'); // prevent body scroll on modal open
      //  outsideRef.current.classList.add('zoomOut');
     
        setTimeout(() => { // delay close to enable animation working first
          dispatch(setModalMessage(false))
        }, 500)
      }
    
    useEffect(() => {
        if (allowAnimated) {
            overlayRef.current.classList.remove('zoomIn');
            overlayRef.current.classList.add('headShake');

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called
                overlayRef.current.classList.remove('headShake');
               // overlayRef.current.classList.add('zoomIn');
               dispatch(setAllowAnimated(false))
              }, 1000)
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [allowAnimated])


      useEffect(() => { // referal sponsor from URL if any
        //  if(!usersCount) {
            CheckCountUser()
       //   }
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(ref)

    async function CheckCountUser() {

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/users-count`,
            method: 'GET'
        })
            .then(async response => {
                if (response.data.isSuccess) {
                    dispatch(setUsersCount(response.count))
                   // console.log(idLength)
                 //   console.log(response.data.count)
                    dispatch(setVIPID('VIP'+(parseInt(idLength)+parseInt(response.data.count))))
                } else {
                    // let it empty...
                }
            }).catch(function (error) {
                console.log(error)
            })
    }

    const handleChange = () => {

    }

  
    return (
        <>

<div className="flex w-full  h-[300px] bg-[#132020] text-gray-100 bg-center bg-cover   z-10 relative border-2 border-slate-500 rounded-lg animated zoomIn"
         style={{ backgroundImage: 'url("/assets/img/vector/card.png")' }}  ref={overlayRef}>
                     
                    <h2 className=" font-techMono absolute bottom-[150px] left-[50px] emboss">{random1} {random2} {random3} {random4}</h2>

                     
                    <p className="text-[14px] ml-2 font-techMono absolute bottom-[115px] left-[140px] text-slate-300">JOIN </p>
                    <p className="text-[14px] ml-2 font-techMono absolute bottom-[99px] left-[140px] text-slate-300">DATE</p>
                    <p className="text-sm ml-2 font-techMono absolute bottom-[120px] left-[200px] text-slate-300">DATE/MONTH/YEAR</p>
                    <h2 className=" ml-2 font-techMono absolute bottom-[90px] left-[200px] emboss text-[24px]">{moment.unix(timeNow).format("DD/MM/YY")}</h2>
                    <div className="flex mb-20 border-1 border-red-300">
                    <h3 className=" font-Glory absolute bottom-[40px] left-[40px] emboss">{nametitle} {name}</h3>
                    <p className=" font-techMono absolute bottom-[18px] left-[40px] text-[17px] text-slate-300">{VIPID}</p>
                    </div>
                        </div>


        </>
    )
}




