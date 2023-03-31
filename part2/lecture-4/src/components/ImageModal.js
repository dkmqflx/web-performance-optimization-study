import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { hideModal, setBgColor } from '../redux/imageModal';
import { getAverageColorOfImage } from '../utils/getAverageColorOfImage';

function ImageModal({ modalVisible, src, alt, bgColor, id }) {
  const dispatch = useDispatch();
  const onLoadImage = e => {
    // 모달 창 열었을 때 해당 이미지와 비슷한 색깔을 dim 처리해주기 위한 것
    // 평균 색깔 구해서 dispatch 해준 다음, 받아온 bgColor 값을 넣어주는 것

    const averageColor = getAverageColorOfImage(e.target);

    // const averageColor = getAverageColorOfImage(document.querySelector(`#${id}`));
    // e.target이 아니라 특정 id를 받아온다, 첫번째 최적화 방법

    dispatch(setBgColor(averageColor));

    // 여기서 핵심은
    // 1. modal 창의 이미지가 나타난 다음에
    // 2. 그 다음에 background가 적용된다는 것
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <Modal modalVisible={modalVisible} closeModal={closeModal} bgColor={bgColor}>
      <ImageWrap>
        <FullImage crossOrigin="*" src={src} alt={alt} onLoad={onLoadImage} />
      </ImageWrap>
    </Modal>
  );
}

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
`;
const FullImage = styled.img`
  max-width: 100vw;
  max-height: 75vh;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.3);
`;

export default ImageModal;
