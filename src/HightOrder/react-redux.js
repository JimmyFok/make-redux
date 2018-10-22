import React, { Component } from 'react'
import PropTypes from 'prop-types'


// 因为context有很多内容需要指向性地告诉应该如何处理数据
// 相当于处理数据的函数，需要用时自行定义
// const mapStateToProps = (state) =>{
//     return {
//         themeColor: state.themeColor,
//         themeName: state.themeName,
//         fullName: `${state.firstName} ${state.lastName}`
//         //...
//     }
// }

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        // 初始化state，因为connect根本不会用到this.props所以用不传入props
        constructor(){
            super()
            this.state = { allprops:{} }
        }

        // 初始化数据并订阅模式监听
        componentWillMount(){
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }

        _updateProps(){
            const { store } = this.context
            // 额外传入props
            let stateProps = mapStateToProps?
                mapStateToProps(store.getState(), this.props):{} // state转换Props传递
            let dispatchProps = mapDispatchToProps?
                mapDispatchToProps(store.dispatch, this.props):{}
            this.setState({
                allProps:{  // 根据定义的this.state格式来重新定义state
                    ...stateProps, // context取得的state再转成的props
                    ...dispatchProps, // 将监听都函数都转化为Props并存起来
                    ...this.props // connect的props
                }
            })
        }

        render(){
            return <WrappedComponent { ...this.state.allProps }/>
        }
    }

    return Connect
}

// 将原来嵌套在App.js里面获取context的设置放到这里
export class Provider extends Component {

    // provider是供应者的意思
    static propTypes = {
      store: PropTypes.object,
      children: PropTypes.any
    }
  
    static childContextTypes = {
      store: PropTypes.object
    }
  
    getChildContext () {
      return {
        store: this.props.store
      }
    }
  
    render () {
      return (
        <div>{this.props.children}</div>
      )
    }
  }