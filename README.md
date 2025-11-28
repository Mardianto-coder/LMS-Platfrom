# Learning Management System (LMS)

A comprehensive Learning Management System built with **TypeScript** (Frontend & Backend) and compiled to JavaScript.

## 📸 Preview

![LMS Platform Preview](images/lms-platform-preview.png)

> **Note**: Untuk menambahkan gambar dari Canva:
> 1. Buka link Canva: https://www.canva.com/design/DAG4q7E_jHs/UO-HywbWzhXkhgHyAAlPqA/edit
> 2. Download gambar sebagai PNG atau JPG
> 3. Simpan dengan nama `lms-platform-preview.png` di folder `images/`
> 4. Gambar akan otomatis tampil di README

## Project Structure

```
LMS Platform/
├── src/                           # TypeScript source files
│   ├── frontend/                  # Frontend TypeScript
│   │   ├── app.ts                 # Main frontend application
│   │   └── api.ts                 # API utility functions
│   ├── backend/                   # Backend TypeScript
│   │   ├── server-optimized.ts    # Optimized Express server
│   │   ├── server.ts              # Original server (legacy)
│   │   ├── data-storage-async.ts  # Async file I/O
│   │   ├── middleware/            # Middleware functions
│   │   │   ├── auth.ts            # JWT authentication
│   │   │   └── security.ts        # Input validation & sanitization
│   │   └── utils/                 # Utility functions
│   │       ├── password.ts        # Password hashing
│   │       └── rateLimiter.ts     # Rate limiting
│   └── types/                     # Shared type definitions
│       └── index.ts                # TypeScript interfaces and types
├── dist/                          # Compiled JavaScript (generated)
│   ├── frontend/                  # Compiled frontend JS
│   └── backend/                   # Compiled backend JS
├── data/                          # Persistent data storage (JSON files)
│   ├── users.json                 # User data
│   ├── courses.json               # Course data
│   ├── enrollments.json           # Enrollment data
│   ├── assignments.json           # Assignment data
│   └── counters.json              # ID counters
├── components/                    # HTML components
│   ├── auth-modal.html            # Login/Register modal
│   ├── admin-dashboard.html       # Admin dashboard
│   └── student-dashboard.html     # Student dashboard
├── images/                        # Images for documentation
├── index.html                     # Main HTML file
├── styles.css                     # CSS styling
├── tsconfig.json                  # Main TypeScript config
├── tsconfig.frontend.json         # Frontend TypeScript config
├── tsconfig.backend.json          # Backend TypeScript config
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Features

### Core Features Implemented:

1. **Authentication & Authorization**
   - Sign Up / Login functionality
   - Role-based access (Student, Admin)

2. **Content/Service Management**
   - Admin can create, update, and delete courses/modules

3. **User Interaction Flow**
   - Students can enroll in courses
   - Students can submit assignments

4. **Tracking & Status**
   - Students can view learning progress
   - Students can view assignment status

5. **Update or Cancel Action**
   - Students can re-submit or update submissions (before grading)

6. **Browse & Search**
   - Users can search/filter available courses

7. **Dashboard**
   - Student dashboard shows enrolled courses & tasks
   - Admin dashboard shows course management activities

8. **Deployment Ready**
   - Frontend and Backend can be deployed and accessed online

## Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. Build TypeScript to JavaScript:
```bash
npm run build
```

Or build separately:
```bash
npm run build:frontend  # Build frontend only
npm run build:backend   # Build backend only
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Or run separately:
```bash
npm run dev:backend   # Backend with auto-reload
npm run dev:frontend  # Frontend with watch mode
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## TypeScript vs JavaScript

### TypeScript Files (Source Code)
- **Location**: `src/` directory
- **Frontend**: 
  - `src/frontend/app.ts` - Main frontend application
  - `src/frontend/api.ts` - API utility functions
- **Backend**: 
  - `src/backend/server-optimized.ts` - Optimized server (recommended)
  - `src/backend/server.ts` - Original server (legacy)
  - `src/backend/data-storage-async.ts` - Async file I/O
  - `src/backend/middleware/` - Authentication & security middleware
  - `src/backend/utils/` - Password hashing & rate limiting
- **Types**: `src/types/index.ts`

### JavaScript Files (Compiled)
- **Location**: `dist/` directory (generated after build)
- **Frontend**: `dist/frontend/frontend/app.js`
- **Backend**: `dist/backend/backend/server-optimized.js`

**Note**: The `dist/` folder is generated automatically when you run `npm run build`. Do not edit files in `dist/` directly - edit the TypeScript source files in `src/` instead.

### Data Storage
- **Location**: `data/` directory
- **Files**: 
  - `users.json` - User accounts
  - `courses.json` - Course data
  - `enrollments.json` - Student enrollments
  - `assignments.json` - Student assignments
  - `counters.json` - ID counters
- **Note**: Data persisten dan tidak hilang saat server restart

## Development Workflow

1. **Edit TypeScript files** in `src/` directory
2. **Build** the project: `npm run build`
3. **Run** the server: `npm start`
4. **Test** in browser at `http://localhost:3000`

For development, use `npm run dev` which watches for changes and rebuilds automatically.

## Usage

### For Students:
1. Register/Login as a Student
2. Browse available courses
3. Enroll in courses
4. Submit assignments
5. View progress and assignment status
6. Update assignments before they are graded

### For Admins:
1. Register/Login as an Admin
2. Access Admin Panel
3. Create, edit, and delete courses
4. Manage course content

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (atau update password jika email sudah ada)
- `POST /api/auth/login` - Login user (returns JWT token)
- `POST /api/auth/reset-password` - Reset password dengan email
- `PUT /api/auth/change-password` - Change password (authenticated, requires current password)
- `PUT /api/auth/update-email` - Update email (authenticated)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Enrollment
- `POST /api/courses/:id/enroll` - Enroll in course (Student only)

