// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
// 注意：该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。
// 参数
// thisArg 可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
// arg1, arg2, ... 指定的参数列表。

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 未传ctx上下文，或者传的是null和undefined等场景
  if (!context) {
    context = typeof window !== "undefined" ? window : global;
  }
  context.fn = this;
  const result = context.fn(...args);
  Reflect.deleteProperty(context, "fn");
  return result;
};

// 测试
let fn = function (name) {
  this.name = name;
  console.log(this);
  console.log(this.name);
};

fn("zwl");
fn.myCall({}, 'zwl');
