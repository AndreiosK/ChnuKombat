import requests
from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext , Application


TOKEN = '7235679293:AAE1gaHIc0hDuJ_FSNqZfhATqmywW1knGfc'


async def start(update: Update, context: CallbackContext):
    await update.message.reply_text('Ласкаво просимо! Надішліть /connect для підключення вашого акаунту гри.')

async def connect(update: Update, context: CallbackContext):
    user_id = update.message.from_user.id
    requests.post('http://localhost:5000/update_score', json={
        'telegram_id': user_id,
        'score': 0,
        'points': 0,
        'additional_clicks': 0
    })
    await update.message.reply_text(f'Ваш акаунт гри підключено. Ваш ID: {user_id}.')


def main():
    application = Application.builder().token(TOKEN).build()

    # Commands
    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('start', connect))

    # Run bot
    application.run_polling()
if __name__ == '__main__':
    main()

