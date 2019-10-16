const telegraf = require("telegraf");
const { Extra, Markup } = require("telegraf");
const request = require("request");
const Bot = new telegraf(process.env.BOT_TOKEN);
const a = require("random-animals-api");
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// =========================================
//             START MESSAGE
// =========================================

Bot.start(ctx => {
  const welcome = "Henlo @" + ctx.message.from.username + " 🐶";
  ctx.reply(welcome, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [["Who are you? 🤔"]],
      resize_keyboard: true
    }),
    disable_notification: false
  });
}); // START MESSAGE

// =========================================
//                 INTRO
// =========================================

Bot.hears("Who are you? 🤔", ctx => {
  ctx.telegram
    .sendMessage(
      ctx.message.chat.id,
      "I'am neither hooman or doggo, just a bot dat gib u random animal pics dat run for free by <a href='glitch.com/~random-animal'>Glitch</a> and code with ❤️ by <a href='github.com/Awotism'>Awotism</a>" +
        "\n\nbut dont worry, I dont bite ppl, Im friendly as hek 😎🐶",
      Extra.HTML()
    )
    .then(() =>
      ctx.reply("U understend hooman?", {
        parse_mode: "Markdown",
        reply_markup: JSON.stringify({
          keyboard: [["Okay I understand now! 😬"], ["Lemme watch the menu"]],
          resize_keyboard: true
        }),
        disable_notification: false
      })
    );
}); // INTRO

// =========================================
//                  MENU
// =========================================
Bot.hears("Okay I understand now! 😬", ctx => {
  var user_message = ctx.message.text;
  ctx.reply("Woky doggie! ✅");
  ctx.reply("lemme know which animal you want me to show!", {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [
        ["🐶 Dog", "🐱 Cat", "🐦 Bird"],
        ["🦆 Duck", "🐰 Bunny", "🦎 Lizard"],
        ["🦉 Owl", "🦊 Fox", "🐕 Shiba"],
        ["More Animal ❤️"]
      ],
      resize_keyboard: true
    }),
    disable_notification: false
  });
});
Bot.hears("Lol, ok, take me back", ctx => {
  var user_message = ctx.message.text;
  var menu_message = "Woky doggie! ✅";
  ctx.reply(menu_message, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [
        ["🐶 Dog", "🐱 Cat", "🐦 Bird"],
        ["🦆 Duck", "🐰 Bunny", "🦎 Lizard"],
        ["🦉 Owl", "🦊 Fox", "🐕 Shiba"],
        ["More Animal ❤️"]
      ],
      resize_keyboard: true
    }),
    disable_notification: false
  });
});
Bot.hears("More Animal ❤️", ctx => {
  var user_message = ctx.message.text;
  var menu_message =
    "Well, umm technically Iam a lazy doggo bot as hell, aint got so much time to look forward at moar animal r8 now 🐶";
  ctx.reply(menu_message, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [["Lol, ok, take me back"]],
      resize_keyboard: true
    }),
    disable_notification: false
  });
});

Bot.hears("Lemme watch the menu", ctx => {
  var user_message = ctx.message.text;
  var menu_message = "Woky doggie! ✅";
  ctx.reply(menu_message, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [
        ["🐶 Dog", "🐱 Cat", "🐦 Bird"],
        ["🦆 Duck", "🐰 Bunny", "🦎 Lizard"],
        ["🦉 Owl", "🦊 Fox", "🐕 Shiba"],
        ["More Animal ❤️"]
      ],
      resize_keyboard: true
    }),
    disable_notification: false
  });
});
Bot.hears("Menu 📋", ctx => {
  var user_message = ctx.message.text;
  var menu_message = "Woky doggie! ✅";
  ctx.reply(menu_message, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [
        ["🐶 Dog", "🐱 Cat", "🐦 Bird"],
        ["🦆 Duck", "🐰 Bunny", "🦎 Lizard"],
        ["🦉 Owl", "🦊 Fox", "🐕 Shiba"],
        ["More Animal ❤️"]
      ],
      resize_keyboard: true
    }),
    disable_notification: false
  });
});
Bot.hears("🐶 Dog", ctx => {
  const options = {
    url: "https://random.dog/woof.json",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      "User-Agent": "my-reddit-client"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var doglink = json.url;
    var extdoglink = path.extname(doglink);
    if (extdoglink == ".mp4") {
      ctx.replyWithVideo(doglink);
    } else if (extdoglink == ".gif") {
      ctx.replyWithAnimation(doglink);
    } else {
      ctx.replyWithPhoto(doglink);
    }
  });
});

