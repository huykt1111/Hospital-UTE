import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, USER_ROLE } from '../../utils';
import _ from 'lodash';
import logo from '../../assets/logo.jpg';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.vaiTro;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({ menuApp: menu });
    }

    handleLogout = (processLogout) => {
        processLogout()
        this.props.history.push("/login");
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                <div className="header-container-tab-left">
                    <div className="logo-container">
                        <img src={logo} />
                    </div>
                    {/* thanh navigator */}
                    <div className="header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div>
                </div>
                <div className="languages">
                    <span className='welcome'><FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.ten ? userInfo.ten : ''} !
                    </span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={() => this.handleLogout(processLogout)} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo.user,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
