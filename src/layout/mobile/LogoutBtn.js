import React, { useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setError } from 'redux/reducers/ErrorReducer'
import { setLogout } from 'redux/reducers/AuthReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { resetUpload } from 'redux/reducers/UploadReducer'
import { resetBinary } from 'redux/reducers/BinaryReducer'
import { resetActivation } from 'redux/reducers/ActivationReducer'
import { resetMtree } from 'redux/reducers/MtreeReducer'
import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
import { resetEpins } from 'redux/reducers/EpinReducer'
import { resetTransaction } from 'redux/reducers/TransactionReducer'
import { resetMyPackage } from 'redux/reducers/PackageReducer'
import { resetHistory } from 'redux/reducers/HistoryReducer'
import { resetRefLink } from 'redux/reducers/ReferralReducer'
import { resetSetting } from 'redux/reducers/SettingReducer'
import { resetUsers } from 'redux/reducers/UsersReducer'
import { resetForgot } from 'redux/reducers/ForgotReducer'
import { resetFinance } from 'redux/reducers/FinanceReducer'

//--------------------------------------

export default function LogoutBtn(props) {

    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch(resetForm())
        dispatch(resetUpload())
        dispatch(resetBinary())
        dispatch(resetAffiliate())
        dispatch(resetFinance())
        dispatch(resetMyPackage())

        dispatch(resetActivation())
        dispatch(setError(false))
        dispatch(resetMtree())
        dispatch(resetEpins())
        dispatch(resetTransaction())
        dispatch(resetHistory())
        //--- special------
        dispatch(resetForgot())
        // dispatch(resetRefLink())
        dispatch(resetUsers()) // clone
        dispatch(resetSetting())
        dispatch(setLogout()) // authReducer
        router.push('/users')
    }


    return (
        <>
            <button onClick={handleLogout}
                className="_gradient_orange border border-yellow-400 rounded-l-full py-1 px-4 text-sm text-gray-50">
                Logout
            </button>


        </>
    )
}
