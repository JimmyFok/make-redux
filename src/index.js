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
const appState = {
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
function dispatch(action){
    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
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

// 渲染整个App
renderApp(appState)  // 首次渲染
dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js Redux实现》' }) // 修改标题文本
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色

// 重新渲染
renderApp(appState)  // 发现变了颜色
