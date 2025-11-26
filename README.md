# Learning Management System (LMS)

A comprehensive Learning Management System built with **TypeScript** (Frontend & Backend) and compiled to JavaScript.

## Project Structure

```
Bank/
├── src/                    # TypeScript source files
│   ├── frontend/          # Frontend TypeScript
│   │   └── app.ts         # Main frontend application
│   ├── backend/           # Backend TypeScript
│   │   └── server.ts       # Express server
│   └── types/             # Shared type definitions
│       └── index.ts       # TypeScript interfaces and types
├── dist/                  # Compiled JavaScript (generated)
│   ├── frontend/          # Compiled frontend JS
│   └── backend/           # Compiled backend JS
├── index.html             # Main HTML file
├── styles.css             # CSS styling
├── tsconfig.json          # Main TypeScript config
├── tsconfig.frontend.json # Frontend TypeScript config
├── tsconfig.backend.json  # Backend TypeScript config
├── package.json           # Dependencies and scripts
└── README.md              # This file
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
- **Frontend**: `src/frontend/app.ts`
- **Backend**: `src/backend/server.ts`
- **Types**: `src/types/index.ts`

### JavaScript Files (Compiled)
- **Location**: `dist/` directory (generated after build)
- **Frontend**: `dist/frontend/app.js`
- **Backend**: `dist/backend/server.js`

**Note**: The `dist/` folder is generated automatically when you run `npm run build`. Do not edit files in `dist/` directly - edit the TypeScript source files in `src/` instead.

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
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

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
- **Storage**: In-memory (can be replaced with database)

## TypeScript Configuration

- **Main Config**: `tsconfig.json` - Base configuration
- **Frontend Config**: `tsconfig.frontend.json` - ES2020 modules for browser
- **Backend Config**: `tsconfig.backend.json` - CommonJS for Node.js

## Notes

- The current implementation uses in-memory storage. For production, replace with a proper database (MongoDB, PostgreSQL, etc.)
- Passwords are stored in plain text. In production, use bcrypt or similar for hashing
- Add JWT tokens for better authentication security
- The application includes fallback functionality if the API is unavailable
- TypeScript provides type safety and better IDE support
- All TypeScript files are compiled to JavaScript in the `dist/` folder

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Password hashing
- JWT authentication
- File upload for assignments
- Email notifications
- Real-time notifications
- Course content (videos, documents)
- Grading system for admins
- Discussion forums
- Certificates
