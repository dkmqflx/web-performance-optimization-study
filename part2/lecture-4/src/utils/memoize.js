export default function memoize(fn) {
  const cache = {};

  // 어떤 argument를 받을 지 모른다
  return function (...args) {
    // 여기서 args는 배열로 몇개의 인자가 전달될지 모른다
    // 그리고 배열 객체이기 때문에 들어올 때 마다 [a,b,c,d] 처럼 동일해도 객체 값이 바뀌면서 다른 값으로 인지한다
    // 그렇기 때문에 인자가 하나가 아니면 아래처럼 처리할수 있도록 방어 코드를 작성한다
    if (args.length !== 1) {
      return fn(...args);
    }

    const imgSrc = args[0].src;

    if (cache.hasOwnProperty(imgSrc)) {
      return cache[imgSrc];
    }

    const result = fn(...args);

    cache[imgSrc] = result;

    return result;
  };
}

// 위처럼 코드 작성해면 아래처럼 동일하다
// memoize(getAverageColorOfImage)(img) === getAverageColorOfImage(img)
