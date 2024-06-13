import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux';
import { setMenuSpinner } from 'redux/reducers/LoaderReducer';
import { setAllowSound } from 'redux/reducers/SettingReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
import { resetErrors } from 'redux/reducers/ErrorReducer';
import { resetForm } from 'redux/reducers/FormReducer';
//-------------------------------------------------------------------------

export default function Mainmenu() {

    const { t } = useTranslation();

    const router = useRouter();
    const dispatch = useDispatch();
    const [itemLink, setItemLink] = useState()
    const { lang } = useSelector((state) => state.SettingReducer)
    const { menuSpinner } = useSelector((state) => state.LoaderReducer)
    const { allowSound } = useSelector((state) => state.SettingReducer)

    const onMenuClick = (link) => {
        dispatch(resetErrors()) // if any
        dispatch(resetForm()) // if any
        dispatch(setPlaySound('click'))
        setItemLink(link)
        dispatch(setMenuSpinner(true))
        setTimeout(() => {
            router.push(link)
        }, 500)

    }

    const handleLanguage = () => {
        dispatch(setPlaySound('click'))
        dispatch(setModalLanguage(true))
    }

    useEffect(() => { // reset on visit back
        dispatch(setMenuSpinner(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAllowSound = () => { // toggle allow menu
        if (allowSound) {
            dispatch(setAllowSound(false))
        } else {
            dispatch(setAllowSound(true))
        }
    }

    const handleWatch = () => {
        dispatch(setPlaySound('pling'))
        dispatch(setShowModalVideo(true))
    }


    return (
        <>

            <div className="flex items-center justify-between text-gray-500 space-x-3 mt-5 md:px-4">


                <a onClick={handleLanguage} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-green-700 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {/* <i className="icofont-flag text-3xl text-yellow-200" /> */}

                    {lang == "en" && < img src="/assets/img/flags/US.png" alt="lang" width={40} />}
                    {lang == "ru" && <img src="/assets/img/flags/RU.png" alt="lang" width={40} />}
                    {lang == "in" && <img src="/assets/img/flags/IN.png" alt="lang" width={40} />}
                    {lang == "cn" && <img src="/assets/img/flags/CN.png" alt="lang" width={40} />}
                    {lang == "id" && <img src="/assets/img/flags/ID.png" alt="lang" width={40} />}
                    {lang == "th" && <img src="/assets/img/flags/TH.png" alt="lang" width={40} />}


                    <p className="text-xs   uppercase">{t('language')}</p>
                </a>

                <a onClick={() => onMenuClick('how-to')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-green-700 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "how-to" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-question-circle text-3xl text-yellow-200" />
                            <p className="text-xs mt-2  uppercase">{t('how_to')}</p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('bonus-calculator')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-green-700 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "bonus-calculator" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-ui-calculator text-3xl text-yellow-200" />
                            <p className="text-[11px] mt-2  uppercase">{t('calculator')} </p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('deposit-wallet')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-green-700 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "deposit-wallet" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-flora-flower text-4xl text-yellow-200" />
                            <p className="text-[11px] mt-1  uppercase">{t('deposit')} </p>
                        </>
                    }
                </a>

            </div>

            <div className="text-center    py-2">
                <p> {t('investing_menu')}</p>
            </div>

            <div className="flex items-center justify-between mb-2 text-gray-500 space-x-3 md:px-4">

                <a onClick={() => onMenuClick('packages')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "packages" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-sale-discount text-3xl text-yellow-200" />
                            <p className="text-xs mt-1  uppercase">{t('packages')}</p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('purchase')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "purchase" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-cart-alt text-3xl text-yellow-200" />
                            <p className="text-xs mt-1  uppercase">{t('purchase')}</p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('my-investment')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "my-investment" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-chart-growth text-3xl text-yellow-200" />
                            <p className="text-xs mt-1  uppercase">{t('my_invest')}</p>
                        </>
                    }
                </a>





                <a onClick={() => onMenuClick('transfer-wallet')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "transfer-wallet" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-paper-plane text-4xl text-yellow-200" />
                            <p className="text-xs   uppercase">{t('transfer')}</p>
                        </>
                    }
                </a>

            </div>

            <div className="flex items-center justify-between mb-2 text-gray-500 space-x-3 md:px-4">


                <a onClick={() => onMenuClick('affiliate')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "affiliate" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-company text-4xl text-yellow-200" />
                            <p className="text-xs mt-1  uppercase">{t('affiliate')}</p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('withdrawal')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "withdrawal" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-wallet text-4xl text-yellow-200" />
                            <p className="text-xs mt-1  uppercase">{t('withdrawal')} </p>
                        </>
                    }
                </a>

                <a onClick={() => onMenuClick('faqs')} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">

                    {menuSpinner && itemLink == "faqs" ?
                        <svg role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        : <>
                            <i className="icofont-support-faq text-3xl text-yellow-200" />
                            <p className="text-xs mt-2  uppercase">{t('faq')} </p>
                        </>
                    }
                </a>

                <a onClick={handleAllowSound} className="flex flex-col items-center justify-center w-24  h-20 
bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl
border-gray-500 border-4 shadow-md  cursor-pointer mb-2 p-1  transition ease-in duration-300">
                    {!allowSound ?
                        <i className="icofont-ui-mute text-3xl text-yellow-200" /> :
                        <i className="icofont-audio text-3xl text-yellow-200" />}
                    <p className="text-xs mt-1  uppercase">{t('sound')} </p>
                </a>
            </div>


        </>
    )
}



