# Сравнение текстов

> То, что будет добавлено/исправлено:
> - сохранение сравнений в базу данных (в ближайшее время)
> - костыль с приоритетом сравнения текстовое поле - файл
> - оптимизация, и некорретное из-за этого сравнение, при добавлении новых символов (в примере ниже) 
>![](src/images/compare-bug.png)

###### Сравнение текста из двух полей.
![](src/images/text-fields.png)

###### Сравнение текста из двух файлов.
> Сравнение из полей в приоритете, поэтому необходимо очистить их, чтобы считывать из файлов.

![](src/images/files.png)
