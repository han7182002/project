'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Modal02 from '../component/Modal02.js';
import { useRouter } from "next/navigation.js";
import HomeButton from '../component/HomeBtn';
import axios from "axios";

export default function Detail(props) {
    const Router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('nickname')) {
            Router.push('/intro')
        }
    });

    let [likes, setLike] = useState(0);
    

    const [isActive, setIsActive] = useState(true);
    const toggleIsActive = (i, prev) => {
        setIsActive(i);
        // setLike(likes);
        // setIsLike(!isLike);

        setLike = async(names) => {
            const send_param = {_id}
            if(props.data.check === 0) {
                const result = await axios.post('/detail' + _id, send_param);
                console.log('send_param', result, send_param);
                likes = Number(props.data.check) + 1;
                console.log('props.data.check', props.data.check);
                
            }
    
            console.log('props.data.check', props.data.check);
        }
    };

    console.log('props', props.data);

    const [dummyData] = useState(props.data);
    const menuListData = dummyData;
    const _id = props.data._id;
    const hash = props.data.hash;
    const names = props.data.username;
    const hashArr = hash.split(',');
    const titles = props.data.title;
    const numbers = props.data.menu.map((menu, index) => index + 1);
    let prices = props.data.price.map(prices => prices);
    const prdImgArr = props.data.prdImages;
    let checks = props.data.check;
    const links = props.data.url;
    // console.log('names', names);
    
    // console.log('prdImgArr', prdImgArr.length );

    return (
        <div className="wrap">
            <div className="detail">
                <div className="header">
                    <button className="btn_share">
                        <span className="blind">공유하기</span>
                    </button>

                    <div className="title">
                        {titles}
                    </div>

                    {/* <button className="btn_write">
                        <span className="blind">수정하기</span>
                    </button> */}
                </div>

                <div className="tag">
                    <div className="swiper-container tag_list">
                        <Swiper
                            slidesPerView={'auto'} // 보여질 슬라이스 수
                        >
                            {hashArr.map((hash, index) => (
                                <SwiperSlide key={index} className="item">
                                    <div>
                                        <div>{hash}</div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="detail_menu">
                    <h3 className="title">메뉴 목록</h3>
                    <ul className="menu_list">
                        {
                            menuListData.menu.map((item, index) => (
                                <li key={index} className="item">
                                    <span className="num">{numbers[index]}</span>

                                    <div className="info">
                                        <div className="top">
                                            <div className="inner">
                                                <strong className="name">{item}</strong>

                                                <div className="vote_box">
                                                    <button
                                                        value={index}
                                                        onClick={() => {
                                                            toggleIsActive(index);
                                                        }}
                                                        className={isActive === index ? 'btn_vote active' : 'btn_vote'}
                                                    >
                                                        {isActive === index ? '투표완료' : '투표하기'}
                                                    </button>
                                                    <span className="icon_person"></span>
                                                    <span className="person_num">{isActive === index ? likes + 1 : likes}</span>
                                                </div>
                                            </div>

                                            {prices[index] && <p className="txt">예상금액 : 1인당 <span className="price">{prices[index]}</span>원</p>}
                                        </div>

                                        <div className="btm">
                                            <ul className="photo_list">
                                                <Modal02 data={prdImgArr} />
                                            </ul>

                                            {
                                                prdImgArr.length !== 0 ? (
                                                    <a href={links[index]} target="_blank" className="btn_link active" title="해당 페이지로 이동">
                                                        <span className="blind">공유하기</span>
                                                    </a>
                                                ) : (
                                                    <a href={links[index]} className="btn_link disabled">
                                                        <span className="blind">공유하기</span>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className='btn-box'>
                <HomeButton />
            </div>
        </div>
    );
}