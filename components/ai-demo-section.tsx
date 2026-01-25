"use client"

import React, { useState, useCallback, useRef, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Zap, CheckCircle, AlertCircle, ImageIcon } from "lucide-react"
import GoogleMap from "@/components/GoogleMap"

  // Recycling suggestions by class label
  const recyclingTips: Record<string, string> = {
    plastic:
      "Plastics can be sorted by resin codes (PET, HDPE, PP). Industrial recycling includes shredding, washing, melting, and pelletizing into recycled resin for new packaging or textiles.",
    paper:
      "Paper and cardboard are pulped, screened, de-inked, and pressed into new paper products. Keep materials dry and free of food contamination for higher yield.",
    glass:
      "Glass is cleaned, sorted by color, crushed into cullet, and re-melted to form new bottles or fiberglass. Color sorting improves product quality.",
    metal:
      "Metals are magnetically or eddy-current separated, shredded, melted in furnaces, and cast into billets or sheets for manufacturing.",
    aluminum:
      "Aluminum is shredded, de-coated, and re-melted. It retains properties indefinitely and saves ~95% energy vs. virgin production.",
    organic:
      "Organics are composted or anaerobically digested to produce compost or biogas. Pre-sorting removes contaminants.",
    textile:
      "Textiles can be mechanically shredded into fibers or chemically recycled (e.g., PET, cellulose) to yarns; quality improves with single-fiber streams.",
    rubber:
      "Rubber (e.g., tires) is shredded, steel and fiber removed; crumb rubber used in asphalt, mats, and molded goods.",
    e_waste:
      "E-waste requires disassembly, hazardous component removal, and material recovery (metals, plastics) in certified facilities.",
  };

  

  const classDisplayMap: Record<string, string> = {
    plastic: "Plastic",
    paper: "Paper",
    glass: "Glass",
    metal: "Metal",
    aluminum: "Aluminum",
    organic: "Organic",
    textile: "Textile",
    rubber: "Rubber",
    e_waste: "E-waste",
  };

  const buildMapsLink = (lat: number, lng: number, label?: string) => {
    const q = encodeURIComponent(`${lat},${lng}${label ? ` (${label})` : ""}`);
    return `https://www.google.com/maps?q=${q}&z=15`;
  };


interface DetectionResult {
  class: string
  confidence: number
  bbox: [number, number, number, number]
  color: string
}

