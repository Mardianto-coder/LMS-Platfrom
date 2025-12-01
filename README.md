# Learning Management System (LMS)

A comprehensive Learning Management System built with **TypeScript** (Frontend & Backend) and compiled to JavaScript.

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
├── spec/                          # Unit tests (Jasmine)
│   ├── frontend/                  # Frontend tests
│   ├── backend/                   # Backend tests
│   └── helpers/                   # Test helpers
├── images/                        # Images for documentation
├── index.html                     # Main HTML file
├── styles.css                     # CSS styling
├── .env.example                   # Environment variables template
├── jasmine.json                   # Jasmine test configuration
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
   - Student dashboard "My Tasks" section menampilkan assignments grouped by status (Graded, Submitted, Pending) dengan informasi lengkap (score, feedback, course title)
   - Student dashboard "Learning Progress" section menampilkan semua enrolled courses dengan progress tracking
   - Admin dashboard shows course management activities

8. **Deployment Ready**
   - Frontend and Backend can be deployed and accessed online

## Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. **Setup Environment Variables** (REQUIRED):
```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dan isi JWT_SECRET
# Generate secret yang kuat:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**PENTING:** JWT_SECRET wajib di-set untuk keamanan. Lihat `SETUP_ENVIRONMENT.md` untuk detail.

3. Build TypeScript to JavaScript:
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

### **Testing**

Run unit tests:
```bash
npm test
```

Run tests in watch mode (auto-reload saat file berubah):
```bash
npm run test:watch
```

**Lihat `TESTING.md` untuk panduan lengkap testing.**

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
- **Security**: 
  - bcrypt (password hashing)
  - JWT (authentication) dengan environment variable
  - Helmet (security headers, CSP)
  - express-validator (input validation)
  - express-rate-limit (rate limiting)
- **Testing**: Jasmine (unit testing framework), ts-node (TypeScript execution)
- **Environment**: dotenv (environment variables)
- **Compression**: compression middleware

## TypeScript Configuration

- **Main Config**: `tsconfig.json` - Base configuration
- **Frontend Config**: `tsconfig.frontend.json` - ES2020 modules for browser
- **Backend Config**: `tsconfig.backend.json` - CommonJS for Node.js

## 🔄 Recent Updates & Improvements

### **Security Enhancements** 🔒 (Updated)

- ✅ **Password Hashing**: Password sekarang di-hash dengan bcrypt (salt rounds 10)
- ✅ **JWT Authentication**: Mengganti simple Bearer token dengan JWT untuk keamanan lebih baik
- ✅ **JWT_SECRET from Environment**: JWT_SECRET sekarang **WAJIB** dari environment variable (tidak lagi hardcoded)
- ✅ **CSP Improvements**: Content Security Policy lebih strict (removed unsafe-eval, strict untuk production)
- ✅ **Input Validation**: Validasi lengkap untuk semua input (email, password, name, dll)
- ✅ **XSS Protection**: Sanitization input untuk mencegah XSS attacks
- ✅ **Rate Limiting**: Mencegah brute force attacks (5 req/15min untuk auth, 100 req/15min untuk API)
- ✅ **Security Headers**: Helmet middleware untuk security headers (CSP, XSS Protection, HSTS, dll)
- ✅ **Safe Error Handling**: Error messages tidak expose informasi sensitif
- ✅ **Environment Variables**: Setup dotenv untuk load environment variables dari `.env` file

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
- ✅ **Enhanced My Tasks Section**: "My Tasks" section sekarang menampilkan informasi lengkap seperti "Learning Progress":
  - Grouped by status (Graded, Submitted, Pending)
  - Menampilkan score dan feedback untuk graded assignments
  - Menampilkan course title untuk setiap assignment
  - Color-coded status indicators (green untuk graded, yellow untuk submitted, grey untuk pending)
- ✅ **Improved Learning Progress**: Semua enrolled courses sekarang muncul di "Learning Progress" meskipun belum ada assignments, dengan pesan "No assignments submitted yet"

### **Bug Fixes** 🐛

- ✅ **Edit/Delete Buttons**: Fixed tombol Edit dan Delete yang tidak bisa diklik (menggunakan event delegation)
- ✅ **Data Persistence**: Fixed data hilang setelah refresh (menggunakan file-based storage)
- ✅ **JSON Parse Error**: Fixed error parsing response dari rate limiter
- ✅ **Validation Error**: Improved error messages untuk validation failures
- ✅ **Duplicate Event Listeners**: Fixed duplicate event listeners di student dashboard yang menyebabkan multiple event handlers (menambahkan flag `eventListenersSetup` untuk prevent duplicate setup)
- ✅ **My Tasks Section Visibility**: Fixed "My Tasks" section yang tidak muncul karena off-screen positioning (`left: -9967px`) - sekarang menggunakan `!important` flags untuk override positioning dan auto-scroll ke viewport
- ✅ **Learning Progress Display**: Fixed "Learning Progress" untuk menampilkan semua enrolled courses meskipun belum ada assignments (tidak lagi menggunakan `|| 1` untuk total)

### **Code Improvements** 💻

- ✅ **API Centralization**: Semua API calls di-centralize di `src/frontend/api.ts`
- ✅ **Modular Structure**: Middleware dan utilities dipisah ke file terpisah
- ✅ **Type Safety**: Improved TypeScript types dan interfaces
- ✅ **Error Handling**: Better error handling di frontend dan backend
- ✅ **Logging**: Added comprehensive logging untuk debugging (server dan client)
- ✅ **Type Guards**: Improved type safety dengan type guards untuk JWT_SECRET
- ✅ **Event Listener Management**: Implemented event listener tracking untuk prevent duplicate listeners dengan `clickHandlers` array
- ✅ **Positioning Fixes**: Added comprehensive positioning fixes dengan `!important` flags untuk override CSS yang hide elements
- ✅ **Viewport Detection**: Added viewport detection dan auto-scroll untuk memastikan sections visible setelah rendering

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
- ✅ **WAJIB**: Set environment variables (JWT_SECRET, PORT, FRONTEND_URL, NODE_ENV=production)
- ✅ **WAJIB**: Generate JWT_SECRET yang kuat dan unik
- ✅ **WAJIB**: Setup HTTPS/SSL certificate
- ⚠️ **Disarankan**: Gunakan database (MongoDB/PostgreSQL) untuk scale yang lebih besar
- ⚠️ **Disarankan**: Setup monitoring dan logging
- ⚠️ **Disarankan**: Security audit dan penetration testing

**Lihat `SETUP_ENVIRONMENT.md` untuk panduan lengkap setup production.**

### **Testing** 🧪 (NEW)

- ✅ **Unit Testing dengan Jasmine**: Setup unit testing framework menggunakan Jasmine
- ✅ **Test Files**: Contoh test untuk password validator dan password utilities
- ✅ **Test Scripts**: `npm test` untuk menjalankan tests, `npm run test:watch` untuk watch mode
- ✅ **TypeScript Support**: Tests bisa ditulis dalam TypeScript dengan ts-node
- ✅ **Test Coverage**: Test untuk fungsi-fungsi penting (password hashing, validation)

### **Environment Setup** 🔧 (NEW)

- ✅ **Environment Variables**: Setup `.env` file untuk configuration
- ✅ **JWT_SECRET Required**: JWT_SECRET sekarang wajib dari environment variable
- ✅ **dotenv Integration**: Automatic load environment variables dari `.env` file
- ✅ **.env.example**: Template file untuk environment variables
- ✅ **Production Ready**: Validation untuk production environment

---

## 📚 Documentation

Dokumentasi lengkap tersedia di file-file berikut:

### **Security & Setup:**
- **`ANALISIS_KEAMANAN.md`** - Analisis lengkap keamanan aplikasi (Security Score: 9.0/10)
- **`PERBAIKAN_KEAMANAN.md`** - Detail perbaikan keamanan yang telah dilakukan
- **`SETUP_ENVIRONMENT.md`** - Panduan setup environment variables
- **`FIX_JWT_SECRET.md`** - Fix untuk JWT_SECRET warning
- **`OPTIMASI_DAN_KEAMANAN.md`** - Detail lengkap tentang optimasi dan keamanan
- **`KEAMANAN_APLIKASI.md`** - Dokumentasi keamanan aplikasi

### **Testing:**
- **`TESTING.md`** - Panduan lengkap unit testing dengan Jasmine
- **`TROUBLESHOOTING_TESTING.md`** - Troubleshooting untuk testing
- **`QUICK_FIX_TESTING.md`** - Quick fix untuk error testing
- **`CARA_TEST_OTOMATIS.md`** - Cara test berjalan otomatis
- **`PENJELASAN_TEST_WATCH.md`** - Penjelasan output test watch mode

### **Features & Usage:**
- **`FITUR_RESET_PASSWORD.md`** - Panduan fitur reset password
- **`VALIDASI_PASSWORD_DENGAN_KETERANGAN.md`** - Panduan validasi password
- **`CARA_MENGGUNAKAN_SERVER_OPTIMIZED.md`** - Cara menggunakan server yang dioptimalkan
- **`API_DOCUMENTATION.md`** - Dokumentasi lengkap API endpoints

### **Troubleshooting:**
- **`FIX_EDIT_DELETE_BUTTON.md`** - Fix tombol Edit dan Delete
- **`FIX_REFRESH_BROWSER.md`** - Fix data hilang saat refresh browser
- **`FIX_UPDATE_SUBMISSION_BUTTON.md`** - Fix tombol "Update Submission" di student dashboard
- **`DEBUG_REFRESH.md`** - Debug guide untuk masalah refresh
- **`SOLUSI_DATA_HILANG.md`** - Solusi data hilang
- **`TROUBLESHOOTING.md`** - General troubleshooting guide

### **Latest Fixes (December 2025):**
- ✅ **Duplicate Event Listeners**: Fixed issue dimana event listeners ditambahkan multiple times, menyebabkan console logs berulang dan event handlers dipanggil beberapa kali. Solusi: Implemented event listener tracking dengan `eventListenersSetup` flag dan `clickHandlers` array.
- ✅ **My Tasks Section Visibility**: Fixed "My Tasks" section yang tidak muncul karena positioned off-screen (`left: -9967px`). Solusi: Menggunakan `!important` flags untuk override positioning, reset positioning di `loadStudentData()` dan `showPage()`, serta auto-scroll ke viewport.
- ✅ **Learning Progress Display**: Fixed "Learning Progress" untuk menampilkan semua enrolled courses meskipun belum ada assignments. Solusi: Removed `|| 1` dari total calculation dan menampilkan "No assignments submitted yet" untuk courses tanpa assignments.
- ✅ **My Tasks Enhanced Display**: Updated "My Tasks" section untuk menampilkan informasi lengkap seperti "Learning Progress" dengan grouping berdasarkan status (Graded, Submitted, Pending), menampilkan score, feedback, dan course title.

## Available Scripts

- `npm run build` - Build frontend dan backend
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only
- `npm start` - Build dan start server
- `npm run dev` - Development mode dengan auto-reload
- `npm run dev:backend` - Backend dengan auto-reload
- `npm run dev:frontend` - Frontend dengan watch mode
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests dengan watch mode
- `npm run start:safe` - Run tests sebelum start
- `npm run dev:safe` - Run tests sebelum dev

## 🎯 Challenges Faced & Solutions

### **1. Duplicate Event Listeners Issue**
**Challenge**: Event listeners ditambahkan multiple times saat `initApp()` dipanggil beberapa kali, menyebabkan:
- Console logs berulang
- Event handlers dipanggil beberapa kali untuk satu action
- Performance degradation

**Solution**: 
- Implemented `eventListenersSetup` flag untuk prevent duplicate setup
- Created `clickHandlers` array untuk track semua event listeners
- Added check di awal `setupEventListeners()` untuk skip jika sudah setup

### **2. My Tasks Section Visibility Issue**
**Challenge**: Section "My Tasks" tidak muncul di UI meskipun HTML sudah di-generate dan di-insert ke DOM. Masalahnya:
- Section positioned off-screen (`left: -9967px`) karena kode untuk admin yang memindahkan `studentDashboard` ke off-screen
- Section berada di luar viewport (di bawah layar)
- CSS positioning conflicts

**Solution**:
- Reset positioning di `loadStudentData()` dengan `position: relative` dan `left: auto`
- Reset positioning di `showPage()` untuk student users dengan `!important` flags
- Added viewport detection dan auto-scroll ke section jika berada di luar viewport
- Force reset positioning dengan `cssText` dan `!important` flags di `displayTasks()`

### **3. Learning Progress Display Issue**
**Challenge**: 
- Courses tanpa assignments tidak muncul di "Learning Progress"
- Calculation `total = courseAssignments.length || 1` menyebabkan progress calculation tidak akurat

**Solution**:
- Removed `|| 1` dari total calculation
- Menampilkan "No assignments submitted yet" untuk courses tanpa assignments
- Memastikan semua enrolled courses muncul meskipun belum ada assignments

### **4. Event Delegation Complexity**
**Challenge**: Multiple event handlers untuk similar actions menyebabkan code duplication dan maintenance issues

**Solution**:
- Consolidated multiple click handlers menjadi satu handler utama
- Used event delegation dengan data attributes (`data-action`, `data-course-id`, `data-assignment-id`)
- Removed inline `onclick` handlers untuk better maintainability

### **5. State Management**
**Challenge**: 
- `currentUser` state tidak selalu sync dengan localStorage
- Data hilang setelah refresh browser

**Solution**:
- Refresh `currentUser` dari localStorage di setiap `showPage()` call
- Implemented proper state management dengan localStorage persistence
- Added proper error handling untuk localStorage operations

## 🚀 Future Improvements & Enhancements

### **High Priority** 🔴

- ✅ ~~Database integration~~ (Sekarang menggunakan file-based storage, bisa upgrade ke database)
- ✅ ~~Password hashing~~ (Sudah diimplementasi dengan bcrypt)
- ✅ ~~JWT authentication~~ (Sudah diimplementasi)
- ✅ ~~Unit Testing~~ (Sudah diimplementasi dengan Jasmine)
- ✅ ~~Environment Variables~~ (Sudah diimplementasi dengan dotenv)
- ✅ ~~Security Improvements~~ (JWT_SECRET, CSP improvements)
- ✅ ~~Event Listener Management~~ (Sudah diimplementasi dengan tracking system)
- ✅ ~~My Tasks Section Enhancement~~ (Sudah diimplementasi dengan grouped display)
- **Database Migration**: Migrate dari file-based storage ke database (PostgreSQL/MongoDB) untuk better scalability
- **Real-time Updates**: Implement WebSocket atau Server-Sent Events untuk real-time notifications
- **File Upload System**: Support untuk file upload di assignments (PDF, images, documents)
- **Email Service Integration**: Email notifications untuk reset password, assignment graded, dll

### **Medium Priority** 🟡

- **Advanced Search & Filtering**: 
  - Full-text search untuk courses dan assignments
  - Advanced filtering (by date, status, category, score range)
  - Sorting options (by date, name, progress)
- **Course Content Management**:
  - Video lectures integration
  - Document attachments
  - Interactive quizzes
  - Course modules/chapters
- **Enhanced Grading System**:
  - Rubric-based grading
  - Bulk grading untuk multiple assignments
  - Grade history dan analytics
- **User Profile Management**:
  - Profile picture upload
  - Bio and preferences
  - Activity history
  - Achievement badges

### **Low Priority** 🟢

- **Discussion Forums**: 
  - Course-specific discussion boards
  - Q&A sections
  - Peer-to-peer communication
- **Certificates**: 
  - Auto-generate certificates setelah course completion
  - PDF certificate download
- **Analytics Dashboard**:
  - Student progress analytics
  - Course completion rates
  - Assignment submission trends
- **Mobile App**: 
  - React Native atau Flutter mobile app
  - Push notifications
- **Internationalization (i18n)**:
  - Multi-language support
  - Localized date/time formats
- **Accessibility Improvements**:
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
- **Performance Optimizations**:
  - Code splitting
  - Lazy loading
  - Image optimization
  - Caching strategies
- **Test Coverage**:
  - Increase test coverage to 80%+
  - Integration tests
  - E2E tests dengan Playwright/Cypress
- **CI/CD Pipeline**:
  - Automated testing
  - Automated deployment
  - Code quality checks
- **Documentation**:
  - API documentation dengan Swagger/OpenAPI
  - Developer guide
  - User manual

### **Technical Debt** 🔧

- **Refactor Code Structure**:
  - Split large files (`app.ts` ~2300 lines) menjadi smaller modules
  - Better separation of concerns
  - Implement design patterns (MVC, Repository pattern)
- **Type Safety Improvements**:
  - Stricter TypeScript configuration
  - Better type definitions
  - Remove `any` types
- **Error Handling**:
  - Centralized error handling
  - Better error messages
  - Error logging service
- **Code Documentation**:
  - JSDoc comments untuk semua functions
  - Inline documentation
  - Architecture documentation
- **Performance Monitoring**:
  - Add performance monitoring tools
  - Track API response times
  - Monitor memory usage
- **Security Audit**:
  - Regular security audits
  - Dependency vulnerability scanning
  - Penetration testing
