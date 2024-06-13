import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";

import Clock from 'react-clock';
//import 'react-clock/dist/Clock.css';


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux';
import { setClockSize } from 'redux/reducers/PersistReducer';
//-------------------------------------------------------------------------

export default function LiveClock() {


    const router = useRouter();
    const dispatch = useDispatch();
    const { clockSize } = useSelector((state) => state.PersistReducer)
    const [value, setValue] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000)
        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClockSize = () => {
        if (clockSize === 350) {
            dispatch(setClockSize(200))
        } else {
            dispatch(setClockSize(clockSize + 25))
        }
    }


    return (
        <>

            <div className="flex centered p-2 py-2 animated fadeIn">
                <div
                //  onClick={handleClockSize}
                >
                    <Clock
                        value={value}
                        className={"bg-[url('/assets/img/bnb-watch.webp')] bg-center bg-cover"}
                        secondHandWidth={4} // second nodle width
                        secondHandLength={90} // second nodle length
                        secondHandOppositeLength={20}
                        hourHandWidth={8} // hour nodle width
                        minuteHandWidth={6} // minute nodle width
                        hourMarksWidth={4} // hour thick delimiter
                        hourMarksLength={9} // hourdelimiter length
                        minuteMarksWidth={1} // minute thick delimiter
                        size={240}
                    // locale={"id-ID"}
                    />
                </div>
            </div>


        </>
    )
}



