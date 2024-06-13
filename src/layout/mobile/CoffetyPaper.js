import React, { useEffect } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useDispatch } from 'react-redux'
import { setCofetty } from 'redux/reducers/ModalReducer'
//--------------------------------------

//import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function CoffetyPaper() {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        //   dispatch(setCofetty(false))  // remove on refresh page
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Confetti
                width={1200}
                height={1000}
            />
        </>
    )
}
