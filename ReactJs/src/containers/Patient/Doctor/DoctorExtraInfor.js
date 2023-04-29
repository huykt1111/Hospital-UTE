import React, { Component } from 'react';
import { connect } from "react-redux";
import { getExtraInforDoctorById } from '../../../services/userService'
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
// import Map from '../../../components/Map';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
            map: null,
            marker: null,
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {

            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

            // const google = window.google;
            // const map = new google.maps.Map(document.getElementById('map'), {
            //     center: { lat: -34.397, lng: 150.644 },
            //     zoom: 8,
            // });

            // const geocoder = new google.maps.Geocoder();

            // geocoder.geocode({ address: this.state.extraInfor.diaChiPhongKham }, (results, status) => {
            //     if (status === 'OK') {
            //         map.setCenter(results[0].geometry.location);
            //         const marker = new google.maps.Marker({
            //             map: map,
            //             position: results[0].geometry.location,
            //         });
            //         this.setState({ map, marker });
            //     } else {
            //         console.log('Geocode was not successful for the following reason: ' + status);
            //     }
            // });
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-infor-container">
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.extra-infor-doctor.text-address' />
                    </div>
                    <div className='name-clinic'>{extraInfor && extraInfor.tenPhongKham ? extraInfor.tenPhongKham : ''}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.diaChiPhongKham ? extraInfor.diaChiPhongKham : ''}</div>
                    {/* <div id="map" style={{ height: '400px' }}></div> */}
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id='patient.extra-infor-doctor.price' />:
                            {extraInfor && extraInfor.priceIdData && language === LANGUAGES.VI
                                &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfor.priceIdData.valueVi}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            {extraInfor && extraInfor.priceIdData && language === LANGUAGES.EN
                                &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfor.priceIdData.valueEn}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id='patient.extra-infor-doctor.detail' />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className="left">
                                        <FormattedMessage id='patient.extra-infor-doctor.price' />
                                    </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceIdData && language === LANGUAGES.VI
                                            &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceIdData.valueVi}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor && extraInfor.priceIdData && language === LANGUAGES.EN
                                            &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceIdData.valueEn}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                {extraInfor && extraInfor.paymentIdData && language === LANGUAGES.VI
                                    ? extraInfor.paymentIdData.valueVi : ''}
                                {extraInfor && extraInfor.paymentIdData && language === LANGUAGES.EN
                                    ? extraInfor.paymentIdData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                                </span>
                            </div>
                        </>
                    }

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
