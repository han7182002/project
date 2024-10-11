'use client'

import Link from 'next/link';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinServer() {
    const Router = useRouter();

    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (localStorage.getItem('users')) {
            const name = JSON.parse(localStorage.getItem('users'))
            setUserName(name.loginName)
        } else {
            Router.push('/intro')
        }
    }, [Router]);

    const mealCategories = [
        { title: '아침', image: '/image/join/meal-item02-toster.png', alt: '토스트', value: '1' },
        { title: '점심', image: '/image/join/meal-item03-rice.png', alt: '밥', value: '2' },
        { title: '저녁, 회식', image: '/image/join/meal-item04-beer.png', alt: '맥주', value: '3' },
        { title: '커피, 음료,<br>디저트', image: '/image/join/meal-item01-greencoffee.png', alt: '커피', value: '4' },
    ];

    return (
        <div className="wrap flex flex-col items-center min-h-screen bg-white">
            <main className="meal">
                <h2 className="meal__title text-black font-semibold">
                    오늘도 존버 <span className="userName">{userName}</span>님<br />
                    건강한 <span className="relative companyUser after:absolute after:bottom-0 after:left-0 after:w-full after:h-[10px] after:bg-[#4DF5C3] after:z-[-1]">회사세끼</span> 되세요.
                </h2>

                <ul className="meal-list grid grid-cols-2 gap-4">
                    {mealCategories.map(({ title, image, alt, value }) => (
                        <li
                            key={title}
                            className={`meal-item relative rounded-lg font-semibold
                                after:absolute after:top-0 after:left-0 after:w-full after:h-full
                                after:bg-gradient-to-tr after:from-[#e2e2e2] after:to-[#666666]
                                after:opacity-20 after:rounded-[10px]
                                ${value === '3' ? 'meal-item--color' : ''}`}
                        >
                            <Link href={`/list/${value}`} className="meal-item__link relative block z-10">
                                <h3 className="meal-item__title text-black">{parse(title)}</h3>
                                <div className="img-box absolute w-20 bottom-[-17px] right-0">
                                    <img src={image} alt={alt} />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

                <textarea
                    className="meal__banner w-full p-5 rounded-xl text-black font-semibold
                        text-lg opacity-20 bg-gradient-to-tr from-[#e2e2e2] to-[#666666]"
                    defaultValue="광고배너"
                    readOnly
                />
            </main>
        </div>
    );
}