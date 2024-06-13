import React, { } from "react";
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>FIVE FORTUNE</title>
                <meta name="description" content="404 page not found" />
            </Head>

            <div className=" px-3 space-y-4 z-0 min-h-screen">
                <div className="items-center" >
                    <div className="m-auto text-center ">
                        <div className="flex justify-center">
                            <img src="/assets/img/404.webp" alt="banner" className="w-2/3" />
                        </div>
                        <h2 className="text-xl text-white md:text-xl font-Poppins">OPSS... SORRY!!</h2>
                        <h2 className="text-xl text-white md:text-3xl font-Poppins">PAGE NOT FOUND</h2>
                        <h2 className="text-xl text-white md:text-2xl md:mt-2 ">FIVE FORTUNE</h2>
                        <p className="text-md">Back to Main page</p>
                    </div>
                </div>
            </div>
        </>
    )
}



