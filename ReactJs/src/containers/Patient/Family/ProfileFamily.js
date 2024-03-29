import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllMember, deleteMemberData } from '../../../services/userService'
import './ProfileFamily.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class ProfileFamily extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataMember: []
        }
    }

    async componentDidMount() {
        this.getAllMember();
    }

    getAllMember = async () => {
        const { userInfo } = this.props;
        let id = userInfo.user.id;
        let data = await getAllMember({ id });
        this.setState({
            dataMember: data.data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {

        }

    }

    handleUpdate = (idMember) => {
        if (this.props.history) {
            this.props.history.push(`/update-member/${idMember}`);
        }
    }

    handleDelete = async (idMember) => {
        try {
            if (window.confirm('Bạn có chắc chắn muốn xóa thành viên này không?')) {
                let res = await deleteMemberData({ id: idMember });
                if (res && res.errCode === 0) {

                    toast.success("Xóa thành viên thành công!")

                    this.getAllMember();
                }
                else {
                    alert(res.errMessage)
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let { dataMember } = this.state;
        let { language } = this.props;
        return (
            <>
                {dataMember && dataMember.length > 0 &&
                    dataMember.map((item, index) => {
                        const timestamp = parseInt(item.ngaySinh);
                        const dateObj = new Date(timestamp);
                        const year = dateObj.getFullYear();
                        const month = dateObj.getMonth() + 1;
                        const day = dateObj.getDate();
                        const formattedDate = `${day}/${month}/${year}`;

                        return (
                            <div className="profile-family-container" key={index}>
                                <div className='content-one'>
                                    <div className='content-one-image'
                                        style={{ backgroundImage: `url(${item.hinhAnh})` }}
                                    ></div>
                                </div>
                                <div className="content-two">
                                    <div className='content-two-name'>{language === LANGUAGES.VI ?
                                        <span>{item.ho} {item.ten}</span> :
                                        <span>{item.ten} {item.ho}</span>
                                    }</div>
                                    {language === LANGUAGES.VI ?
                                        <div><FormattedMessage id="patient.family.gender" />: {item.genderDataFamily.valueVi}</div>
                                        :
                                        <div><FormattedMessage id="patient.family.gender" />: {item.genderDataFamily.valueEn}</div>
                                    }
                                    <div><FormattedMessage id="patient.family.birthday" />: {formattedDate}</div>
                                </div>
                                <div className="content-three">
                                    {language === LANGUAGES.VI ?
                                        <div>{item.famRoleData.valueVi}</div>
                                        :
                                        <div>{item.famRoleData.valueEn}</div>
                                    }
                                </div>
                                <div className="button-detail-family">
                                    <div className="button-edit" onClick={() => this.handleUpdate(item.id)}><FormattedMessage id="patient.family.edit" /></div>
                                    <div className="button-delete" onClick={() => this.handleDelete(item.id)}><FormattedMessage id="patient.family.delete" /></div>
                                </div>
                            </div>
                        );
                    })}

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFamily));
