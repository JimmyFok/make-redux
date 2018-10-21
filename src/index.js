// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

/**
 * 应用的状态
 */


 // 1、store区
let appState = {
    title: {
        text: 'React.js Redux实现',
        color: 'red',
    },
    content:{
        text: 'React.js Redux实现内容',
        color: 'blue'
    }
}

// 定义一个dispatch（分派的意思）函数，负责数据的修改
// dispatch抽离出来state和action
function stateChanger(state, action){
    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

// 改造createStore的方法实现数据的监控
function createStore(state, stateChanger){

    // 增加监听器数组
    const listeners = []

    // 定义订阅函数，实现将多个监听器加入监听数组中
    const subscribe = (listener) => listeners.push(listener)

    // 这里没变
    const getState = () => state

    // action留做调用dispatch时传入之用
    const dispatch = (action) => {
        stateChanger(state, action)
        // 增加了监听器（forEach会改变原数组，相当于将监听器中的每个函数都从定义编程成直接执行）
        // 从而实现了监听器的运行
        listeners.forEach((listener) => listener())
    }

    // 增加了订阅函数作为返回对象的新元素
    return {getState, dispatch, subscribe}
}


// 渲染 App（增加新旧值判断）
function renderApp(newAppState, oldAppState = {}){  // 防止oldAppState 没有传入，给默认值
    if(newAppState ===  oldAppState) return  // 没有变化就直接返回
    console.log('render app...')

    // 因为渲染title和content的值都需要比较的所以也对应新旧参数
    renderTitle(newAppState.title, oldAppState.title)  // 渲染title
    renderContent(newAppState.content, oldAppState.content)  // 渲染content
}

// 渲染 title
function renderTitle(newTitle, oldTitle={}){
    if(newTitle===oldTitle) return
    console.log('render title...')

    const titleDOM = document.getElementById('title')  // 获取title的DOM元素
    titleDOM.innerHTML = newTitle.text  // titleDOM的HTML设置
    titleDOM.style.color = newTitle.color  // titleDOM的样式设置
}

// 渲染 content
function renderContent(newContent, oldContent={}){
    if(newContent===oldContent) return
    console.log('render content...')

    const contentDOM = document.getElementById('content')  // 获取content的DOM元素
    contentDOM.innerHTML = newContent.text  // contentDOM的HTML设置
    contentDOM.style.color = newContent.color  // contentDOM的样式设置
}

/**
 * 修改渲染方式，通过之前抽离了store和修改数据方法两个参数，让渲染更为灵活
 */

// 运行函数并返回对象
const store = createStore(appState, stateChanger)

// 将旧状态缓存起来
let oldState = store.getState();

// 传入监听的函数
store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState, oldState) 
    oldState = newState   // 渲染完就将缓存的旧数据替换为新的数据留待之后修改的对比
})
// 之前就发现，监听后直接就重新渲染整个App，需要对其进行优化，保证只有变化的部分才需要重新渲染


// 渲染整个App
renderApp(store.getState())  // 首次渲染
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js Redux实现》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// 所以以后每次修改都会通过监听器来同步
// 这就属于观察者模式


// 最后你会发现这个是不能执行的？

// 为什么？因为我们判断的是对象是否相等，但是实际我们改的确实对象中的属性，对象一直没变，这是引用类型和值类型的问题。

// 解决方案是利用ES6的解构语法，进行对象的浅复制。再进行覆盖拓展对象属性。
// 1、利用每次都不修改原来数据的方法而通过新建新的对象并覆盖对应的变化的数据。
// 2、关键是新的对象状态里面的属性都是对象，相同的部分就会指向同一个，不相同的当然是指向不同。因为都是引用类型的关系所以可以判断那些属性相等哪些不相等。
// 3、基于以上的不变共享的结构存在，所以可以优化渲染性能。
// 