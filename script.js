let uploadedImageFile = null;

// Preview Uploaded Image
function previewImage() {
  const input = document.getElementById('uploadInput');
  const file = input.files[0];

  if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
    uploadedImageFile = file;
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('uploadedImage').src = e.target.result;
    }
    reader.readAsDataURL(file);
  } else {
    alert("Please upload an image less than 5MB.");
    input.value = "";
  }
}

// Enhance Image Using DeepAI API
async function enhanceImage() {
  if (!uploadedImageFile) {
    alert("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append('image', uploadedImageFile);

  try {
    const response = await fetch('https://api.deepai.org/api/torch-srgan', {
      method: 'POST',
      headers: {
        'Api-Key': '3e262de2-37fa-401c-abff-083abae8d5d1' // 
      },
      body: formData
    });

    const data = await response.json();
    console.log(data);

    if (data.output_url) {
      document.getElementById('enhancedImage').src = data.output_url;
      document.getElementById('downloadBtn').href = data.output_url;
    } else {
      alert("Failed to enhance image. Try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while enhancing the image.");
  }
}
