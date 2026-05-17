# DRIFTARA

An elegant full-stack vacation rental platform where travelers discover memorable stays and hosts publish, manage, and showcase properties with photos, maps, and trusted reviews.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/View%20Engine-EJS-8A2BE2)
![License](https://img.shields.io/badge/License-ISC-blue)

## Project Links

- Repository: https://github.com/AnkitPandey2005/Driftara
- Live Demo: Add your deployed link here

## Overview

DRIFTARA is designed as a production-style property listing application with secure authentication, media uploads, location discovery, and review workflows. The goal is a clean user experience backed by maintainable server architecture.

## Core Features

- User authentication with signup, login, and logout
- Create, edit, and delete listings with ownership protection
- Upload listing images using Cloudinary
- Add and remove reviews with author-based permissions
- Category-based browsing and property discovery
- Map integration for listing location context
- Server-side schema validation using Joi
- Flash messaging for meaningful UI feedback

## Tech Stack

- Runtime: Node.js
- Server Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: Passport.js, passport-local, passport-local-mongoose
- Templating: EJS with ejs-mate
- File Upload: Multer + multer-storage-cloudinary
- Session Store: express-session + connect-mongo
- Validation: Joi

## Architecture Snapshot

```text
DRIFTARA/
  controllers/      # Request handlers
  init/             # Seed scripts and initial data
  models/           # Mongoose models
  public/           # Static assets (CSS, JS, images)
  routes/           # Route declarations
  utils/            # Utility helpers
  views/            # EJS templates
  app.js            # Application entry point
```

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/AnkitPandey2005/Driftara.git
cd Driftara
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (use `.env.example` as reference).

Required:

- ATLASDB_URL
- SECRET
- CLOUD_NAME
- CLOUD_API_KEY
- CLOUD_API_SECRET

Optional:

- PORT
- SESSION_DB_URL
- NODE_ENV

### 4. Seed initial data (optional)

```bash
npm run seed
```

### 5. Run the application

```bash
npm start
```

Application URL: http://localhost:8080

## Available Scripts

- `npm start` - Start the application
- `npm run dev` - Run in development mode
- `npm run seed` - Populate database with sample listings

## Security Best Practices

- Do not commit `.env` to version control
- Rotate keys immediately if credentials are ever exposed
- Use a strong, unique value for `SECRET` in production
- Restrict database and Cloudinary permissions to minimum required scope

## Screenshots



- Home page
- Listings grid and filters
- Listing details page
- Add/Edit listing forms
- Authentication pages

## Deployment

Before deploying, confirm:

- All environment variables are set in the hosting platform
- MongoDB connection is production-ready
- Cloudinary credentials are valid
- `NODE_ENV=production`

## Roadmap

- Booking calendar and availability engine
- Secure payments integration
- Wishlist and saved properties
- Advanced filtering and sorting
- Admin moderation tools

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request

## License

ISC

---

Built and maintained by Ankit Pandey
