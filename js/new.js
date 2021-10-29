// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
// new 关键字会进行如下的操作：
// 1. 创建一个空的简单JavaScript对象（即{}）；
// 2. 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
// 3. 将步骤1新创建的对象作为this的上下文 ；
// 4. 如果该函数没有返回对象，则返回this。

const _new = (func, ...args) => {
  // 1 和 2
  // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
  const obj = Object.create(func.prototype);
  // const Fn = function () {};

  // Fn.prototype = func.prototype;
  // Fn.prototype.constructor = func;

  // const obj = new Fn();
  // 3
  const result = func.apply(obj, args);
  // 步骤4
  if (
    (typeof result === "object" && result !== null) ||
    typeof result === "function"
  ) {
    return result;
  }
  return obj;
};

const Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.hello = function () {
  console.log(`你好啊，${this.age}岁的${this.name}!`);
};

const p1 = _new(Person, "zwl", "18");
p1.hello();
console.log(p1);
