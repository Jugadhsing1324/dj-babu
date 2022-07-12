song="";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
scoreleftWrist=0;

function preload(){
    song=loadSound("Marshmello-Alone-Mybestfeelings.com_.mp3");
}

function setup(){
   canvas=createCanvas(600,500);
   canvas.center();

   video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("model is loaded!!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;

        console.log("leftWrist_x : "+leftWrist_x+"leftWrist_y : "+leftWrist_y);
        console.log("rightWrist_x : "+rightWrist_x+"rightWrist_y : "+rightWrist_y);

        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("score of the left wrist is = "+scoreleftWrist);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreleftWrist>0.2)
    {
    circle(leftWrist_x,leftWrist_y,20);
    InNumber_leftWrist_y=Number(leftWrist_y);
    remove_decimal=floor(InNumber_leftWrist_y);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="VOLUME= "+volume;

    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

 function pause(){
    song.stop();
 }