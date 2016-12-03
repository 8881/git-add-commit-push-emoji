"use strict";

var _execa = require("execa");

var _execa2 = _interopRequireDefault(_execa);

var _nodeEmoji = require("node-emoji");

var _nodeEmoji2 = _interopRequireDefault(_nodeEmoji);

var _listr = require("listr");

var _listr2 = _interopRequireDefault(_listr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tasks = new _listr2.default([{
  title: "git add",
  task: function task() {
    return (0, _execa2.default)("git", ["add", "."]);
  }
}, {
  title: "git commit",
  task: function task() {
    return (0, _execa2.default)("git", ["commit", "-m", "" + _nodeEmoji2.default.random().emoji]);
  }
}, {
  title: "git push",
  task: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var sh, branch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _execa2.default.stdout("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

            case 2:
              sh = _context.sent;
              branch = sh.replace(/^\*\s/g, '');

              console.log(branch);
              (0, _execa2.default)("git", ["push", "origin", "" + branch]);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function task() {
      return _ref.apply(this, arguments);
    };
  }()
}], { concurrent: true });

tasks.run().catch(function (err) {
  console.error(err.stdout);
});

// sh.echo(em.emoji);