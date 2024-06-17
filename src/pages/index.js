import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'

import Head from 'next/head'

import dynamic from 'next/dynamic'
const MainsliderSample = dynamic(() => import("layout/mobile/MainsliderSample"), {
  ssr: false,
})


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setSpinnerAtLogo, } from 'redux/reducers/LoaderReducer'
import { setMainMenuItem, setbackURLs } from 'redux/reducers/MainmenuReducer'
import { setFormSponsor } from 'redux/reducers/FormReducer'
import { setRefLink } from 'redux/reducers/ReferralReducer';
//--------------------------------------

export default function Home() {
  const router = useRouter()
  const { ref } = router.query
  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
  const { masterRef, refLink } = useSelector((state) => state.ReferralReducer)

  // create new user
 
  const [start, setStart] = useState(1000000007)
  const [sponsor, setSponsor] = useState(1000000006)
  const [user, setUser] = useState(7)
  const [index, setIndex] = useState(1)

  const dispatch = useDispatch();
  const [itemLink, setItemLink] = useState()
  const [menuSpinner, setMenuSpinner] = useState(false)

  async function createUsers() {

    const pre = 'VIP'
  
    const data = {
      userID: pre+start,
      sponsor: pre+sponsor,
      name : 'user'+user,
      password : 'T123t123!@#'
    }

    console.log(data)



    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
      url: `${URL}/users/create-users`,
      method: 'POST',
      data,
      'headers': {
          accept: 'application/json',
          'content-type': 'application/json',
      }
    })
        .then(async response => {
          console.log(response.data)
          setStart(start+1)
          setUser(user+1)
          setIndex(index+1)
          if(index == 11) {
            setIndex(1)
            setSponsor(sponsor +1)
          }
        }).catch(function (error) {
            console.log(error)
        })
  }



  useEffect(() => { // referal sponsor from URL if any
       console.log(masterRef)
       console.log(refLink)
       if(masterRef) {
        dispatch(setFormSponsor(masterRef))
       }
       

  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { // referal sponsor from URL if any
    if (ref ) { //  && !refLink // the URL link and not yet exist
      CheckRefUserExist()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  async function CheckRefUserExist() {

    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/users/check-ref-link?username=${ref}`,
        method: 'GET'
    })
        .then(async response => {
            if (response.data.isSuccess) {
                dispatch(setRefLink(ref.toUpperCase()))
                dispatch(setFormSponsor(ref.toUpperCase()))
            } else {
                dispatch(setRefLink(masterRef))
                dispatch(setFormSponsor(masterRef))
            }
        }).catch(function (error) {
            console.log(error)
        })
}


  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>

      <section className="min-h-screen pb-5 animated fadeIn _gradient_blue">
        <div className="w-full  mx-auto pt-2 mb-10">
         

          <MainsliderSample />
      
   

          <div className="flex justify-around">
          <button onClick={()=>router.push('/login')} className="_btn_submit_red">LOGIN</button>
          <button onClick={()=>router.push('/register')} className="_btn_submit_red">REGISTER</button>
          {/* <button onClick={createUsers} className="_btn_submit_red">CREATE USERS</button> */}
          </div>

          <div className="flex flex-col centered mt-20">
            <img src="/assets/img/logo-X.webp" alt="logo" />
          </div>
       
        </div>

      </section>

    </>
  )
}



