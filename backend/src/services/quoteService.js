const axios = require('axios');
const models = require("../models");


const API_BASE_URL = 'http://localhost:5000';

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
    // Fetch all user IDs to whom the quote should be sent
    const users = await models.user.findAll(); 
    users[0].forEach(async (user) => {
        try {
            // Create a notification for each user
            await models.notification.create(user.id, quote.id);  // Assume quote.id is available
            console.log(`Notification sent to user ${user.id} for quote ${quote.id}`);
        } catch (error) {
            console.error(`Failed to send notification to user ${user.id}:`, error);
        }
    });
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
