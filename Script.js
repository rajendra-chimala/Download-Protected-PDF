let jsPdfScriptURL;

// Create a Trusted Types policy if supported
if (window.trustedTypes && trustedTypes.createPolicy) {
    const jsPdfPolicy = trustedTypes.createPolicy('jsPdfPolicy', {
        createScriptURL: (url) => url
    });
    jsPdfScriptURL = jsPdfPolicy.createScriptURL('https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js');
} else {
    jsPdfScriptURL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js';
}

// Dynamically load the jsPDF library
const jsPdfScript = document.createElement("script");

jsPdfScript.onload = function () {
    const pdf = new jsPDF();
    const images = document.getElementsByTagName("img");

    for (let index = 0; index < images.length; index++) {
        const image = images[index];

        if (!/^blob:/.test(image.src)) continue;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imageData, 'JPEG', 0, 0);

        if (index !== images.length - 1) {
            pdf.addPage();
        }
    }

    pdf.save("download.pdf");
};

jsPdfScript.src = jsPdfScriptURL;
document.body.appendChild(jsPdfScript);
