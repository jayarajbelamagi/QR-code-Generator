import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        message: "Type your URL",
        name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL; // Ensure the case matches the name defined in the prompt
    try {
      // Generate QR code image
      const qr_svg = qr.image(url, { type: 'png' });

      // Save to file
      const outputStream = fs.createWriteStream('qr_img.png');
      qr_svg.pipe(outputStream);

      // Logging to verify the QR code is being written
      outputStream.on('finish', () => {
        console.log('QR code generated successfully as qr_img.png');
      });

    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });
