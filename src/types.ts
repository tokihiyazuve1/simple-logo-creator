import {
  ShoppingBag, Store, Package, Zap, Sparkles, Heart, Star,
  Coffee, Box, Scissors, Crown, Diamond, Camera, Music,
  Palette, BookOpen, Briefcase, Code, Cpu, Feather, Flame,
  Gift, Globe, Headphones, Key, Leaf, MapPin, Moon, Sun,
  Truck, Umbrella, Watch,
  // New icons
  Anchor, Apple, Award, Bike, Bird, Bolt, Bomb, Bone,
  Brain, Brush, Bug, Cake, Car, Cat, Cherry, Cloud,
  Compass, Dog, Drum, Dumbbell, Egg, Eye, Fan, Fish,
  Flower, Gem, Guitar, Hammer, HandHeart, IceCreamCone,
  Lamp, Lightbulb, Mountain, Pencil, Pizza, Plane,
  Rocket, Shield, Skull, Snowflake, Sword, Target,
  Trees, Trophy, Wand, Wine, Wrench, Footprints
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
  fontSize: number;
  iconSize: number;
}

export const FONTS = [
  // Sans-Serif
  'Inter',
  'Outfit',
  'Space Grotesk',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Nunito',
  'Quicksand',
  'DM Sans',
  'Rubik',
  // Serif
  'Playfair Display',
  'Cinzel',
  'Merriweather',
  'Lora',
  'Cormorant Garamond',
  // Display / Decorative
  'Righteous',
  'Permanent Marker',
  'Pacifico',
  'Bebas Neue',
  'Lobster',
  'Comfortaa',
  'Fredoka',
  'Satisfy',
  'Archivo Black',
  'Bungee',
];

export const ICONS = [
  'ShoppingBag', 'Store', 'Package', 'Zap', 'Sparkles', 'Heart', 'Star',
  'Coffee', 'Box', 'Scissors', 'Crown', 'Diamond', 'Camera', 'Music',
  'Palette', 'BookOpen', 'Briefcase', 'Code', 'Cpu', 'Feather', 'Flame',
  'Gift', 'Globe', 'Headphones', 'Key', 'Leaf', 'MapPin', 'Moon', 'Sun',
  'Truck', 'Umbrella', 'Watch',
  'Anchor', 'Apple', 'Award', 'Bike', 'Bird', 'Bolt', 'Bomb', 'Bone',
  'Brain', 'Brush', 'Bug', 'Cake', 'Car', 'Cat', 'Cherry', 'Cloud',
  'Compass', 'Dog', 'Drum', 'Dumbbell', 'Egg', 'Eye', 'Fan', 'Fish',
  'Flower', 'Gem', 'Guitar', 'Hammer', 'HandHeart', 'IceCreamCone',
  'Lamp', 'Lightbulb', 'Mountain', 'Pencil', 'Pizza', 'Plane',
  'Rocket', 'Shield', 'Skull', 'Snowflake', 'Sword', 'Target',
  'Trees', 'Trophy', 'Wand', 'Wine', 'Wrench', 'Footprints'
];

export const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag, Store, Package, Zap, Sparkles, Heart, Star,
  Coffee, Box, Scissors, Crown, Diamond, Camera, Music,
  Palette, BookOpen, Briefcase, Code, Cpu, Feather, Flame,
  Gift, Globe, Headphones, Key, Leaf, MapPin, Moon, Sun,
  Truck, Umbrella, Watch,
  Anchor, Apple, Award, Bike, Bird, Bolt, Bomb, Bone,
  Brain, Brush, Bug, Cake, Car, Cat, Cherry, Cloud,
  Compass, Dog, Drum, Dumbbell, Egg, Eye, Fan, Fish,
  Flower, Gem, Guitar, Hammer, HandHeart, IceCreamCone,
  Lamp, Lightbulb, Mountain, Pencil, Pizza, Plane,
  Rocket, Shield, Skull, Snowflake, Sword, Target,
  Trees, Trophy, Wand, Wine, Wrench, Footprints
};

