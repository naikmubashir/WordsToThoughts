import cron from "cron";
import https from "https";

const URL = process.env.FIRST_URL
const URLL = process.env.SECOND_URL

const sendGetRequest = (url) => {
    https
        .get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`GET request to ${url} sent successfully`);
            } else {
                console.log(`GET request to ${url} failed`, res.statusCode);
            }
        })
        .on("error", (e) => {
            console.error(`Error while sending request to ${url}`, e);
        });
};

export const renderapp = new cron.CronJob("*/14 * * * *", function () {
    sendGetRequest(URL);
});

export const renderappp = new cron.CronJob("*/14 * * * *", function () {
    sendGetRequest(URLL);
});
