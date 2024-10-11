'use client';

import { Input } from "postcss";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from 'react';
import ProductImage from './productImage/productImage.js';


export default function Make() {

    const [productImg, setproductImg] = useState("../../../image/make/upload_basic.png");

    const convertDataURLToFile = async (dataURL, fileName) => {
        const response = await axios.get(dataURL, {
            responseType: "blob",
        })

        const blob = response.data;

        const profileImgFile = new File([blob], fileName, { type: blob.type});

        return profileImgFile;

    }

    const onCLickSubmitBtn = async () => {
        const formData = new FormData()

        if(productImg) {
            console.log("파일 객체로 변한 전 이미지", productImg);

            const profileImgFile = await convertDataURLToFile(
                productImg,
                `productImg`
            );

            FormData.append("image", profileImgFile);
            console.log("파일 객체로 변환 후 이미지", profileImgFile);
            
        }

        try {
            const response = await axios.post(
                `mongodb+srv://admin:dnstjq13@unseop.be9440o.mongodb.net/teamproject`,
                formData,
                {
                    headers: {
                        "Content-Type" : "multipart/form-data",
                        "ngrok-skip-browser-warning": "69420",
                    }
                }
            )
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }

    }

    const [nodeCount, setNodeCount] = useState(1);

    const nodeAdd = () => {
        let num = nodeCount + 1
        setNodeCount(num)

          
        console.log(nodeCount);
        
    }

    const rendering = () => {
        const result = [];
        for (let i = 0; i < nodeCount; i++) {
            result.push(<ul className="info_list info_list_add">
                <li className="list_item">
                    <label className="item_tit" htmlFor="name">{nodeCount}. </label>
                    <input type="text" name="menu" placeholder="메뉴이름" id="name" required />
                </li>
                <li className="list_item">
                    <input type="text" name="price" placeholder="예상금액 (1인당 / 금액만 입력)" id="price" required />
                </li>
                <li className="list_item">
                    <input type="text" name="url" placeholder="URL" id="adressurl" required />
                </li>

                <div className='list_pic'>
                    <ProductImage
                        productImg={productImg}
                        setproductImg={setproductImg}
                    />

                </div>
            </ul>)
        }
        return result;
    }

    // 마감시간 for 문
    const timeSelect = () => {
        const result = [];
        for (let i = 0; i < 25; i++) {
            result.push(<option value={i}>{i}</option>)
        }
        return result;
    }

    const minuteSelect = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<option value={{i}+0}>{i}0</option>)
        }
        return result;
    }

    const [selectedOption, setselectedOption] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (localStorage.getItem('users')) {
            const name = JSON.parse(localStorage.getItem('users'))
            setUserName(name.loginName)
        
        } else {
            Router.push('/intro')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    

    return (
        <div className="sec_make">
            <div className="wrap">
                <div className="container">
                    <form action="/api/post/make" method="POST">
                        <div className="info_area">
                            <p className="info_title">카테고리</p>
                            <ul className="info_cate">
                                <li className="list_item">
                                    <label>
                                        <input
                                            name="category"
                                            type="radio"
                                            value="0"
                                            checked={selectedOption === '0'}
                                            onChange={(e) => setselectedOption(e.target.value)}
                                            required
                                        />
                                        <span className="peer">아침</span>
                                    </label>
                                </li>
                                <li className="list_item">
                                    <label>
                                        <input
                                            name="category"
                                            type="radio"
                                            value="1"
                                            checked={selectedOption === '1'}
                                            onChange={(e) => setselectedOption(e.target.value)}
                                            required
                                        />
                                        <span className="peer">점심</span>
                                    </label>
                                </li>
                                <li className="list_item">
                                    <label>
                                        <input
                                            name="category"
                                            type="radio"
                                            value="2"
                                            checked={selectedOption === '2'}
                                            onChange={(e) => setselectedOption(e.target.value)}
                                            required
                                        />
                                        <span className="peer">저녁·회식</span>
                                    </label>
                                </li>
                                <li className="list_item">
                                    <label>
                                        <input
                                            name="category"
                                            type="radio"
                                            value="3"
                                            checked={selectedOption === '3'}
                                            onChange={(e) => setselectedOption(e.target.value)}
                                            required
                                        />
                                        <span className="peer">음료·디저트</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="info_area">
                            <p className="info_title">방정보</p>
                            <ul className="info_list">
                                <li className="list_item">
                                    <input type="text" name="title" placeholder="방제목" id="title" required />
                                </li>
                                <li className="list_item">
                                    <input type="text" name="hash" placeholder="#맛집,#폭주,#집안가 (5개까지 입력)" id="tag" required />
                                </li>
                            </ul>
                        </div>
                        <div className="info_area">
                            <p className="info_title">메뉴등록</p>
                            {rendering()}
                            <button type="button" className="add_btn" onClick={nodeAdd}><img src="../../../image/make/list_add_ico.png" alt="플러스 아이콘" width={26} height={26}/></button>
                        </div>
                        <div className="info_area" style={{display: "none"}}>
                            <input type="text" name="check" value={0} required />
                        </div>
                        <div className="info_area" style={{display: "none"}}>
                            <input type="text" name="username" value={userName} required />
                        </div>
                        <div className="info_area" style={{display: "none"}}>
                            <input type="text" name="prdImages" value={['']} required />
                        </div>
                        <div className="info_area">
                            <p className="info_title">마감시간</p>
                            <ul className="info_list">
                                <li className="list_item" style={{border: "none"}}>
                                    <div className="select_wrap">
                                        <select>
                                            {timeSelect()}
                                        </select>
                                    </div>
                                    <p className="time_txt">시</p>
                                    <div className="select_wrap">
                                        <select>
                                           {minuteSelect()}
                                        </select>
                                    </div>
                                    <p className="time_txt">분</p>
                                </li>
                            </ul>
                        </div>

                        <button type="submit" className="btn_submit">등록완료</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
