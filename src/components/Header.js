import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Header extends Component{
    static propTypes = {
        store: PropTypes.object
    }

    render(){
        return(
            <h1 style={{ color: this.props.themeColor }}>React.js Redux测试</h1>
        )
    }
}

export default Header