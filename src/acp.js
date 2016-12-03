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
      const res = await execa(`git`, [`commit`, `-m`, `${log}${emoji.get('smile')}`]);
      if (res.stderr !== '') {
        throw new Error(res.stderr);
      }
    }
  }, {
    title: `git push`,
    task: async() => {
      const sh = await execa.stdout(`git`, [`rev-parse`, `--abbrev-ref`, `HEAD`]);
      const branch = sh.replace(/^\*\s/g, '');
      // await execa(`git`, [`push`, `origin`, `${branch}`]);
      console.log(`done.`);
    }
  }
], {concurrent: true});

tasks.run().catch(err => {
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
