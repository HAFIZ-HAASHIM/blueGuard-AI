// File: components/UploadImage.tsx
import { useState, ChangeEvent } from 'react';
import './UploadImage.css'; // Create this CSS file for styling

// Define a more specific type for the prediction results
interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

interface DetectionResult {
  predictions: Prediction[];
}

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDetect = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to get a response from the server.');
        }
        const data = await res.json();
        setResult(data.result || null);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <div className="uploader-container">
      <div className="controls">
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleDetect} disabled={!file || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Waste'}
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="content-area">
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="Uploaded" />

            {result?.predictions?.map((p, index) => {
              const boxStyle = {
                left: `${p.x - p.width / 2}px`,
                top: `${p.y - p.height / 2}px`,
                width: `${p.width}px`,
                height: `${p.height}px`,
              };
              return (
                <div key={index} className="bounding-box" style={boxStyle}>
                  <span className="label">
                    {p.class} ({(p.confidence * 100).toFixed(1)}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}