// https://docs.microsoft.com/en-us/azure/cognitive-services/face/concepts/face-recognition
// https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/node

"use strict";
require("dotenv").config();

const axios = require("axios").default;

// Add a valid subscription key and endpoint to your environment variables.
let subscriptionKey = process.env["FACE_SUBSCRIPTION_KEY"];
let endpoint = process.env["FACE_ENDPOINT"] + "/face/v1.0/detect";

// Optionally, replace with your own image URL (for example a .jpg or .png URL).
let imageUrl = "https://www.concordia.ca/cunews/main/stories/2019/05/10/2019-person-of-the-year-awards-gala-lino-saputo-jr-receives-the-top-honour/_jcr_content/parsys/image.img.jpg/1557429810479.jpg"
// let imageUrl = "https://www.statnews.com/wp-content/uploads/2020/01/STAT_Wuhan_Chicago_Coronavirus_AP_20024618829122-645x645.jpg"
// let imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg";

// Send a POST request
axios({
	method: "post",
	url: endpoint,
	params: {
		returnFaceId: true,
		returnFaceLandmarks: false,
		returnFaceAttributes:
			"age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
	},
	data: {
		url: imageUrl,
	},
	headers: { "Ocp-Apim-Subscription-Key": subscriptionKey },
})
	.then(function (response) {
		console.log("Status text: " + response.status);
		console.log("Status text: " + response.statusText);
		console.log();
		//console.log(response.data)
		response.data.forEach((face) => {
			console.log("Face ID: " + face.faceId);
			console.log(
				"Face rectangle: " +
					face.faceRectangle.top +
					", " +
					face.faceRectangle.left +
					", " +
					face.faceRectangle.width +
					", " +
					face.faceRectangle.height
			);
			console.log("Smile: " + face.faceAttributes.smile);
			console.log(
				"Head pose: " + JSON.stringify(face.faceAttributes.headPose)
			);
			console.log("Gender: " + face.faceAttributes.gender);
			console.log("Age: " + face.faceAttributes.age);
			console.log(
				"Facial hair: " + JSON.stringify(face.faceAttributes.facialHair)
			);
			console.log("Glasses: " + face.faceAttributes.glasses);
			console.log("Smile: " + face.faceAttributes.smile);
			console.log(
				"Emotion: " + JSON.stringify(face.faceAttributes.emotion)
			);
			console.log("Blur: " + JSON.stringify(face.faceAttributes.blur));
			console.log(
				"Exposure: " + JSON.stringify(face.faceAttributes.exposure)
			);
			console.log("Noise: " + JSON.stringify(face.faceAttributes.noise));
			console.log(
				"Makeup: " + JSON.stringify(face.faceAttributes.makeup)
			);
			console.log(
				"Accessories: " +
					JSON.stringify(face.faceAttributes.accessories)
			);
			console.log("Hair: " + JSON.stringify(face.faceAttributes.hair));
			console.log();
		});
	})
	.catch(function (error) {
		console.log(error);
	});
