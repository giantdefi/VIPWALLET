import React, { useState, useEffect } from "react";


import ReactPlayer from 'react-player/youtube'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setPlayNumber, setBgNumber, resetVideo } from 'redux/reducers/VideoPlayReducer';
//-------------------------------------------------------------------------

export default function Video1() {

    const dispatch = useDispatch();
    const { playNumber, bgNumber } = useSelector((state) => state.VideoPlayReducer)


    const handleEnd = () => {
        dispatch(setBgNumber(0))
    }
    const handleVideoNumber = (no) => {
        dispatch(setPlayNumber(no))
        dispatch(setBgNumber(no))
    }

    const handlePause = () => {
        resetVideo()
    }


    useEffect(() => {

        if (playNumber) {
            dispatch(resetVideo())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(playNumber)
    console.log(bgNumber)

    return (
        <>

            <div className="videoId fadeIn animated mx-auto border-4">
                <div className="playId "
                    style={{ backgroundImage: 'url("/assets/img/play-button.png"), url("/assets/img/video-img/mqdefault_6s.webp")' }}
                    onClick={() => handleVideoNumber(3)} hidden={parseInt(bgNumber) === 3 ? true : false} />

                <ReactPlayer

                    url="https://www.youtube.com/watch?v=K3nr8kAtfI8&ab_channel=TheSecretMindset"
                    playing={playNumber === 3 ? true : false}
                    // onStart={handleStart}
                    onEnded={handleEnd}
                    controls
                    width='100%'
                    height='100%'
                    onPause={() => handlePause()}
                />

            </div>


        </>
    )
}



