const md5 = require('md5');
const moment = require('moment');
const models = require('../../models/index');
const citizens = models.citizens

const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "secretadmirer"


class Citizen {
  async login(req, res) {
    try {

      const param = {
        username: req.body.username,
        password: md5(req.body.password)
      }

      let result = await citizens.findOne({where:param})
      if(result === null) {
        return res.status(403).json({
          message: "invalid username or password",
          data: null
        });
      }

      const payload = {
        userId:result.citizen_id,
        username:result.username,
        name:result.citizen_name,
        role:"citizen"
      } 

      const token = jsonwebtoken.sign(payload, SECRET_KEY)
      payload.token = token

      return res.status(200).json({
        message: "success login",
        data: payload
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async store(req, res) {
    try {

      const data = {
        citizen_name: req.body.citizen_name,
        telp:req.body.telp,
        username:req.body.username,
        password:md5(req.body.password)
      }

      let result = await citizens.create(data)
      return res.status(200).json({
        message: "success adding data citizens",
        data: result
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async update(req, res) {
    try {

      const param = {
        citizen_id: req.params.id,
        password: md5(req.body.previous_password)
      }

      // check last password
      let check = await citizens.findOne({where:param})
      if(check === null) {
        return res.status(403).json({
          message: "failed update data citizen, user not found",
          data: null
        });
      }

      const data = {
        citizen_name: req.body.citizen_name,
        telp: req.body.telp,
        username: req.body.username,
        password: md5(req.body.new_password)
      }

      let result = await citizens.update(data, { where: param })
      return res.status(200).json({
        message: "success update data citizens",
        data: result
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async delete(req, res) {
    try {

      const param = {
        citizen_id: req.params.id
      }

      let result = await citizens.destroy({ where: param })
      return res.status(200).json({
        message: "success update delete citizens",
        data: result
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async show(req, res) {
    try {

      const param = {
        citizen_id: req.params.id
      }

      let result = await citizens.findOne({ where: param, include: ["bids"] })
      if (result === null) {
        return res.status(404).json({
          message: "citizens not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success getOne citizens",
        data: result
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async index(req, res) {
    try {

      let result = await citizens.findAll({ include: ["bids"]})
      return res.status(200).json({
        message: "success get all citizens",
        data: result
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }
}

module.exports = Citizen