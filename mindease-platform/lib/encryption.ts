/**
 * Client-side encryption utilities for end-to-end encryption
 * Uses Web Crypto API for AES-GCM encryption
 */

const ENCRYPTION_KEY_NAME = 'mindease_journal_encryption_key';
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

/**
 * Generate a new encryption key and store it in localStorage
 */
export async function generateAndStoreKey(): Promise<CryptoKey> {
    const key = await crypto.subtle.generateKey(
        {
            name: ALGORITHM,
            length: KEY_LENGTH,
        },
        true, // extractable
        ['encrypt', 'decrypt']
    );

    // Export key to store in localStorage
    const exportedKey = await crypto.subtle.exportKey('jwk', key);
    localStorage.setItem(ENCRYPTION_KEY_NAME, JSON.stringify(exportedKey));

    return key;
}

/**
 * Retrieve the encryption key from localStorage
 * If not found, generate a new one
 */
export async function getOrCreateEncryptionKey(): Promise<CryptoKey> {
    const storedKey = localStorage.getItem(ENCRYPTION_KEY_NAME);

    if (storedKey) {
        try {
            const keyData = JSON.parse(storedKey);
            return await crypto.subtle.importKey(
                'jwk',
                keyData,
                {
                    name: ALGORITHM,
                    length: KEY_LENGTH,
                },
                true,
                ['encrypt', 'decrypt']
            );
        } catch (error) {
            console.error('Failed to import stored key, generating new one:', error);
            return await generateAndStoreKey();
        }
    }

    return await generateAndStoreKey();
}

/**
 * Encrypt text data
 * Returns base64 encoded encrypted data with IV prepended
 */
export async function encryptText(plaintext: string): Promise<string> {
    const key = await getOrCreateEncryptionKey();
    
    // Generate a random IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Convert plaintext to ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);

    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: ALGORITHM,
            iv: iv,
        },
        key,
        data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64
    return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt text data
 * Expects base64 encoded encrypted data with IV prepended
 */
export async function decryptText(encryptedBase64: string): Promise<string> {
    try {
        const key = await getOrCreateEncryptionKey();

        // Decode from base64
        const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

        // Extract IV and encrypted data
        const iv = combined.slice(0, 12);
        const encryptedData = combined.slice(12);

        // Decrypt the data
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: ALGORITHM,
                iv: iv,
            },
            key,
            encryptedData
        );

        // Convert ArrayBuffer to string
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Failed to decrypt data. The encryption key may have changed.');
    }
}

/**
 * Check if an encryption key exists in localStorage
 */
export function hasEncryptionKey(): boolean {
    return localStorage.getItem(ENCRYPTION_KEY_NAME) !== null;
}

/**
 * Clear the encryption key from localStorage
 * WARNING: This will make all encrypted data unrecoverable
 */
export function clearEncryptionKey(): void {
    localStorage.removeItem(ENCRYPTION_KEY_NAME);
}

/**
 * Export the encryption key (for backup purposes)
 */
export async function exportEncryptionKey(): Promise<string> {
    const storedKey = localStorage.getItem(ENCRYPTION_KEY_NAME);
    if (!storedKey) {
        throw new Error('No encryption key found');
    }
    return storedKey;
}

/**
 * Import an encryption key (for recovery purposes)
 */
export function importEncryptionKey(keyData: string): void {
    try {
        // Validate it's valid JSON
        JSON.parse(keyData);
        localStorage.setItem(ENCRYPTION_KEY_NAME, keyData);
    } catch (error) {
        throw new Error('Invalid encryption key format');
    }
}
