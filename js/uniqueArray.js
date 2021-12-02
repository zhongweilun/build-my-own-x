// 数组去重

const uniqueArray1 = (arr) => {
  return [...new Set(arr)];
};

const uniqueArray2 = (arr) => {
  const result = [];
  arr.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
};

const uniqueArray3 = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

let arr = [1, 2, 3, 1, 2, 3, 4];

console.log(uniqueArray3(arr));
