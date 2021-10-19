// 判断变量类型

// 1. 一般简单的使用 typeof 或 instanceof 检测

// typeof 利用 typeof 来判断number, string, object, boolean, function, undefined, symbol 这七种类型基本类型。 typeof null => object  typeof function(){} => function

//  2. 完全准确的使用 原生js中的 Object.prototype.toString.call(xxxx)
// console.log(typeof null);
// console.log(Object.prototype.toString.call(null));
// console.log([] instanceof Array);

// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
// 实现instanceof
/**
 * 递归实现
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf1 = (obj, func) => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return false;
  }
  if (proto === func.prototype) {
    return true;
  }
  return instanceOf1(proto, func);
};

/**
 * 遍历实现
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf2 = (obj, func) => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  let proto = obj;
  while ((proto = Object.getPrototypeOf(proto))) {
    if (proto === null) {
      return false;
    }
    if (proto === func.prototype) {
      return true;
    }
  }

  return false;
};

/**
 * 遍历实现
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * @returns true false
 */
const instanceOf3 = (obj, func) => {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  let proto = obj;
  // 因为一定会有结束的时候（最顶层Object），所以不会是死循环
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === func.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
};

// 测试
let Person = function () {};
let p1 = new Person();

// console.log(instanceOf2({}, Object)); // true
console.log(instanceOf3(p1, Person)); // true
// console.log(instanceOf3({}, Person)); // false
// console.log(instanceOf1(null, Person)); // false
// console.log(instanceOf1(1, Person)); // false
