// 构造函数,原型和实例的关系
// 每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.

// 一、原型链继承

function Father(name) {
  this.name = name;
}

Father.prototype.say = function () {
  console.log("hi, i am " + this.name);
};

function Son(age) {
  this.age = age;
}

Son.prototype = new Father();
// 原型链方案存在的缺点：1.多个实例对引用类型的操作会被篡改。2. 父类无法传参

// 二、借用构造函数继承(也叫经典继承)
// 基本思想:即在子类型构造函数的内部调用超类型构造函数.

function Father(name) {
  this.name = name;
}

function Son(name) {
  Father.call(this, name);
}

// const son = new Son("xx");
// son.name = 'yy';
// const son2 = new Son("xx");
// console.log(son);
// console.log(son2);

// 1. 保证了原型链中引用类型值的独立,不再被所有实例共享;
// 2. 子类型创建时也能够向父类型传递参数.

// 只能继承父类的实例属性和方法，不能继承原型属性/方法
// 无法实现复用，每个子类都有父类实例函数的副本，影响性能

// 三、组合继承
// 基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.
function Father(name) {
  this.name = name;
}

Father.prototype.say = function () {
  console.log("hi, i am " + this.name);
};

function Son(name) {
  // 继承实例属性，第一次调用Father()
  Father.call(this, name);
}

Son.prototype = new Father(); //继承父类方法,第二次调用Father()

// const son = new Son("xx");
// son.name = 'yy';
// son.say();
// const son2 = new Son("xx");
// console.log(son);
// console.log(son2);

// 组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 JavaScript 中最常用的继承模式.
// 而且, instanceof 和 isPrototypeOf( )也能用于识别基于组合继承创建的对象.
// 调用了两次父类构造函数, 造成了不必要的消耗

// 四、原型式继承
// 借助原型可以基于已有的对象创建新对象， 同时还不必因此创建自定义类型.
// 在object()函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例.
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数
// 同 object.create()

// 五、寄生式继承
// 寄生式继承的思路与(寄生)构造函数和工厂模式类似,
// 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象
function extend1(obj) {
  const o = Object.create(obj);
  clone.say = function () {
    alert("hi");
  };
  return o;
}
// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数

// 六、寄生组合式继承（目前最优）
// 结合借用构造函数传递参数和寄生模式实现继承
// 寄生组合式继承就是为了优化组合继承调用了两次父类构造函数
function inheritPrototype(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  var prototype = Object.create(superType.prototype);
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  prototype.constructor = subType;
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = prototype;
}

function Father(name) {
  this.name = name;
}

Father.prototype.say = function () {
  console.log("hi, i am " + this.name);
};

function Son(name, age) {
  // 继承实例属性，第一次调用Father()
  Father.call(this, name);
  this.age = age;
}
// 将父类原型指向子类
inheritPrototype(Son, Father);

Son.prototype.sayAge = function () {
  console.log(this.age);
};

// const son = new Son("xx", 1);
// console.log(son);
// son.sayAge()
// son.say()

// 7、混入方式继承多个对象
function Father() {}

Father.prototype.say = function () {
  console.log("hi");
};

function OtherFather(name) {
  this.name = name;
}

OtherFather.prototype.sayName = function () {
  console.log("i am " + this.name);
};

function Son(name) {
  Father.call(this);
  OtherFather.call(this, name);
}
// 继承一个类
Son.prototype = Object.create(Father.prototype);
// 混合其它
Object.assign(Son.prototype, OtherFather.prototype);
// 重新指定constructor
Son.prototype.constructor = Son;

const son = new Son("xx", 1);
console.log(son);
son.say()
son.sayName()

// 八、ES6类继承extends
// extends继承的核心代码和上述的寄生组合式继承方式一样