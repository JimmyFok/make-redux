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


// 渲染 App
function renderApp(appState){
    renderTitle(appState.title)  // 渲染title
    renderContent(appState.content)  // 渲染content
}

// 渲染 title
function renderTitle(title){
    const titleDOM = document.getElementById('title')  // 获取title的DOM元素
    titleDOM.innerHTML = title.text  // titleDOM的HTML设置
    titleDOM.style.color = title.color  // titleDOM的样式设置
}

// 渲染 content
function renderContent(content){
    const contentDOM = document.getElementById('content')  // 获取content的DOM元素
    contentDOM.innerHTML = content.text  // contentDOM的HTML设置
    contentDOM.style.color = content.color  // contentDOM的样式设置
}

/**
 * 修改渲染方式，通过之前抽离了store和修改数据方法两个参数，让渲染更为灵活
 */

// 运行函数并返回对象
const store = createStore(appState, stateChanger)

// 传入监听的函数
store.subscribe(()=> renderApp(store.getState()))

// 渲染整个App
renderApp(store.getState())  // 首次渲染
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js Redux实现》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// 所以以后每次修改都会通过监听器来同步
// 这就属于观察者模式