### Student Data
- `GET /api/students/:id/courses` - Get enrolled courses
- `GET /api/students/:id/assignments` - Get student assignments

### Assignments
- `POST /api/assignments` - Submit assignment (Student only)
- `PUT /api/assignments/:id` - Update assignment (Student only)
- `GET /api/assignments/:id` - Get assignment details

## Technologies Used

- **Frontend**: HTML5, CSS3, TypeScript (compiled to JavaScript)
- **Backend**: Node.js, Express.js, TypeScript (compiled to JavaScript)
- **Type System**: TypeScript with strict type checking
- **Storage**: File-based JSON storage (persistent, async I/O)
- **Security**: bcrypt (password hashing), JWT (authentication), Helmet (security headers)
- **Validation**: express-validator (input validation)
- **Rate Limiting**: express-rate-limit
- **Compression**: compression middleware

## TypeScript Configuration

- **Main Config**: `tsconfig.json` - Base configuration
- **Frontend Config**: `tsconfig.frontend.json` - ES2020 modules for browser
- **Backend Config**: `tsconfig.backend.json` - CommonJS for Node.js

## 🔄 Recent Updates & Improvements

### **Security Enhancements** 🔒

- ✅ **Password Hashing**: Password sekarang di-hash dengan bcrypt (salt rounds 10)
- ✅ **JWT Authentication**: Mengganti simple Bearer token dengan JWT untuk keamanan lebih baik
- ✅ **Input Validation**: Validasi lengkap untuk semua input (email, password, name, dll)
- ✅ **XSS Protection**: Sanitization input untuk mencegah XSS attacks
- ✅ **Rate Limiting**: Mencegah brute force attacks (5 req/15min untuk auth, 100 req/15min untuk API)
- ✅ **Security Headers**: Helmet middleware untuk security headers (CSP, XSS Protection, dll)
- ✅ **Safe Error Handling**: Error messages tidak expose informasi sensitif

### **Performance Optimizations** ⚡

- ✅ **Async File I/O**: Menggunakan `fs/promises` untuk non-blocking operations
- ✅ **Response Compression**: Gzip compression untuk mengurangi ukuran response
- ✅ **Optimized Data Access**: Efficient array operations dan proper error handling

### **New Features** 🎉

- ✅ **Reset Password**: Fitur "Forgot Password" untuk reset password dengan email
- ✅ **Update Password**: Bisa update password dengan register menggunakan email yang sama
- ✅ **Password Validation**: Validasi password dengan keterangan di form (min 6 chars, uppercase, lowercase, number)
- ✅ **Session Persistence**: User tetap login setelah refresh browser
- ✅ **Auto Redirect**: Auto redirect ke dashboard sesuai role setelah login/refresh

### **Bug Fixes** 🐛

- ✅ **Edit/Delete Buttons**: Fixed tombol Edit dan Delete yang tidak bisa diklik (menggunakan event delegation)
- ✅ **Data Persistence**: Fixed data hilang setelah refresh (menggunakan file-based storage)
- ✅ **JSON Parse Error**: Fixed error parsing response dari rate limiter
- ✅ **Validation Error**: Improved error messages untuk validation failures

### **Code Improvements** 💻

- ✅ **API Centralization**: Semua API calls di-centralize di `src/frontend/api.ts`
- ✅ **Modular Structure**: Middleware dan utilities dipisah ke file terpisah
- ✅ **Type Safety**: Improved TypeScript types dan interfaces
- ✅ **Error Handling**: Better error handling di frontend dan backend

---

## Notes

- ✅ **Storage**: Sekarang menggunakan file-based JSON storage (persistent, tidak hilang saat restart)
- ✅ **Password Security**: Password di-hash dengan bcrypt (tidak lagi plain text)
- ✅ **Authentication**: Menggunakan JWT tokens untuk authentication
- ✅ **Data Persistence**: Data tersimpan di folder `data/` (users.json, courses.json, dll)
- ✅ **Session Management**: User session persisten dengan localStorage
- ✅ **TypeScript**: Type safety dan better IDE support
- ✅ **Production Ready**: Aplikasi sudah dioptimalkan untuk production dengan security best practices

**Untuk production deployment:**
- Set environment variables (JWT_SECRET, PORT, FRONTEND_URL)
- Gunakan database (MongoDB/PostgreSQL) untuk scale yang lebih besar
- Setup HTTPS/SSL certificate
- Setup monitoring dan logging

## 📚 Documentation

Dokumentasi lengkap tersedia di file-file berikut:

- **`OPTIMASI_DAN_KEAMANAN.md`** - Detail lengkap tentang optimasi dan keamanan
- **`FITUR_RESET_PASSWORD.md`** - Panduan fitur reset password
- **`VALIDASI_PASSWORD_DENGAN_KETERANGAN.md`** - Panduan validasi password
- **`FIX_EDIT_DELETE_BUTTON.md`** - Fix tombol Edit dan Delete
- **`CARA_MENGGUNAKAN_SERVER_OPTIMIZED.md`** - Cara menggunakan server yang dioptimalkan

## Future Enhancements

- ✅ ~~Database integration~~ (Sekarang menggunakan file-based storage, bisa upgrade ke database)
- ✅ ~~Password hashing~~ (Sudah diimplementasi dengan bcrypt)
- ✅ ~~JWT authentication~~ (Sudah diimplementasi)
- File upload for assignments
- Email notifications untuk reset password
- Real-time notifications
- Course content (videos, documents)
- Grading system for admins
- Discussion forums
- Certificates
- User profile management
- Course search dan filtering yang lebih advanced
