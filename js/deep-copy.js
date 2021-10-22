// 前置知识点
// for in 的特点 —— 特别适合遍历对象。
// for ... in 循环返回的值都是数据结构的 键值名。
// 遍历对象返回的对象的key值,遍历数组返回的数组的下标(key)。
// for ... in 循环不仅可以遍历数字键名,还会遍历原型上的值和手动添加的其他键。如——例3
// 特别情况下, for ... in 循环会以看起来任意的顺序遍历键名

// for of 特点
// 一个数据结构只要部署了 Symbol.iterator 属性, 就被视为具有 iterator接口, 就可以使用 for of循环。
// 数组 Array，Map，Set，String，arguments对象，Nodelist对象(获取的dom列表集合)部署了 Symbol.iteratoer属性
// 想让对象可以使用 for of循环怎么办?使用 Object.keys() 获取对象的 key值集合后,再使用 for of

// WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

// 简单版深拷贝
//  cache = new Map() WeakMap优化循环引用时map强引用导致的内存未释放
function simpleDeepClone(target, cacheMap = new WeakMap()) {
  if (typeof target === "object") {
    // 兼容有数组的情况
    const cloneTarget = Array.isArray(target) ? [] : {};
    if (cacheMap.get(target)) {
      return cacheMap.get(target);
    }
    cacheMap.set(target, cloneTarget);
    for (const key in target) {
      // 递归
      cloneTarget[key] = simpleDeepClone(target[key], cacheMap);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// const target = {
//   a: 1,
//   b: undefined,
//   c: "zwl",
//   d: {
//     child: "child",
//     child2: {
//       child2: "child2",
//     },
//   },
//   e: [1, 2, 3],
// };
// target.f = target;
// const clone = simpleDeepClone(target);
// console.log(clone, clone.f === clone);

// 完整的深拷贝
function deepClone(target, cacheMap = new WeakMap()) {
  const mapTag = "[object Map]";
  const setTag = "[object Set]";
  const arrayTag = "[object Array]";
  const objectTag = "[object Object]";
  const argsTag = '[object Arguments]';
  const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

  const boolTag = "[object Boolean]";
  const dateTag = "[object Date]";
  const errorTag = "[object Error]";
  const numberTag = "[object Number]";
  const regexpTag = "[object RegExp]";
  const stringTag = "[object String]";
  const symbolTag = "[object Symbol]";

  function getType(target) {
    return Object.prototype.toString.call(target);
  }

  function isObject(target) {
    const type = typeof target;
    return target !== null && (type === "object" || type === "function");
  }

  function init(target) {
    const Fn = target.constructor;
    return new Fn();
  }

  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }
  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = init(target, type);
  }

  // 防止循环引用
  if (cacheMap.get(target)) {
    return cacheMap.get(target);
  }
  cacheMap.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(deepClone(value, map));
    });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map));
    });
    return cloneTarget;
  }

  for (const key in target) {
    // 递归
    cloneTarget[key] = deepClone(target[key], cacheMap);
  }
  return cloneTarget;
}

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
};


const result = deepClone(target);

console.log(result);
console.log(result.map === target.map);