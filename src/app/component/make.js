'use client';

import { Input } from "postcss";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";


export default function Make() {
    

    // 이미지 저장
    const[filenames, setFileNames] = useState('');


    // 메뉴 추가하기
    const [nodeCount, setNodeCount] = useState(1);
    const nodeAdd = () => {
        let num = nodeCount + 1
        setNodeCount(num)

          
        console.log(nodeCount);
        
    }


    const [selected, setSelected] = useState(0);
    const [minSelected, setMinSelected] = useState(0);

    const handleSelect = (e) => {
        setSelected(e.target.value)
    }

    const minHandleSelect = (e) => {
        setMinSelected(e.target.value)
    }
    

    // 마감시간 for 문
    const timeSelect = () => {
        const result = [];
        for (let i = 0; i < 25; i++) {
            result.push(<option value={i} key={i}>{i}</option>)
        }
        return result;
    }

    const minuteSelect = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<option value={i + '0'} key={i + '0'}>{i + '0'}</option>)
        }
        return result;
    }
    

    const [selectedOption, setselectedOption] = useState('');
    const [userName, setUserName] = useState('');

    
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('nickname')) {
            const name = JSON.parse(localStorage.getItem('nickname'))
            setUserName(name)
        
        } else {
            router.push('/intro')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [publicId, setPublicId] = useState([]);
    const [openArr, setopenArr] = useState([]);
   
      
    let test = [];
    
    console.log(openArr[0]);
    

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
                            {[...Array(parseInt(nodeCount))].map((n, index) => {
                                return (
                                    <ul className="info_list info_list_add" key={index}>
                                        <li className="list_item">
                                            <label className="item_tit" htmlFor="name">{index+1}. </label>
                                            <input type="text" name="menu" placeholder="메뉴이름" id="name" required />
                                        </li>
                                        <li className="list_item">
                                            <input type="text" name="price" placeholder="예상금액 (1인당 / 금액만 입력)" id="price" required />
                                        </li>
                                        <li className="list_item">
                                            <input type="text" name="url" placeholder="URL" id="adressurl" required />
                                        </li>
                                    
                                        <CldUploadWidget uploadPreset="fpczo54q"  onSuccess={(results) => {

                                                const res = results.info.url
                                                const arr = res.split(", ");
                                               
                                                
                                                test.push(arr);
                                                
                                                
                                                return setopenArr([test]);
                                                
                                           
                                                
                                                // Object.entries(results).map((file, idx) => {
                                                //     return setopenArr([...openArr, file.info.url]);

                                                // })

                                                
                                                
                                                
                                            }}>
                                            {({ open }) => (
                                                <button className="img_label" onClick={() => {open()}}>
                                                
                                                </button>
                                            )}

{
                                                
                                            }
                                        </CldUploadWidget>
                                        {
                                            publicId && (

                                                <>
                                                    <div className="img_wrap">
                                                        {
                                                            publicId.map((item,idx) => (
                                                                <img className="list_img" src={item} alt="upload_img" width={53} height={53} key={idx}/>
                                                            ))
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                        {/* <div className='list_pic'>
                                            <label className="img_label" htmlFor="imageUp"></label>
                                            <input type="file" id="imageUp" className="img_input" multiple accept="image/*" onChange={fileChange}/>
                                            
                                            {
                                                image && (

                                                    <>
                                                        <div className="img_wrap">
                                                            {
                                                                image.map((item,idx) => (
                                                                    <img className="list_img" src={item} alt="upload_img" width={53} height={53} key={idx}/>
                                                                ))
                                                            }
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div> */}
    
                                        <div className="info_area" style={{display: "none"}}>
                                            <input type="text" name="check" value={[]} required readOnly />
                                        </div>
                                        <div className="info_area" style={{display: "none"}}>
                                            <input type="text" name="prdImages" value={openArr[0]} required readOnly />
                                        </div>
                                    </ul>
                                )
                            })}
                            <button type="button" className="add_btn" onClick={nodeAdd}><img src="../../../image/make/list_add_ico.png" alt="플러스 아이콘" width={26} height={26}/></button>
                        </div>
                        <div className="info_area" style={{display: "none"}}>
                            <input type="text" name="username" value={userName} required readOnly />
                        </div>
                        {/* <div className="info_area" style={{display: "none"}}>
                            <input type="text" name="prdImages" value={['']} required />
                        </div> */}
                        <div className="info_area">
                            <p className="info_title">마감시간</p>
                            <ul className="info_list">
                                <li className="list_item" style={{border: "none"}}>
                                    <div className="select_wrap">
                                        <select onChange={handleSelect} value={parseInt(selected)}>
                                            {timeSelect()}
                                        </select>
                                    </div>
                                    <p className="time_txt">시</p>
                                    <div className="select_wrap">
                                        <select onChange={minHandleSelect} value={parseInt(minSelected)}>
                                           {minuteSelect()}
                                        </select>
                                    </div>
                                    <input type="hidden" name="date" value={selected+minSelected}></input>
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
