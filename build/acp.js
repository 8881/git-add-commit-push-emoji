"use strict";

var _execa = require("execa");

var _execa2 = _interopRequireDefault(_execa);

var _nodeEmoji = require("node-emoji");

var _nodeEmoji2 = _interopRequireDefault(_nodeEmoji);

var _listr = require("listr");

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tasks = new _listr2.default([{
  title: "git add",
  task: function task() {
    return (0, _execa2.default)("git", ["add", "."]);
  }
}, {
  title: "git commit",
  task: function task() {
    return (0, _execa2.default)("git", ["commit", "-m " + _nodeEmoji2.default.random().emoji]);
  }
}, {
  title: "git push",
  task: function task() {
    var sh = _execa2.default.sync("git", ["branch"]);
    var branch = sh.stdout.replace(/^\*\s/g, '');
    (0, _execa2.default)("git", ["push origin " + branch]);
  }
}], { concurrent: true });

tasks.run().catch(function (err) {
  console.error(err);
});

// sh.echo(em.emoji);