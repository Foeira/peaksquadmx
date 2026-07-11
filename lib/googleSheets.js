import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function writeToCells(range, values) {
  const request = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [values] },
  };
  const response = await sheets.spreadsheets.values.update(request);
  return response.data;
}