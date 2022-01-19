import { google } from 'googleapis';
import * as fs from 'fs';

// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   authorize(JSON.parse(content), writeData);
// });

export async function writeData(sheetID: string, range: string, data: any[][]) {
  const auth = new google.auth.JWT({
    email: 'onemedical@local-alignment-301209.iam.gserviceaccount.com',
    key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD9B7gUfkCxlAbv\neemqILh8S3eCB/K4nBrqYLUFSly4QjkonObwbaKs/loUEsc3Gs8fLHAIRlbY/Qj1\n/iX6U8eM75nwM85Yqqk03OlKr9Q8IgBwIajPUZFIwGODnxsrIOA+FW8TphODusFh\nqdU7VWSB8inwWKxAozQI8lO3P5mnsqrJ7ngpywogbjcvaPQVsk8jvJOOn81CWBFj\nkmDxJMrY45IFAsWqsykgcjNKTxODCePWU/PI6pj08bKEuzXDErEGFtgqYGEkbpSp\n+5Af1GQMwKokTwaX4xZuAVxhuICc+vX1Fs6Hh+HOoUa9voBr2QTE6KAiolrJpmFc\nmFj2/T/9AgMBAAECggEAAlkvPe9zCcLiMphK0SOnGq43oHsS52A5hrnZjEBFrocc\n0THtmccmtpzQuLV46FvFFti6fHUsqqxkiCXw88sRw87Yeqh8bom88srnFmSd32YA\nY4oIb04mP0rb0ZWpMqQGOMVJp+DHdxZFY7LoEfonqeYVug+Un6/0FG4tVTrPogUL\ng9I68gen32/oCc0jLsCQvNxVEcrPOdwDeEbBSqFwsiJRAL7guirQACHmvwqWSh77\nnmcEpRLK3pJjLWCAArj2eALFW4OvChrNCPgmrDv2+j3uHKkLTaYzK8N+GSO8YTIm\nge//bFWyCTU6NMlb7TvnZwN1lpy7e6NtrZE2vDv0KQKBgQD+0D0x3ILq50nhj3t2\nNqGE9NEcXzxm6VvAOu5Lhd3lPCjj4r+bVsY/TCACEdAsgZWXeXOKJ3YzigXvHgXw\n64sS5DHtIdYMkVJl3VIEWCLAroZX0SyKTWIcp4/WyULFnRNojRaBfvL2LLFHMP4+\nwsUvPjQo+SFqXdwTG7PIAAu+1QKBgQD+NVqr8KVIUzljiBL06+c7blaA6wvZYxdT\nPxA4nFEtIWgGYyDFFlrnHek73zvyztWGmQE4qjbd2KmUkoKZqSOUCtr6Rn9dZZ33\nIS5GEUo5HT2lGEBHLccFyRw/JdcM/qETGo6d6bPN5WC5kp2nlFCy8Y+zbEnee5xL\n8MLEwTOgiQKBgFme0AcbcYhA9ME6f8fiCwkCOhHqhQoFBVok3+78FEEt2YvdElsG\nOA/HLHLN5RPiN8Tg2Hw8yNvzrYaeXqSPk4h/bffjMK+W5Q4iu1f/z6lJOMLmNO4n\nrVw6quJ2Qt/SESNyi/nbtoRSz78kQie8xTGKhTnr9Y69mEu4MJElQvxJAoGAeMmZ\nP8Gkh20kA6sQdtfwk0imSbNlefGfj6qTZpK/75XD++T2GS+6Gb8Yp542ufSVeNMS\nxX37fAYK7dF/xMudYCaYTftZYWN7X4WgmyJ0BhdixyNyx191Bca9aTPtrvr+RjmE\nMnxtNxQalZKY3puWjLBC+5okr1ZEucC4iwzSHyECgYEAzCua+Hlh7Jdsqyw5LaGf\nhnn56wj4pmvIHLUwY1tzuvOr+7rYzlm3WA9dWnmlowvr/ihVgQRYD03EASRdF03o\nUPCmFjLSkZGYFw9wx6Eu1tGmv65WAZffXK/r6X3uyTVE4tuJtbfyvNpKglSudNdE\n/EqwltE+85GlaIr79+VhIRA=\n-----END PRIVATE KEY-----\n',
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
