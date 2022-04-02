const moment = require('moment');
const models = require('../../models/index');
const items = models.items

const date = moment()

class Item {
  async store(req, res){
    try{

      const data = {
        item_name:req.body.item_name,
        date:date,
        price:req.body.price,
        description:req.body.description
      }

      let result = await items.create(data)
      return res.status(200).json({
        message: "success adding data items",
        data: result
      });

    }catch(error){
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
        item_name: req.body.item_name,
        date: date,
        price: req.body.price,
        description: req.body.description
      }

      const param = {
        item_id:req.params.id
      }

      let result = await items.update(data, {where:param})
      return res.status(200).json({
        message: "success update data items",
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
        item_id: req.params.id
      }

      let result = await items.destroy({ where: param })
      return res.status(200).json({
        message: "success update delete items",
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
        item_id: req.params.id
      }

      let result = await items.findOne({ where: param, include: ["auctions"] })
      if(result === null) {
        return res.status(404).json({
          message: "items not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success getOne items",
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

      let result = await items.findAll({ include: ["auctions"]})
      return res.status(200).json({
        message: "success get all items",
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

module.exports = Item