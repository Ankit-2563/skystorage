// Load the AWS SDK for JavaScript
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  endpoint: "https://s3.wasabisys.com",
  accessKeyId: "VWIJ5JY1BT1TIDRISGWH",
  secretAccessKey: "ePCDQg3TIKeAdBP38mVzMOnYB5ev9pwWNWCjFJBU",
});

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload");
    return;
  }

  const key = `uploads/${file.name}`;

  try {
    // Upload file to Wasabi
    const params = {
      Bucket: "skystorage",
      Key: key,
      Body: file,
      ACL: "public-read", // Optionally set the access control list
    };

    const data = await s3.upload(params).promise();

    // File uploaded successfully
    alert("File uploaded successfully!");

    // Log the URL of the uploaded file
    console.log("File URL:", data.Location);
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file. Please try again later.");
  }
}
