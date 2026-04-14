# 🚀 Emagi Digital - Complete Setup Guide

## 📦 What's Included

This is a **complete, production-ready luxury digital design agency website** with:

### Frontend
- ✨ Stunning black and gold luxury design
- 📱 Fully responsive on all devices
- 🎨 Smooth animations and elegant transitions
- ⚡ Fast-loading with optimized CSS
- 🔗 Integrated WhatsApp and Instagram contact options

### Backend
- 🛠️ Node.js + Express.js server
- 🔐 Secure admin authentication system
- 📊 Portfolio management system
- 💾 JSON-based data storage (easily upgradeable to database)
- 🎯 RESTful API endpoints

### Admin Panel
- 🏗️ Clean, luxury-styled admin interface
- ➕ Add unlimited portfolio projects
- 🖼️ Image upload support with Base64 encoding
- 🗑️ Delete projects with confirmation
- 🔒 Password-protected access

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
bash start.sh
```

**Or manually:**
```bash
npm start
```

### Step 3: Access the Website
- 🌐 **Website**: http://localhost:3000
- 📊 **Admin**: http://localhost:3000/admin
- 🔐 **Password**: `emagi2026`

---

## 🔧 Customization Guide

### 1. Update Contact Information

**File:** `index.html`

Change these areas:

```html
<!-- Update WhatsApp number -->
href="https://wa.me/254794473854?text=..."
<!-- Change 254794473854 to your number -->

<!-- Update Instagram -->
href="https://instagram.com/emagidigital"
<!-- Change emagidigital to your handle -->

<!-- Update Email -->
href="mailto:hello@emagidigital.com"
<!-- Change to your email -->
```

### 2. Change Admin Password

**File:** `server.js`

Find this line (around line 115):
```javascript
if (password === 'emagi2026') {
```

Replace `'emagi2026'` with your secure password:
```javascript
if (password === 'your-new-secure-password') {
```

### 3. Customize Colors

**File:** `styles.css`

Update these CSS variables at the top:
```css
--color-gold: #D4AF37;           /* Main gold color */
--color-gold-dark: #AA8C2C;      /* Darker gold */
--color-gold-light: #E5C158;     /* Lighter gold */
--color-black: #0a0a0a;          /* Background black */
```

### 4. Modify Service Categories

**File:** `server.js` (admin panel HTML)

Find the category dropdown and add/remove options:
```html
<select id="category" required>
  <option value="">Select Category</option>
  <option value="Your Category">Your Category</option>
  <!-- Add more categories here -->
</select>
```

### 5. Update Company Content

**File:** `index.html`

Update these sections:
- Hero headline and copy
- Service descriptions
- About section statistics
- Company name and tagline

---

## 📊 Admin Panel Guide

### How to Add Portfolio Projects

1. **Login** at `http://localhost:3000/admin`
   - Password: `emagi2026` (or your custom password)

2. **Fill the form:**
   - **Project Title**: Name of the project
   - **Category**: Select from dropdown
   - **Description**: Project details (1-2 sentences)
   - **Image**: Upload a project image (optional)

3. **Click "Add Project"** - appears instantly on homepage

### Portfolio Project Tips

- **Image Size**: Keep images under 500KB for best performance
- **Image Format**: JPG or PNG work best
- **Description**: Keep it concise and professional
- **Category**: Use consistent categories for better organization

### Managing Projects

- **View All**: See all projects in the portfolio section below the form
- **Delete**: Click "Delete" button to remove a project
- **No Edit**: To edit, delete and re-add with updated info

---

## 🌐 Deployment Options

### Option 1: Heroku (Easiest)

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Initialize Git repo**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

5. **Access**: `https://your-app-name.herokuapp.com`

### Option 2: DigitalOcean (Recommended)

1. **Create Droplet** (1GB RAM minimum)

2. **SSH into droplet**:
   ```bash
   ssh root@your_droplet_ip
   ```

3. **install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone your repo**:
   ```bash
   git clone https://github.com/yourusername/emagi-digital.git
   cd emagi-digital
   npm install
   ```

5. **Install PM2** (process manager):
   ```bash
   npm install -g pm2
   pm2 start server.js --name "emagi"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx** (reverse proxy):
   ```bash
   sudo apt-get install nginx
   ```

   `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80 default_server;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
       }
   }
   ```

7. **Enable SSL** (Let's Encrypt):
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: AWS EC2

Similar to DigitalOcean. Use Amazon Linux and follow similar setup steps.

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change admin password in `server.js`
- [ ] Enable HTTPS/SSL certificate
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for sensitive data
- [ ] Add input validation on file uploads
- [ ] Implement rate limiting on API
- [ ] Use a proper database (MongoDB, PostgreSQL)
- [ ] Add CORS protection
- [ ] Enable security headers (helmet.js)
- [ ] Regular backups of portfolio data

---

## 💾 Database Migration

Currently using JSON file storage. To upgrade to MongoDB:

```bash
npm install mongoose
```

Create `db.js`:
```javascript
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
```

---

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- 1024px (tablets)
- 768px (large phones)
- 480px (small phones)

Test on actual devices for best results.

---

## 🎨 Customization Tips

### Add Team Members
In `index.html` after the About section, add:
```html
<section class="team">
  <!-- Team members grid -->
</section>
```

### Add Testimonials
Create a testimonials section with client reviews and ratings.

### Add Blog
Integrate a simple blog system for the team to share insights.

### Add Contact Form
Replace WhatsApp with a proper contact form that emails submissions.

### Add Live Chat
Integrate Drift or Intercom for real-time support.

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

### Admin Panel Not Working
1. Clear browser cache
2. Restart server
3. Check session settings in `server.js`

### Portfolio Not Showing
1. Check `/data` folder exists
2. Verify `/api/portfolio` returns data
3. Check browser console for errors

### Images Not Displaying
1. Ensure images are uploaded correctly
2. Check browser console for Base64 encoding errors
3. Verify image file sizes < 10MB

---

## 📈 Performance Optimization

1. **Minify CSS & JS** for production
2. **Compress images** before upload
3. **Use CDN** for static assets
4. **Enable caching** headers
5. **Optimize database** queries
6. **Use Redis** for session storage

---

## 📞 Support & Help

- **Issues**: Check GitHub Issues
- **Questions**: Create a Discussion
- **Bugs**: Submit a detailed bug report

---

## 📄 License

MIT - Free to use for personal and commercial projects.

---

## 🎯 Next Steps

1. ✅ Install and run locally
2. ✅ Customize content and branding
3. ✅ Add portfolio projects
4. ✅ Test on mobile devices
5. ✅ Deploy to production
6. ✅ Setup domain name
7. ✅ Enable SSL certificate
8. ✅ Setup regular backups

---

**Built with ✨ for luxury brands. Enjoy your new website!**
