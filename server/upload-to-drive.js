const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = '1cnUDaPgUsvgfF5xdGZFf1PTmOpu8_AG3';

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

async function uploadToDrive(filePath, fileName, mimeType) {
  const authClient = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileMetadata = {
    name: fileName,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log('da up anh len, id:', response.data.id);
}

module.exports = uploadToDrive;
