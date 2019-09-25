import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ViewResolver.scss';

class ViewResolver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: this.props.children,
            showSide: false
        }
    }

    componentWillMount() {
        this.initializeViews();
    }

    initializeViews() {
        React.Children.toArray(this.state.views).forEach((node) => {
            // node.type.name is minified after build and so static build result has different alphabet
            // if (node.type.name === 'View') {
                if (node.props.main) {
                    this.setState({
                        main: node
                    })
                } else if (node.props.side) {
                    this.setState({
                        side: node
                    })
                }
            // }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children) {
            this.setState({
                views: nextProps.children
            }, () => {
                this.initializeViews();
            })
        }

        if (nextProps.event && nextProps.event.name === 'sidebar') {
            this.setState({
                showSide: nextProps.event.signal
            })
        }
    }

    toggleSideView = () => {
        this.props.sendEvent('sidebar', !this.state.showSide);
    }

    render() {
        return (
            <>
            <div className="view-mobile">
                <div className="view-main">
                    {this.state.main}
                </div>
                <div className="view-filter" onClick={this.toggleSideView}>
                    {!this.state.showSide && <i className="material-icons">filter_list</i>}
                    {this.state.showSide && <i className="material-icons">clear</i>}
                </div>
                <div className={(this.state.showSide ? "slider show" : "slider hide")}>
                    <div className={(this.state.showSide ? "container": "container hidetext")}>
                        <div className="view-side">
                            {this.state.side}
                        </div>
                    </div>
                </div>
            </div>

            <div className="view-desktop">
                <div className="view-side">
                    {this.state.side}
                </div>
                <div className="view-content">
                    {this.state.main}
                </div>
            </div>
            </>
        )
    }
}

ViewResolver.propTypes = {
    event: PropTypes.object
}

export default ViewResolver;