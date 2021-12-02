// 实现多维数组扁平化

const flat1 = (arr) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flat1(item) : item);
  }, []);
};

// 社交牛逼症版
const flat2 = (array) => {
  return array.flat(Infinity)
}

let arr1 = [1, [2, 3, 4], [5, [6, [7, [8]]]]];

console.log(flat1(arr1));
