document.getElementById('compareButton').onclick = function() {
    let str = document.getElementById('inputText1').value;
    let newStr = document.getElementById('inputText2').value;
    let file1 = document.getElementById('inputFile1').files[0];
    let file2 = document.getElementById('inputFile2').files[0];

    let result = document.getElementById('outputResult');

    while (result.firstChild)
    {
        result.removeChild(result.firstChild);
    }

    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function()
    // {
    //     console.log(this.responseText);
    //     result.value = this.responseText;
    // };
    // xhttp.open("POST", "db/db.php", true);
    // xhttp.send("str="+str+"&"+"newStr="+newStr);

    if (str === '' && newStr === '')
    {
        //Read from files
        getAsText(file1, file2);
    }
    else
    {
       getLongestCommonString(str,newStr);
    }
};

document.getElementById("eraserButton1").onclick = function()
{
    document.getElementById('inputText1').value = "";
}

document.getElementById("eraserButton2").onclick = function()
{
    document.getElementById('inputText2').value = "";
}

function getAsText(file1, file2)
{
    let reader = new FileReader();
    let texts = new Array(2);
    reader.readAsText(file1);

    reader.onload = function()
    {
      texts[0] = reader.result;
    }

    reader.onloadend = function()
    {
        reader.readAsText(file2);

        reader.onload = function()
        {
            texts[1] = reader.result;
        }

        reader.onloadend = function()
        {
            console.log(texts);
            getLongestCommonString(texts[0], texts[1]);
        }
    }
}

function getLongestCommonString(str, newStr)
{
    if (handleEmptyText(str,newStr))
    {
        return false;
    }

    let strLength = str.length;
    let newStrLength = newStr.length;

    let lcsMatrix = createMatrix(newStrLength, strLength);

    for (let i = 1; i <= newStrLength; i++)
    {
        for (let j = 1; j <= strLength; j++)
        {
            if (str[j - 1] === newStr[i - 1])
            {
                lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
            }
            else
            {
                lcsMatrix[i][j] = Math.max(lcsMatrix[i][j - 1], lcsMatrix[i - 1][j]);
            }
        }
    }

    getDifferences(lcsMatrix, str, newStr, 'outputResult');
}

function getDifferences(m, str, newStr)
{
    let i = newStr.length;
    let j = str.length;
    let resultView = document.getElementById('outputResult');

    while (i >= 0 && j >= 0)
    {
        let node;
        if (str[j - 1] === newStr[i - 1] && i > 0 && j > 0)
        {
            //Same characters
            if (str[j - 1] === '\n')
            {
                node = document.createElement('br');
            }
            else
            {
                node = document.createTextNode(str[j - 1]);
            }

            i--;
            j--;
        }
        else if ((m[i][j - 1] < m[i - 1][j] || j === 0) && i > 0)
        {
            //New characters
            node = document.createElement('span');
            node.classList.add('bg-added', 'text-added');

            if (newStr[i - 1] === '\n')
            {
                node = document.createElement('br');
            }
            else
            {
                node.appendChild(document.createTextNode(newStr[i - 1]));
            }

            i--;
        }
        else if ((m[i][j - 1] >= m[i - 1][j] || i === 0) && j > 0)
        {
            //Deleted characters
            node = document.createElement('span');
            node.classList.add('bg-deleted', 'text-deleted');

            if (str[j - 1] === '\n')
            {
                node = document.createElement('br');
            }
            else
            {
                node.appendChild(document.createTextNode(str[j - 1]));
            }

            j--;
        }

        resultView.insertBefore(node, resultView.firstChild);

        if (i === 0 && j === 0)
        {
            break;
        }
    }
}

function createMatrix(rows, cols)
{
    let matrix = [];

    for (let i = 0; i <= rows; i++)
    {
        matrix.push(new Array(cols + 1));
        matrix[i].fill(0, 0, cols + 1);
    }

    return matrix;
}

function handleEmptyText(str1, str2)
{

    if (str1 === '')
    {
        //all the text is new
        splitText(str2, 'text-added', 'bg-added');

        return true;
    }
    else if (str2 === '')
    {
        //all the text deleted
        splitText(str1, 'text-deleted', 'bg-deleted');

        return true;
    }

    return false;
}

function splitText(text, ...styles)
{
    let node;
    let result = document.getElementById("outputResult");
    let line = "";
    for (let i = 0; i <= text.length; i++)
    {
        if (text[i] === '\n' || i === text.length)
        {
            node = document.createElement('span');
            node.appendChild(document.createTextNode(line));
            node.classList.add(styles[0], styles[1]);
            result.appendChild(node);
            result.appendChild(document.createElement('br'));
            line = "";
        }
        else
        {
            line += text[i];
        }
    }
}
