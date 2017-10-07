var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var JobPostingSchema = require('../schemas/job-posting');
var JobPosting = mongoose.model('posting', JobPostingSchema);

/* POST create posting */
router.post('/', function (req, res, next) {
  JobPosting.create(req.body, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json({posting: posting._id});
    }
  });
});

/* GET list all job postings */
router.get('/', function (req, res, next) {
  JobPosting.find({}, function (err, postings) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(postings);
    }
  });
});

/* GET show job posting */
router.get('/:_id', function (req, res, next) {
  JobPosting.findById(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});




/* GET show job posting by posting id - Ian Lamothe */
router.get('/findById/:_id', function (req, res, next) {
    JobPosting.find({"postingId":req.params._id}, function (err, posting) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(posting);
        }
    });
});

/* PUT Name in name field through search by posting id - Ian Lamothe */
router.put('/addName', function (req, res, next) {

    JobPosting.findOne({"postingId":req.body.postingId}, function (err, posting) {
        if (err) return handleError(err);
        console.log(posting);
        posting.set({ name: req.body.name });
        posting.save(function (err, updatedPosting) {
            if (err) return handleError(err);
            res.send(updatedPosting);
        });
    });
});




/* DELETE remove a posting */
router.delete('/:_id', function (req, res, next) {
  JobPosting.findByIdAndRemove(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(posting);
    }
  });
});

/* GET remove all postings */
/* This is useful for testing purposes */
router.get('/nuke', function (req, res, next) {
  JobPosting.remove({}, function (err) {
    if (err) {
      res.redirect('/postings');
    } else {
      res.redirect('/postings');
    }
  });
});

module.exports = router;
