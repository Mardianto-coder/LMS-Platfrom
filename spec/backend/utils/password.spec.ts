/**
 * Unit Test untuk Password Utilities
 */

import { hashPassword, verifyPassword } from '../../../src/backend/utils/password';

describe('Password Utilities', () => {
    
    describe('hashPassword', () => {
        
        it('should hash a password successfully', async () => {
            const password = 'Test123';
            const hash = await hashPassword(password);
            
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash.length).toBeGreaterThan(0);
            expect(hash).not.toBe(password);
            // Bcrypt hash selalu dimulai dengan $2b$ atau $2a$
            expect(hash).toMatch(/^\$2[ab]\$/);
        });

        it('should produce different hashes for the same password', async () => {
            const password = 'Test123';
            const hash1 = await hashPassword(password);
            const hash2 = await hashPassword(password);
            
            // Bcrypt menghasilkan hash berbeda setiap kali (karena salt)
            expect(hash1).not.toBe(hash2);
        });

    });

    describe('verifyPassword', () => {
        
        it('should verify correct password successfully', async () => {
            const password = 'Test123';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword(password, hash);
            
            expect(isValid).toBe(true);
        });

        it('should reject incorrect password', async () => {
            const password = 'Test123';
            const wrongPassword = 'Wrong123';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword(wrongPassword, hash);
            
            expect(isValid).toBe(false);
        });

        it('should reject empty password', async () => {
            const password = 'Test123';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword('', hash);
            
            expect(isValid).toBe(false);
        });

        it('should handle case-sensitive passwords', async () => {
            const password = 'Test123';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword('test123', hash);
            
            expect(isValid).toBe(false);
        });

    });

});

