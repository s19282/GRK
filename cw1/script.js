//noprotect
function setup()
{
    createCanvas(1400,750);
    noLoop();
}
function draw()
{
    background(1);
    for(y=0; y<height; y++)
    {
        for(x=0; x<width; x++)
        {
            set(x,y,color(255,0,255));
            console.log((y));
        }
    }
    updatePixels();
}