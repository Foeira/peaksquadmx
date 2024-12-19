// server.js
const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors());         // If needed for local dev
app.use(express.json()); // Parse JSON bodies

/**
 * Route 1: POST /api/appendSheet
 * For EscCard data: [Id, Name, Email, Date, People, Comment]
 */
app.post("/api/appendSheet", async (req, res) => {
  try {
    const { Id, Name, Email, Date, People, Comment } = req.body;

    // 1. Authenticate
    const auth = new google.auth.GoogleAuth({
      keyFilename: "credentials.json", // Path to your service account file
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // 2. Spreadsheet config
    const spreadsheetId = "1Hs67cKV9zx-OhVhO6LIZ-mqNf8yMJasEKV9prt1Soy0";
    const range = "trips!A:F"; // "contact" tab, columns A through F

    // 3. Append data
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[Id, Name, Email, Date, People, Comment]],
      },
    });

    res.json({ status: "success", message: "Data appended to spreadsheet" });
  } catch (error) {
    console.error("Error appending to spreadsheet:", error);
    res.status(500).json({ status: "error", message: error.toString() });
  }
});

/**
 * Route 2: POST /api/appendContact
 * For ContactForm data: [Name, Email, Comment]
 */
app.post("/api/appendContact", async (req, res) => {
  try {
    const { Name, Email, Comment } = req.body;

    // 1. Authenticate
    const auth = new google.auth.GoogleAuth({
      keyFilename: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // 2. Spreadsheet config
    const spreadsheetId = "1Hs67cKV9zx-OhVhO6LIZ-mqNf8yMJasEKV9prt1Soy0";
    const range = "contact!A:C"; // "contact" tab, columns A-C

    // 3. Append data
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[Name, Email, Comment]],
      },
    });

    res.json({ status: "success", message: "Contact data appended" });
  } catch (error) {
    console.error("Error appending contact data:", error);
    res.status(500).json({ status: "error", message: error.toString() });
  }
});

app.listen(1337, () => console.log("Server running on port 1337"));
