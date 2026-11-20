# Bean There — лендинг крафтовой кофейни

Одностраничный сайт на React + TypeScript + Vite: три сорта кофе, FAQ, подписка на рассылку и модалка заказа с выбором веса. Адреса магазинов открываются аккордеоном в шапке.

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется по адресу http://localhost:5173/my-landing/

## Проверки

```bash
npm run build
npm run lint
npm run preview
```

## Деплой на GitHub Pages

```bash
npm run deploy
```

Команда собирает `dist` и публикует его в ветку `gh-pages`. В `vite.config.ts` задан `base: '/my-landing/'`.

Готовый сайт: https://Natalia-create-bot.github.io/my-landing/

## Структура

```
src/
├── App.tsx                  # страница и логика форм
├── App.css                  # стили и кофейная тема
├── main.tsx                 # точка входа
└── assets/coffee/           # локальные фотографии
```
