// pages/api/extract-text.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ExtractedData {
  gender: string;
  age: string;
  location: string;
  [key: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    const [fields, files] = await form.parse(req);
    
    const documentFile = files.document?.[0];
    
    if (!documentFile) {
      throw new Error('No file uploaded');
    }

    const filePath = documentFile.filepath;

    const { stdout, stderr } = await execAsync(
      `python extract_text.py "${filePath}"`
    );

    if (stderr) {
      console.error('Python script error:', stderr);
      throw new Error('Failed to process document');
    }

    const extractedData = JSON.parse(stdout) as ExtractedData;

    // Clean up temporary file
    fs.unlinkSync(filePath);

    return res.status(200).json(extractedData);
  } catch (error) {
    console.error('Error processing document:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to process document' 
    });
  }
}