# Проект: Место

## Содержание

- [Описание](#Описание)
- [Планы по доработке](#Планы-по-доработке)
- [Ссылка на проект](#Ссылка-на-проект)

## Описание

Учебный проект, который имитирует социальную сеть для путешественников.
Функционально это одностраничный сайт на чистом HTML, CSS и JS.

В проекте использована отзывчивая верстка, принцип построения — mobile-first.
Сайт перестраивается при ширине экрана 600px и 935px, чтобы лучше выглядеть в промежуточных разрешениях.

Для построения сеток применяется grid-layout, иногда flex.
Страница сразу отрисовывается с системными шрифтами, а после загрузки шрифтов перерисовывается.
Шрифты подключены локально, причём сначала они ищутся на компьютере пользователя.

Основной функционал страницы, прописанный на JS, позволяет:
- открывать всплывающее окно при нажатии на кнопку редактирования и загружать данные, которые отображаются на сайте — имя и вид деятельности пользователя
- редактировать профиль пользователя: менять его имя и вид деятельности
- сохранять изменения, нажав на кнопку `Сохранить`
- не сохранять изменения, нажав на кнопку `Закрыть` (крестик)

Также для страницы реализован дополнительный функционал:
- когда пользователь перемещается по сайту клавишей `Tab`, то у интерактивных элементов появляется синяя обводка
- когда пользователь открывает всплывающее окно, то фокус автоматически наводится на первое поле
- пользователь не может сохранить пустые поля или поля, в которых только пробелы
- пока открыто всплывающее окно, пользователь может перемещаться клавишей `Tab` только внутри этого окна
- чтобы закрыть всплывающее окно, можно нажать не только на крестик, а также на полупрозрачную подложку или клавишу `Escape`

## Планы по доработке

Выполнить все пункты ревьюера из раздела «Можно лучше».

## Ссылка на проект

https://vasily257.github.io/mesto/