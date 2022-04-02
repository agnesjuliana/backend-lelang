const moment = require('moment');
const models = require('../../models/index');
const auctions = models.auctions

const date = moment()

class Auction {
  async store(req, res) {
    try {

      const data = {
        item_id: req.body.item_id,
        officer_id: req.body.officer_id,
        date: date,
        status: req.body.status
      }

      let result = await auctions.create(data)
      return res.status(200).json({
        message: "success adding data auctions",
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

      const data = {
        item_id: req.body.item_id,
        officer_id: req.body.officer_id,
        date: date,
        status: req.body.status
      }

      const param = {
        auction_id: req.params.id
      }

      let result = await auctions.update(data, { where: param })
      return res.status(200).json({
        message: "success update data auctions",
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
        auction_id: req.params.id
      }

      let result = await auctions.destroy({ where: param })
      return res.status(200).json({
        message: "success update delete auctions",
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
        auction_id: req.params.id
      }

      let result = await auctions.findOne({ where: param, include: ["items", "officers", "bids"] })
      if (result === null) {
        return res.status(404).json({
          message: "auctions not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success getOne auctions",
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

      let result = await auctions.findAll({ include: ["items", "officers", "bids"] })
      return res.status(200).json({
        message: "success get all auctions",
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

module.exports = Auction