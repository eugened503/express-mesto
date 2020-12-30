# Проект Express-mesto
## Описание проекта
Проект представляет собой сервер REST API для проекта [Mesto](https://eugened503.github.io/mesto-react/)

## Стек
+ Nodejs
+ Express
+ MongoDB

## Директории
* `/models` — модели и схемы пользователя и карточки  
* `/routes` — файлы роутера
* `/controllers` — файлы контроллера  

## Функционал
- app.js подключен к серверу MongoDB
- Схема пользователя включает в себя поля: name, about, avatar 
- Схема карточки включает в себя поля: name, link, owner, likes, createdAt
- Роуты для пользователя: 
    - GET /users — возвращает всех пользователей
    - GET /users/:userId - возвращает пользователя по _id
    - POST /users — создаёт пользователя 
    - PATCH /users/me — обновляет профиль
    - PATCH /users/me/avatar — обновляет аватар

- Роуты для карточки: 
    - GET /cards — возвращает все карточки
    - POST /cards — создаёт карточку
    - DELETE /cards/:cardId — удаляет карточку по идентификатору 
    - PUT /cards/:cardId/likes — поставить лайк карточке
    - DELETE /cards/:cardId/likes — убрать лайк с карточки 

- Обработка ошибок:
    - 400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля
    - 404 — карточка или пользователь не найден
    - 500 — ошибка по-умолчанию

## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
