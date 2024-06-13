import React, { useState, useRef } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import BackArrow from "layout/main/BackArrow";
import Head from 'next/head'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setWDAmounts, setWDType, setMyPackageDetail, setSelectedActPackID } from 'redux/reducers/PackageReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//--------------------------------------

export default function Summary() {
   
    const router = useRouter()
    const [spinner, setSpinner] = useState(false)
  
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)



    return (
        <>

            <Head>
                <title>FIVE FORTUNE</title>
                <meta name="description" content="Withdrawal" />
            </Head>

            <div className="min-h-screen pb-40 px-2 animated fadeIn">

                <div className="flex flex-row justify-between items-center _gradient_slate">
                <BackArrow backURL="/users" />
               
                    <h4 className="font-semibold  uppercase text-[24px] mr-40">PROFILE</h4>
                </div>

                <div className="flex centered mt-10">
                <p>We are working on it!</p>
                </div>
            </div>

        </>
    )
}



