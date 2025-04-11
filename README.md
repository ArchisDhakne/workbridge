
```md
# WorkBridge – Role-Based Job Portal

**WorkBridge** is a full-stack MERN application that offers a role-based job portal system. Recruiters can post jobs, and users can browse, apply, and track their applications with dynamic statuses. The platform supports user authentication, job application tracking, and filtering/sorting based on application status or date.

---

## 🚀 Features

### 🧑‍💼 Recruiter Panel
- Add new job postings
- View all jobs posted
- Update or delete job listings

### 🙋‍♂️ User Panel
- Browse all job listings
- Apply for jobs (with pre-filled company & role fields)
- Track applied jobs
- Change application status (applied, interview, offer, rejected)
- Filter applied jobs by status or date

### 🔐 Role-Based Access
- Recruiter and User roles handled during sign-up/login
- Role-based dashboard rendering and access restrictions
- Protected routes via JWT authentication

---

## 🔧 Tech Stack

**Frontend**:
- React.js
- Tailwind CSS
- Axios
- React Router DOM

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js for password hashing

---

## 🗃️ Models

### 🧑 User
```js
{
  name,
  email,
  password,
  role: ['user', 'recruiter']
}
```

### 📄 Job (Recruiter posts)
```js
{
  title,
  company,
  location,
  description,
  postedBy (ref: User)
}
```

### 📌 Application (User applies)
```js
{
  user (ref: User),
  company,
  role,
  status: ['applied', 'interview', 'offer', 'rejected'],
  date,
  link
}
```

---

## 📁 Folder Structure

```
/client               --> React Frontend
  /components
  /pages
  /api
/server               --> Node.js Backend
  /models
  /routes
  /controllers
  /middleware
```

---

## 🔐 Authentication

- Passwords are hashed using bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected routes for recruiter/user-specific actions

---

## 🧭 How to Run

### 🔌 Backend
```bash
cd server
npm install
npm run dev
```

### 🌐 Frontend
```bash
cd client
npm install
npm start
```

---

## ✅ API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Jobs
- `POST /api/jobs` (recruiter)
- `GET /api/jobs` (public)
- `DELETE /api/jobs/:id` (recruiter)
- `PUT /api/jobs/:id` (recruiter)

### Applications
- `POST /api/applications` (user apply)
- `GET /api/applications/me` (user applications)
- `PATCH /api/applications/:id` (update status)
- `DELETE /api/applications/:id`

---
---

## ✨ Future Scope

- Resume upload & tracking
- Email notifications for status changes
- Admin dashboard
- Pagination for job listings

---

## 👨‍💻 Author

Made with ❤️ by Archis Dhakne
```

---

# workbridge
