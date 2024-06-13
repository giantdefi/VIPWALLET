import React, { } from "react";
//import { useRouter } from 'next/router';

import TopNavigation from './TopNavigation'
import ModalMessage from "components/modal/ModalMessage";

import ModalConfirmLogOut from "components/modal/ModalConfirmLogOut"; 
import ModalConfirmTopUp from "components/modal/ModalConfirmTopUp"; 
import ModalWarningBuyPackage from "components/modal/ModalWarningBuyPackage"; 
import PlaySound from "sound/PlaySound";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
//-------------------------------------------------------


export default function MainLayout({ children }) { // not used yet!


  const { modalMessage, modalLanguage, modalConfirmLogOut, modalConfirmTopUp, modalWarningBuyPackage } = useSelector((state) => state.ModalReducer)
  const { lang } = useSelector((state) => state.SettingReducer)

 
  return (
    <>

      <PlaySound />

      <div className="font-Poppins flex items-center justify-center px-0 md:px-20 relative bg-slate-200" >
        <div className="w-full sm:w-8/12 lg:w-5/12 bg-slate-900 text-white z-10 "
         style={{ backgroundImage: 'url("/assets/img/bg1.webp")' }} >

          <TopNavigation />

          <main className="min-h-screen w-full pt-2">{children}</main>

        </div>
      </div>

      {/* {modalProcess && <ModalProcess />} */}

      {modalMessage && <ModalMessage />}

      {/* {modalAllowance && <ModalAllowance />} */}

      {modalLanguage && <ModalLanguage />}

      {/* {modalConnectBinance && <ModalConnectBinance />} */}

      {modalConfirmLogOut && <ModalConfirmLogOut />}
      {modalConfirmTopUp && <ModalConfirmTopUp />}
      {modalWarningBuyPackage && <ModalWarningBuyPackage />}
      

    </>
  )
}