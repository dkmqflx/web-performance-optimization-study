import memoize from './memoize';

export const getAverageColorOfImage = memoize(function (imgElement) {
  /**
   * 이미지가 픽셀로 구성되어 있는데
   * 각 픽셀의 컬러가 무엇인지 RGB 계산해서, 해당 값들에 대한 평균을 구한다
   */

  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('2d');
  const averageColor = {
    r: 0,
    g: 0,
    b: 0,
  };

  if (!context) {
    return averageColor;
  }

  const width = (canvas.width =
    imgElement.naturalWidth || imgElement.offsetWidth || imgElement.width);
  const height = (canvas.height =
    imgElement.naturalHeight || imgElement.offsetHeight || imgElement.height);

  context.drawImage(imgElement, 0, 0);

  const imageData = context.getImageData(0, 0, width, height).data;
  // Performance 탭에서 확인했듯이 getAverageColorOfImage 아래있는 getImageData 함수도 오래 걸렸다
  // 하지만 getImageData는 context에 있는 함수이기 때문에 수정 불가
  // 따라서 메모이제이션 기법을 적용한다
  const length = imageData.length;

  for (let i = 0; i < length; i += 4) {
    averageColor.r += imageData[i];
    averageColor.g += imageData[i + 1];
    averageColor.b += imageData[i + 2];
  }

  const count = length / 4;
  averageColor.r = ~~(averageColor.r / count); // ~~ => convert to int
  averageColor.g = ~~(averageColor.g / count);
  averageColor.b = ~~(averageColor.b / count);

  return averageColor; // 평균을 객체 형태로 반환한다
});
