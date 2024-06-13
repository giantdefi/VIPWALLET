import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import MasterCardDashboard from "components/inputforms/auth/MasterCardDashboard"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import {  setModalConfirmLogOut } from 'redux/reducers/ModalReducer'
//clsimport { setToggleLogin } from 'redux/reducers/AuthReducer';
//--------------------------------------

export default function Users() {

  //  const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const [menuSpinner, setMenuSpinner] = useState(false)
    const { isActive, name } = useSelector((state) => state.AuthReducer)

   // const [isLogin, setLoginr] = useState(false)
    const { isLogin, fullname, isAdmin } = useSelector((state) => state.AuthReducer)
    // const { fullname, avatar, email, verified } = useSelector((state) => state.UsersReducer)

    useEffect(() => {  // redirect to next page!!!
        if (!isLogin) {
          router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])

    const handleLogout = () => {
        dispatch(setPlaySound('pling'))
        dispatch(setModalConfirmLogOut(true))
    }

    const handleLogin = () => {
        dispatch(setToggleLogin(1)) // toggle to login  on main page
        router.push('/')
    }

    const handleMovePage = (link) => {
        //  dispatch(setMtreeBackURL('/users'))
        setItemLink(link)

        setMenuSpinner(true)
        setTimeout(() => {
            router.push(link)
        }, 500)
    }



    return (
        <>

<Head>
                <title>FIVE FORTUNE</title>
                <meta name="description" content="Users Page" />
            </Head>

            <div className="min-h-screen pb-40 mx-3">

                <div className="flex flex-between centered  _gradient_slate py-4 px-2">
                    {/* <BackArrow backURL="/" /> */}
                    {!isLogin ?
                        <button onClick={handleLogin} className="_btn_submit_orange "> Please Login </button> :
                        <button onClick={handleLogout} className="_gradient_orange border border-gray-600 rounded-full py-1 px-4 text-sm "> Logout </button>
                    }
                </div>

                <div className="text-center py-4 mt-2 _gradient_mtree">
                    <h4 className="uppercase ">Hi, {fullname? fullname : 'Visitor'}</h4>
                    <p className="ml-4 text-gray-200 text-sm">
                        Network Status : 
                            {isActive?
                            <span className="text-green-300 ml-2">ACTIVE <i className="icofont-check"></i>
                            </span> :
                             <span className="text-yellow-400"> NOT ACTIVE</span> }
                    </p>
                </div>

             

                <MasterCardDashboard/>
   

                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">BONUSES</p>
                </div>

                <div className="w-full flex-between justify-center items-center gap-3 mt-2">

                    <button onClick={() => handleMovePage('users/refferals-bonus')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/refferals-bonus" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-contact-add text-yellow-300 text-4xl "></i>
                                    <p className="text-xs mt-1">Referral Bonus</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('users/matching-bonus')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/matching-bonus" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-hand-drag2 text-yellow-300 text-4xl "></i>
                                    <p className="text-[11px] mt-1">Matching Bonus</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('users/withdrawal')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/withdrawal" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-bank-transfer-alt text-4xl text-yellow-400 "></i>
                                    <p className="text-xs mt-1"> Withdrawal</p>
                                </>
                            }
                        </div>
                    </button>

                </div>

                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">TRANSACTIONS</p>
                </div>


                <div className="w-full flex-between justify-center items-center gap-3 mt-2">
                    <button onClick={() => handleMovePage('users/confirmation')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/confirmation" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-flora-flower text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">Top Up Wallet</p>
                                </>
                            }
                        </div>
                    </button>

                 


                    <button onClick={() => handleMovePage('users/send-e-wallet')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/send-e-wallet" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-paper-plane text-sky-400 text-4xl"></i>
                                    <p className="text-xs mt-2">Send Wallet</p>
                                </>
                            }
                        </div>
                    </button>

                 {isAdmin? 
                    <button onClick={() => handleMovePage('admin')}
                        className='btn_menu_admin'>
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "admin" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-architecture-alt text-4xl  text-yellow-200"></i>
                                    <p className="text-xs mt-2">Admin Page</p>
                                </>
                            }
                        </div>
                    </button>:
                     <button onClick={() => handleMovePage('settings/update-profile')}
                     className='btn_menu_user'>
                     <div className=" flex flex-col justify-center items-center">
                         {menuSpinner && itemLink == "settings/update-profile" ?
                             <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                             </svg>
                             : <>
                                 <i className="icofont-contact-add text-4xl  text-yellow-200"></i>
                                 <p className="text-xs mt-2">Settings</p>
                             </>
                         }
                     </div>
                 </button>}

                </div>



            </div>
        </>
    )
}



