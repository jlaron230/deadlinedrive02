const cron = require('node-cron');
const { sendDailyNotification } = require('./quoteService');

// Function to be called every day at midnight
function scheduleDailyNotifications() {
    cron.schedule('0 0 * * *', () => {
        console.log('Running daily notification job at midnight');
        sendDailyNotification();
    }, {
        scheduled: true,
        timezone: "Europe/Paris" // Ensure the timezone is correctly set for your location
    });
}

module.exports = { scheduleDailyNotifications };
