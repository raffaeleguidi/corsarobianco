var _ = require("underscore");
var corsaronero = require("corsaronero");
var mediaType = ["game", "movie", "music", "series"];

exports.index = function(req, res){
    function myRender(q, results, res) {
        results =_.sortBy(results, function(item) {
            return item.seeds ? -item.seeds : 0;
        });
        res.render('index', { q: q, results: results });
    }
    if (req.query.q) {
        corsaronero.search(req.query.q, function(results) {
            myRender(req.query.q, results, res);
//            res.render('index', { q: req.query.q, results: results });
        })
    } else {
        corsaronero.latestAdditionsFor(1, function(results) {
            myRender(req.query.q, results, res);
            //res.render('index', { q: null, results: results });
        })
    }
};

exports.info = function(req, res) {
    corsaronero.info(req.query.url, function(details){
        res.render('info', { q: req.query.q, detailsUrl: req.query.url, filename: req.query.filename, magnetUrl: details.magnetUrl });
    });
}
