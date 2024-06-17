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
    const [loader, setLoader] = useState(false)
    const [rowIndex, setRowIndex] = useState(false)
    const { isLogin, userID, level, boardNo, token, name, wallet, isActive } = useSelector((state) => state.AuthReducer)
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

        setLoader(true)
        const data = {
            userID,
            level, 
            boardNo,

        }

        console.log(data)

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

               
                dispatch(setMyNetwork(response.data.network))
              
                if(response.data.downlines.length) {
                  dispatch(setMyDownlines(response.data.downlines))  
                }else{
                    dispatch(setMyDownlines(false))  
                }
                
                } 
                setLoader(false)
            }).catch(function (error) {
             
               return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message:error }))

            })
    }

   

    return (
        <>

<Head>
                <title>VIPWALLET</title>
                <meta name="description" content="Users Page" />
            </Head>

            <div className="min-h-screen pb-40 mx-3 ">
       
       {isActive && myNetwork ? 
            <div >
         
            <div className="flex justify-end ">
                <div className="flex centered"> <img src="/assets/img/dollar.webp" width="30" alt="logo" /> <span className="text-sm ml-1">Wallet : {wallet}</span></div>
                </div>
                <div className="flex flex-col centered py-2 mt-2 _gradient_green rounded-xl">
                <img src="/assets/img/rank-1.webp" className="rounded-full " alt="users" />
                    <p className="uppercase ">RANK LEVEL {myNetwork.level} = ${myNetwork.value}</p>
                    <p>Network No : #{myNetwork.boardNo}</p>
                </div>

                <div className="w-full flex centered mt-2">

                {/* <button  className="btn_menu_user w-1/3 h-[90px]">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/matching-bonus" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-business-man text-yellow-300 text-4xl "></i>
                                    <p className="text-[11px] mt-1">{myNetwork.slot_1}</p>
                                </>
                            }
                        </div>
                    </button> */}

                
                </div>
                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_green">
                    <p className="uppercase text-sm">START UP</p>
                </div>

  
                <div className="w-full flex centered mt-2">

                  

                {myNetwork.slot_2?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_yellow pl-2 pr-2">
                           <>
                              <div className="w-full flex justify-between items-center py-1 pr-10 h-10">
                                 <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_2}</div>
                              </div>
                            
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[60px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 10 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                      
                                       <div className="text-xs ml-2">Referral no 1</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }



                </div>



             
             
                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_green">
                    <p className="uppercase "><i className="icofont-money mr-2"></i><span className="text-sm">MUTUAL USERS</span></p>
                </div>
               
              

                <div className="w-full flex justify-around items-center gap-3 mt-2">
                   
                {myNetwork.slot_3?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_gold pl-2 pr-2 py-1">
                           <>
                                   
                           <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_3}</div>
                              </div>
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[60px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 9 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                     <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 2</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }

                 


{myNetwork.slot_4?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_gold pl-2 pr-2 py-1">
                           <>
                                   
                           <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_4}</div>
                              </div>
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[60px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 8 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                        <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 3</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }

                    </div>
                
                    <div className="w-full flex justify-around items-center gap-3 mt-2">

                    {myNetwork.slot_5?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_gold pl-2 pr-2 py-1">
                           <>
                                   
                           <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_5}</div>
                              </div>
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[40px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 7 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                         <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 4</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }



{myNetwork.slot_6?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_gold pl-2 pr-2 py-1">
                           <>
                                   
                           <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_6}</div>
                              </div>
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[40px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 6 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                      <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 5</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }
</div>
                 
<div className="text-center py-2 mt-2 bg-gray-700 rounded-full _gradient_green">
                    <p className="uppercase text-[12px]">Congrats for 400% reward, </p> 
                    <p className="uppercase text-[12px]">Let{"'"}s invite more friends</p>
                </div>

  
                <div className="w-full flex centered mt-2">

                  

                {myNetwork.slot_7?
                    <button  className=" w-1/2 h-[60px]">
                      <div className=" flex flex-col centered  rounded-full _gradient_yellow pl-2 pr-2">
                           <>
                              <div className="w-full flex justify-between items-center py-1 pr-10 h-10">
                                 <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_7}</div>
                              </div>
                            
                                       
                                </>
                           
                        </div>
                    </button>:
                    <button  className=" w-1/2 h-[60px]">
                        <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                        {activateSpinner && myNetwork.empty_slot == 5 ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                       <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                      
                                       <div className="text-xs ml-2">Referral no 6</div>
                                       </div>
                                </>
                            }
                        </div>
                    </button>
                        }



                </div>
              

                

                <div className="flex justify-center rounded-full  bg-gray-700 mt-2">
                <div className="text-center w-12 h-12 bg-red-700 rounded-full mt-1 pt-2 mr-5">
                <i className="icofont-rocket-alt-1 text-3xl text-yellow-400 "></i>
                </div>
                <div className="text-center py-2 mt-2 bg-gray-700 rounded-full ">
                    <p className="uppercase text-sm">READY TO THE NEXT LEVEL - $50</p>
                    <p className="text-xs"> Reward up to 1000%</p>
                </div>
                </div>

                <div className="w-full flex justify-around items-center gap-3 mt-2">
                   
                   {myNetwork.slot_8?
                       <button  className=" w-1/2 h-[60px]">
                         <div className=" flex flex-col centered  rounded-full _gradient_blue pl-2 pr-2 py-1">
                              <>
                                      
                              <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_8}</div>
                              </div>
                                          
                                   </>
                              
                           </div>
                       </button>:
                       <button  className=" w-1/2 h-[60px]">
                           <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                           {activateSpinner && myNetwork.empty_slot ==4 ?
                                   <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                   : <>
                                        <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 7</div>
                                       </div>
                                   </>
                               }
                           </div>
                       </button>
                           }
   
                    
   
   
   {myNetwork.slot_9?
                       <button  className=" w-1/2 h-[60px]">
                         <div className=" flex flex-col centered  rounded-full _gradient_blue pl-2 pr-2 py-1">
                              <>
                                      
                              <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_9}</div>
                              </div>
                                          
                                   </>
                              
                           </div>
                       </button>:
                       <button  className=" w-1/2 h-[60px]">
                           <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                           {activateSpinner && myNetwork.empty_slot == 3 ?
                                   <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                   : <>
                                      <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 8</div>
                                       </div>
                                   </>
                               }
                           </div>
                       </button>
                           }
   
                       </div>
                   
                       <div className="w-full flex justify-around items-center gap-3 mt-2">
   
     {myNetwork.slot_10?
                       <button  className=" w-1/2 h-[60px]">
                         <div className=" flex flex-col centered  rounded-full _gradient_blue pl-2 pr-2 py-1">
                              <>
                                      
                              <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_10}</div>
                              </div>
                                          
                                   </>
                              
                           </div>
                       </button>:
                       <button  className=" w-1/2 h-[60px]">
                           <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                           {activateSpinner && myNetwork.empty_slot == 2 ?
                                   <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                   : <>
                                       <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 9</div>
                                       </div>
                                   </>
                               }
                           </div>
                       </button>
                           }
   
   
   
   {myNetwork.slot_11?
                       <button  className=" w-1/2 h-[60px]">
                         <div className=" flex flex-col centered  rounded-full _gradient_blue pl-2 pr-2 py-1">
                              <>
                                      
                              <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_11}</div>
                              </div>
                                          
                                   </>
                              
                           </div>
                       </button>:
                       <button  className=" w-1/2 h-[60px]">
                           <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                           {activateSpinner && myNetwork.empty_slot == 1 ?
                                   <svg style={{ maxWidth: 40 }} role="status" className="inline m-2  w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                   : <>
                                      <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 10</div>
                                       </div>
                                   </>
                               }
                           </div>
                       </button>
                           }

                           </div>
                           <div className="w-full flex justify-around items-center gap-3 mt-2">

