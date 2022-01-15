const { route } = require("express/lib/router");

module.exports = app => {
    const proposals = require("../controllers/proposal.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Proposal
    router.post("/", proposals.create);
  
    // Retrieve all Proposals
    router.get("/", proposals.findAll);
  
    // Retrieve all published Proposals
    router.get("/published", proposals.findAllPublished);

    // Retrieve all opened Proposals
    router.get("/opened", proposals.findAllOpen);
  
    // Retrieve a single Proposal with id
    router.get("/:id", proposals.findOne);
  
    // Update a Proposal with id
    router.put("/:id", proposals.update);
  
    // Delete a Proposal with id
    router.delete("/:id", proposals.delete);
  
    app.use('/api/proposals', router);
};