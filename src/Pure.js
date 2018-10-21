/**
 * 纯函数的理解
 */

 const a = 1
 const foo = (b) => a+b
 foo(2)  // => 3

 // 这里的foo函数不是纯函数，因为b是参数，但有一个函数外变量a，所以会因为a而变得不纯，返回值变得不可预料。

const a = 1
const foo2 = (x,b) => x + b
foo2(a,2)  // => 3

// 这里foo2是纯函数，因为所有变量都是通过参数传入，保证数据可预料。
// 所以，一个函数的返回结果只依赖于它的参数。

/* 但当传入的是object时就会有可能在函数内改变对象元素，函数可能会因此成为非纯函数 */

// 这是纯函数
const a =  1
const foo3 = (obj,b) => {
    return obj.x + b
}
const  counter = { x: 1 }
foo3(counter, 2) // => 3
counter.x // => 1

// 修改一下obj的属性就会变化成非纯函数
const foo4 = (obj,b) => {
    obj.x = 2  // 修改参数的属性值
    return obj.x + b
}
const counter = {x:1} 
foo4(count, 2)  // => 4
count.x  // => 2

// 函数foo5如果是在函数作用域内定义的话因为外部是观察不到，而且变化在作用域内是恒定的，所以它是纯函数。
const foo5 = (b) => {
    const obj = { x: 1 }
    obj.x = 2
    return obj.x + b
  }

/**
 * 除了修改外部的变量，一个函数在执行过程中还有很多方式产生外部可观察的变化，比如说调用 DOM API 修改页面，或者你发送了 Ajax 请求，还有调用 window.reload 刷新浏览器，甚至是 console.log 往控制台打印数据也是副作用。
 * 
 */