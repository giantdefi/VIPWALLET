import React, { useEffect, useState } from "react"


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'

export default function MainFooter() {

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)


    return (
        <>


            <div className="text-center mt-10 py-2 bg-gray-800">
                <p className="text-xs mt-2 mb-2">Copy Right @ 2022-2026 {domain}</p>
              
                <h4 className="font-semibold  uppercase">VIP WALLET</h4>
            </div>

        </>
    )
}



