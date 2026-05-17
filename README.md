# DRIFTARA

A modern vacation-rental web app where travelers discover unique stays and hosts share their properties with rich photos, maps, and reviews.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

## Live Links

- GitHub Repository: https://github.com/AnkitPandey2005/Driftara
- Deployment: Add your live URL here

## Why DRIFTARA

DRIFTARA is built to feel fast, visual, and practical:

- Smooth listing browse experience with category filters
- Secure authentication flow for users
- Cloud image upload support
- Location map rendering on listing pages
- Review and rating system for trust

## Features

- User signup, login, logout
- Create, edit, and delete listings
- Add and delete reviews
- Protected routes and ownership checks
- Server-side validation with Joi
- Flash messages for user feedback
- Responsive UI using EJS templates and custom CSS

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Authentication: Passport.js, passport-local, passport-local-mongoose
- Templating: EJS + ejs-mate
- Uploads: Multer + Cloudinary
- Validation: Joi
- Sessions: express-session + connect-mongo

## Project Structure

```text
DRIFTARA/
  controllers/
  init/
  models/
  public/
    css/
    images/
    js/
  routes/
  utils/
  views/
    includes/
    layouts/
    listings/
    users/
  app.js
  cloudConfig.js
  middlewares.js
  schemaValidation.js
  package.json
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/AnkitPandey2005/Driftara.git
cd Driftara
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the root using values from `.env.example`.

Required variable names:

- ATLASDB_URL
- SECRET
- CLOUD_NAME
- CLOUD_API_KEY
- CLOUD_API_SECRET

Optional:

- PORT
- SESSION_DB_URL
- NODE_ENV

### 4. Seed sample data (optional)

```bash
npm run seed
```

### 5. Start app

```bash
npm start
```

Open http://localhost:8080

## Scripts

- `npm start`: Start server
- `npm run dev`: Start server in dev mode
- `npm run seed`: Seed listings data

## Security Notes

- Never commit your `.env` file
- Rotate credentials immediately if secrets are exposed
- Use strong values for `SECRET` in production

## Screenshots

Add screenshots here:

- Home page
- Listing detail page
- Create listing page
- Authentication pages

## Deployment Checklist

- Set all environment variables in your hosting platform
- Use a production MongoDB URL
- Set `NODE_ENV=production`
- Confirm Cloudinary credentials are valid

## Future Enhancements

- Booking calendar and availability management
- Payment integration
- Wishlist/favorites system
- Advanced search and sorting
- Admin moderation panel

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

ISC

---

Built by Ankit Pandey
