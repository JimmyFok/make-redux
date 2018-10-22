import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import { connect } from './HightOrder/react-redux'

class Content extends Component{
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
            <div>
                <p style={{ color: this.props.themeColor }}>React.js Redux测试内容</p>
                <ThemeSwitch />
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Content = connect(mapStateToProps)(Content)

export default Content