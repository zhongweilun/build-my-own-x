// 判断数据类型

const getType = (v) => {
  const res = Object.prototype.toString.call(v);
  return res.replace(/\[object (.*?)\]/, "$1").toLowerCase();
};

console.log(getType(new Map()));
console.log(getType(null));
