'use client';

import { useEffect, useRef } from 'react';

// Airport coordinates
const airports: Record<string, [number, number]> = {
  CGK: [-6.1256, 106.6559],
  SUB: [-7.3798, 112.7870],
  DPS: [-8.7482, 115.1672],
  MDC: [1.5493, 124.9261],
  UPG: [-5.0617, 119.5540],
  PDG: [-0.8787, 100.3536],
  BDJ: [-3.4424, 114.7625],
};

type Flight = {
  no: string;
  rute: string;
  status: string;
};

type Props = {
  flights: Flight[];
};

const statusColor: Record<string, string> = {
  'On Time': '#22c55e',
  'Boarding': '#3b82f6',
  'Delayed +45m': '#f97316',
  'Departed': '#9ca3af',
};

export default function MapComponent({ flights }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapInstanceRef.current) return; // already initialized

    // Dynamically load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Dynamically load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-3.5, 108],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;

      // Tile layer — OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Draw routes & markers
      flights.forEach((flight) => {
        const [fromCode, toCode] = flight.rute.split('→');
        const from = airports[fromCode?.trim()];
        const to = airports[toCode?.trim()];
        if (!from || !to) return;

        const color = statusColor[flight.status] || '#6b7280';
        const isDashed = flight.status === 'Delayed +45m';

        // Route line
        const polyline = L.polyline([from, to], {
          color,
          weight: 2.5,
          opacity: 0.8,
          dashArray: isDashed ? '8, 6' : undefined,
        }).addTo(map);

        polyline.bindTooltip(
          `<b>${flight.no}</b><br/>${flight.rute}<br/>Status: ${flight.status}`,
          { sticky: true }
        );

        // Origin marker (CGK)
        const originIcon = L.divIcon({
          html: `<div style="
            width:10px;height:10px;
            background:${color};
            border:2px solid white;
            border-radius:50%;
            box-shadow:0 0 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
          className: '',
        });

        L.marker(from, { icon: originIcon }).addTo(map)
          .bindPopup(`<b>${fromCode}</b><br/>Hub Kargo`);

        // Destination marker
        const destIcon = L.divIcon({
          html: `<div style="
            width:12px;height:12px;
            background:${color};
            border:2px solid white;
            border-radius:50%;
            box-shadow:0 0 6px rgba(0,0,0,0.4);
          "></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
          className: '',
        });

        L.marker(to, { icon: destIcon }).addTo(map)
          .bindPopup(`<b>${toCode}</b><br/>${flight.no} — ${flight.status}`);
      });

      // CGK hub label
      const cgkCoords = airports['CGK'];
      const hubIcon = L.divIcon({
        html: `<div style="
          background:#1e3a8a;
          color:white;
          font-size:11px;
          font-weight:700;
          padding:3px 8px;
          border-radius:6px;
          white-space:nowrap;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
        ">✈ HUB CGK</div>`,
        iconSize: [90, 24],
        iconAnchor: [45, 12],
        className: '',
      });

      L.marker(cgkCoords, { icon: hubIcon }).addTo(map);
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [flights]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '320px', borderRadius: '8px', zIndex: 0 }}
    />
  );
}