export const PALETTES = [
  // ── Dark Themes ──
  { name: 'Midnight Blue', bg: '#0f172a', text: '#ffffff', icon: '#3b82f6' },
  { name: 'Deep Purple', bg: '#2e1065', text: '#f3e8ff', icon: '#d8b4fe' },
  { name: 'Forest Night', bg: '#064e3b', text: '#d1fae5', icon: '#34d399' },
  { name: 'Charcoal Gold', bg: '#1f2937', text: '#fef3c7', icon: '#fbbf24' },
  { name: 'Vampire Red', bg: '#450a0a', text: '#fee2e2', icon: '#f87171' },
  { name: 'Deep Ocean', bg: '#0c4a6e', text: '#e0f2fe', icon: '#38bdf8' },
  { name: 'Dark Teal', bg: '#134e4a', text: '#ccfbf1', icon: '#2dd4bf' },
  { name: 'Obsidian Bronze', bg: '#1c1917', text: '#fef3c7', icon: '#d97706' },
  { name: 'Navy Steel', bg: '#172554', text: '#dbeafe', icon: '#60a5fa' },
  { name: 'Dark Plum', bg: '#3b0764', text: '#f5d0fe', icon: '#e879f9' },

  // ── Light / Minimalist Themes ──
  { name: 'Classic Monochrome', bg: '#ffffff', text: '#000000', icon: '#000000' },
  { name: 'Clean Slate', bg: '#f8fafc', text: '#334155', icon: '#64748b' },
  { name: 'Cream & Coffee', bg: '#fafaf9', text: '#44403c', icon: '#78716c' },
  { name: 'Soft Peach', bg: '#fff1f2', text: '#881337', icon: '#f43f5e' },
  { name: 'Mint Breeze', bg: '#f0fdf4', text: '#14532d', icon: '#22c55e' },
  { name: 'Ivory & Ink', bg: '#fffff0', text: '#1a1a2e', icon: '#4a4a68' },
  { name: 'Paper White', bg: '#fafafa', text: '#18181b', icon: '#71717a' },
  { name: 'Snow Blue', bg: '#f0f9ff', text: '#0c4a6e', icon: '#0284c7' },
  { name: 'Warm Gray', bg: '#f5f5f4', text: '#292524', icon: '#a8a29e' },
  { name: 'Cotton Candy', bg: '#fdf2f8', text: '#831843', icon: '#ec4899' },

  // ── Vibrant / Playful Themes ──
  { name: 'Sunset Orange', bg: '#ffedd5', text: '#431407', icon: '#ea580c' },
  { name: 'Cyberpunk Pink', bg: '#fdf4ff', text: '#4a044e', icon: '#c026d3' },
  { name: 'Ocean Wave', bg: '#e0f2fe', text: '#0c4a6e', icon: '#0ea5e9' },
  { name: 'Lemon Drop', bg: '#fefce8', text: '#713f12', icon: '#eab308' },
  { name: 'Lavender Dream', bg: '#f3e8ff', text: '#4c1d95', icon: '#8b5cf6' },
  { name: 'Coral Reef', bg: '#fff7ed', text: '#9a3412', icon: '#fb923c' },
  { name: 'Bubblegum', bg: '#fce7f3', text: '#9d174d', icon: '#f472b6' },
  { name: 'Tropical Lime', bg: '#ecfccb', text: '#365314', icon: '#84cc16' },
  { name: 'Sky Splash', bg: '#e0f2fe', text: '#075985', icon: '#38bdf8' },
  { name: 'Berry Blast', bg: '#fae8ff', text: '#701a75', icon: '#d946ef' },

  // ── Earthy / Natural Themes ──
  { name: 'Terracotta', bg: '#fff7ed', text: '#7c2d12', icon: '#c2410c' },
  { name: 'Olive Grove', bg: '#ecfccb', text: '#3f6212', icon: '#65a30d' },
  { name: 'Sand Dune', bg: '#fef3c7', text: '#78350f', icon: '#d97706' },
  { name: 'Slate Blue', bg: '#e0e7ff', text: '#312e81', icon: '#4f46e5' },
  { name: 'Rosewood', bg: '#ffe4e6', text: '#881337', icon: '#e11d48' },
  { name: 'Sage Green', bg: '#f0fdf4', text: '#166534', icon: '#4ade80' },
  { name: 'Clay Red', bg: '#fef2f2', text: '#991b1b', icon: '#dc2626' },
  { name: 'Moss & Stone', bg: '#f5f5dc', text: '#3d3d29', icon: '#6b8e23' },
  { name: 'Desert Amber', bg: '#fffbeb', text: '#92400e', icon: '#f59e0b' },
  { name: 'Coconut Shell', bg: '#fdf5e6', text: '#5c3d2e', icon: '#a0522d' },

  // ── High Contrast / Prominent Themes ──
  { name: 'Matrix Green', bg: '#000000', text: '#22c55e', icon: '#4ade80' },
  { name: 'Neon Pink', bg: '#000000', text: '#ec4899', icon: '#f472b6' },
  { name: 'Electric Yellow', bg: '#000000', text: '#eab308', icon: '#fde047' },
  { name: 'Crimson Night', bg: '#000000', text: '#ef4444', icon: '#f87171' },
  { name: 'Royal Gold', bg: '#000000', text: '#d97706', icon: '#fbbf24' },
  { name: 'Cyan Glow', bg: '#000000', text: '#06b6d4', icon: '#22d3ee' },
  { name: 'Violet Neon', bg: '#000000', text: '#a855f7', icon: '#c084fc' },
  { name: 'Ice Blue', bg: '#000000', text: '#38bdf8', icon: '#7dd3fc' },
  { name: 'Lime Wire', bg: '#000000', text: '#84cc16', icon: '#bef264' },
  { name: 'Hot Magenta', bg: '#000000', text: '#e11d48', icon: '#fb7185' },
];
