import {
  ShoppingBag, Store, Package, Zap, Sparkles, Heart, Star,
  Coffee, Box, Scissors, Crown, Diamond, Camera, Music,
  Palette, BookOpen, Briefcase, Code, Cpu, Feather, Flame,
  Gift, Globe, Headphones, Key, Leaf, MapPin, Moon, Sun,
  Truck, Umbrella, Watch
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface LogoConfig {
  name: string;
  fontFamily: string;
  layout: 'icon-top' | 'icon-left' | 'text-only' | 'icon-only';
  icon: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  fontSize: number;    // 20 to 250
  iconSize: number;    // 50 to 600
}

export const FONTS = [
  'Inter',
  'Outfit',
  'Playfair Display',
  'Space Grotesk',
  'Righteous',
  'Permanent Marker',
  'Pacifico',
  'Bebas Neue',
  'Cinzel',
  'Lobster',
  'Montserrat'
];

export const ICONS = [
  'ShoppingBag', 'Store', 'Package', 'Zap', 'Sparkles', 'Heart', 'Star',
  'Coffee', 'Box', 'Scissors', 'Crown', 'Diamond', 'Camera', 'Music',
  'Palette', 'BookOpen', 'Briefcase', 'Code', 'Cpu', 'Feather', 'Flame',
  'Gift', 'Globe', 'Headphones', 'Key', 'Leaf', 'MapPin', 'Moon', 'Sun',
  'Truck', 'Umbrella', 'Watch'
];

// Explicit map of only the icons we use — enables tree-shaking of the full Lucide library
export const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag, Store, Package, Zap, Sparkles, Heart, Star,
  Coffee, Box, Scissors, Crown, Diamond, Camera, Music,
  Palette, BookOpen, Briefcase, Code, Cpu, Feather, Flame,
  Gift, Globe, Headphones, Key, Leaf, MapPin, Moon, Sun,
  Truck, Umbrella, Watch
};

export const PALETTES = [
  // Dark Themes
  { name: 'Midnight Blue', bg: '#0f172a', text: '#ffffff', icon: '#3b82f6' },
  { name: 'Deep Purple', bg: '#2e1065', text: '#f3e8ff', icon: '#d8b4fe' },
  { name: 'Forest Night', bg: '#064e3b', text: '#d1fae5', icon: '#34d399' },
  { name: 'Charcoal Gold', bg: '#1f2937', text: '#fef3c7', icon: '#fbbf24' },
  { name: 'Vampire Red', bg: '#450a0a', text: '#fee2e2', icon: '#f87171' },

  // Light / Minimalist Themes
  { name: 'Classic Monochrome', bg: '#ffffff', text: '#000000', icon: '#000000' },
  { name: 'Clean Slate', bg: '#f8fafc', text: '#334155', icon: '#64748b' },
  { name: 'Cream & Coffee', bg: '#fafaf9', text: '#44403c', icon: '#78716c' },
  { name: 'Soft Peach', bg: '#fff1f2', text: '#881337', icon: '#f43f5e' },
  { name: 'Mint Breeze', bg: '#f0fdf4', text: '#14532d', icon: '#22c55e' },

  // Vibrant / Playful Themes
  { name: 'Sunset Orange', bg: '#ffedd5', text: '#431407', icon: '#ea580c' },
  { name: 'Cyberpunk Pink', bg: '#fdf4ff', text: '#4a044e', icon: '#c026d3' },
  { name: 'Ocean Wave', bg: '#e0f2fe', text: '#0c4a6e', icon: '#0ea5e9' },
  { name: 'Lemon Drop', bg: '#fefce8', text: '#713f12', icon: '#eab308' },
  { name: 'Lavender Dream', bg: '#f3e8ff', text: '#4c1d95', icon: '#8b5cf6' },

  // Earthy / Natural Themes
  { name: 'Terracotta', bg: '#fff7ed', text: '#7c2d12', icon: '#c2410c' },
  { name: 'Olive Grove', bg: '#ecfccb', text: '#3f6212', icon: '#65a30d' },
  { name: 'Sand Dune', bg: '#fef3c7', text: '#78350f', icon: '#d97706' },
  { name: 'Slate Blue', bg: '#e0e7ff', text: '#312e81', icon: '#4f46e5' },
  { name: 'Rosewood', bg: '#ffe4e6', text: '#881337', icon: '#e11d48' },

  // High Contrast Prominent Themes
  { name: 'Matrix Green', bg: '#000000', text: '#22c55e', icon: '#4ade80' },
  { name: 'Neon Pink', bg: '#000000', text: '#ec4899', icon: '#f472b6' },
  { name: 'Electric Yellow', bg: '#000000', text: '#eab308', icon: '#fde047' },
  { name: 'Crimson Night', bg: '#000000', text: '#ef4444', icon: '#f87171' },
  { name: 'Royal Gold', bg: '#000000', text: '#d97706', icon: '#fbbf24' }
];
