import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-50';
    case 'high':
      return 'text-orange-600 bg-orange-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-blue-600 bg-blue-50';
    case 'info':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-red-600 bg-red-50';
    case 'investigating':
      return 'text-yellow-600 bg-yellow-50';
    case 'contained':
      return 'text-blue-600 bg-blue-50';
    case 'resolved':
      return 'text-green-600 bg-green-50';
    case 'compliant':
      return 'text-green-600 bg-green-50';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50';
    case 'non-compliant':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}
