import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'
import { Provider } from './HightOrder/react-redux'

function createStore(reducer){
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) =>{
        state = reducer(state, action)
        listeners.forEach((listener)=>listener())
    }
    dispatch({})  // 初始化 state
    return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
    if(!state){
      return({
          themeColor: 'red'
        })
        
    }
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
}

const store = createStore(themeReducer)

class App extends Component {

  // // 别忘了Context的使用语法
  // // 检测context的类型
  // static childContextTypes = {
  //   store: PropTypes.object
  // }

  // // 定义子类可获取的Context，这样引入的子类都能直接引用该context，用this.context
  // getChildContext(){
  //   return { store }
  // }

  render() {
    return (
      <Provider store= {store}>
        <div className="App">
          <Header />
          <Content />
        </div>      
      </Provider>      
    );
  }
}

export default App;