export function AIDemoSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const [detectionResults, setDetectionResults] = useState<any>(null); 
  const [apiImageDims, setApiImageDims] = useState<{ width: number; height: number } | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const [isAnalyzing, setIsAnalyzing] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [locStatus, setLocStatus] = useState<string | null>(null);

  // Promise-based geolocation to await location before sending alerts
  const getLocationAsync = (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !navigator?.geolocation) return resolve(null);
      setLocStatus('requesting');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(loc);
          setLocStatus('granted');
          resolve(loc);
        },
        (err) => {
          console.warn('Geolocation denied/unavailable:', err?.message || err);
          setLocStatus('denied');
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  // Request geolocation on mount so we can include it in the alert message
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setLocStatus('granted')
        },
        (err) => {
          console.warn('Geolocation denied/unavailable:', err?.message || err);
          setLocStatus('denied')
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  const getLocationNow = () => {
    if (typeof window !== 'undefined' && navigator?.geolocation) {
      setLocStatus('requesting')
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setLocStatus('granted')
        },
        (err) => {
          console.warn('Geolocation denied/unavailable:', err?.message || err);
          setLocStatus('denied')
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const sendTwilioAlert = async (text: string) => {
    try {
      setSendStatus("sending");
      setSendError(null);
      const resp = await fetch("/api/notify-twilio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (resp.ok) {
        setSendStatus("sent");
      } else {
        const body = await resp.json().catch(() => ({}));
        console.warn("Twilio send error:", body);
        setSendStatus("error");
        setSendError(typeof body === 'string' ? body : JSON.stringify(body));
      }
    } catch (e) {
      console.warn("Twilio send error", e);
      setSendStatus("error");
      setSendError(e instanceof Error ? e.message : 'Unknown error');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string); 
        setDetectionResults(null); 
      }; 
      reader.readAsDataURL(file); 
    } 
  }; 

  const runAIDetection = async () => { 
    console.log('Attempting to run AI detection...'); 
    if (!selectedImage) return; 

    setIsAnalyzing(true); 
    setDetectionResults(null); 
    setErrorMessage(null);

    try { 
      const imageToSend = selectedImage.split(",")[1];
      console.log('Image Base64 (first 50 chars): ', imageToSend.substring(0, 50));
      console.log('Image Base64 length:', imageToSend.length);

      const response = await fetch("/api/detect", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ imageBase64: imageToSend }),
      }); 

      if (!response.ok) { 
        const errorBody = await response.json(); 
        console.error(`Client-side: HTTP error! status: ${response.status}`, errorBody); 
        throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorBody)}`); 
      } 

      const data = await response.json();
      console.log('Roboflow API response (client):', data);

      // Try multiple known shapes for Roboflow/workflow responses
      let roboflowPredictions: any[] | null = null;
      // Prefer normalized API shape first
      if (Array.isArray(data?.predictions)) {
        roboflowPredictions = data.predictions;
        if (data.image?.width && data.image?.height) {
          setApiImageDims({ width: data.image.width, height: data.image.height });
        } else {
          setApiImageDims(null);
        }
      }
      // 1) Workflow: { result: { result: [ { predictions: [...] } ] } }
      else if (data?.result?.result?.[0]?.predictions) {
        roboflowPredictions = data.result.result[0].predictions;
      }
      // 2) Sometimes forwarded as { result: [ { predictions: [...] } ] }
      else if (Array.isArray(data?.result) && data.result[0]?.predictions) {
        roboflowPredictions = data.result[0].predictions;
      }
      // 3) Direct predictions
      else if (data?.predictions) {
        roboflowPredictions = data.predictions;
      }

      if (!roboflowPredictions) {
        throw new Error('Could not parse predictions from API response.');
      }

      const summary: { [key: string]: number } = {};
      roboflowPredictions.forEach((p: any) => {
        summary[p.class] = (summary[p.class] || 0) + 1;
      });

      const resultsPayload = {
        predictions: roboflowPredictions,
        summary: summary,
      };
      setDetectionResults(resultsPayload);

      // Build alert message and ensure we include current location automatically
      if (roboflowPredictions && roboflowPredictions.length > 0) {
        const top = [...roboflowPredictions].sort((a: any, b: any) => b.confidence - a.confidence)[0];
        let loc = location;
        const confidencePct = Math.round(top.confidence * 100);
        // If we don't yet have a location, try to fetch it now and wait up to ~10s
        if (!loc) {
          loc = await getLocationAsync();
        }
        const coordsText = loc ? ` at Lat: ${loc.lat.toFixed(5)}, Lng: ${loc.lng.toFixed(5)}` : "";
        const message = `🛑 Waste detected! ${classDisplayMap[top.class] || top.class} (${confidencePct}%)${coordsText}`;
        setAlertMessage(message);

        // Auto-send Twilio alert with Maps link (after ensuring location)
        const mapsLink = loc ? buildMapsLink(loc.lat, loc.lng, `${classDisplayMap[top.class] || top.class}`) : "";
        const alertText = `${message}${loc ? `\nLocation: ${mapsLink}` : ""}`;
        sendTwilioAlert(alertText);
      } else {
        setAlertMessage("No objects detected.");
      }
    } catch (error) { 
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.error("AI detection failed:", error); 
      setErrorMessage(`Detection failed: ${msg}`);
    } finally { 
      setIsAnalyzing(false); 
    } 
  }; 

  // Geolocation on mount (optional; does not require extra packages)
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          // If we already have an alert, update with coords
          setAlertMessage((prev) => (prev ? `${prev} (Location pinned)` : prev));
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Helper to get bounding box style
  const getBoundingBoxStyle = (detection: any, imgWidth: number, imgHeight: number) => {
    const x = detection.x;
    const y = detection.y;
    const width = detection.width;
    const height = detection.height;

    // Roboflow returns center coordinates, we need top-left for CSS positioning
    const left = (x - width / 2);
    const top = (y - height / 2);

    return {
      left: `${(left / imgWidth) * 100}%`,
      top: `${(top / imgHeight) * 100}%`,
      width: `${(width / imgWidth) * 100}%`,
      height: `${(height / imgHeight) * 100}%`,
    };
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-accent"; 
    if (confidence >= 0.7) return "text-secondary"; 
    return "text-primary"; 
  }; 

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <CheckCircle className="w-4 h-4 text-accent" />; 
    if (confidence >= 0.7) return <CheckCircle className="w-4 h-4 text-secondary" />; 
    return <AlertCircle className="w-4 h-4 text-primary" />; 
  }; 

  return (
    <section id="upload-image-section" className="py-20 px-4 relative bg-black z-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 professional-text">AI Waste Detection Demo</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience our advanced computer vision system that identifies and classifies coastal waste in real-time
            using the Roboflow inference API.
          </p>
        </div>

          <Card className="professional-card">
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
              onClick={() => fileInputRef.current?.click()}
              >
                <input
                ref={fileInputRef}
                  type="file"
                  accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                />

                {selectedImage ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Uploaded waste"
                        className="max-w-full max-h-64 rounded-lg shadow-lg object-contain"
                        id="uploaded-image"
                      />
                    {detectionResults && detectionResults.predictions && (
                      <div className="absolute inset-0">
                        {detectionResults.predictions.map((detection: any, index: number) => {
                          // Prefer API-reported image dimensions when available
                          const imgElement = document.getElementById("uploaded-image") as HTMLImageElement;
                          const naturalW = imgElement ? imgElement.naturalWidth : undefined;
                          const naturalH = imgElement ? imgElement.naturalHeight : undefined;
                          const imgWidth = apiImageDims?.width || naturalW || 640;
                          const imgHeight = apiImageDims?.height || naturalH || 480;
                          const bboxStyle = getBoundingBoxStyle(detection, imgWidth, imgHeight);
                          
                          return (
                            <div
                              key={index}
                              className="absolute border-2 border-destructive bg-destructive/20"
                              style={bboxStyle}
                            >
                              <span className="absolute -top-6 left-0 bg-destructive text-destructive-foreground px-2 py-1 text-xs rounded">
                                {detection.class} ({Math.round(detection.confidence * 100)}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      )}
                    </div>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
                    Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                    <p className="text-lg font-medium text-white">Upload Waste Image</p>
                    <Button onClick={() => fileInputRef.current?.click()} className="mt-2">
                      Select Image
                    </Button>
                    </div>
                  </div>
                )}
              </div>

            {/* Analyze button */}
            {selectedImage && (
              <div className="text-center">
                <Button onClick={runAIDetection} disabled={isAnalyzing} size="lg" className="px-8">
                  <Zap className="mr-2 h-5 w-5" />
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
              </div>
            )}

            {/* Detection Results */}
            {detectionResults && detectionResults.summary && (
              <div className="mt-8 p-6 bg-gray-900/50 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Detection Results</h3>
                {/* Quick summary line */}
                <p className="text-sm text-gray-300 mb-4">
                  {(() => {
                    const total = Object.values(detectionResults.summary as Record<string, number>).reduce((a: number, b: number) => a + b, 0);
                    const items = Object.entries(detectionResults.summary)
                      .map(([k, v]) => `${v} ${classDisplayMap[k] || k}`)
                      .join(", ");
                    return `${total} item(s) detected: ${items}`;
                  })()}
                </p>

                {/* Recycling suggestions */}
                <div className="space-y-3">
                  {Object.keys(detectionResults.summary).map((k: string) => (
                    <div key={k} className="p-3 bg-gray-800/60 rounded border border-gray-700">
                      <p className="text-sm font-semibold text-white mb-1">{classDisplayMap[k] || k} - Recycling Guidance</p>
                      <p className="text-xs text-gray-300">{recyclingTips[k] || "Sort and send to appropriate material recovery facility. Ensure minimal contamination for higher quality recycling."}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Example counts - you'd parse these from actual Roboflow results */}
            {detectionResults?.summary && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-chart-1/20 rounded-lg">
                    <div className="text-2xl font-bold text-chart-1">{detectionResults?.summary?.plastic || 0}</div>
                    <div className="text-sm text-gray-400">Plastic Items</div>
                  </div>
                  <div className="text-center p-4 bg-chart-2/20 rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">{detectionResults?.summary?.metal || 0}</div>
                    <div className="text-sm text-gray-400">Metal Items</div>
                  </div>
                  <div className="text-center p-4 bg-chart-3/20 rounded-lg">
                    <div className="text-2xl font-bold text-chart-3">{detectionResults?.summary?.organic || 0}</div>
                    <div className="text-sm text-gray-400">Organic Items</div>
                  </div>
                  {Object.entries(detectionResults.summary)
                    .filter(([key]) => !['plastic', 'metal', 'organic'].includes(key))
                    .map(([className, count], index) => (
                      <div key={index} className="text-center p-4 bg-gray-700/20 rounded-lg">
                        <div className="text-2xl font-bold text-gray-300">{count as number}</div>
                        <div className="text-sm text-gray-400">{(className as string).charAt(0).toUpperCase() + (className as string).slice(1)} Items</div>
                      </div>
                    ))}
                </div>
                <p className="text-center text-lg font-semibold text-white mt-4">
                  {Object.keys(detectionResults.summary as Record<string, number>).reduce((total, key) => total + ((detectionResults.summary as Record<string, number>)[key] || 0), 0)} items detected overall.
                </p>
              </>
            )}
            {/* Map section via Google Maps embed (no API key required) */}
            {location && (
              <div className="mt-6">
                <h4 className="font-semibold text-white mb-2">Detection Location</h4>
                <div className="w-full h-72 rounded overflow-hidden border border-gray-700">
                  <GoogleMap lat={location.lat} lng={location.lng} />
                </div>
              </div>
            )}
            {/* Alert box */}
            {alertMessage && (
              <div className="mt-6 p-4 rounded-lg border border-red-500/40 bg-red-900/20 text-red-200 flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white text-xs mt-0.5">!
                </span>
                <div>
                  <p className="font-semibold">Alert</p>
                  <p className="text-sm">{alertMessage}</p>
                  {/* Location status and controls */}
                  <div className="mt-2 text-[11px] text-gray-300 flex items-center gap-2 flex-wrap">
                    <span>Location:</span>
                    {location ? (
                      <span className="text-green-300">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
                    ) : locStatus === 'requesting' ? (
                      <span className="text-yellow-200">Requesting…</span>
                    ) : locStatus === 'denied' ? (
                      <span className="text-red-300">Unavailable (allow location and retry)</span>
                    ) : (
                      <span className="text-yellow-200">Not set</span>
                    )}
                    <Button variant="secondary" size="sm" onClick={getLocationNow}>Get Location</Button>
                    {location && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const mapsLink = buildMapsLink(location.lat, location.lng)
                          const retryText = `${alertMessage}\nLocation: ${mapsLink}`
                          sendTwilioAlert(retryText)
                        }}
                      >
                        Retry With Location
                      </Button>
                    )}
                  </div>
                  {/* Twilio send status */}
                  <div className="mt-3 text-xs">
                    {sendStatus === 'sending' && (
                      <p className="text-yellow-200">Sending alert via Twilio...</p>
                    )}
                    {sendStatus === 'sent' && (
                      <p className="text-green-300">Alert sent via Twilio.</p>
                    )}
                    {sendStatus === 'error' && (
                      <div className="text-red-300 space-y-2">
                        <p>Failed to send via Twilio.</p>
                        {sendError && (
                          <pre className="whitespace-pre-wrap break-words bg-red-950/40 p-2 rounded border border-red-800/40">{sendError}</pre>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1"
                          onClick={() => {
                            const loc = location;
                            const mapsLink = loc ? buildMapsLink(loc.lat, loc.lng) : "";
                            const retryText = `${alertMessage}${loc ? `\nLocation: ${mapsLink}` : ""}`;
                            sendTwilioAlert(retryText);
                          }}
                        >
                          Retry Send
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Error box */}
            {errorMessage && (
              <div className="mt-4 p-4 rounded-lg border border-yellow-500/40 bg-yellow-900/20 text-yellow-200">
                <p className="font-semibold">Detection Error</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Roboflow API Integration</h4>
              <p className="text-xs text-gray-400 mb-2">
              This demo now uses the Roboflow inference API directly. Ensure your API key and workflow ID are correctly set in .env.local.
              </p>
              <ol className="text-xs text-gray-500 list-decimal list-inside space-y-1">
              <li>Upload an image of waste.</li>
              <li>Click "Analyze with AI" to send to Roboflow.</li>
              <li>View results, recycling tips, and alert details below.</li>
              </ol>
            </div>
          </div>
          </Card>
      </div>
    </section>
  );
}
