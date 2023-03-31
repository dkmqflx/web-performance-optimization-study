import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ImageModal from '../components/ImageModal';

function ImageModalContainer() {
  // return하는 새로운 오브젝트와 비교한다
  const { modalVisible, bgColor, src, alt, id } = useSelector(
    state => ({
      modalVisible: state.imageModal.modalVisible,
      bgColor: state.imageModal.bgColor,
      src: state.imageModal.src,
      alt: state.imageModal.alt,
      id: state.imageModal.id,
    }),
    shallowEqual
  );
  //

  // shallowEqual 전달하면 단순 비교하는 것이 아니라
  // 객체라면 첫번쩨 depth에 있는 값들을 하나하나 비교한다
  // {a,b,c,}라는 옵젝트 있으면, {}

  // 아래처럼 오브젝트를 쪼개는 방식으로 해결한다
  // const modalVisible = useSelector(state => state.imageModal.modalVisible);
  // const bgColor = useSelector(state => state.imageModal.bgColor);
  // const src = useSelector(state => state.imageModal.src);
  // const alt = useSelector(state => state.imageModal.alt);

  return <ImageModal modalVisible={modalVisible} bgColor={bgColor} src={src} alt={alt} id={id} />;
}

export default ImageModalContainer;
