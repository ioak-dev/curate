import React, { Component } from 'react';
import './style.scss';
import mi_settings from '../../icons/mi-settings.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';

class Theme extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
        console.log(this.props.profile);
        this.state = {
            showAddDialog: false
        }
    }

    toggleDialog = () => {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    handleChange = () => {
        if (this.props.profile.theme === 'theme_dark') {
            this.props.setProfile({
                theme: 'theme_light'
            })   
        } else  {
            this.props.setProfile({
                theme: 'theme_dark'
            })   
        }
    }

    render() {
        return (
            <>
            <div className="settings" onClick={this.toggleDialog}><img src={mi_settings} alt="mi_settings" /></div>
            <Dialog open={this.state.showAddDialog} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                <div className={"dialog-container " + this.props.profile.theme}>
                    <DialogTitle>Switch Theme</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Switch between light and dark mode</DialogContentText>
                        Dark Mode <Switch
                            checked={this.props.profile.theme === 'theme_dark'}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {/* <button onClick={this.toggleAddDialog} className="primary">
                            Cancel
                        </button>
                        <button onClick={this.addBookmark} className="primary block">
                            Add
                        </button> */}
                    </DialogActions>
                </div>
            </Dialog>
            </>
        )
    }
}

Theme.propTypes = {
    getProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, setProfile })(Theme);