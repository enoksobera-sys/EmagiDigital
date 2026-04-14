# 🎨 Emagi Digital - Luxury Digital Design Agency

A premium, sophisticated digital design agency website featuring a sleek black and gold theme, portfolio showcase, and a complete backend admin system for managing projects.

## ✨ Features

- **Luxury Design**: Black and gold color scheme with elegant typography
- **Responsive Layout**: Fully responsive design for all devices
- **Portfolio Showcase**: Dynamic portfolio management system
- **Services Section**: Beautifully displayed premium services
- **Admin Panel**: Secure admin interface for uploading and managing portfolio projects
- **WhatsApp & Instagram Integration**: Direct contact options for clients
- **Smooth Animations**: Elegant scroll reveals and hover effects
- **Backend API**: RESTful API for portfolio management

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with gradients and animations
- **JavaScript (Vanilla)**: Interactive elements and API interactions

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Express Session**: Session management for admin authentication
- **Multer**: File upload handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 🔐 Admin Panel

### Access Admin Panel
- Navigate to `http://localhost:3000/admin`
- Default password: `emagi2026`
- ⚠️ **IMPORTANT**: Change the default password in `server.js` before deploying to production!

### Admin Features
- **Add Projects**: Upload portfolio projects with title, category, description, and images
- **Manage Portfolio**: View, edit, and delete portfolio projects
- **Image Handling**: Base64 image encoding for seamless storage

## 📁 Project Structure

```
my-agency/
├── index.html          # Main landing page
├── styles.css          # Premium styling
├── script.js           # Frontend JavaScript
├── server.js           # Express server & admin panel
├── package.json        # Dependencies
├── README.md           # This file
└── data/
    └── portfolio.json  # Portfolio data storage
```

## 🎯 Customization

### Update Company Information
Edit the following in `index.html`:
- Company name and tagline
- WhatsApp number: Change `254794473854` to your number
- Instagram handle: Update `emagidigital` to your handle
- Email address: Update `hello@emagidigital.com`

### Change Admin Password
In `server.js`, find the line:
```javascript
if (password === 'emagi2026') {
```
Replace `'emagi2026'` with your secure password.

### Customize Colors
Edit these CSS variables in `styles.css`:
```css
--color-gold: #D4AF37;
--color-gold-dark: #AA8C2C;
--color-gold-light: #E5C158;
```

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item

### Admin Endpoints (Protected)
- `POST /api/portfolio` - Create new portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

## 💡 Usage Examples

### Adding a Portfolio Project
1. Login to admin panel at `/admin`
2. Fill in project details:
   - **Title**: Project name
   - **Category**: Select from predefined categories
   - **Description**: Project details
   - **Image**: Optional project image
3. Click "Add Project"
4. Project appears immediately on the public portfolio

### Accessing Portfolio via API
```javascript
// Fetch all projects
fetch('/api/portfolio')
  .then(res => res.json())
  .then(projects => console.log(projects));

// Fetch single project
fetch('/api/portfolio/1234567890')
  .then(res => res.json())
  .then(project => console.log(project));
```

## 🚨 Security Notes

1. **Change Default Password**: Update the admin password in `server.js` before deployment
2. **Use HTTPS**: Enable SSL/TLS in production
3. **Secure Sessions**: Use environment variables for session secrets
4. **Input Validation**: Add additional validation for file uploads
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Database**: Move from JSON file storage to a proper database (MongoDB, PostgreSQL, etc.)

## 📱 WhatsApp Integration

The website includes WhatsApp integration with pre-filled messages:
- Main CTA: "Start Project" button
- Contact section: Direct WhatsApp card

Update the phone number in:
- `index.html` line with `wa.me/254794473854`

## 📸 Instagram Integration

Update Instagram handle in:
- `index.html`: Change `emagidigital` to your handle
- Contact section links

## 🎨 Color Scheme

- **Primary**: Gold (#D4AF37)
- **Secondary**: Dark Gold (#AA8C2C)
- **Accent**: Light Gold (#E5C158)
- **Background**: Black (#0a0a0a)
- **Dark**: Very Dark (#1a1a1a)

## 📈 Performance Tips

1. Optimize images before uploading (compress to < 500KB)
2. Use WebP format for better compression
3. Implement CDN for static assets
4. Add caching headers for better performance
5. Minify CSS and JavaScript in production

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Admin Panel Not Loading
1. Clear browser cache
2. Check if session is enabled: `req.session` should exist
3. Verify cookies are enabled in browser

### Portfolio Not Showing
1. Check `/data/portfolio.json` exists
2. Verify API endpoint at `/api/portfolio` returns data
3. Check browser console for JavaScript errors

## 🚀 Deployment

### Heroku Deployment
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### DigitalOcean/VPS
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone project and install
git clone <repo>
cd my-agency
npm install

# Start with PM2
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

## 📝 License

MIT License - Feel free to use this template for your projects

## 👤 Support

For issues or customization requests, contact hello@emagidigital.com

---

**Built with ✨ for luxury brands**
