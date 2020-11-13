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
    let dx=Math.abs(x1-x0);
    let dy=Math.abs(y1-y0);
    let changed = false;
    if(!(dy<dx)) {
        changed = true;
        [x0,y0] = [y0,x0];
        [x1,y1] = [y1,x1];
        [dx,dy] = [dy,dx];
    }
    let dp=2*dy-dx;
    let deq=2*dy;
    let dinc=2*dy-2*dx;
    let d=dp;
    let y=y0;
    let step=1;
    if(!(x0<x1)) step=-1;

    for(let x=x0; x!==x1; x+=step)
    {
        changed?set_pixel(y,x,0):set_pixel(x,y,0);
        if(d<0)
            d+=deq;
        else
        {
            d+=dinc;
            y0<y1?y++:y--;
        }
    }
}
