#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const products = [
  { id: 'iskra-tee',           label: 'TEE',         sub: 'ИСКРА · ISKRA',    icon: '⚡', bg: '#f5f0e8', accent: '#C9A84C', dark: true },
  { id: 'ogon-beanie',         label: 'BEANIE',      sub: 'ОГОНЬ · OGON',     icon: '🔥', bg: '#111',    accent: '#C9A84C', dark: false },
  { id: 'luch-longsleeve',     label: 'LONG SLEEVE', sub: 'ЛУЧ · LUCH',      icon: '☀',  bg: '#0a0a0a', accent: '#C9A84C', dark: false },
  { id: 'zarya-hoodie',        label: 'HOODIE',      sub: 'ЗАРЯ · ZARYA',     icon: '🌅', bg: '#0e0e0e', accent: '#C9A84C', dark: false },
  { id: 'rassvet-sweatpants',  label: 'SWEATPANTS',  sub: 'РАССВЕТ · RASSVET', icon: '🌄', bg: '#0c0c0c', accent: '#C9A84C', dark: false },
];

const outDir = path.join(__dirname, '..', 'public', 'images', 'products');
fs.mkdirSync(outDir, { recursive: true });

for (const p of products) {
  const textColor = p.dark ? '#1a1a1a' : '#e0ddd5';
  const subColor = p.dark ? '#666' : '#777';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${p.bg}"/>
  <rect x="32" y="32" width="736" height="936" rx="20" fill="none" stroke="${p.dark ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'}" stroke-width="1"/>

  <!-- Brand -->
  <text x="400" y="360" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="80" font-weight="900" fill="${textColor}" letter-spacing="18" opacity="0.85">SVET</text>

  <!-- Icon -->
  <text x="400" y="470" text-anchor="middle" font-size="56" opacity="0.6">${p.icon}</text>

  <!-- Type -->
  <text x="400" y="550" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="18" font-weight="700" fill="${textColor}" letter-spacing="10" opacity="0.45">${p.label}</text>

  <!-- Bilingual name -->
  <text x="400" y="590" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="13" fill="${subColor}" letter-spacing="3">${p.sub}</text>

  <!-- Pre-order pill -->
  <rect x="305" y="680" width="190" height="34" rx="17" fill="${p.accent}" opacity="0.12"/>
  <text x="400" y="702" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="11" font-weight="700" fill="${p.accent}" letter-spacing="4">PRE-ORDER</text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${p.id}.svg`), svg);
  console.log('✅', p.id);
}
console.log('\\nDone —', products.length, 'placeholders generated.');
