'use client';

import { useState, useEffect } from 'react';

export default function Modal02(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [dummyData] = useState(props.data);
  const menuListData = dummyData;
  // const prdImgArr = props.data.prdImages;
  // console.log('prdImgArr', prdImgArr);

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
      {/* <button className='icon_person ' onClick={handleOpen}>버튼</button> */}
      {
        menuListData.length !== 0 ? (
          menuListData.map((image, index) =>
                <li key={index} className="btn_photo">
                    <img key={index} onClick={handleOpen} src={image} alt="alt" />
                </li>
            )
        ) : (
          <li className="photo_none">
              <img src="../../image/detail/icon_camera.png" alt="카메라" />
              <span>등록된사진없음</span>
          </li>
        )
      }

      <div className={`modal ${isOpen ? 'isOpen' : ''}`}> 
        {isOpen && (
          <div 
            className="inset-0 z-50 flex items-center justify-center" 
            onClick={handleClose}
          > 
            <div className='dimm'></div>
            <div className="modal__open modal__open--02">
              <div className='modal__header'>
                <button onClick={handleClose} className="modal--close">닫기</button>
              </div>

              <div className='modal__contents modal__contents--02'>
                <p className='modal__contents--title'>사진 보기</p>
                <ul className='modal_img_box'>
                  {
                    menuListData.map((image, index) =>
                      <li key={index} className="modal_img">
                          <img key={index} src={image} alt="alt" />
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