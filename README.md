# discord-storage

Free unlimited file hosting using Discord

## Installation

```bash
git clone https://github.com/hoangvu12/discord-storage
cd discord-storage
yarn install
```

## Start the server

1. Create `.env` file, paste in your discord webhook url (look `.env.example` for example).
2. Run `yarn dev` for development or `yarn start` to start the server (or use npm)
3. Your server is up running on port 3000

## Result

```json
{
  "success": true,
  "attachments": [
    {
      "id": "989360005578883143",
      "filename": "2308-cute-anime-girl.png",
      "size": 7938,
      "url": "https://cdn.discordapp.com/attachments/989344480966627378/989360005578883143/2308-cute-anime-girl.png",
      "proxy_url": "https://media.discordapp.net/attachments/989344480966627378/989360005578883143/2308-cute-anime-girl.png",
      "width": 256,
      "height": 256,
      "content_type": "image/jpeg"
    },
    {
      "id": "989360005838950410",
      "filename": "peakpx_2.jpg",
      "size": 12553,
      "url": "https://cdn.discordapp.com/attachments/989344480966627378/989360005838950410/peakpx_2.jpg",
      "proxy_url": "https://media.discordapp.net/attachments/989344480966627378/989360005838950410/peakpx_2.jpg",
      "width": 1000,
      "height": 563,
      "content_type": "image/jpeg"
    }
  ]
}
```

## Usage

### Upload one file

```js
const photo = document.getElementById("image-file").files[0];

const formData = new FormData();

formData.append("file", photo);

fetch("/upload", { method: "POST", body: formData });
```

### Upload files

```js
const images = document.getElementById("image-file").files;

const formData = new FormData();

images.forEach((image) => {
  formData.append("file", image);
});

fetch("/upload", { method: "POST", body: formData });
```

### Upload with an url

```js
const formData = new FormData();

formData.append("url", "https://example.com/image.jpg");

fetch("/upload", { method: "POST", body: formData });
```

### Upload with urls

```js
const urls = [
  "https://example.com/image.jpg",
  "https://example.com/image.png",
  "https://example.com/rickroll.png",
];

const formData = new FormData();

urls.forEach((url) => {
  formData.append("url", url);
});

fetch("/upload", { method: "POST", body: formData });
```
