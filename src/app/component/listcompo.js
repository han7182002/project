'use client';

import Link from "next/link.js";
import { useEffect, useState } from 'react';
import Modal from '../component/Modal';
import { useRouter } from "next/navigation";
import HomeButton from '../component/HomeBtn';
import Make from '../component/make';

export default function ListPage({ data }) {
    const Router = useRouter();

    const defaultImageUrl = '/image/intro/profile-common.png';

    // 프로필 이미지 업로드
    const [image, setImage] = useState(defaultImageUrl);
    const [userInfo, setUserInfo] = useState(null);

    
    
    console.log("Received data:", data);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('users');
        if (!storedUserInfo) {
            Router.push('/intro');
        } else {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            setImage(parsedUserInfo.image && defaultImageUrl);
        }
    }, [Router]);

    const [dummyData] = useState(data);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('전체');
    const [selectedCategory, setSelectedCategory] = useState('2'); // 기본값 '점심'

    const parseTime = (timeString) => {
        const hours = parseInt(timeString.substring(0, 2));
        const minutes = parseInt(timeString.substring(2));
        return new Date(2024, 0, 1, hours, minutes);
    };

    const getCurrentTime = () => {
        const now = new Date();
        return new Date(2024, 0, 1, now.getHours(), now.getMinutes());
    };

    const filteredData = dummyData
        .filter(item => item.category === selectedCategory)
        .filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.hash && item.hash.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(item => {
            if (selectedFilter === '전체') return true;
            const itemTime = parseTime(item.date);
            const now = getCurrentTime();
            if (selectedFilter === '진행중') return itemTime > now;
            if (selectedFilter === '종료') return itemTime <= now;
            return true;
        });

    console.log("Filtered data:", filteredData);

    const isExpired = (timeString) => {
        const itemTime = parseTime(timeString);
        const now = getCurrentTime();
        return now > itemTime;
    };

    const formatTime = (timeString) => {
        const hours = timeString.substring(0, 2);
        const minutes = timeString.substring(2);
        return `${hours}:${minutes}`;
    };

    return (
        <div className="wrap list flex flex-col min-h-screen">
            <div className="Header-list w-full flex flex-col items-center ">
                <div className="Header-list__select">
                    <select
                        className="Header-list__menu"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="1">아침</option>
                        <option value="2">점심</option>
                        <option value="3">저녁·회식</option>
                        <option value="4">음료·디저트</option>
                    </select>
                </div>
                <div className="Header-list__search flex relative">
                    <input
                        className='Header-list__input'
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="inner">
                <div className="filter-sort flex items-center">
                    <div className="filter flex">
                        <button
                            className={`filter__button ${selectedFilter === '전체' ? 'active' : ''}`}
                            onClick={() => setSelectedFilter('전체')}
                        >
                            전체
                        </button>
                        <button
                            className={`filter__button ${selectedFilter === '진행중' ? 'active' : ''}`}
                            onClick={() => setSelectedFilter('진행중')}
                        >
                            진행중
                        </button>
                        <button
                            className={`filter__button ${selectedFilter === '종료' ? 'active' : ''}`}
                            onClick={() => setSelectedFilter('종료')}
                        >
                            종료
                        </button>
                    </div>
                </div>

                <ul className="mem-list flex flex-col gap-2">
                    {filteredData.map((item) => (
                        <li key={item._id} className={`mem-item relative flex items-center ${isExpired(item.date) ? 'disabled' : ''}`}>
                            <Link href={"/detail/" + item._id} style={{ width: "100%" }}>
                                <div className="mem-item__profile flex flex-col items-center">
                                    <div className="img-box">
                                        <img src={image} alt="프로필 이미지" width={56} height={56} className="profile-image" />
                                    </div>
                                    <span className='profile-name'>{userInfo?.loginName || item.username}</span>
                                </div>
                                <div className="mem-item__content">
                                    <div className="mem-item__wrap relative">
                                        <div className="mem-item__box flex justify-between">
                                            <h3 className="mem-item__title text-black">{item.title}</h3>
                                            <p className='mem-item__prcpation text-black'>참여 <span>{item.check}</span>명</p>
                                        </div>
                                        <div className="mem-item__box flex justify-between">
                                            {item.price && <p className="mem-item__price text-black">예상금액 : 1인당 {item.price[0]}원</p>}
                                            <p className="mem-item__time text-black">
                                                {isExpired(item.date) ? (
                                                    <span className="expired-label text-black">종료</span>
                                                ) : (
                                                    <>마감 <span>{formatTime(item.date)}</span>까지</>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {item.hash && item.hash.split(',').map((tag, index) =>
                                        <span key={index} className="mem-item__tags text-black">{tag.trim()}</span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='btn-box'>
                <HomeButton />

                <Modal>
                    <Make></Make>
                </Modal>
            </div>
        </div>
    );
}