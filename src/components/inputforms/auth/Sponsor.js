import React, { useEffect, useState, useRef } from "react"
import Router, { useRouter } from "next/router"
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormSponsor } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function Sponsor() {

    const inputRef = useRef()
    const router = useRouter()
    const { ref } = router.query
    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

    // redux store
    const dispatch = useDispatch()
    const { sponsor } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { refLink, masterRef } = useSelector((state) => state.ReferralReducer)
   
    useEffect(() => { // referal sponsor from URL if any
        console.log(masterRef)
        console.log(refLink)
      if(refLink) {
         dispatch(setFormSponsor(refLink))
      }else{
        dispatch(setFormSponsor(masterRef))
      }
       
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

    return (
        <>
            <div className="w-full px-4 mt-2">
                <div className="relative w-full mb-3">

                    <p className="text-sm mb-1 text-yellow-100"> Sponsor VIP-ID   </p>
                    <input type="text" autoComplete="off"  className=" bg-red-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="sponsor"
                        value={sponsor || ''}
                     //   onChange={handleChange}
                    />
                    {formError && formError.path === 'sponsor' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



