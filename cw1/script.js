//noprotect
function setup()
{
    createCanvas(800,600);
    noLoop();
}
function draw()
{
    for(y=0; y<height; y++)
    {
        for(x=0; x<width; x++)
        {
            dx=abs(x-width/2);
            dy=abs(y-height/2);
            d=sqrt(dx*dx+dy*dy)
            set(x,y,color(255-d,d,(x+y)/(width+height)*256));
        }
    }
    updatePixels();
}