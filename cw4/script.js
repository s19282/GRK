let imgA;
let imgB;

function setup()
{
    createCanvas(512,512);
    background(255);
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
    img.set(vec[0],vec[1],vec[2]);

    img.set(vec[0]+1,vec[1],vec[2]);
    img.set(vec[0]-1,vec[1],vec[2]);
    img.set(vec[0],vec[1]+1,vec[2]);
    img.set(vec[0],vec[1]-1,vec[2]);
    img.set(vec[0]-1,vec[1]-1,vec[2]);
    img.set(vec[0]-1,vec[1]+1,vec[2]);
    img.set(vec[0]+1,vec[1]-1,vec[2]);
    img.set(vec[0]+1,vec[1]+1,vec[2]);
    img.updatePixels();
}

function mouseDragged()
{
    let vector = makeVector(mouseX,mouseY);
    drawVector(imgA,vector);
    // drawVector(imgB, multiplyVector(makeIdentity(),vector));
    // drawVector(imgB, multiplyVector(makeShift(.5,-.5),vector));
    // drawVector(imgB, multiplyVector(makeScale(2,2),vector));
    // drawVector(imgB, multiplyVector(makeRotation(90),vector));
    // drawVector(imgB, multiplyVector(makeShear(.5,.5),vector));
    //drawVector(imgB,multiplyVector(multiplyMatrix(multiplyMatrix(makeShift(.2,.3),makeRotation(20)),makeScale(.2,.7)),vector));
    drawVector(imgB,multiplyVector(multiplyMatrix(multiplyMatrix(makeScale(.2,.7),makeShift(.2,.3)),makeRotation(20)),vector));

}

function makeIdentity()
{
    return [[1,0,0],[0,1,0],[0,0,1]];
}

function makeShift(tX,tY)
{
    return [[1,0,tX],[0,1,tY],[0,0,1]];
}

function makeScale(sX,sY)
{
    return [[sX,0,0],[0,sY,0],[0,0,1]];
}

function makeRotation(angle)
{
    let rad = angle/180*Math.PI;
    return [[Math.cos(rad),-Math.sin(rad),0],[Math.sin(rad),Math.cos(rad),0],[0,0,1]];
}

function makeShear(ShX,ShY)
{
    return [[1,ShX,0],[ShY,1,0],[0,0,1]];
}

function multiplyVector(matrix, vector)
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
function multiplyMatrix(matrix,matrix2)
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
    return result;
}