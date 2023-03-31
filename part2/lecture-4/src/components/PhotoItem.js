import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/imageModal';
import LazyLoad from 'react-lazyload';

function PhotoItem({ photo: { id, urls, alt } }) {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showModal({ src: urls.full, alt, id }));
    // Image 컴포넌트에 전달된 id 값을 전달해주도록 한다
  };

  // getAverageColorOfImage에서 cross origin 관련 에러가 나타나는데
  // 그 이유는 Image 컴포넌트의 src가 도메인이 다르기 때문이다
  // 즉 내부에 있는 이미지가 아니라 외부 소스이기 때문에
  // ImageModal 컴포넌트에 있는 것 처럼
  // crossOrigin="*"  추가해준다
  return (
    <ImageWrap>
      <LazyLoad offset={500}>
        <Image
          crossOrigin="*"
          id={id}
          src={urls.small + '&t=' + new Date().getTime()}
          alt={alt}
          onClick={openModal}
        />
      </LazyLoad>
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  /* 
  9/16 = 56.25% 
  너비의 56.25% 만큼 padding을 세팅해라 
  */
`;

const Image = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  /* height: 56.25%; */
  top: 0;
  left: 0;
`;

export default PhotoItem;
