import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Header extends Component{
    static contextTypes = {
        store: PropTypes.object
    }

    constructor(){
        super()
        this.state = { themeColor: '' }
    }

    componentWillMount(){
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    // 更新state方法
    _updateThemeColor(){
        const {store} = this.context  // 从共同的父类获取this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }

    render(){
        return(
            <h1 style={{ color: this.state.themeColor }}>React.js Redux测试</h1>
        )
    }
}

export default Header