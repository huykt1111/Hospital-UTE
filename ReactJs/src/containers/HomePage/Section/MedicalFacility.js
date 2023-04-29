import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetail = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }


    render() {
        let { dataClinics } = this.state;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Phòng khám nổi bậc</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetail(item)}

                                        >
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.hinhAnh})` }}
                                            />
                                            <div className='clinic-name'>{item.tenPhongKham}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
