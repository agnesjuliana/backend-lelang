const Item = require('../modules/itemsModule');
const Citizen = require('../modules/citizensModule');
const Officer = require('../modules/officersModule');
const Auction = require('../modules/auctionsModule');
const Bid = require('../modules/bidsModule');

const item = new Item
const citizen = new Citizen
const officer = new Officer
const auction = new Auction
const bid = new Bid






const jwtAuth = require('../auth/auth').auth
const roleAuth = require('../auth/roleAuth')

const routes = async (server) => {

  server.post("/api/item", jwtAuth, roleAuth.authAdminOperator, item.store);
  server.put("/api/item/:id", jwtAuth, roleAuth.authAdminOperator, item.update);
  server.delete("/api/item/:id", roleAuth.authAdminOperator, jwtAuth, item.delete);
  server.get("/api/item/:id", jwtAuth, item.show);
  server.get("/api/item", jwtAuth, item.index);

  server.post("/api/citizen/login", citizen.login);
  server.post("/api/citizen", citizen.store);
  server.put("/api/citizen/:id", jwtAuth, roleAuth.authCitizen, citizen.update);
  server.delete("/api/citizen/:id", jwtAuth, citizen.delete);
  server.get("/api/citizen/:id", jwtAuth, roleAuth.authAdminOperator, citizen.show);
  server.get("/api/citizen", jwtAuth, roleAuth.authAdminOperator, citizen.index);

  server.post("/api/officer/login", officer.login);
  server.post("/api/officer", jwtAuth, roleAuth.authAdmin, officer.store);
  server.put("/api/officer/:id", jwtAuth, roleAuth.authAdminOperator, officer.update);
  server.delete("/api/officer/:id", jwtAuth, roleAuth.authAdmin, officer.delete);
  server.get("/api/officer/:id", jwtAuth, roleAuth.authAdmin, officer.show);
  server.get("/api/officer", jwtAuth, roleAuth.authAdmin, officer.index);

  server.post("/api/auction", jwtAuth, roleAuth.authOperator, auction.store);
  server.put("/api/auction/:id", jwtAuth, roleAuth.authOperator, auction.update);
  server.delete("/api/auction/:id", jwtAuth, roleAuth.authOperator, auction.delete);
  server.get("/api/auction/:id", jwtAuth, auction.show);
  server.get("/api/auction", auction.index);

  server.post("/api/bid", jwtAuth, roleAuth.authCitizen, bid.store);
  server.delete("/api/bid/:id", jwtAuth, roleAuth.authCitizen, bid.delete);
  server.get("/api/bid/:id", jwtAuth, bid.show);
  server.get("/api/bid/citizen/:citizenId", jwtAuth, bid.showByCitizen);
  server.get("/api/bid/auction/:auctionId", jwtAuth, bid.showByAuction);
  server.get("/api/bid/citizen/:citizenId/auction/:auctionId", jwtAuth, bid.showByAuctionCitizen);
  server.get("/api/bid", jwtAuth, bid.index);
}

module.exports = { routes };
