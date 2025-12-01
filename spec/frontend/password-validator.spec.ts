/**
 * Unit Test untuk Password Validator
 */

import { validatePasswordFormat } from '../../src/frontend/password-validator';

describe('Password Validator', () => {
    
    describe('validatePasswordFormat', () => {
        
        it('should return valid for password with all requirements', () => {
            const result = validatePasswordFormat('Test123');
            expect(result.valid).toBe(true);
            expect(result.message).toBe('');
        });

        it('should return invalid for password less than 6 characters', () => {
            const result = validatePasswordFormat('Test1');
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Password harus minimal 6 karakter');
        });

        it('should return invalid for password without lowercase letter', () => {
            const result = validatePasswordFormat('TEST123');
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Password harus mengandung minimal 1 huruf kecil');
        });

        it('should return invalid for password without uppercase letter', () => {
            const result = validatePasswordFormat('test123');
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Password harus mengandung minimal 1 huruf besar');
        });

        it('should return invalid for password without number', () => {
            const result = validatePasswordFormat('TestAbc');
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Password harus mengandung minimal 1 angka');
        });

        it('should return invalid for empty password', () => {
            const result = validatePasswordFormat('');
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Password harus minimal 6 karakter');
        });

        it('should return valid for complex password', () => {
            const result = validatePasswordFormat('MyP@ssw0rd123');
            expect(result.valid).toBe(true);
            expect(result.message).toBe('');
        });

    });

});

