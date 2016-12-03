import execa from "execa";
import emoji from 'node-emoji';
import Listr from "listr";

const tasks = new Listr([
  {
    title: `git add`,
    task: () => execa(`git`, [`add`, `.`])
  },
  {
    title: `git commit`,
    task: () => execa(`git`, [`commit`,`-m ${emoji.get('smile')}`])
  },{
    title: `git push`,
    task: () => execa(`git`, [`push`])
  }
], {concurrent: true});

tasks.run().catch(err => {
  console.error(err);
});

// sh.echo(em.emoji);