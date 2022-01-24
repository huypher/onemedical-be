import { google } from 'googleapis';

export async function writeData(sheetID: string, range: string, data: any[][]) {
  const auth = new google.auth.JWT({
    email: process.env.SHEET_EMAIL,
    key: process.env.SHEET_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheet = google.sheets('v4');
  await sheet.spreadsheets.values.append(
    {
      spreadsheetId: sheetID,
      auth: auth,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: data,
      },
    },
    (err, result) => {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log(
          '%d cells updated on range: %s',
          result.data.updates.updatedCells,
          result.data.updates.updatedRange,
        );
      }
    },
  );
}
