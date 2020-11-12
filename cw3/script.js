let x0=-1;
let y0=-1;
let x1=-1;
let y1=-1;
let size=512;

function preload()
{

}

function setup()
{
    createCanvas(size,size);
    background(255);
}

function mousePressed()
{
    x0=mouseX;
    y0=mouseY;
}

function mouseDragged()
{
    x1=mouseX;
    y1=mouseY;
    background(255);
    noStroke();
    fill('red');
    ellipse(x0-3,y0-3,6);
    fill('green');
    ellipse(x1-3,y1-3,6);
}

function mouseReleased()
{
    background(255);
    loadPixels();
    draw_line();
    updatePixels();
}

function set_pixel(x,y,c)
{
    idx=(y*512+x)*4;
    pixels[idx]=-c;
    pixels[idx+1]=c;
    pixels[idx+2]=0;
    pixels[idx+3]=255;
}

function draw_line()
{
    let dx=x1-x0;
    let dy=y1-y0;

    for(let i=0; i<size; i++)
    {
        for(let j=0; j<size; j++)
        {
            set_pixel(i,j,dy/dx*(i-x0) - (j-y0));
        }
    }

}