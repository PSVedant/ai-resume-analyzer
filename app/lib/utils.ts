// utils.ts

/**
 * Format bytes to human readable string (KB, MB, GB, etc.)
 * @param bytes - Number of bytes
 * @returns Human readable string representing the size
 */
export function formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    //determine the appropriate unit by calculating the log
    const i:number = Math.floor(Math.log(bytes) / Math.log(k));

    // format with 2 decimal places and round
    return parseFloat((bytes /Math.pow(k,i)).toFixed(2)) + ' '+ sizes[i];
}

export const generateUUID =() => crypto.randomUUID();