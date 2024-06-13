import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setError } from 'redux/reducers/ErrorReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------

export default function BtnUploadAvatar(props) { // receive props from parent

    const myfileRef = useRef()
    const [myfile, setMyfile] = useState(null)

    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    const { username, isLogin } = useSelector((state) => state.AuthReducer)

    const onFileChange = (e) => {
        setMyfile(e.target.files[0])
        console.log(e.target.files[0])
    }

    console.log(myfile)

    useEffect(() => {
        //   dispatch(setProductData({ ...productData, userid: userid }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleUpload = async () => {

        if (!myfile) return false

        //  dispatch(setBtnSpinner(true))

        const data = new FormData();

        data.append("file", myfile);
        data.append("action", "UPLOAD AVATAR");
        data.append("username", username);

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/upload`,
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'json'
        })
            .then(async response => {


                if (response.data.isSuccess) {
                    const data = response.data.avatar
                    dispatch(setModalMessage({ type: 'success', title: "Upload Success", message: 'Transaction is successfull' }))

                    setMyfile(null)
                } else {
                    console.log(response.data)
                }

            }).catch(function (error) {
                console.log(error)
                dispatch(setModalMessage({ type: 'danger', title: "Upload Error", message: error }))

            });
    }





    return (
        <>

            <form method="post" encType="multipart/form-data" className="hiddenXXX">
                <input type="file" multiple onChange={onFileChange} ref={myfileRef} />
            </form>

            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-center w-full mb-5 mt-2">
                    {isLogin ?
                        <img src="/assets/img/user.png" alt="banner" className="w-[50%] border-4 border-dashed" />
                        :
                        <img src="/assets/img/user.png" alt="banner" className="w-[50%] border-4 border-dashed" />
                    }
                </div>

                {!isLogin ?
                    <div className="flex justify-center items-center">
                        <button className="_gradient_green rounded-full  text-sm border-2 px-4 py-1">
                            <i className="icofont-close-circled mr-2" /> Change Avatar</button>
                    </div>
                    :

                    spinner ?
                        <button className="_gradient_green rounded-full  text-sm border-2 px-4 py-1">
                            <svg role="status" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            Uploading.....</button>
                        :
                        <button onClick={handleUpload} className="_gradient_green rounded-full  text-sm border-2 px-4 py-1">
                            <i className="icofont-thin-double-right mr-2 py-1" />
                            Upload Avatar</button>
                }
            </div>
        </>
    );
}

