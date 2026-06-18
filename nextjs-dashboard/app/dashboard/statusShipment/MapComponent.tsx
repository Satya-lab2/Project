'use client';

import { useEffect, useRef } from 'react';

// City name → approximate coordinates mapping (Indonesia)
const cityCoords: Record<string, [number, number]> = {
  // Major cities & common kota values
  JAKARTA:       [-6.2088, 106.8456],
  SURABAYA:      [-7.2575, 112.7521],
  BALI:          [-8.4095, 115.1889],
  DENPASAR:      [-8.6705, 115.2126],
  MEDAN:         [3.5952,  98.6722],
  MAKASSAR:      [-5.1477, 119.4327],
  BALIKPAPAN:    [-1.2379, 116.8529],
  MANADO:        [1.4748,  124.8421],
  PADANG:        [-0.9471, 100.4172],
  PALEMBANG:     [-2.9761, 104.7754],
  PEKANBARU:     [0.5071,  101.4478],
  BANJARMASIN:   [-3.3186, 114.5944],
  PONTIANAK:     [-0.0263, 109.3425],
  YOGYAKARTA:    [-7.7972, 110.3688],
  SEMARANG:      [-6.9667, 110.4167],
  BANDUNG:       [-6.9175, 107.6191],
  LOMBOK:        [-8.5702, 116.1000],
  JAYAPURA:      [-2.5337, 140.7181],
  SORONG:        [-0.8762, 131.2504],
  AMBON:         [-3.6954, 128.1814],
  TERNATE:       [0.7833,  127.3667],
  KUPANG:        [-10.1718, 123.6070],
  ENDE:          [-8.8432, 121.6622],
  FLORES:        [-8.6500, 121.0833],
  TIMIKA:        [-4.5285, 136.8876],
  PANGKALPINANG: [-2.1316, 106.1169],
  BATAM:         [1.0456,  104.0305],
  BENGKULU:      [-3.8004, 102.2655],
  JAMBI:         [-1.6102, 103.6131],
  LAMPUNG:       [-5.4500, 105.2667],
  CIREBON:       [-6.7063, 108.5570],
  MALANG:        [-7.9797, 112.6304],
  SOLO:          [-7.5755, 110.8243],
  KEDIRI:        [-7.8167, 112.0167],
  MATARAM:       [-8.5833, 116.1167],
};

function resolveCoords(city: string): [number, number] | null {
  const key = city.toUpperCase().trim();
  // Direct match
  if (cityCoords[key]) return cityCoords[key];
  // Partial match
  const found = Object.keys(cityCoords).find(k => key.includes(k) || k.includes(key));
  return found ? cityCoords[found] : null;
}

// Status colors aligned with database status_pengiriman values
const statusColor: Record<string, string> = {
  'Diproses':         '#facc15', // yellow
  'Dalam Pengiriman': '#3b82f6', // blue
  'Sampai Tujuan':    '#22c55e', // green
  'Pending':          '#f97316', // orange
  'Selesai':          '#9ca3af', // gray
};

type Flight = {
  no: string;
  rute: string;
  status: string;
};

type Props = {
  flights: Flight[];
};

export default function MapComponent({ flights }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapInstanceRef.current) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-3.5, 118],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      const drawnCities = new Set<string>();

      flights.forEach((flight) => {
        const [fromCity, toCity] = flight.rute.split('→');
        const from = resolveCoords(fromCity);
        const to = resolveCoords(toCity);
        if (!from || !to) return;

        const color = statusColor[flight.status] || '#6b7280';
        const isDashed = flight.status === 'Pending';

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

        const makeIcon = (size: number) => L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:2px solid white;
            border-radius:50%;
            box-shadow:0 0 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          className: '',
        });

        const fromKey = fromCity.trim().toUpperCase();
        if (!drawnCities.has(fromKey)) {
          drawnCities.add(fromKey);
          L.marker(from, { icon: makeIcon(10) }).addTo(map)
            .bindPopup(`<b>${fromCity.trim()}</b>`);
        }

        const toKey = toCity.trim().toUpperCase();
        if (!drawnCities.has(toKey + flight.no)) {
          drawnCities.add(toKey + flight.no);
          L.marker(to, { icon: makeIcon(12) }).addTo(map)
            .bindPopup(`<b>${toCity.trim()}</b><br/>${flight.no} — ${flight.status}`);
        }
      });
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
