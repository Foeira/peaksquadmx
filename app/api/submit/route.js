import { appendToSheet } from '../../../lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cardId, userData } = req.body; // Expecting data from modal

    // Validate input
    if (!cardId || !userData) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Prepare row for sheet: [timestamp, cardId, ...other fields]
    const timestamp = new Date().toISOString();
    const row = [timestamp, cardId, ...Object.values(userData)];

    await appendToSheet(row);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save data' });
  }
}