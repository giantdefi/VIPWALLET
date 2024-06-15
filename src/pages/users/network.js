import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import axios from 'axios'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import {  setModalActivateUser, setModalMessage } from 'redux/reducers/ModalReducer'
import { setMyNetwork, setMyDownlines, setActivateSpinner,  setUserIDSponsor,setUserID, setLevel, setBoardNo, setAllowReload } from 'redux/reducers/NetworkReducer';
//--------------------------------------

export default function Users() {

  //  const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const [menuSpinner, setMenuSpinner] = useState(false)
    const [rowIndex, setRowIndex] = useState(false)
    const { isActive, name } = useSelector((state) => state.AuthReducer)
    const { isLogin, userID, level, boardNo, token, wallet } = useSelector((state) => state.AuthReducer)
    const { myNetwork, myDownlines, activateSpinner, allowReload } = useSelector((state) => state.NetworkReducer)
   


    useEffect(() => {
        console.log('----get my downline-----')
        if(!myNetwork) {
            handleGetNetwork()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log('----get my downline-----')
        if(allowReload) {
            handleGetNetwork()
        }
        dispatch(setAllowReload(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowReload])

    const handleActivate = async (no, userId, balance) => {
        dispatch(setPlaySound('pling'))
        setRowIndex(no) // spinner
        dispatch(setUserIDSponsor(userID))
        dispatch(setUserID(userId))
        dispatch(setLevel(level))
        dispatch(setBoardNo(boardNo))
      
       if(balance < myNetwork.value) {
      
         dispatch(setModalMessage({ type: 'danger', title: "Ops... Can not Activate!", message: `Required User Balance Min =$ ${ myNetwork.value}` }))
         return dispatch(setPlaySound('error'))

        }else{
            dispatch(setModalActivateUser(true))
            dispatch(setActivateSpinner(true))

        }

       
       
   

    
  
    }
   
   
    const handleGetNetwork = async () => {


const data = {
    userID,
    level, 
    boardNo,

}

       const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/network?userID=${userID}`,
            method: 'post',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                if (response.data.isSuccess) {

                dispatch(setMyDownlines(response.data.downlines))
                dispatch(setMyNetwork(response.data.network))

                } else {
                   
               
                   // return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

            }).catch(function (error) {
             
             //   return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message:error }))

            })
    }

    console.log(activateSpinner)
    console.log(myNetwork.empty_slot)

    return (
        <>

<Head>
                <title>VIPWALLET</title>
                <meta name="description" content="Users Page" />
            </Head>

            <div className="min-h-screen pb-40 mx-3 ">
            <div className="flex justify-end ">
                <p>Wallet Balance : ${wallet}</p>
                </div>
                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">NETWORK LEVEL {myNetwork.level} = ${myNetwork.value}</p>
                    <p>Board No : #{myNetwork.boardNo}</p>
                </div>

                <div className="w-full flex centered mt-2">

                    <button  className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/matching-bonus" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-business-man text-yellow-300 text-4xl "></i>
                                    <p className="text-[11px] mt-1">{myNetwork.slot_1}</p>
                                </>
                            }
                        </div>
                    </button>

                
                </div>
                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_slate">
                    <p className="uppercase ">START UP</p>
                </div>

  
                <div className="w-full flex centered mt-2">

                  

                {myNetwork.slot_2?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                           <>
                                    <i className="icofont-bank-alt text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_2}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 10 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-bank-alt text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }



                </div>


  <div className="" style={{ zIndex: 1000, background: 'rgba(0,0,0, 1)' }} >
             
             
                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_slate">
                    <p className="uppercase ">MUTUAL USERS</p>
                </div>
               
              

                <div className="w-full flex justify-around items-center gap-3 mt-2">
                   
                {myNetwork.slot_3?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                           <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_3}</p>
                                </>
                          
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 9 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-wallet text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }

                 


                    {myNetwork.slot_4?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                            <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_4}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 8 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-wallet text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }

                    </div>
                
                    <div className="w-full flex justify-around items-center gap-3 mt-2">

                    {myNetwork.slot_5?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                          <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_5}</p>
                                </>
                          
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 7 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-wallet text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }


                  {myNetwork.slot_6?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                             <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_6}</p>
                                </>
                          
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 6 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-wallet text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                 
                 
              

                </div>

                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_slate">
                    <p className="uppercase ">READY TO THE NEXT LEVEL - $50</p>
                    <p className=""> Reward up to 1000%</p>
                </div>


                <div className="w-full flex justify-around items-center gap-3 mt-2">
                
                {myNetwork.slot_7?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                          <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_7}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 5 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-rocket-alt-1 text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                 


                 {myNetwork.slot_8?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                             <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_8}</p>
                                </>
                          
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 4 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-rocket-alt-1 text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                
                  
                 
              

                </div>
         
                <div className="w-full flex justify-around items-center gap-3 mt-2">
                
            
                {myNetwork.slot_9?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                            <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_9}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 3 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-rocket-alt-1 text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                
             


            
                {myNetwork.slot_10?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                            <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_10}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 2 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-rocket-alt-1 text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                

            
              
           
                {myNetwork.slot_11?
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                           <>
                                    <i className="icofont-wallet text-4xl  text-yellow-400"></i>
                                    <p className="text-xs mt-2">{myNetwork.slot_11}</p>
                                </>
                           
                        </div>
                    </button>:
                    <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                        {activateSpinner && myNetwork.empty_slot == 1 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <i className="icofont-rocket-alt-1 text-4xl  text-green-400"></i>
                                       <p className="text-xs mt-2">ADD NEW USER</p>
                                </>
                            }
                        </div>
                    </button>
                        }
                

             
           
            </div>

            </div>

            <div className="text-center py-2 mb-10 mt-20 bg-gray-700 rounded-full _gradient_slate">
                    <p className="uppercase ">YOUR REFERRALS READY TO BE ACTIVATED</p>
                </div>

                {!myDownlines &&
                <div className="flex centered">
                <svg role="status" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
               </div>}

        {myDownlines && myDownlines.map((item, index) => {

      return ( <>


            <div className=" flex flex-row justify-between border-2 border-slate-700 pb-2 px-2 rounded-lg mb-2" key={index}>
                <div className=" flex flex-col">
                    <p className=" flex centered">{item.userID} </p>
                    <p className=" flex centered text-sm">{item.fullname}</p>
                    <p className=" flex centered text-xs">Balance :  ${item.wallet}</p>
                </div>
               
                <button onClick={()=>handleActivate(index, item.userID, item.wallet)} className="_btn_submit_green ">
                    
                         {activateSpinner && rowIndex == index && <svg style={{ maxWidth: 40 }} role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>}
                    
                    ACTIVATE</button>
             </div>
</>
            )
            })}
            
</div>
          
        </>
    )
}



