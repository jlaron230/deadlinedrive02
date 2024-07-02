const cron = require('node-cron');
const { sendDailyNotification } = require('./quoteService');

// Function to be called every 12 minutes
function scheduleDailyNotifications() {
    // Schedule the task to run every 12 minutes. The cron pattern is:
    //  - `*/12 * * * *` which means "every 12th minute of every hour of every day"
    cron.schedule('*/1 * * * *', () => {
        console.log('Running daily notification job every 12 minutes');
        sendDailyNotification();
    }, {
        scheduled: true,
        timezone: "Europe/Paris" // Adjust this to your local timezone if needed
    });
}

module.exports = { scheduleDailyNotifications };
