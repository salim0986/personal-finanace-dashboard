# Full Stack App – NestJS + PostgreSQL + Next.js

This is a full-stack web application built with:

- 🔧 **Backend**: NestJS with TypeORM and PostgreSQL
- 🌐 **Frontend**: Next.js (React-based framework)

---

## 📁 Project Structure

```
root/
│
├── backend/       # NestJS + TypeORM API
│   ├── src/
│   └── ...
│
├── frontend/      # Next.js frontend app
│   ├── app/
│   └── ...
│
├── README.md
└── ...
```

---

## 🚀 Getting Started

### 🔹 Prerequisites

- Node.js (v18 or above)
- PostgreSQL installed and running
- pnpm / yarn / npm
- `git` CLI

---

## 🔧 Backend Setup (NestJS + TypeORM)

1. **Go to backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure database**:  
   Edit `src/app.module.ts` or `.env` if used:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

4. **Run the development server**:
   ```bash
   npm run start:dev
   ```

   App will be running at: `http://localhost:3001` (or your configured port)

---

## 💻 Frontend Setup (Next.js)

1. **Go to frontend folder**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   App will be running at: `http://localhost:3000`

---

## 🌐 API Routes (Sample)

Assuming you're building a user-profile system:

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/users`          | Get all users            |
| POST   | `/users`          | Create a new user        |
| GET    | `/profiles`       | Get all profiles         |
| POST   | `/users/:id/profile` | Create profile for user |

---

## 🧰 Tech Stack

### Backend:
- NestJS
- TypeORM
- PostgreSQL
- class-validator / class-transformer

### Frontend:
- Next.js (App or Pages router)
- React
- Axios or Fetch API
- TailwindCSS (optional)

---

## 📦 Scripts

### Backend:

| Command             | Description                |
|---------------------|----------------------------|
| `npm run start:dev` | Run NestJS server in dev   |
| `npm run build`     | Build for production       |
| `npm run test`      | Run unit tests             |

### Frontend:

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Run Next.js dev server     |
| `npm run build`| Build frontend for prod    |
| `npm run start`| Start built app            |

---

## ✅ Features

- User Authentication (Optional)
- CRUD API with NestJS
- PostgreSQL with TypeORM entities
- Separate frontend using Next.js
- Modular architecture (each module = separate concern)
- Scalable file structure


---

## 📄 License

This project is open-sourced under the MIT License.

---

## 🙌 Author

Built with ❤️ by [Mohd Saalim](https://github.com/salim0986)
