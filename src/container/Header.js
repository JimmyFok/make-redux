import {connect} from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state) => {
    return{
        themeColor: state.themeColor
    }
}

// 高阶函数将context中的数据传进来
export default connect(mapStateToProps)(Header)

/**
 * 相当于将dumb转换为smart
 */