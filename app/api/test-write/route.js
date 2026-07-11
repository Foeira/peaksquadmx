import { writeToCells } from '../../../lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Write test data to A1:C1
    await writeToCells('Sheet1!A1:C1', ['Alice', 'Smith', 'alice@example.com']);
    return NextResponse.json({ success: true, message: 'Written to A1:C1' });
  } catch (error) {
    console.error('Error writing to sheet:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}