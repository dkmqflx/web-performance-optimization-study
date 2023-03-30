import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import PhotoList from '../components/PhotoList';
import { fetchPhotos } from '../redux/photos';
import selectFilteredPhotos from '../redux/selectFilteredPhotos';

function PhotoListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  // components/PhotoItem.js의 dispatch가 state를 변경시키기 때문에, 아래 부분에도 영향을 준다
  // 하지만 아래에서는 components/PhotoItem.js의 dispatch가 state를 변경시키는 데이터를 사용하지 않는다

  // shallowEqual 함수 전달하는 방식으로 해결
  // modal의 state가 변경되더라도 해당 부분에는 영향을 주지 않는다
  // 하지만 modal 열고 닫고 해도 렌더링되면 안되는데 실제로는 렌더링된다
  // 그 이유는 filter 함수 때문
  // filter 함수가 새로운 배열 객체를 반환하기 때문에 다른 값으로 취급해서 다시 렌더링된다

  // const { photos, loading } = useSelector(
  //   state => ({
  //     photos:
  //       state.category.category === 'all'
  //         ? state.photos.data
  //         : state.photos.data.filter(photo => photo.category === state.category.category),
  //     loading: state.photos.loading,
  //   }),
  //   shallowEqual
  // );

  // 바깥에서 filter 하도록 코드를 수정해준다.
  // 이렇게 코드를 수정해주면 더 이상 모달을 열고 닫을 때 이미지 리스트가 렌더링 되지 않는다
  // const { allPhotos, loading, category } = useSelector(
  //   state => ({
  //     allPhotos: state.photos.data,
  //     loading: state.photos.loading,
  //     category: state.category.category,
  //   }),
  //   shallowEqual
  // );

  // const photos =
  // category === 'all' ? allPhotos : allPhotos.filter(photo => photo.category === category);

  // store에서 photo 데이터를 가져와서, 리턴해준다
  // const selectFilteredPhotos = createSelector(
  //   [state => state.photos.data, state => state.category.category],
  //   (photos, category) =>
  //     category === 'all' ? photos : photos.filter(photo => photo.category === category)
  // );

  // selectFilteredPhotos 결과값을 리턴하게 된다
  const photos = useSelector(selectFilteredPhotos);
  // 이렇게 되면 Filter 로직을 밖으로 뺄 필요가 없다

  // 로딩 state은 따로 분리
  const loading = useSelector(state => state.photos.loading);

  if (loading === 'error') {
    return <span>Error!</span>;
  }

  if (loading !== 'done') {
    return <span>loading...</span>;
  }

  return <PhotoList photos={photos} />;
}

export default PhotoListContainer;
