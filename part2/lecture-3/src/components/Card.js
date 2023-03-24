import React, { useEffect } from 'react';
import { useRef } from 'react';

function Card(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const callback = (entries, observer) => {
      // observer는 아래 있는 observer와 동일한 객체
      // 내부에서도 observer를 사용할 수 있다.

      // entries는 아래 observe한 객체들이 넘어온다
      // 여기서는 요소 하나만 observe하고 있기 때문에 요소 하나만 있는 배열일 넘어온다
      // console.log(entries);

      entries.forEach((entry) => {
        // console.log(entry);
        //   entry.isIntersecting : 화면 안에 이 요소가 들어와 있는지 아닌지를 나타내는 값으로 여기서 가장 중요한 요소
        if (entry.isIntersecting) {
          console.log('is Intersecting');

          entry.target.src = entry.target.dataset.src;
          // entry.target이 img 요소
          // 화면에 img 요소가 보일 때 src 값이 생긴다.
          // 그 때 이미지를 로드하게 된다

          observer.unobserve(entry.target);
          // 이미지 src를 넣었으면 더 이상 observe할 필요가 없기 때문
          // 해당 부분 없으면, 요소 사라졌다가 보일 때 마다 계속해서 다운로드 받는 것을 네트워크 탭에서 확인할 수 있다
        }
      });
    };

    const options = {};

    const observer = new IntersectionObserver(callback, options);

    observer.observe(imgRef.current);
  }, []);

  return (
    <div className='Card text-center'>
      <img data-src={props.image} ref={imgRef} />
      <div className='p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all'>
        {props.children}
      </div>
    </div>
  );
}

export default Card;
