# Проект: Место

## Содержание

- [Описание](#Описание)
- [Планы по доработке](#Планы-по-доработке)
- [Ссылка на проект](#Ссылка-на-проект)

## Описание

Учебный проект, который имитирует социальную сеть с уклоном на путешествия.
Функционально это одностраничный сайт на чистом HTML, CSS и JS.

В проекте использована отзывчивая верстка, принцип построения — mobile-first.
Точки перестроения не совпадают с макетом: макет сделан для разрешений 320px и 1280px,
а сайт перестраивается при 600px и 935px. Это сделано для того, чтобы сайт лучше выглядел в промежуточных разрешениях и более плавно перестраивался.

Для построения сеток применяется grid-layout, в отдельных случаях flex.
Изначально страница рендерится без шрифтов, но как только они подключаются, то страница перерендеривается с нужными шрифтами.
Шрифты подключены локально, причём сначала они ищутся на компьютере, а тольком потом загружаются.

С помощью JS на сайте можно редактировать профиль: менять имя и фамилию пользователя, а также его вид деятельности.

Что ещё из интересного:
- когда пользователь перемещается по сайту клавишей `Tab`, то у интерактивных элементов появляется синяя обводка
- пользователь не может сохранить пустые поля или поля, в которых только пробелы
- когда пользователь открывает всплывающее окно, то фокус автоматически наводится на первое поле


## Планы по доработке

Выполнить все пункты ревьюера из раздела «Можно лучше».

## Ссылка на проект

https://vasily257.github.io/mesto/