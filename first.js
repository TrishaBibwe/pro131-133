img="";
statusn="";
objects=[];

function preload(){
    img=loadImage("p1.jpg");
}

function setup(){
    canvas=createCanvas(550,400);
    canvas.position(510,200);
    
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}
function modelLoaded(){
     console.log("model loaded successfully");
     statusn=true;
     objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(img,0,0,550,400)
    if(statusn != ""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Objects Detected";
            fill("red");
            o_name=objects[i].label;
            o_acc=objects[i].confidence;
            o_height=objects[i].height;
            o_width=objects[i].width;
            o_x=objects[i].x;
            o_y=objects[i].y;
            o_percentage=floor(o_acc*100);
            text(o_name+" "+o_percentage+" %",o_x,o_y);
            noFill();
            stroke("red")
            rect(o_width,o_height,o_x-80,o_y-80);
        }
    }

}