{myNetwork.slot_12?
                       <button  className=" w-1/2 h-[60px]">
                         <div className=" flex flex-col centered  rounded-full _gradient_blue pl-2 pr-2 py-1">
                              <>
                                      
                              <div className="w-full flex justify-between items-center py-1 pr-10">
                                <div className=" rounded-full h-8 w-10 flex"> <img src="/assets/img/user.png" className="rounded-full h-8 w-10" alt="users" /> </div> 
                                <div className="text-xs ml-2">{myNetwork.slot_12}</div>
                              </div>
                                          
                                   </>
                              
                           </div>
                       </button>:
                       <button  className=" w-1/2 h-[60px]">
                           <div className=" flex flex-col centered border border-slate-700 rounded-full _gradient_slate pl-2 pr-2">
                           {activateSpinner && myNetwork.empty_slot == 1 ?
                                   <svg style={{ maxWidth: 40 }} role="status" className="inline m-2  w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                   </svg>
                                   : <>
                                      <div className="w-full flex justify-between items-center py-1 pr-10">
                                      <div ><i className="icofont-plus-circle text-2xl  text-white"></i>  </div> 
                                       <div className="text-xs ml-2">Referral no 11</div>
                                       </div>
                                   </>
                               }
                           </div>
                       </button>
                           }
   
                    
                    
                 
   
                   </div>

         

            <div className="text-center py-2 mb-10 mt-10 bg-gray-700 rounded-full _gradient_slate">
                    <p className="uppercase ">YOUR REFERRALS READY TO BE ACTIVATED</p>
                </div>

                {!myDownlines && loader &&
                <div className="flex centered">
                <svg role="status" className="inline m-2 w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
               </div>}

        {myDownlines && myDownlines.map((item, index) => {

      return ( <>


            <div className=" flex flex-row justify-between border-2 border-slate-700 pb-2 px-2 rounded-lg mb-2" key={index}>
                <div className=" flex flex-col">
                    <span className=" flex centered text-xs py-0">{item.userID} </span>
                    <span className=" flex centered text-[10px] py-0">{item.fullname}</span>
                    <span className=" flex centered text-[10px] py-0">Balance :  ${item.wallet}</span>
                </div>
                <div className=" flex h-10">
                <button onClick={()=>handleActivate(index, item.userID, item.wallet)} className="_btn_activate_green text-sm ">
                    
                         {activateSpinner && rowIndex == index && <svg style={{ maxWidth: 40 }} role="status" className="inline m-2 w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>}
                    
                    ACTIVATE</button>
             </div>
             </div>
</>
            )
            })}

{!myDownlines && !loader &&
            <div className="flex centered">
            <p className="text-sm">Opps...You dont have any refferals to be activated</p>
            </div> }
           </div>
           :
           <div className='flex flex-col centered  border border-slate-700 p-2 mt-10 bg-slate-800'>
            <p>Opps.. You are not an active user</p>
            <p className="text-xs">Your account must be activated by your sponsor</p>
            </div>
        }
</div>
          
        </>
    )
}



