<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossorigin="anonymous">
    <script src="scripts/merger.js" defer></script>
    <link href="src/style.css" rel="stylesheet">

    <title>Merger</title>
</head>
<body>
    <?php
        require_once 'db/db.php';
    ?>
    <div class="container-fluid container-custom">
        <h1 class="header-centered">Сравнение текстов</h1>
        <p><i><b>Вставьте два текста для сравнения</b></i></p>

        <!-- Text input -->
        <div class="row">
            <div class="col">
                <h4>Первый текст</h4>
                <textarea class="text" id="inputText1" aria-label="Первый текст" rows="7"></textarea>
                <button class="btn btn-secondary btn-eraser" id="eraserButton1" name="eraser1">Очистить</button>
            </div>
            <div class="col">
                <h4>Второй текст</h4>
                <textarea class="text" id="inputText2" aria-label="Второй текст" rows="7"></textarea>
                <button class="btn btn-secondary btn-eraser" id="eraserButton2" name="eraser2">Очистить</button>
            </div>
        </div>

        <br>
        <p><i><b>или выберите два файла</b></i></p>
        <br>

        <div class="row">
            <div class="col">

                <!-- File input -->
                <div class="input-group mb-3">
                    <input type="file" class="form-control form-control-file-custom" accept=".txt" id="inputFile1">
                    <label class="input-group-text" for="inputGroupFile1">Загрузить</label>
                </div>
                <div class="input-group mb-3">
                    <input type="file" class="form-control form-control-file-custom" accept=".txt" id="inputFile2">
                    <label class="input-group-text" for="inputGroupFile2">Загрузить</label>
                </div>

            </div>
        </div>

        <!-- Compare button -->
        <div class="row">
            <button class="btn btn-secondary btn-compare" id="compareButton" name="compare">Сравнить</button>
        </div>

        <!-- Result view -->
        <h4>Результат</h4>
        <div class="row">
            <div class="col">
                <div class="text text-result" id="outputResult" aria-label="Результат"></div>
            </div>
        </div>
</div>

</body>
</html>
