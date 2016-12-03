import execa from "execa";
import emoji from "node-emoji";
import Listr from "listr";

const tasks = new Listr([
  {
    title: `git add`,
    task: () => execa(`git`, [`add`, `.`])
  },
  {
    title: `git commit`,
    task: () => execa(`git`, [`commit`, `-m`, `${emoji.random().emoji}`])
  }, {
    title: `git push`,
    task: async() => {
      const sh = await execa.stdout(`git`, [`rev-parse`, `--abbrev-ref`, `HEAD`]);
      const branch = sh.replace(/^\*\s/g, '');
      console.log(branch);
      await execa(`git`, [`push`, `origin`, `${branch}`]);
      console.log(`done.`);
    }
  }
], {concurrent: true});

tasks.run().catch(err => {
  console.error(err.stdout);
});

// sh.echo(em.emoji);