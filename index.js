// Initialize clickup sdk
const clickup_api = require("clickup_api");
const Clickup = new clickup_api("access_token");

// Initialize slack sdk
const { WebClient } = require('@slack/web-api');
const web = new WebClient('bot_token');

Clickup.Lists.get_lists("97779721") // Sprints folder id
.then((data) => {
  return Promise.all(data.lists.map((list) => {
    return Clickup.Tasks.get_tasks({
      'list_id': list.id,
      'archived': false
    })
  }));
})
.then((data) => {
  let unEstimatedTasks = [];
  for (let d of data) {
    for (let task of d.tasks) {
      if (task.status.status === 'in progress' && !task.time_estimate) {
        unEstimatedTasks.push(task);
      }
    }
  }

  return unEstimatedTasks;
})
.then(async (unEstimatedTasks) => {
  console.log(JSON.stringify(unEstimatedTasks))
  const slackIdClickUpMap = {
    "vahagnsaribekyan@gmail.com": "U032KQYF9KP"
  };

  let result = {
    "vahagnsaribekyan@gmail.com": [],
    "test@gmail.com": []
  };

  for (let task of unEstimatedTasks) {

  }

  let resp = await web.chat.postMessage({
    text: 'Sorry for disturbing you, I am testing myself with <@U032KQYF9KP>',
    channel: 'C037UVCCKUY', // C016YAVA7JS
  });

  console.log(resp)
})
.catch((e) => {
  console.error(e);
});


