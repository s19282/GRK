//noprotect
function setup()
{
    createCanvas(800,600);
    noLoop();
}
function draw()
{
    for(y=0; y<height*0.7; y++)
    {
        for(x=0; x<width; x++)
        {
            set(x,y,color(108, 250, 248));
        }
    }

    for(y=height*0.7; y<height; y++)
    {
        for(x=0; x<width; x++)
        {
            set(x,y,color(35, 209, 7));
        }
    }

    for(y=height*0.3; y<height*0.7; y++)
    {
        for(x=width*0.25; x<width*0.75; x++)
        {
            set(x,y,color(53, 19, 25));
        }
    }

    for(y=height*0.05,a=0; y<height*0.3; y++,a+=2)
    {
        for(x=width/2-a; x<width/2+a; x++)
        {
            set(x,y,color(193, 16, 51));
        }
    }

    for(i=0; i<1000; i++)
    {
        x = floor(random(0,width));
        y = floor(random(height*0.7,height));
        set(x,y,color("#"+floor(random()*256*256*256).toString(16)));
    }

    updatePixels();
}