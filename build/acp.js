"use strict";

var _execa = require("execa");

var _execa2 = _interopRequireDefault(_execa);

var _nodeEmoji = require("node-emoji");

var _nodeEmoji2 = _interopRequireDefault(_nodeEmoji);

var _listr = require("listr");

var _listr2 = _interopRequireDefault(_listr);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var log = _yargs2.default.argv._[0];

var tasks = new _listr2.default([{
  title: "git add",
  task: function task() {
    return (0, _execa2.default)("git", ["add", "."]);
  }
}, {
  title: "git commit",
  task: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var logs, commit;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logs = (log || '') + " " + _nodeEmoji2.default.get('smile');

              console.log(logs);
              _context.next = 4;
              return (0, _execa2.default)("git", ["commit", "-m", "" + logs]);

            case 4:
              commit = _context.sent;

              if (!commit.failed) {
                _context.next = 7;
                break;
              }

              throw new Error(commit);

            case 7:
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
}, {
  title: "git push",
  task: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var sh, branch, pu;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _execa2.default.stdout("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

            case 2:
              sh = _context2.sent;
              branch = sh.replace(/^\*\s/g, '');
              _context2.next = 6;
              return (0, _execa2.default)("git", ["push", "origin", "" + branch]);

            case 6:
              pu = _context2.sent;

              if (!pu.failed) {
                _context2.next = 9;
                break;
              }

              throw new Error(pu);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function task() {
      return _ref2.apply(this, arguments);
    };
  }()
}], { concurrent: true });

tasks.run().catch(function (err) {
  console.error(err.stdout || err.stderr);
});

// yargs
//   .usage(`Usage: acp [log] | [options]`)
//   .command('acp', 'git add && git commit && git push')
//   .example(`acp mylog`, `(git commit -am 'mylog [emoji]')`)
//   .alias('m', 'mode')
//   .nargs('m', 1)
//   .describe('m', 'choose a mode')
//   .demand(1, ['m'])
//   .help('h')
//   .alias('h', 'help')
//   .describe('h', 'show help info').argv;