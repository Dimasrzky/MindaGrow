import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge className strings with Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to a readable string
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Format time to a readable string
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format number with thousand separators
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

// Truncate text with ellipsis
export function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}

// Convert camelCase to Title Case
export function camelToTitleCase(text: string): string {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Get initials from a name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Generate random color based on string (for consistent user colors)
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}

// Calculate reading time for content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return Math.max(1, time); // Minimum 1 minute
}

// Delay execution (for animations, etc.)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}