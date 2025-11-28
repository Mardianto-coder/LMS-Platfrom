/**
 * Authentication Middleware
 * 
 * Middleware untuk JWT authentication dan authorization
 */

import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User, UserRole } from '../../types/index';

// Extend Express Request to include user
export interface AuthRequest extends Request {
    user?: User;
}

// JWT Secret (dalam production, gunakan environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate JWT token untuk user
 */
export function generateToken(user: User): string {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): { id: number; email: string; role: UserRole } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: UserRole };
        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Middleware untuk authenticate user dengan JWT
 */
export function authenticateUser(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authentication required' });
        return;
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (!decoded) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
    
    // Attach user info to request
    req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
    } as User;
    
    next();
}

/**
 * Middleware untuk require admin role
 */
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Admin access required' });
        return;
    }
    next();
}

/**
 * Middleware untuk require student role
 */
export function requireStudent(req: AuthRequest, res: Response, next: NextFunction): void {
    if (req.user?.role !== 'student') {
        res.status(403).json({ message: 'Student access required' });
        return;
    }
    next();
}

