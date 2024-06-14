import React, { useState } from "react";
//import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

export default function MainsliderSample() {


    return (

        <>

            <section className="bg-gray-100" >
                <div className="container mx-auto">

                    <div className="w-full">

                        <Swiper
                            // effect="fade"
                            spaceBetween={1}
                            slidesPerView={1}
                            loop={true}
                            speed={1000}
                            autoplay={true}
                            delay={2}
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            // navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        //   onSwiper={(swiper) => console.log(swiper)}
                        //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                        >

<SwiperSlide>
                             
                                <img src="/assets/img/slider/slider-1.webp" alt="banner" className=' mx-auto ' />

                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/assets/img/slider/slider-2.webp" alt="banner" className=' mx-auto ' />

                            </SwiperSlide>
                               <SwiperSlide>
                                <img src="/assets/img/slider/slider-3.webp" alt="banner" className=' mx-auto ' />

                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </section>
        </>







    )
}
