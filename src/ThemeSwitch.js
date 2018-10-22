import React,{Component} from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component{
    static contextTypes = {
        store: PropTypes.object
    }

    constructor(){
        super()
        this.state = { themeColor: '' }
    }

    componentWillMount(){
        const { store } = this.context
        this._updateThemeColor()  // 更新数据
        store.subscribe(() => this._updateThemeColor())  // 重新渲染
    }

    // 更新state方法
    _updateThemeColor(){
        const {store} = this.context  // 从共同的父类获取this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }

    // dispatch action 去改变颜色
    // 方法传入color来改变颜色
    handleSwitchColor(color){
        const { store } = this.context
        store.dispatch({
            type: 'CHANGE_COLOR',
            themeColor: color
        })
    }

    render(){
        return(
            <div>
                <button 
                    style = {{color: this.state.themeColor}}
                    onClick = {this.handleSwitchColor.bind(this, 'red')}
                >红</button>
                <button 
                    style = {{color: this.state.themeColor}}
                    onClick = {this.handleSwitchColor.bind(this, 'blue')}
                >蓝</button>
            </div>
            
        )
    }
}

export default ThemeSwitch