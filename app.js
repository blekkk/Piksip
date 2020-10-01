const line = require('@line/bot-sdk');
const PixivApi = require('pixiv-api-client');
const express = require('express');
require('dotenv').config({ path: '.env' })

const config = {
    channelAccessToken: process.env.ACCESS_TOKEN.toString(),
    channelSecret: process.env.CHANNEL_SECRET.toString(),
};

console.log(config);

const client = new line.Client(config);
const app = express();
const pixiv = new PixivApi();

const username = process.env.PIXIV_USERNAME;
const password = process.env.PIXIV_PASS;

// pixiv.login(username, password, true).then(() => {
//     return pixiv.searchIllust('女の子').then(results => {
//         for(let i =0; i <= 25; i++)
//         {console.log(results.illusts[i].image_urls);}
//     });
// }).catch(err => {
//     console.log(err);
// });

app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error({
        errorRoutesWebHook: err,
      });
    });
});

const handleEvent = (event) => {
    console.log(event);
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null);
    };

    if (event.message.type === "text") {
        if (event.message.text.toLowerCase() === "help") {
            return client.replyMessage(event.replyToken, {
                type: "text",
                text: "Brooo",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type:"message",
                                label:"label 1",
                                text:"bro 1"
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type:"message",
                                label:"label 1",
                                text:"bro 1"
                            }
                        }
                    ]
                }
            });
        };
    };
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});