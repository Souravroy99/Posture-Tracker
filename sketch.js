let capture;
let posenet = null ;
let singlePose = null, skeleton = null ;

function setup() {
  createCanvas(800, 700);

  capture = createCapture(VIDEO);
  capture.size(800, 700);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', receivedPoses);
}

function modelLoaded() {
  console.log('Model has loaded');
}

function receivedPoses(poses) {
  console.log(poses);

    if(poses.length > 0) // Atleast 1 skeleton
    {
        singlePose = poses[0].pose
        skeleton = poses[0].skeleton
    }
}

function draw() {
  image(capture, 0, 0, width, height);

    if(singlePose)
    {
        for(let i=0; i<singlePose.keypoints.length; i++)
        {
            let xAxis = singlePose.keypoints[i].position.x 
            let yAxis = singlePose.keypoints[i].position.y 
            let score = singlePose.keypoints[i].score
            let radius = 25
            
            if(score < 0.3) continue ; // Accuracy
            
            if(i >= 5) 
            {
                radius = 40
                fill(255, 255, 0)
            }
            else {
                fill(255, 0, 0)
            }

            ellipse(xAxis, yAxis, radius)
        }

        stroke(255, 0, 255)
        strokeWeight(5)

        for(let i=0 ; i<skeleton.length; i++)
        {
            let xAxis_from = skeleton[i][0].position.x
            let yAxis_from = skeleton[i][0].position.y
            
            let xAxis_to = skeleton[i][1].position.x
            let yAxis_to = skeleton[i][1].position.y

            line(xAxis_from, yAxis_from, xAxis_to, yAxis_to)
        }
    }
}




















/* 
// 1.) Point
// point(200, 200)

// 2.) Line
// line(200, 200, 300, 300)

// 3.) Triangle
// triangle(100, 200, 300, 400, 100, 400)

// 4.) Rectangle
// rect(200, 200, 300, 200)

// 5.) Circle
// ellipse(200, 200, 100, 100)
*/