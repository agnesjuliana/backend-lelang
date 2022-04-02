const moment = require('moment');
const models = require('../../models/index');
const bid = models.bids

const date = moment()

class Bid {
  async store(req, res) {
    try {

      const data = {
        auction_id: req.body.auction_id,
        citizen_id: req.body.citizen_id,
        bid_price: req.body.bid_price,
        status: "win"
      }

      const param = {
        auction_id: data.auction_id
      }


      let short = await bid.findAll({
        raw: true,
        where: param,
        order: [['bid_price', 'DESC']]
      })

      let highest = short[0]

      if (highest !== undefined && data.bid_price <= highest.bid_price) {
        return res.status(409).json({
          message: "you must insert higher bid price",
          data: {
            highest: highest.bid_price
          }
        });
      }

      // update status all lower bid
      bid.update({status:"lose"}, {where:param})


      let result = await bid.create(data)
      return res.status(200).json({
        message: "success adding data bid",
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
        bid_id: req.params.id
      }

      let check = await bid.findOne({raw:true, where:param})
      if(check === null){
        return res.status(404).json({
          message: "cannot find bid",
          data: null
        });
      }

      if(check.status === "win"){
        const checkParam = {
          auction_id: check.auction_id
        }
        let short = await bid.findAll({
          raw: true,
          where: checkParam,
          order: [['bid_price', 'DESC']]
        })

        bid.update({status:"win"}, {where:short[1]})
      }

      let result = await bid.destroy({ where: param })
      return res.status(200).json({
        message: "success update delete bid",
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
        bid_id: req.params.id
      }

      let result = await bid.findOne({ where: param, include: ["auctions", "citizens"] })
      if (result === null) {
        return res.status(404).json({
          message: "bid not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success getOne bid",
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

      let result = await bid.findAll({ include: ["auctions", "citizens"] })
      return res.status(200).json({
        message: "success get all bid",
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

  async showByCitizen(req, res) {
    try {

      const param = {
        citizen_id: req.params.citizenId
      }

      let result = await bid.findAll({ where: param, include: ["auctions", "citizens"] })
      if (result === null) {
        return res.status(404).json({
          message: "bid not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success get bid by citizen",
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

  async showByAuction(req, res) {
    try {

      const param = {
        auction_id: req.params.auctionId
      }

      let result = await bid.findAll({ where: param, include: ["auctions", "citizens"] })
      if (result === null) {
        return res.status(404).json({
          message: "bid not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success bid by auction",
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

  async showByAuctionCitizen(req, res) {
    try {

      const param = {
        citizen_id: req.params.citizenId,
        auction_id: req.params.auctionId
      }

      let result = await bid.findAll({ where: param, include: ["auctions", "citizens"] })
      if (result === null) {
        return res.status(404).json({
          message: "bid not found",
          data: result
        });
      }

      return res.status(200).json({
        message: "success bid by auction and citizen",
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

module.exports = Bid