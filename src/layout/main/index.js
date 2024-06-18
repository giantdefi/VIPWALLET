import React, { useState, useEffect} from "react";
//import { useRouter } from 'next/router';

import TopNavigation from './TopNavigation'
import ModalMessage from "components/modal/ModalMessage";

import ModalConfirmLogOut from "components/modal/ModalConfirmLogOut"; 
import ModalConfirmTopUp from "components/modal/ModalConfirmTopUp"; 
import ModalActivateUser from "components/modal/ModalActivateUser"; 
import ModalSuccessRanking from "components/modal/ModalSuccessLevel";
import PlaySound from "sound/PlaySound";
import Confetti from 'react-confetti'
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setConfety } from 'redux/reducers/ConfetyReducer'
import {  setModalActivateUser, setModalMessage, setModalSuccessRanking } from 'redux/reducers/ModalReducer'
//-------------------------------------------------------


export default function MainLayout({ children }) { // not used yet!

  const dispatch = useDispatch()
  const { modalMessage, modalActivateUser, modalConfirmLogOut, modalConfirmTopUp, modalWarningBuyPackage, modalSuccessRankings } = useSelector((state) => state.ModalReducer)
  const {confety } = useSelector((state) => state.ConfetyReducer)
  const {  level, boardNo } = useSelector((state) => state.AuthReducer)
  const { width } = useState(window.innerWidth) //coffety
  const { height } = useState(window.innerHeight) //coffety
 
  useEffect(() => {
  if(confety){
  setTimeout(() => {
     dispatch(setConfety(false))
     dispatch(setModalSuccessRanking(false))
    },20000)

  }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [confety, level])

  return (
    <>

      <PlaySound />


      <div className="font-Poppins flex items-center justify-center px-0 md:px-20 relative bg-slate-200" >
        <div className="w-full sm:w-8/12 lg:w-5/12 bg-slate-900 text-white z-1 main_bg"
        //  style={{ backgroundImage: 'url("/assets/img/bg1.webp")' }} 
        >

          {confety && 
          <div className="flex centered absolute top-0">        
            <Confetti 
                width={500}
                height={1500}
                />
           </div>
          }

          <TopNavigation />

          <main className="min-h-screen w-full pt-2">{children}</main>

        </div>
      </div>

      {modalMessage && <ModalMessage />}

      {modalConfirmLogOut && <ModalConfirmLogOut />}
      {/* {modalConfirmTopUp && <ModalConfirmTopUp />} */}
      {modalActivateUser && <ModalActivateUser />}
      {modalSuccessRankings && <ModalSuccessRanking />}
      
      

    </>
  )
}