var _ = require("underscore");
var corsaronero = require("corsaronero");

exports.index = function(req, res){
    if (req.query.q) {
        console.log("q=%s", req.query.q);
        corsaronero.search(req.query.q, function(results) {
            res.render('index', { q: req.query.q, results: results });
        })
    } else {
        corsaronero.latestAdditions(function(results) {
            res.render('index', { q: null, results: results });
        })
    }
};

exports.info = function(req, res) {
    corsaronero.info(req.query.url, function(details){
        console.log(details);
        res.render('info', { q: req.query.q, detailsUrl: req.query.url, filename: req.query.filename, magnetUrl: details.magnetUrl });
    });
}
