import execa from "execa";
import emoji from "node-emoji";
import Listr from "listr";
import yargs from "yargs";

const log = yargs.argv._.join(' ');

const tasks = new Listr([
  {
    title: `git add`,
    task: () => execa(`git`, [`add`, `.`])
  },
  {
    title: `git commit`,
    task: async() => {
      const logs = `${log || ''}${emoji.get('smile')}`;
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
]);

tasks.run().catch(err => {
  console.error(err.stdout || err.stderr);
});
