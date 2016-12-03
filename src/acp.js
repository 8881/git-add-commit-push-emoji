import execa from "execa";
import emoji from "node-emoji";
import Listr from "listr";
import yargs from "yargs";

const log = yargs.argv._[0];

const tasks = new Listr([
  {
    title: `git add`,
    task: () => execa(`git`, [`add`, `.`])
  },
  {
    title: `git commit`,
    task: async() => {
      const logs = `${log || ''} ${emoji.get('smile')}`;
      console.log(logs);
      const commit = await execa(`git`, [`commit`, `-m`, `${logs}`]);
      if (commit.failed) {
        throw new Error(commit);
      }
    }
  }, {
    title: `git push`,
    task: async() => {
      const sh = await execa.stdout(`git`, [`rev-parse`, `--abbrev-ref`, `HEAD`]);
      const branch = sh.replace(/^\*\s/g, '');
      const pu = await execa(`git`, [`push`, `origin`, `${branch}`]);
      if (pu.failed) {
        throw new Error(pu);
      }
    }
  }
], {concurrent: true});

tasks.run().catch(err => {
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
