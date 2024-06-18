import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalSuccessRanking } from 'redux/reducers/ModalReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'


//--------------------------------------

export default function Modal() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { modalSuccessRankings } = useSelector((state) => state.ModalReducer)
    
    useEffect(() => {
        if (modalSuccessRankings) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        document.body.classList.remove('overflow-hidden')
                        handleCloseModal()
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 500)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalSuccessRankings])

    const handleCloseModal = () => {
        setSpinner(false)
        dispatch(setPlaySound('click'))
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOutDown')
        }
        setTimeout(() => {
            dispatch(setModalSuccessRanking(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }


    return (
        <>
            <div className="fixed w-full inset-0  overflow-hidden flex justify-center items-center animated" style={{ zIndex: 1 }} ref={overlayRef}>
                <div className="_gradient_slate relative border-2 shadow-2xl   mx-auto rounded-xl  overflow-y-auto w-96 animated jackInTheBox" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />

                    <div className="z-1">

                            <div className="flex ">
                              
                            <div className="flex flex-col centered ">
                                <img src="/assets/img/congrate.webp" alt="banner" />
                                <img src="/assets/img/level-up.webp" alt="banner" />
                            </div>
                          
                            </div>

                    </div>
                </div>
            </div>


        </>
    );
}

