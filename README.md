# 📄 Download Protected PDF from Google Drive (Google Docs)



## ✅ Step-by-Step Guide (All Devices)

### 🖥 For Desktop (Windows, macOS, Linux)

#### 📌 Step 1: Open the Document
- Go to [docs.google.com](https://docs.google.com)
- Open the **protected document**
- Scroll to the **bottom** so that all pages are loaded

#### 📌 Step 2: Open Developer Tools

| Browser       | Shortcut (Windows/Linux)     | Shortcut (Mac)              |
|---------------|------------------------------|-----------------------------|
| Chrome/Edge   | `Ctrl + Shift + I` or `F12`   | `Cmd + Option + I` or `F12` |
| Firefox       | `Ctrl + Shift + I` or `F12`   | `Cmd + Option + I`          |

➡️ Then click the **Console** tab

#### 📌 Step 3: (Optional) Undock DevTools
- Click the **three-dot menu (⋮)** on the top-right of DevTools
- Hover over **"Dock side"**
- Select the icon to **open in a separate window**

#### 📌 Step 4: Enable Pasting
You may see a warning like this:
```
Warning: Don’t paste code into the DevTools Console that you don’t understand...
Please type ‘allow pasting’ below and press Enter to allow pasting.
```
- Type:
```js
allow pasting
```
- Press `Enter`

#### 📌 Step 5: Paste the Script
- Paste the script into the Console
```js
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
```
- Press `Enter` to execute

---

### 📱 For Mobile Devices (Android/iOS)

#### ⚠️ DevTools are not supported in mobile browsers

Use one of the following options:

#### Option 1: Use a Desktop or Laptop  
Best and most reliable method.

#### Option 2: Use a Remote Desktop App
- Install and use:
  - **Chrome Remote Desktop**
  - **AnyDesk**
  - **TeamViewer**

#### Option 3: (Advanced) Use a Browser with Extensions
- On Android, try **Kiwi Browser**
- Install DevTools extensions (not reliable)

---

## 🛠 Need a Script?

Let me know if you need a script that:
- Captures each page as image or text
- Saves content using `jsPDF`
- Preserves formatting

---

## 🎉 You're Done!
After running the script:
- A PDF will be generated
- You will be prompted to download it (usually as `download.pdf`)
- You can Named on you own word.
- Now It is ready to use.
  
