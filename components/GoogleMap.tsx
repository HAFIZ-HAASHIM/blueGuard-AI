"use client";

import React, { useEffect, useRef, useState } from "react";

type GoogleMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
  height?: number | string;
};

// Loads Google Maps JS API once
function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Window not available"));
    // Already loaded
    if ((window as any).google && (window as any).google.maps) {
      return resolve((window as any).google);
    }
    const existing = document.getElementById("google-maps-script") as HTMLScriptElement | null;
    if (existing) {
      existing.onload = () => resolve((window as any).google);
      existing.onerror = (e) => reject(e);
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve((window as any).google);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

export default function GoogleMap({ lat, lng, zoom = 14, markerLabel, height = 288 }: GoogleMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. Add it to .env.local and restart the server.");
      return;
    }
    let map: google.maps.Map | null = null;
    let marker: google.maps.Marker | null = null;

    loadGoogleMaps(apiKey)
      .then((g) => {
        if (!ref.current) return;
        const center = { lat, lng } as google.maps.LatLngLiteral;
        map = new g.maps.Map(ref.current, {
          center,
          zoom,
          mapTypeId: g.maps.MapTypeId.ROADMAP,
          disableDefaultUI: false,
        });
        marker = new g.maps.Marker({
          position: center,
          map,
          title: markerLabel || "Waste detected here",
        });
      })
      .catch((e) => setError(`Failed to load map: ${e instanceof Error ? e.message : "Unknown error"}`));

    return () => {
      // Cleanup references
      marker = null;
      map = null;
    };
  }, [lat, lng, zoom, markerLabel]);

  if (error) {
    return (
      <div className="w-full h-72 flex items-center justify-center text-sm text-red-300 bg-red-900/20 border border-red-500/40 rounded">
        {error}
      </div>
    );
  }

  return <div ref={ref} style={{ width: "100%", height }} />;
}
