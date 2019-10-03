import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import { emphasize } from '@material-ui/core/styles';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            elements: this.props.elements ? this.props.elements : []
        }
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const elements = this.state.elements.map(item => (
            <div key={item.label} className="element" onClick={item.action}><i className="material-icons">{item.icon}</i>{item.label}</div>
        ))
        return (            
            <div className="sidebar">
                <div className={this.state.show ? "header active" : "header"} onClick={this.toggle}>
                    <div className="label">
                        <i className="material-icons">{this.props.icon}</i>
                        {this.props.label}
                        {this.props.number !== undefined && <div className="number">{this.props.number}</div>}
                    </div>
                    <div className="aria"><i className="material-icons">{this.state.show ? 'expand_less' : 'expand_more'}</i></div>
                </div>
                <div className={this.state.show ? "content show " + (this.props.animate ? "animate" : "static") : "content hide " + (this.props.animate ? "animate" : "static")}>
                    {elements}
                    {this.props.children}
                </div>
            </div>
            
            
        )
    }
}

Sidebar.propTypes = {
    // event: PropTypes.object
}

export default Sidebar;