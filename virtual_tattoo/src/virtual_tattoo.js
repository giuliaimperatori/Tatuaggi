let catattoo


async function preload(){
	
	catattoo = loadImage("./cat_tattoo.png");
	

}

async function setup() {
	createCanvas(windowWidth, windowHeight)
	fullscreen(true)
	capture = createCapture(VIDEO)
	capture.size(640, 480)
	capture.hide()

	console.log("Carico modello...")
	detector = await createDetector()
	console.log("Modello caricato.")

}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
async function draw() {	
	background(255)

	const larghezza = min(width, height)
	const altezza = larghezza / 3.5

	// Disegna la webcam sullo stage, a specchio
	push()
	scale(-1, 1)
	image(capture, -640, 0)
	pop()

if (detector && capture.loadedmetadata) {
		
		const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })

		if (hands.length == 1) {
		
			const mano = hands[0]
	
			//const noccaindice = mano.keypoints[5]
			//const noccamedio  = mano.keypoints[9]
			//const noccaanulare  = mano.keypoints[13]
			//const noccamignolo  = mano.keypoints[17]
            const polso = mano.keypoints [0]
            //const indice = mano.keypoints [8]
            //const medio = mano.keypoints [12]

			push()
			
			image(catattoo, polso.x-20, polso.y)
			scale (0.5, 0.5)
			//image(catattoo, indice.x-20, indice.y-20)
			pop()		
            
            pop()
	
        }
}
}
async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 1,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
