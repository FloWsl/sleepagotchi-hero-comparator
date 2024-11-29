export function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(Math.round(num));
}

export function formatEfficiency(num: number): string {
    return num.toFixed(4);
}

export function getEfficiencyRating(efficiency: number): 'low' | 'medium' | 'high' {
    if (efficiency > 2.0) return 'high';
    if (efficiency > 1.0) return 'medium';
    return 'low';
}