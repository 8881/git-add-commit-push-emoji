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
    task: () => execa(`git`, [`commit`, `-m ${emoji.random().emoji}`])
  }, {
    title: `git push`,
    task: () => {
      const branch = execa(`git`, [`rev-parse`, `--abbrev-ref HEAD`]).then(res => console.log(res));
      console.log(branch);
      // execa(`git`, [`push origin ${branch}`]);
    }
  }
], {concurrent: true});

tasks.run().catch(err => {
  console.error(err);
});

// sh.echo(em.emoji);