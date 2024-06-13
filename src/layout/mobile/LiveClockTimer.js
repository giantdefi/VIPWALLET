import React, { } from "react"
import Clock from 'react-live-clock'


export default function LiveClockTimer() {

    return (
        <>

            <Clock
                format={'HH:mm:ss'}
                // format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
                ticking={true} />
        </>
    )
}
