import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Получаем информацию о маршруте и запросе
  const url = req.nextUrl.clone();

  // Проверяем, если запрос уже идет на страницу ошибки, ничего не делаем
  if (url.pathname.startsWith('/error-page')) {
    return NextResponse.next();
  }

  // Имитируем проверку ошибки (например, код состояния 500)
  const response = NextResponse.next();
  if (response.status === 500) {
    url.pathname = '/error-page'; // Укажите путь к вашей странице ошибки
    return NextResponse.redirect(url);
  }

  return response;
}
