let last_x=-1;
let last_y=-1;
let size=512;

function setup()
{
    createCanvas(size,size);
    background(255);
}

function mouseDragged()
{
    if(mouseButton !== LEFT) return;
    if(last_x>0)
    {
        line(last_x,last_y,mouseX,mouseY);
    }
    last_x=mouseX;
    last_y=mouseY;
}

function mouseReleased()
{
    last_x=last_y=-1;
    if(mouseButton === RIGHT)
    {
        loadPixels();
        flood_fill(mouseX,mouseY);
        updatePixels();
    }
}

function set_pixel(x,y,c)
{
    let idx=(y*512+x)*4;
    pixels[idx]=-c;
    pixels[idx+1]=c;
    pixels[idx+2]=0;
    pixels[idx+3]=255;
}

function get_pixel(x,y)
{
    let idx=(y*512+x)*4;
    return pixels[idx];
}

function flood_fill(x,y)
{
     let stack=[];
     stack.push([x,y]);
     while(stack.length>0)
     {
         [x,y]=stack.pop();
         if(x<0 || x>size || y<0 || y>size) continue;
         let pixelColor = get_pixel(x,y);
         if(pixelColor!==255) continue;
         set_pixel(x,y,200);
         stack.push([x,y-1]);
         stack.push([x,y+1]);
         stack.push([x-1,y]);
         stack.push([x+1,y]);
     }
}
