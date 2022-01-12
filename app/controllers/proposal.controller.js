const db = require("../models");
const { user: User, proposal: Proposal } = db;

exports.addProposal = (req, res) => {
   
    const proposal = new Proposal({
        title: req.body.title,
        description: req.body.description,
        closed: false
    });

    proposal.save((err, proposal) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!req.body.title || !req.body.description) {
            res.status(500).send({ message: "Proposal needs a title and description."});
            return;
        }

        res.send({ message: "Proposal saved successfully."});
    });
};

exports.addVote = (req, res) => {

    if (!req.body.title || !req.body.username) {
        res.status(500).send({ message: "You must include the proposal and username to add a vote." });
        return;
    }

    Proposal.findOne({ 
        title: req.body.title
    })
        .exec(async (err, proposal) => {
            if (err) {
                res.status(500).send({ message: err});
                return;
            }

            if (!proposal) {
                res.status(404).send({ message: "Proposal not found."});
            }

            let voters = [];
            
            User.findOne({
                username: req.body.username,
            })
                .exec(async (err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                
                    if (!user) {
                        return res.status(404).send({ message: "User Not found." });
                    }
                    
                    for (let i = 0; i < proposal.voters.length; i++) {
                        if (proposal.voters[i].username === req.body.username) {
                            return res.status(500).send({ message: `${proposal.voters[i].username} already voted on that proposal.`});
                        }
                    }
                });

            })
        .then(proposal =>
            proposal.updateOne(
                { title: req.body.title },
                { $push: { voters: [req.body.username] } },
                function(err, result) {
                    if (err) {
                        res.status(500).send({ message: err });
                    }
                    else {
                        res.send(result);
                    }
                }
            )
        );
}