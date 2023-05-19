song_one= ""
song_two= ""

rwrist_x = 0;
rwrist_y = 0;

lwrist_x = 0;
lwrist_y = 0;

function preload() {
    song_one = loadSound("Shape_of_you.mp3")
    song_two = loadSound("Believer.mp3")
}

function setup() {
    canvas = createCanvas(500, 400)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()

    poseNet = ml5.poseNet(camera, model_loaded)
    poseNet.on('pose', gotPoses)
}

function model_loaded() {
    console.log("Model Loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        lwrist_y = results[0].pose.leftWrist.y
        lwrist_x = results[0].pose.leftWrist.x

        rwrist_y = results[0].pose.rightWrist.y
        rwrist_x = results[0].pose.rightWrist.x
    }
}

function draw() {
    image(camera, 0, 0, 500, 400)
}
