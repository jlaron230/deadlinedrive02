const axios = require('axios');
const UserManager = require('../models/UserManager');
const NotificationManager = require('../models/NotificationManager');

const API_BASE_URL = 'http://localhost:5000';
const userManager = new UserManager();
const notificationManager = new NotificationManager();

async function fetchDailyQuote() {
    try {
        const response = await axios.get(`${API_BASE_URL}/daily-quote`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No quote available');
        }
    } catch (error) {
        console.error("Error fetching quote from backend:", error);
        throw new Error('Failed to fetch quote');
    }
}

async function sendNotificationsToUsers(quote) {
    try {
        const users = await userManager.findAll();
        users.forEach(async (user) => {
            try {
                await notificationManager.create(user.id, quote.id);
                console.log(`Notification sent to user ${user.id} for quote ${quote.id}`);
            } catch (error) {
                console.error(`Failed to send notification to user ${user.id}:`, error);
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

exports.sendDailyNotification = async () => {
    try {
        const quote = await fetchDailyQuote();
        await sendNotificationsToUsers(quote);
        console.log("Daily quote sent successfully.");
    } catch (error) {
        console.error("Failed to send daily quote:", error);
    }
};
