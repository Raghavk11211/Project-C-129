harryPotter = "";
peterPan = "";
peterPanStatus = "";
harryPotterStatus = "";
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    peterPan = loadSound("peter_pan.mp3");
    harryPotter = loadSound("Harry Potter Theme Song.mp3");
}

function setup() {
    canvas = createCanvas(500,350);
    canvas.center();
    canvas.position(400,150)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0,0,500,400);

    fill('#FF0000');
    stroke('#FF0000');

    harryPotterStatus = harryPotter.isPlaying();

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        peterPan.stop();
        if(harryPotterStatus == false) {
            harryPotter.play();
            document.getElementsById("song_name").innerHTML = "Harry Potter Theme";
        }
    }
}
