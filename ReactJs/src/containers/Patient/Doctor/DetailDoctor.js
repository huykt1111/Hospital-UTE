import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailInforDoctor } from '../../../services/userService'
import './DetailDoctor.scss';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            this.setState({
                currentDoctorId: id
            })
            if (res && res.errCode == 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state;
        console.log(detailDoctor)
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData && detailDoctor.TaiKhoan) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.TaiKhoan.ho} ${detailDoctor.TaiKhoan.ten}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.TaiKhoan.ten} ${detailDoctor.TaiKhoan.ho}`;
        }

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://developers.facebook.com/docs/plugins/" : window.location.href;
        let currentURLCMD = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://developers.facebook.com/docs/plugins/comments#configurator" : window.location.href;
        return (
            <React.Fragment >
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className='content-left'>
                            <div className='content-left-image'
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.TaiKhoan && detailDoctor.TaiKhoan.hinhAnh ? detailDoctor.TaiKhoan.hinhAnh : ''})` }}
                            />
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.mieuTa &&

                                    <span>{detailDoctor.mieuTa}</span>

                                }
                                <div className="like-share-plugin">
                                    <LikeAndShare
                                        data-href={currentURL}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} showMap={true} />
                        </div>
                    </div>
                    <div className="detail-doctor">
                        {detailDoctor && detailDoctor.noiDungHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.noiDungHTML }}>

                            </div>
                        }

                    </div>
                    <div className="comment-patient">
                        {/* <Comment
                            data-href={currentURLCMD}
                        /> */}
                        <div className='comment-patient-title'>Phản hồi của bệnh nhân sau khi đi khám</div>
                        {
                            detailDoctor && detailDoctor.dataDoctorLK &&
                            detailDoctor.dataDoctorLK.length > 0 &&
                            detailDoctor.dataDoctorLK.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div>{
                                            item.schedulePatientData && item.schedulePatientData.length > 0 &&
                                            item.schedulePatientData.map((itemchild, indexchild) => {
                                                const timestamp = parseInt(item.ngayKham);
                                                const dateObj = new Date(timestamp);
                                                const year = dateObj.getFullYear();
                                                const month = dateObj.getMonth() + 1;
                                                const day = dateObj.getDate();
                                                const formattedDate = `${day}/${month}/${year}`;
                                                return (
                                                    <div className='comment-patient-content' key={indexchild}>
                                                        <div className="comment-patient-name">
                                                            {itemchild.hoTen}
                                                            <span><i className="fas fa-check-circle"></i> Đã khám ngày {formattedDate}</span>
                                                        </div>
                                                        <div className='comment-patient-comment'>
                                                            {itemchild.danhGia}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
