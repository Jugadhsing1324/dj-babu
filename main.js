song="";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
scoreleftWrist=0;
scoreRightWrist=0;

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

        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score of the right wrist is = "+scoreRightWrist);
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

    if(scoreRightWrist>0.2){
        circle(rightWrist_x,rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y<=100){
            document.getElementById("speed").innerHTML="SPEED= 0.5X";
            song.rate(0.5);
        }
        else if(rightWrist_y>100 && rightWrist_y<=200){
            document.getElementById("speed").innerHTML="SPEED= 1X";
            song.rate(1);
        }
        else if(rightWrist_y>200 && rightWrist_y<=300){
            document.getElementById("speed").innerHTML="SPEED= 1.5X";
            song.rate(1.5);
        }
        else if(rightWrist_y>300 && rightWrist_y<=400){
            document.getElementById("speed").innerHTML="SPEED= 2X";
            song.rate(2);
        }
        else if(rightWrist_y>400 && rightWrist_y<=500){
            document.getElementById("speed").innerHTML="SPEED= 2.5X";
            song.rate(2.5);
        }
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