const md5 = require('md5');
const models = require('../../models/index');
const officers = models.officers

const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "secretadmirer"

class Officer {
  async login(req, res) {
    try {

      const param = {
        username: req.body.username,
        password: md5(req.body.password)
      }

      let result = await officers.findOne({ where: param })
      if (result === null) {
        return res.status(403).json({
          message: "invalid username or password",
          data: null
        });
      }

      const payload = {
        userId: result.officer_id,
        username: result.username,
        name: result.officer_name,
        role: result.level
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
        officer_name: req.body.officer_name,
        level:req.body.level,
        username:req.body.username,
        password:md5(req.body.password)
      }

      let result = await officers.create(data)
      return res.status(200).json({
        message: "success adding data officers",
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
        officer_id: req.params.id,
        password: md5(req.body.previous_password)
      }

      // check last password
      let check = await officers.findOne({where:param})
      if(check === null) {
        return res.status(403).json({
          message: "failed update data officer, user not found",
          data: null
        });
      }

      const data = {
        officer_name: req.body.officer_name,
        level: req.body.level,
        username: req.body.username,
        password: md5(req.body.new_password)
      }

      let result = await officers.update(data, { where: param })
      return res.status(200).json({
        message: "success update data officers",
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
        officer_id: req.params.id
      }

      let result = await officers.destroy({ where: param })
      return res.status(200).json({
        message: "success update delete officers",
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
        officer_id: req.params.id
      }

      let result = await officers.findOne({ where: param })
      if (result === null) {
        return res.status(404).json({
          message: "officers not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success getOne officers",
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

      let result = await officers.findAll()
      return res.status(200).json({
        message: "success get all officers",
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

module.exports = Officer