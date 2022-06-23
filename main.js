const express = require("express");
const fileUpload = require("express-fileupload");
const FormData = require("form-data");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(
  fileUpload({
    limits: { fileSize: 8 * 1024 * 1024 },
  })
);
app.use(cors());

const uploadToDiscord = async (file) => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhookUrl)
    throw new Error(
      'Please specify your discord webhook in .env file by "DISCORD_WEBHOOK_URL" key'
    );

  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((file, index) => {
      formData.append(`files[${index}]`, file.data, file.name);
    });
  } else {
    formData.append("file", file.data, file.name);
  }

  const { data } = await axios.post(discordWebhookUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data?.attachments?.length) throw new Error("No attachments found");

  return data?.attachments;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", async (req, res) => {
  try {
    if (!req.files?.file) {
      res.statusCode = 400;

      res.json({
        success: false,
        error: "Please specify files",
      });

      return;
    }

    const attachments = await uploadToDiscord(req.files.file);

    res.json({
      success: true,
      attachments,
    });
  } catch (err) {
    console.log(err);

    res.statusCode = 500;
    res.json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
