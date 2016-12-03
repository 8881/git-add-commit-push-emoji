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
    task: () => execa(`git`, [`commit`, `-m`, `${emoji.random().emoji}`]).then(res => console.log(res.stdout))
  }, {
    title: `git push`,
    task: () => {
      const sh = execa.sync(`git`, [`branch`]);
      const branch = sh.stdout.replace(/^\*\s/g, '');
      execa(`git`, [`push`, `origin`, `${branch}`]);
    }
  }
], {concurrent: true});

tasks.run().catch(err => {
  console.error(err.stdout);
});

// sh.echo(em.emoji);