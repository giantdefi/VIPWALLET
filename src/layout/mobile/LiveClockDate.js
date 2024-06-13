import React, { } from "react"
import Clock from 'react-live-clock'


export default function LiveClockDate() {

    return (
        <>

            <Clock
                // format={'HH:mm:ss'} 
                format={'dddd, MMMM Mo, YYYY, HH:mm:ss '}
                ticking={true} />
        </>
    )
}
