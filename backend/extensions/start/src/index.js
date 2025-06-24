import { Bot } from 'grammy';
import axios from 'axios';

export default (router, { env }) => {
  const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

  router.post('/', async (req, res) => {
    const tgMessage = req.body.message;
    const chatId = tgMessage?.chat?.id;

    if (tgMessage?.text === '/start') {
      try {
        let imageUrl = null;
        let caption = 'Это стандартное сообщение';

        const response = await axios.get(`${env.PUBLIC_URL}/items/start`, {
          params: {
            'fields[]': ['*', 'image.*']
          }
        });

        const data = response?.data?.data;

        if (data) {
          if (data?.image?.filename_disk) {
            imageUrl = `${env.PUBLIC_URL}/assets/${data?.image?.filename_disk}`;
          }

          if (data?.message) {
            caption = data.message;
          }
        }

        if (imageUrl) {
          await bot.api.sendPhoto(chatId, imageUrl, {
            caption,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [[
                {
                  text: 'Открыть приложение',
                  web_app: {
                    url: env.MINI_APP_URL
                  }
                }
              ]]
            }
          });
        } else {
          await bot.api.sendMessage(chatId, caption, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [[
                {
                  text: 'Открыть приложение',
                  web_app: {
                    url: env.MINI_APP_URL
                  }
                }
              ]]
            }
          });
        }

      } catch (error) {
        console.error('Ошибка при отправке фото:', error);
        await bot.api.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
      }
    }

    res.send({ ok: true });
  });
};