Bot.hears("🐱 Cat", ctx => {
  const options = {
    url: "https://aws.random.cat/meow",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var catlink = json.file;
    var extcatlink = path.extname(catlink);
    if (extcatlink == ".mp4") {
      ctx.replyWithVideo(catlink);
    } else if (extcatlink == ".gif") {
      ctx.replyWithAnimation(catlink);
    } else {
      ctx.replyWithPhoto(catlink);
    }
  });
});

Bot.hears("🦊 Fox", ctx => {
  const options = {
    url: "https://randomfox.ca/floof/",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var animallink = json.image;
    var extanimallink = path.extname(animallink);
    if (extanimallink == ".mp4") {
      ctx.replyWithVideo(animallink);
    } else if (extanimallink == ".gif") {
      ctx.replyWithAnimation(animallink);
    } else {
      ctx.replyWithPhoto(animallink);
    }
  });
});

Bot.hears("🐦 Bird", ctx => {
  const options = {
    url: "http://random.birb.pw/tweet/",
    method: "GET"
  };
  request(options, function(err, res, body) {
    console.log(body);
    var catlink = "http://random.birb.pw/img/" + body;
    var extcatlink = path.extname(catlink);
    if (extcatlink == ".mp4") {
      ctx.replyWithVideo(catlink);
    } else if (extcatlink == ".gif") {
      ctx.replyWithAnimation(catlink);
    } else {
      ctx.replyWithPhoto(catlink);
    }
  });
});

Bot.hears("🐰 Bunny", ctx => {
  const options = {
    url: "https://api.bunnies.io/v2/loop/random/?media=gif",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    // console.log(json);
    var animallink = json.media.gif;
    // console.log(animallink);
    var extanimallink = path.extname(animallink);
    if (extanimallink == ".mp4") {
      ctx.replyWithVideo(animallink);
    } else if (extanimallink == ".gif") {
      ctx.replyWithAnimation(animallink);
    } else {
      ctx.replyWithPhoto(animallink);
    }
  });
});

Bot.hears("🦎 Lizard", ctx => {
  const options = {
    url: "https://nekos.life/api/v2/img/lizard",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var catlink = json.url;
    var extcatlink = path.extname(catlink);
    if (extcatlink == ".mp4") {
      ctx.replyWithVideo(catlink);
    } else if (extcatlink == ".gif") {
      ctx.replyWithAnimation(catlink);
    } else {
      ctx.replyWithPhoto(catlink);
    }
  });
});

Bot.hears("🦉 Owl", ctx => {
  const options = {
    url: "http://pics.floofybot.moe/owl",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var catlink = json.image;
    var extcatlink = path.extname(catlink);
    if (extcatlink == ".mp4") {
      ctx.replyWithVideo(catlink);
    } else if (extcatlink == ".gif") {
      ctx.replyWithAnimation(catlink);
    } else if (extcatlink == ".gifv") {
      ctx.replyWithAnimation(catlink);
    } else {
      ctx.replyWithPhoto(catlink);
    }
  });
});

Bot.hears("🐕 Shiba", ctx => {
  a.shiba()
    .then(url => ctx.replyWithPhoto(url))
    .catch(error => console.error(error));
});

Bot.hears("🦆 Duck", ctx => {
  const options = {
    url: "https://random-d.uk/api/v1/random?type=png",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8"
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    //  console.log(json);
    var catlink = json.url;
    var extcatlink = path.extname(catlink);
    if (extcatlink == ".mp4") {
      ctx.replyWithVideo(catlink);
    } else if (extcatlink == ".gif") {
      ctx.replyWithAnimation(catlink);
    } else {
      ctx.replyWithPhoto(catlink);
    }
  });
});

Bot.on("text", ctx => {
       ctx.reply("Im sorry, i dont understand what u sayyin", {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      keyboard: [["Menu 📋"]],
      resize_keyboard: true
    }),
    disable_notification: false
  })
       })

Bot.startPolling();
