# test-api

API для создая записей блога
Стек AMAZON S3 + Express + PostgreSQL + TypeScript
Роуты:

Регистрация
https://test-api-eta-dun.vercel.app/api/auth/signin - в теле запроса в JSON формате 2 поля email со значение типа string и password со значение типа string (post - запрос)(авторизация)
https://test-api-eta-dun.vercel.app/api/auth/signup - в теле запроса в JSON формате 2 поля email со значение типа string и password со значение типа string (post - запрос)(регистрация)
https://test-api-eta-dun.vercel.app/api/auth/signin/new_token - запрос без тела на обновление токена (post - запрос)
https://test-api-eta-dun.vercel.app/api/auth/logout - запрос без тела на удаление токена (get - запрос)
https://test-api-eta-dun.vercel.app/api/auth/info - запрос без тела на узнавнаие информации о пользователе (get - запрос)

Записи для блога
https://test-api-eta-dun.vercel.app/api/record/create-record - запрос на создание записи 2 варианта создания записи. Первый вариант вы передаёте в теле запроса в JSON формате поле message со значение типа string. Второй вариант вы передаёте медиа файл который хотите загрузить поле должно называется file - на примере postman вы выбираете body типа form-data key это название поля file, value файл который хотите загрузить. (post - запрос)
https://test-api-eta-dun.vercel.app/api/record/list/:size - запрос без тела на получение записей вместо size в параметры запроса перeдаёте число. (get - запрос)
https://test-api-eta-dun.vercel.app/api/record/delete/:id - запрос на удаление записи вместо шв в параметры запроса перeдаёте id той записи которую хотите удалить. (delete - запрос)
https://test-api-eta-dun.vercel.app/api/record/update/:id - запрос на изменение записи 2 варианта изменения, но для начала в параметр запроса вы должны передать id той записи которую хотите изменить. Первый вариант вы передаёте в теле запроса в JSON формате поле message со значение типа string. Второй вариант вы передаёте медиа файл который хотите загрузить поле должно называется file - на примере postman вы выбираете body типа form-data key это название поля file, value файл который хотите загрузить для изменения. (put - запрос).

Все запросы связаные с записями требует того чтобы пользователь был авторизован. Вы должны в headrs передавать токен который получите при регистрации или авторизации.

Для тестирования используйте postman.
