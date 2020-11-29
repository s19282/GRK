//deselect button after click

let imgA;
let imgB;
let matrix = [[1,0,0],[0,1,0],[0,0,1]];
let pSize = 1;

function setup()
{
    createCanvas(512,512);
    background(255);
    createImages();
    clearPrevious();
    updateHTMLmatrix();
}

function draw()
{
    if (!keyIsDown(32))
    {
        image(imgA,0,0);
        text('Image A',10,20);
    }
    else
    {
        image(imgB,0,0);
        text('Image B',10,20);
    }
}
function makeVector(x,y)
{
    return [x,y,1];
}

function drawVector(img,vec)
{
    switch (pSize)
    {
        case 1:
        {
            img.set(vec[0],vec[1],vec[2]);
            break;
        }
        case 2:
        {
            img.set(vec[0],vec[1],vec[2]);
            img.set(vec[0]+1,vec[1],vec[2]);
            img.set(vec[0]+1,vec[1]+1,vec[2]);
            img.set(vec[0],vec[1]+1,vec[2]);
            break;
        }
        case 3:
        {
            img.set(vec[0],vec[1],vec[2]);
            img.set(vec[0]+1,vec[1],vec[2]);
            img.set(vec[0]-1,vec[1],vec[2]);
            img.set(vec[0],vec[1]+1,vec[2]);
            img.set(vec[0],vec[1]-1,vec[2]);
            img.set(vec[0]-1,vec[1]-1,vec[2]);
            img.set(vec[0]-1,vec[1]+1,vec[2]);
            img.set(vec[0]+1,vec[1]-1,vec[2]);
            img.set(vec[0]+1,vec[1]+1,vec[2]);
            break;
        }
    }

    img.updatePixels();
}

function mouseDragged()
{
    let vector = makeVector(mouseX,mouseY);
    drawVector(imgA,vector);
    //multiplyMatrix(makeRotation(20));
    drawVector(imgB,multiplyVector(vector));

}

function makeIdentity()
{
    return [[1,0,0],[0,1,0],[0,0,1]];
}

function makeShift(tX=0,tY=0)
{
    if(document.getElementById("tX") != null)
        tX = document.getElementById("tX").value;
    if(document.getElementById("tY") != null)
        tY = document.getElementById("tY").value;
    multiplyMatrix([[1,0,tX],[0,1,tY],[0,0,1]]);
    updateHTMLmatrix();
}

function makeScale(sX=0,sY=0)
{
    if(document.getElementById("sX") != null)
        sX = document.getElementById("sX").value;
    if(document.getElementById("sY") != null)
        sY = document.getElementById("sY").value;
    multiplyMatrix([[sX,0,0],[0,sY,0],[0,0,1]]);
    updateHTMLmatrix();
}

function makeRotation(angle=0)
{
    if(document.getElementById("angle") != null)
        angle = document.getElementById("angle").value;
    let rad = angle/180*Math.PI;
    multiplyMatrix([[Math.cos(rad),-Math.sin(rad),0],[Math.sin(rad),Math.cos(rad),0],[0,0,1]]);
    updateHTMLmatrix();
}

function makeShear(ShX=0,ShY=0)
{
    if(document.getElementById("ShX") != null)
        ShX = document.getElementById("ShX").value;
    if(document.getElementById("ShY") != null)
        ShY = document.getElementById("ShY").value;
    multiplyMatrix([[1,ShX,0],[ShY,1,0],[0,0,1]]);
    updateHTMLmatrix();
}

function multiplyVector(vector)
{
    let result = [0,0,0];

    for(let i=0; i<matrix.length; i++)
    {
        for(let j=0; j<matrix[i].length; j++)
        {
            result[i]+=matrix[i][j]*vector[i];
        }
    }
    return result;
}
function multiplyMatrix(matrix2)
{
    let result = [[0,0,0],[0,0,0],[0,0,0]];

    for(let i=0; i<matrix.length; i++)
    {
        for(let j=0; j<matrix[i].length; j++)
        {
            for(let k=0; k<matrix.length; k++)
            {
                result[i][j]+=matrix[i][k]*matrix2[k][j];
            }
        }
    }
    matrix=result;
}
function updateHTMLmatrix()
{
    let table = document.getElementById("matrix");
    for(let i=0; i<matrix.length; i++)
    {
        for(let j=0; j<matrix[i].length; j++)
        {
            table.rows[i].cells[j].innerHTML = matrix[i][j];
        }
    }
}
function updateMatrix()
{
    let table = document.getElementById("matrix");
    for(let i=0; i<matrix.length; i++)
    {
        for(let j=0; j<matrix[i].length; j++)
        {
            matrix[i][j] = table.rows[i].cells[j].innerHTML.replace('<br>','');
        }
    }
}
function clearMatrix()
{
    matrix = makeIdentity();
    updateHTMLmatrix();
}
function createImages()
{
    imgA = createImage(512,512);
    imgB = createImage(512,512);
    imgA.loadPixels();
    imgB.loadPixels();
    let d = pixelDensity();

    for(let i=0; i<512*512*4*d; i+=4)
    {
        imgA.pixels[i]=240;
        imgA.pixels[i+1]=250;
        imgA.pixels[i+2]=240;
        imgA.pixels[i+3]=255;
        imgB.pixels[i]=240;
        imgB.pixels[i+1]=240;
        imgB.pixels[i+2]=250;
        imgB.pixels[i+3]=255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
}
function setPixelSize()
{
    pSize = parseInt(document.getElementById("pixelSize").value,10);
}
function clearPrevious()
{
    let inputs = document.getElementsByTagName('input');
    for(let i=0; i<inputs.length; i++)
        inputs[i].value = "";
    document.getElementById('pixelSize').value=1;

}