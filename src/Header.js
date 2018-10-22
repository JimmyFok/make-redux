import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from './HightOrder/react-redux'

class Header extends Component{
    static propTypes = {
        store: PropTypes.object
    }

    // constructor(){
    //     super()
    //     this.state = { themeColor: '' }
    // }

    // componentWillMount(){
    //     const { store } = this.context
    //     this._updateThemeColor()
    //     store.subscribe(() => this._updateThemeColor())
    // }

    // // 更新state方法
    // _updateThemeColor(){
    //     const {store} = this.context  // 从共同的父类获取this.context
    //     const state = store.getState()
    //     this.setState({ themeColor: state.themeColor })
    // }

    render(){
        return(
            <h1 style={{ color: this.props.themeColor }}>React.js Redux测试</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        themeColor: state.themeColor
    }
}

// 高阶函数将context中的数据传进来
Header = connect(mapStateToProps)(Header)

export default Header