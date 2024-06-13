import React, { useRef } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";

//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//--------------------------------------

export default function BackArrow(props) {

  const router = useRouter();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(setPlaySound('click'))
    setTimeout(() => {
      router.push(props.backURL)
    }, 500)
  }

  return (
    <>
      <span onClick={handleBackClick} className="cursor-pointer icofont-long-arrow-left text-5xl"></span>
    </>
  )
}
