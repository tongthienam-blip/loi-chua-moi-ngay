'use client';

export { HeroCarousel as HeroSacred, HeroCarousel } from './HeroCarousel';
export default function HeroSacredWrapper() {
  const { HeroCarousel } = require('./HeroCarousel');
  return <HeroCarousel />;
}
