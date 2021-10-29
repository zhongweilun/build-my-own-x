// bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

// 测试
let fn = function (name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
  console.log("name", this.name);
  console.log("age", this.age);
};

const t = fn.myBind({work: 0}, "zwl");
const t1 = fn.bind({work: 0}, "zwl");
// t(18);
// console.log(new t1(12));
console.log(new t(12));
