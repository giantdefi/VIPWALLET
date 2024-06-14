import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import axios from 'axios'
import MasterCardDashboard from "components/inputforms/auth/MasterCardDashboard"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import {  setModalConfirmLogOut } from 'redux/reducers/ModalReducer'
import { setMyNetwork, setMyDownlines } from 'redux/reducers/NetworkReducer';
//--------------------------------------

export default function Users() {

  //  const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const [menuSpinner, setMenuSpinner] = useState(false)
    const { isActive, name } = useSelector((state) => state.AuthReducer)
    const { isLogin, userID, level, boardNo, token } = useSelector((state) => state.AuthReducer)
    const { myNetwork, myDownlines } = useSelector((state) => state.NetworkReducer)
   


    return (
        <>          

        {myDownlines && myDownlines.map((item, index) => {

      return (

            <div className=" flex flex-row justify-between border-2 border-slate-700 pb-2 px-2 rounded-lg mb-2">
                <div className=" flex flex-col">
                    <p className=" flex centered">{item.userID}</p>
                    <p className=" flex centered text-xs">{item.fullname}</p>
                </div>
               
                <button className="_btn_submit_green ">ACTIVATE</button>
             </div>

            )
            })}
            

          
        </>
    )
}



