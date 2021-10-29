Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
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
fn.myApply({}, ['zwl']);