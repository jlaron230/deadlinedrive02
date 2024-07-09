const cron = require('node-cron');
const { sendDailyNotification } = require('./quoteService');

// Function to be called every 12 hours
function scheduleDailyNotifications() {
    // Schedule the task to run every 12 hours. The cron pattern is:
    //  - `0 */12 * * *` which means "at minute 0 of every 12th hour of every day"
    cron.schedule('0 */12 * * *', () => {
        console.log('Running daily notification job every 12 hours');
        sendDailyNotification();
    }, {
        scheduled: true,
        timezone: "Europe/Paris" // Adjust this to your local timezone if needed
    });
}

module.exports = { scheduleDailyNotifications };
