const express = require("express");
const db = require("../models");
const Proposal = db.Proposals;

// Create and Save a new Proposal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description) {
        res.status(400).send({ message: "Title or content are empty. Please add content and re-submit." });
        return;
    }
    
    // Create a Proposal
    const proposal = new Proposal({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published: false,
        closed: false
    });

    // Save the Proposal in the database
    proposal
        .save(proposal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ 
                message:
                  err.message || "An error was encountered while creating the Proposal, please try again."
            });
        });
};

// Retrieve all Proposals from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Proposal.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error was encountered while retrieving tutorials."
        });
    });
};

// Find a single Proposal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proposal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not able to find proposal with id: " + id});
            else res.send(data);
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Proposal with id: " + id });
        });
};

// Update a Proposal(close Proposal) by the id in the request
/* TODO: Refactor update to ONLY allow for closing Proposals
*/
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
  
    const id = req.params.id;
  
    Proposal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ 
                    message: `Cannot update Proposal with id: ${id}. Maybe Proposal was not found!`
                });
            } else res.send({ message: "Proposal was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Proposal with id: " + id
            });
        });
};

// Delete a Proposal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Proposal.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Proposal with id: ${id}. Maybe Proposal was not found!`
                });
            } else {
                res.send({
                    message: "Proposal was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Proposal with id: " + id
            });
        });
};

// Find all published Proposals
exports.findAllPublished = (req, res) => {
    Proposal.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving proposals."
            });
        });
};

// Find all open Proposals(not closed)
exports.findAllOpen = (req, res) => {
    Proposal.find({ closed: false })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving proposals."
            });
        });
};