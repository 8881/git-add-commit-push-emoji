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
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(log);
              console.log(_nodeEmoji2.default.get('smile'));
              _context.next = 4;
              return (0, _execa2.default)("git", ["commit", "-m", "" + log + _nodeEmoji2.default.get('smile')]);

            case 4:
              res = _context.sent;

              console.log(res);
              if (res !== '') {
                console.log(res.stderr);
              }

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
      var sh, branch;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _execa2.default.stdout("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

            case 2:
              sh = _context2.sent;
              branch = sh.replace(/^\*\s/g, '');
              // await execa(`git`, [`push`, `origin`, `${branch}`]);

              console.log("done.");

            case 5:
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
  console.error(err);
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

console.log(_yargs2.default.argv._);