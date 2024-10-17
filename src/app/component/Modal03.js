'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal03(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [dummyData] = useState(props.data);
  const menuListData = dummyData;

  const Router = useRouter();
  // 로컬스토리지에있는 프로필명 불러오기
  const defaultImageUrl = '/image/intro/profile-common.png'; //기본 이미지 경로

  const [userprofileImg, setUserprofileImg] = useState(defaultImageUrl);

  useEffect(() => {
    if (localStorage.getItem('profileImg')) {
        const profileImg = JSON.parse(localStorage.getItem('profileImg'));
        setUserprofileImg(profileImg)

    } else {
      Router.push('/intro')
    }
}, [Router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleOpen = () => setIsOpen(true);
  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button className='icon_person' onClick={handleOpen}></button>
      <div className={`modal ${isOpen ? 'isOpen' : ''}`}> 
        {isOpen && (
          <div 
            className="inset-0 z-50 flex items-center justify-center" 
            onClick={handleClose}
          > 
            <div className='dimm'></div>
            <div className="modal__open">
              <div className='modal__header'>
                <button onClick={handleClose} className="modal--close">닫기</button>
              </div>

              <div className='modal__contents modal__contents--03'>
                <p className='modal__contents--title'>투표참여자</p>
                <ul className='modal_user__list'>
                  {
                    menuListData.map((user, index) =>
                      <li key={index} className="modal_user__item">
                        <img className='modal_user__item--img' src={userprofileImg} alt="프로필 이미지" />
                        <p className='modal_user__item--name'>{user}</p>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};