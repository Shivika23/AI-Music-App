song_one = ""
song_two = ""

song_one_status = ""
song_two_status = ""

score_right = 0;
score_left = 0;

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

        score_right = results[0].pose.keypoints[10].score
        score_left = results[0].pose.keypoints[9].score
    }
}

function draw() {
    image(camera, 0, 0, 500, 400)

    fill("red")
    stroke("red")

    song_one_status = song_one.isPlaying()
    song_two_status = song_two.isPlaying()

    if (score_right > 0.2) {
        circle(rwrist_x, rwrist_y, 20)
        song_one.stop()

        if (song_two_status == false) {
            song_two.play()
            document.getElementById("song_name").innerHTML= "Playing Believer by Imagine Dragons......"

        }
    }

    if (score_left > 0.2) {
        circle(lwrist_x, lwrist_y, 20)
        song_two.stop()

        if (song_one_status == false) {
            song_one.play()
            document.getElementById("song_name").innerHTML= "Playing Shape of You by Ed Sheeran......"

        }
    }
}