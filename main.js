song = " ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song_to_play = "";
scoreLeftWrist = 0;
status = "";



function preload(){
        
    song = loadSound("music.mp3");
    }


function play(){
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
    


function stop(){
    song.stop();
}

function setup(){
    canvas = createCanvas( 800, 800);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
}

function modelLoaded() {
    console.log("PoseNet is Initialized")
    poseNet.on('pose', gotPoses)
}

function draw(){
    image(video, 0, 0, 800, 800);

    fill('#FF0000');
    stroke('FF0000');

    if (scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(leftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

    circle(rightWristX, rightWristY, 20)

    if (scoreRightWrist > 0.2){

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5);
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1.0x"
            song.rate(1.0);
        }

        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5);
        }

        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2.0x"
            song.rate(1.5);
        }

        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(1.5);
        }
}
}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The score of the Left Wrist is " + scoreLeftWrist + " And the score of the right wrist is " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("The X Coordinate of Left Wrist = " + leftWristX + " and the Y Coordinate Is" + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("The X Coordinate of Right Wrist = " + rightWristX + "and the Y Coordinate Is" + rightWristX);

    }
}