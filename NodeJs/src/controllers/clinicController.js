import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let registerClinic = async (req, res) => {
    try {
        let infor = await clinicService.registerClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateClinic = async (req, res) => {
    try {
        let infor = await clinicService.updateClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let onClickClinic = async (req, res) => {
    try {
        let infor = await clinicService.onClickClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let ratifyRegisterClinic = async (req, res) => {
    try {
        let infor = await clinicService.ratifyRegisterClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteClinic = async (req, res) => {
    try {
        let infor = await clinicService.deleteClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteRegisterClinic = async (req, res) => {
    try {
        let infor = await clinicService.deleteRegisterClinic(req.body);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getRegisterClinic = async (req, res) => {
    try {
        let infor = await clinicService.getRegisterClinic();
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getTopClinic = async (req, res) => {
    try {
        let infor = await clinicService.getTopClinic();
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor)
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    deleteClinic,
    updateClinic,
    getTopClinic,
    registerClinic,
    getRegisterClinic,
    deleteRegisterClinic,
    ratifyRegisterClinic,
    onClickClinic
}