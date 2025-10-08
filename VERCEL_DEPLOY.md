# Инструкция по деплою на Vercel

## Проблема с изображениями MangaDex

На Vercel изображения с MangaDex API могут не загружаться из-за блокировки CORS или других ограничений.

## Решение

Мы создали API route `/api/image-proxy`, который проксирует изображения через наш сервер.

## Настройка переменных окружения на Vercel

1. Перейдите в настройки проекта на Vercel
2. Откройте раздел **Environment Variables**
3. Добавьте следующие переменные:

```
NEXT_PUBLIC_SUPABASE_URL=https://keqfumjwzqtqdlwfwpao.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_G1R-YlNm9vDKZP306-VaVg_DMrlgXIm
NEXT_PUBLIC_USE_IMAGE_PROXY=true
```

⚠️ **ВАЖНО**: Установите `NEXT_PUBLIC_USE_IMAGE_PROXY=true` для production!

## Как это работает

- **Localhost**: Изображения загружаются напрямую с MangaDex (`NEXT_PUBLIC_USE_IMAGE_PROXY=false`)
- **Production (Vercel)**: Изображения проксируются через `/api/image-proxy` (`NEXT_PUBLIC_USE_IMAGE_PROXY=true`)

## Проверка после деплоя

1. Откройте консоль браузера (F12)
2. Перейдите на вкладку Network
3. Проверьте, что изображения загружаются через `/api/image-proxy?url=...`
4. Убедитесь, что нет ошибок 404 или 403

## Кэширование

Изображения кэшируются на 1 год (`max-age=31536000, immutable`), что улучшает производительность.