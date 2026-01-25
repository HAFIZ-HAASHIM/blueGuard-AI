// File: pages/api/detect.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('API route /api/detect hit!');
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

  // Get credentials from environment variables
  const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
  const ROBOFLOW_WORKFLOW_ID = process.env.ROBOFLOW_WORKFLOW_ID;

  console.log('ROBOFLOW_API_KEY_LENGTH:', ROBOFLOW_API_KEY?.length);
  console.log('ROBOFLOW_WORKFLOW_ID:', ROBOFLOW_WORKFLOW_ID);

  if (!ROBOFLOW_API_KEY || !ROBOFLOW_WORKFLOW_ID) {
    return res.status(500).json({ error: "Roboflow credentials are not configured." });
  }

  // Get the image data from the frontend's request
  const { imageBase64 } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: 'No image data provided.' });
  }

  try {
    const apiUrl = `https://serverless.roboflow.com/infer/workflows/${ROBOFLOW_WORKFLOW_ID}`;

    const apiRequestBody = {
      api_key: ROBOFLOW_API_KEY,
      inputs: {
        image: {
          type: "base64",
          value: imageBase64,
        },
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiRequestBody),
    });

    if (!response.ok) {
      let details: any = null;
      try { details = await response.json(); } catch {}
      const message = details?.message || details?.error || response.statusText || 'Unknown Roboflow error';
      throw new Error(`Roboflow API Error: ${message}`);
    }

    const rf = await response.json();
    console.log('Roboflow API Raw Result:', JSON.stringify(rf, null, 2));

    // Normalize predictions shape to always be { predictions: [...] }
    let predictions: any[] | null = null;
    let image: { width: number; height: number } | undefined;
    // 1) Workflow: { result: { result: [ { predictions: [...] } ] } }
    if (rf?.result?.result?.[0]?.predictions) {
      predictions = rf.result.result[0].predictions;
    }
    // 2) Array in result
    else if (Array.isArray(rf?.result) && rf.result[0]?.predictions) {
      predictions = rf.result[0].predictions;
    }
    // 2b) Serverless outputs array: { outputs: [ { predictions: { image: {width,height}, predictions: [...] } } ] }
    else if (rf?.outputs?.[0]?.predictions?.predictions) {
      predictions = rf.outputs[0].predictions.predictions;
      if (rf.outputs[0].predictions.image?.width && rf.outputs[0].predictions.image?.height) {
        image = {
          width: rf.outputs[0].predictions.image.width,
          height: rf.outputs[0].predictions.image.height,
        };
      }
    }
    // 3) Direct predictions
    else if (rf?.predictions) {
      predictions = rf.predictions;
    }

    if (!predictions) {
      console.error('Unable to parse predictions from Roboflow response.');
      return res.status(502).json({ error: 'Invalid Roboflow response: predictions not found', raw: rf });
    }

    res.status(200).json({ predictions, image });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('API Route Error:', errorMessage);
    res.status(500).json({ error: 'Failed to detect objects.', details: errorMessage });
  }
}

// Set a body size limit to handle Base64 image data
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};