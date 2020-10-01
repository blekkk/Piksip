const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();
require('dotenv').config({ path: '.env' })

const username = process.env.PIXIV_USERNAME;
const password = process.env.PIXIV_PASS;

pixiv.login(username, password, true).then(() => {
    return pixiv.searchIllust('女の子').then(results => {
        for(let i =0; i <= 25; i++)
        {console.log(results.illusts[i].image_urls);}
    });
}).catch(err => {
    console.log(err);
});