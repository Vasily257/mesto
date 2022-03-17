# Проект: Место

## Содержание

- [Описание](#Описание)
- [Планы по доработке](#Планы-по-доработке)
- [Ссылка на проект](#Ссылка-на-проект)

## Описание

Учебный проект, который имитирует социальную сеть для путешественников.
Функционально это одностраничный сайт на чистом HTML, CSS и JS.

В проекте использована отзывчивая верстка, принцип построения — `mobile-first`. Сайт перестраивается
при ширине экрана 600px и 935px, чтобы лучше выглядеть в промежуточных разрешениях.

Для построения сеток применяется `grid-layout`, иногда `flex`. Страница сразу отрисовывается с системными шрифтами,
а после загрузки шрифтов перерисовывается. Шрифты подключены локально.

Основной функционал страницы, прописанный на JS, позволяет:
- открывать всплывающие окна (попапы) для редактирования профиля и добавления карточек
- лайкать и удалять карточки, а также увеличивать изображение карточки
- сохранять или не сохранять изменения в попапах, нажав на кнопку `Сохранить` или `Закрыть` («крестик»)

Также для страницы реализован дополнительный функционал:
- при перемещении с помощью клавиши `Tab` у интерактивных элементов появляется синяя обводка
- закрытие окна работает не только при клике на крестик, а также на полупрозрачную подложку

## Планы по доработке

Выполнить все пункты ревьюера из раздела «Можно лучше».

## Ссылка на проект

https://vasily257.github.io/mesto/
