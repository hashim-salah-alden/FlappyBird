var myCanvas = document.getElementById('canvas'),
    ctx      = myCanvas.getContext("2d"),
    constant,
    gap = 85,
    bx = 60,
    by = 150,
    gravity = 1.5;

let bg = new Image(),
    bird = new Image(),
    fg = new Image(),
    pipeNorth = new Image(),
    pipeSouth = new Image();

// add the src to the images
    bg.src = "images/bg.png";
    bird.src = "images/bird.png";
    fg.src = "images/fg.png";
    pipeNorth.src = "images/pipeNorth.png";
    pipeSouth.src = "images/pipeSouth.png";

// array of pipes
let pipe = [];

pipe[0] = {
    x: myCanvas.width,
    y: 0
};

// create move up function
function moveUp() {
    by -= 25;
}

// call move up function when down key is pressed
document.addEventListener("keydown",moveUp)
// create the draw function
function draw(){

    ctx.drawImage(bg,0,0);


    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height + gap;

        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth , pipe[i].x, pipe[i].y + constant);
    
        pipe[i].x-- ;

        if(pipe[i].x == 100){

            pipe.push({
                    x: myCanvas.width,
                    y: Math.floor(Math.random() * pipeNorth.height) -pipeNorth.height
                })
            }; 

            // detect collision
            if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >=  myCanvas.height - fg.height){
                location.reload(); // reload the page
            }         
    }



    ctx.drawImage(fg, 0, myCanvas.height - fg.height);
    ctx.drawImage(bird, bx, by);

    by += gravity ;
    
    
    requestAnimationFrame(draw);
    

}

draw();






