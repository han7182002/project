'use client'

import 'animate.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Intro() {

    const router = useRouter();

    const defaultImageUrl = '/image/intro/profile-common.png'; //기본 이미지 경로
    const [nickname, setNickname] = useState('');
    const [profileImg, setProfileImg] = useState(defaultImageUrl);
    const [file, setFile] = useState(null);
    

    useEffect(() => {
        
        const savedNickname = localStorage.getItem('nickname');
        const savedProfileImg = localStorage.getItem('profileImg');
        if (savedNickname && savedProfileImg) {
            router.push('/join')
        }
    
    });
    
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    //이미지 파일을 선택했을 때 호출되는 함수
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // 취소 버튼을 클릭했을 때 호출되는 함수
    const handleCancel = () => {
        setProfileImg(defaultImageUrl);
        setFile(null);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem('nickname') && localStorage.getItem('profileImg')) {
            //router.push('/join')
        } else {
            localStorage.setItem('nickname',  JSON.stringify(nickname) );
            localStorage.setItem('profileImg',  JSON.stringify(profileImg));
            router.push('/join');

            setTimeout(()=> {
                localStorage.clear('nickname')
                localStorage.clear('profileImg')
            }, 3000000)
        }

      };




    // cover 나타났다가 사라지게 하는 함수
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);




    return (
        <div className='intro wrap'>

            <div className={`cover ${!visible ? 'off' : ''}`}>
                <h1 className='cover_title jua animate__animated animate__fadeIn'>우리 회사 건강한 식문화</h1>
                <div className='cover_wrap'>
                    <div className='cover_img_wrap cover_img_wrap01 animate__animated animate__zoomIn'>
                        <img className='cover_img cover_img01' src='./image/intro/intro-text01.png' alt='회' width={54} height={60} />
                        <img className='cover_img cover_img01-1 animate__animated animate__swing' src='./image/intro/intro-meal.png' alt='밥그릇' width={40} height={36} />
                    </div>
                    <div className='cover_img_wrap'>
                        <img className='cover_img cover_img02 animate__animated animate__zoomIn' src='./image/intro/intro-text02.png' alt='사' width={54} height={50} />
                        <img className='cover_img cover_img03 animate__animated animate__zoomIn' src='./image/intro/intro-text03.png' alt='세' width={51} height={50} />
                    </div>
                    <div className='cover_img_wrap cover_img_wrap03'>
                        <img className='cover_img cover_img04 animate__animated animate__zoomIn' src='./image/intro/intro-text04.png' alt='끼' width={36} height={54} />
                        <img className='cover_img cover_img04-1 animate__animated animate__fadeInDownBig' src='./image/intro/intro-tie.png' alt='넥타이' width={28} height={70} />
                    </div>
                </div>
            </div>

            <div className='login'>
                <h2 className='login_title'>프로필 사진과<br />닉네임을 등록해주세요.</h2>
                <form onSubmit={handleSubmit}>
                    <div className='login_profile' onChange={handleImageChange}>
                        <div className='login_img_wrap' >
                            <img className='login_img' src={profileImg} alt="프로필 이미지" width={148} height={148} />
                        </div>
                        <input
                            id='loginImgInput'
                            className='login_img_input'
                            type='file'
                            
                        />
                        <label htmlFor='loginImgInput' className='login_img_label'></label>
                        <button className={`login_img_delete ${!file ? '' : 'show'}`} type="button" onClick={handleCancel} title="기본 이미지로 변경"></button>
                    </div>
                    <div className='login_name'>
                        <input
                            id='loginName'
                            className='login_name_input'
                            type='text'
                            value={nickname}
                            onChange={handleNicknameChange}
                            placeholder='닉네임을 입력해주세요.'
                            required
                        />
                        <p className='login_name_check'>사용 가능한 닉네임 입니다.</p>
                    </div>
                    <button
                        className='login_btn'
                        type='submit'
                        >
                        입장하기
                    </button>
                </form>
            </div>
        </div>
    );
}






