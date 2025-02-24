import winston from "winston";
import TelegramBot from "node-telegram-bot-api";

const TELEGRAM_TOKEN = "7815302777:AAGlvW2NlF7jjckDaGnu9LrM59OLqvfL93Y";  
const TELEGRAM_CHAT_ID = "@winstonn16log";

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// 🔹 Log ma'lumotlarini Telegram kanalga yuborish
const sendLogToTelegram = (log) => {
    const { timestamp, level, message } = log;
    
    const levelEmoji = {
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        debug: "🐞"
    };

    const logMessage = `
📢 *Yangi Log*  
🔹 *Vaqt*: \`${timestamp}\`  
🔹 *Daraja*: ${levelEmoji[level] || ""} \`${level.toUpperCase()}\`  
🔹 *Xabar*: \`${message}\`
`;

    bot.sendMessage(TELEGRAM_CHAT_ID, logMessage, { parse_mode: "Markdown" })
        .catch(err => console.error("Telegramga yuborishda xato:", err));
};

// 🔹 Logger yaratish
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} | ${level.toUpperCase()} | ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: "logs/combined.log" }), // Faylga yozish
        new winston.transports.Console() // Konsolga chiqarish
    ]
});

// 🔹 Konsol transportiga Telegramga yuborish funksiyasini bog‘lash
logger.transports.forEach(transport => {
    if (transport instanceof winston.transports.Console) {
        transport.on("logged", (info) => {
            sendLogToTelegram(info);
        });
    }
});

export { logger };
