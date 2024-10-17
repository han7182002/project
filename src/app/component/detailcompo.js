'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from 'next/link';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Modal02 from '../component/Modal02.js';
import Modal03 from "../component//Modal03.js";
import HomeButton from '../component/HomeBtn';

export default function Detail(props) {
    const Router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('nickname')) {
            Router.push('/intro')
        }
    });

    // 좋아요 기능 테스트
    let [likes, setLike] = useState(props.data.check.map((likes, index) => likes.length));
    const [isActive, setIsActive] = useState(true);
    const toggleIsActive = (i, prev) => {
        setIsActive(i);
        setLike(likes);
        
        // const handleLike = async (checks) => {
        
        //     try {
        //         const res = await fetch(`/`, {
        //             method: 'POST',
        //         });
    
        //         if (res.ok) {
        //             const num = props.data.check.map((check, index) => check[index]);
        //             console.log('ok', props.data);
        //             const chkArr = num.map((chk, index) => chk[index])
        //             console.log('chkArr', chkArr);
                    
    
        //             const data = await res.json();
        //             setUpdatedPosts((prevPosts) =>
        //                 prevPosts.map((props) =>
        //                     props.data.check === checks ? { ...props, check: props.data.check } : props
        //                 )
        //             );
        //         }
        //     } catch (error) {
        //         console.error('Error liking the post', error);
        //     }
        // };

        // handleLike(props.data.check);
    }
    // console.log('props', props.data);
   
    // 데이터 불러오기
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
    const links = props.data.url;
    const username = props.data.username;
    const chkArr = props.data.check;

    // console.log('like',likes)

    // 공유하기 클립보드
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 복사되었습니다.');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCopyClick = () => {
        const textToCopy = window.location.href; // 복사하고 싶은 텍스트
        copyToClipboard(textToCopy);
        console.log('textToCopy', textToCopy);
        
    };
    // e 공유하기 클립보드

    return (
        <div className="wrap">
            <div className="detail">
                <div className="header">
                    <button type="button" onClick={handleCopyClick} className="btn_share">
                        <span className="blind">공유하기</span>
                    </button>

                    <div className="title">
                        {titles}
                    </div>
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
                                                        key={index}
                                                        value={index}
                                                        onClick={() => {
                                                            toggleIsActive(index);
                                                        }}
                                                        className={isActive === index ? 'btn_vote active' : 'btn_vote'}
                                                    >
                                                        {isActive === index ? '투표완료' : '투표하기'}
                                                    </button>

                                                    <Modal03 data={chkArr[index]} />

                                                    <span className="person_num">{isActive === index ? likes[index] + 1 : likes[index]}</span>

                                                    {/* <p>Likes: {likes[index]}</p> */}
                                                    {/* <button onClick={() => {toggleIsActive(index); handleLike(item._id)}}>Like</button>     */}
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
                                                    <a href={`https://`+links[index]} target="_blank" className="btn_link active" title="해당 페이지로 이동">
                                                        <span className="blind">공유하기</span>
                                                    </a>
                                                ) : (
                                                    <a href={`https://`+links[index]} className="btn_link disabled">
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