//noprotect
    var x1,y1,x2,y2,x3,y3;
function setup()
{
    createCanvas(800,600);
    x1=Math.floor(width/2);
    y1=Math.floor(height*0.1);
    x2=Math.floor(width*0.2);
    y2=Math.floor(height*0.9);
    x3=Math.floor(width*0.8);
    y3=Math.floor(height*0.9);
    noLoop();

}
function draw()
{
    background(1);
    console.log(y1);
    stroke('white');
    point(x1,y1);
    point(x2,y2);
    point(x3,y3);
    var cx=x1,cy=y1;

    for (i=0; i<30000; i++)
    {
        n = Math.floor(random(0,3));
        switch (n)
        {
            case 0:
            {
                cx=Math.floor((cx+x1)/2);
                cy=Math.floor((cy+y1)/2);
                point(cx,cy);
                break;
            }
            case 1:
            {
                cx=Math.floor((cx+x2)/2);
                cy=Math.floor((cy+y2)/2);
                point(cx,cy);
                break;
            }
            default:
            {
                cx=Math.floor((cx+x3)/2);
                cy=Math.floor((cy+y3)/2);
                point(cx,cy);
                break;
            }
        }
    }
}