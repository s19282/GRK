function preload()
{
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup()
{
    createCanvas(256,512);
    img.resize(256,256);
    img.filter('gray');
    img.loadPixels();

    let arr = new Array(256);
    arr.fill(0);

    for (x = 0; x < img.width; x++)
    {
        for(y=0; y < img.height; y++)
        {
            pos=4*(y*img.width+x);
            arr[img.pixels[pos]]++;
        }
    }
    background('white');
    stroke('gray');

    for(i=0; i<arr.length; i++)
    {
        y2 = arr[i]/Math.max(...arr)*256*10;
        line(i,255,i,256-y2);
    }
    image(img,0,256);
}