import React, { Component } from 'react';
import { connect } from "react-redux";
import { getExtraInforDoctorById } from '../../../services/userService'
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
            center: {
                lat: 16.047079,
                lng: 108.206230
            },
            zoom: 13,
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
            if (this.props.isNotShowMap) {

            }
            else {
                const address = res.data.diaChiPhongKham;
                try {
                    const result = await geocodeByAddress(address);
                    if (result.length > 0) {
                        const lnglat = await getLatLng(result[0]);
                        this.setState({
                            center: lnglat
                        });
                    } else {
                        console.error('No results found');
                    }
                } catch (error) {
                    console.error('Error getting geolocation', error);
                }
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
                    {this.props.showMap &&
                        <div style={{ height: '50vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_JS_API }}
                                defaultCenter={this.state.center}
                                defaultZoom={this.state.zoom}
                            >
                                <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
                            </GoogleMapReact>
                        </div>
                    }
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

const Marker = () => <div style={{ color: 'red' }}>Hospital <i className="fa fa-map-marker-alt"></i></div>;

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
