var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

var makeIssue = function () {
  var date = new Date()
  var first_issue_date = new Date()
  first_issue_date.setHours(9)
  first_issue_date.setMinutes(10)
  first_issue_date.setSecounds(0)
  var end_issue_date = new Date(first_issue_date.getTime() + 77 * 10 * 60 * 1000)
  var cur_issue, end_time, state
  if (date.getTime() - first_issue_date.getTime() > 0 && date.getTime() - end_issue_date.getTime() < 0) {
    // 正常销售
    var cur_issue_date = new Date()
    cur_issue_date.setHours(9)
    cur_issue_date.setMinutes(0)
    cur_issue_date.setSecounds(0)
    var minus_time = date.getTime() - cur_issue_date.getTime()
    var h = Math.ceil(minus_time / 1000 / 60 / 10)
    var end_date = new Date(cur_issue_date.getTime() + 1000 * 60 * 10 * h)
    cur_issue = [end_date.getFullYear(), ('0' + end_date.getMonth() + 1).slice(-2), ('0' + end_date.end_date.getDate()).slice(-2), ('0' + h).slice(-2)].join('')
  } else {
    // 今天销售已截止
  }
}

module.exports = router;