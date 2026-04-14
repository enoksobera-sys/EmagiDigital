# 🎨 Emagi Digital - Quick Reference Card

## 🚀 Getting Started

### Installation
```bash
npm install
npm start
```

### Access Website
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Default Password**: emagi2026

---

## 📁 File Structure

```
├── index.html          → Main website (customize here)
├── styles.css          → Luxury design (colors/fonts)
├── script.js           → Frontend interactions
├── server.js           → Backend + admin panel
├── package.json        → Dependencies config
├── README.md           → Full documentation
├── SETUP_GUIDE.md      → Detailed setup guide
├── start.bat           → Windows quick start
├── start.sh            → Mac/Linux quick start
├── .env.example        → Environment variables template
├── .gitignore          → Git ignore rules
└── data/
    └── portfolio.json  → Portfolio items (auto-created)
```

---

## ✏️ Quick Customizations

### Change Company Info (index.html)

**WhatsApp Number:**
```html
<!-- Find this line and change the number -->
href="https://wa.me/254794473854?text=..."
```

**Instagram Handle:**
```html
<!-- Change emagidigital to your handle -->
href="https://instagram.com/emagidigital"
```

**Email Address:**
```html
<!-- Change to your email -->
href="mailto:hello@emagidigital.com"
```

---

### Change Admin Password (server.js)

**Find (line ~115):**
```javascript
if (password === 'emagi2026') {
```

**Change to:**
```javascript
if (password === 'your-new-password') {
```

---

### Change Brand Colors (styles.css)

**In `:root` section:**
```css
--color-gold: #D4AF37;           /* Main color */
--color-gold-dark: #AA8C2C;      /* Darker shade */
--color-gold-light: #E5C158;     /* Lighter shade */
```

---

## 📊 Admin Panel Operations

### Add Portfolio Project
1. Go to: `http://localhost:3000/admin`
2. Login with password
3. Fill form:
   - Title
   - Category
   - Description
   - Image (optional)
4. Click "Add Project"

### Delete Project
1. Scroll to "Portfolio Projects" section
2. Find project
3. Click "Delete" button
4. Confirm deletion

---

## 🔌 API Endpoints

### Public
```
GET  /api/portfolio         → Get all projects
GET  /api/portfolio/:id     → Get one project
```

### Protected (Admin Only)
```
POST   /api/portfolio       → Add project
DELETE /api/portfolio/:id   → Delete project
```

---

## 🌐 Deployment Quick Links

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### DigitalOcean
```bash
ssh root@your_ip
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
git clone <your-repo>
npm install
pm2 start server.js
```

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Kill process: `lsof -i :3000 \| kill -9` |
| Admin won't load | Clear cache, restart server |
| Portfolio empty | Add projects in admin panel |
| Images not showing | Upload < 500KB image files |

---

## 📞 Common Tasks

### Update Hero Section
**File**: `index.html` (lines 80-90)
```html
<div class="hero-copy">
  <div class="eyebrow">Your Tagline</div>
  <h1>Your Headline Here</h1>
  <p>Your description...</p>
</div>
```

### Add New Service
**File**: `index.html` (services section)
```html
<article class="service-card">
  <div class="service-icon">🎯</div>
  <h3>Your Service</h3>
  <p>Description of service...</p>
</article>
```

### Update About Section
**File**: `index.html` (about section)
```html
<p>Your about text...</p>
<!-- Update stats numbers -->
<div class="stat-number">100+</div>
```

---

## 🔐 Security Essentials

- ✅ Change admin password before deploying
- ✅ Enable HTTPS in production
- ✅ Set NODE_ENV=production
- ✅ Use strong session secret
- ✅ Implement rate limiting
- ✅ Validate all file uploads
- ✅ Regular backups

---

## 📱 Testing Checklist

- [ ] Desktop (1920px+)
- [ ] Tablet (768px-1024px)
- [ ] Mobile (320px-480px)
- [ ] Dark mode (if applicable)
- [ ] All links working
- [ ] WhatsApp integration
- [ ] Instagram links
- [ ] Portfolio loading
- [ ] Admin panel access
- [ ] Image uploads

---

## 🎯 Feature Ideas for Enhancement

- [ ] Add blog/news section
- [ ] Implement contact form
- [ ] Add team member profiles
- [ ] Integrate live chat
- [ ] Add testimonials section
- [ ] Create case studies pages
- [ ] Add email newsletter signup
- [ ] Integrate analytics
- [ ] Add search functionality
- [ ] Multi-language support

---

## 📊 Tech Stack Versions

- Node.js: 14+ recommended
- Express.js: 4.18.2
- Multer: 1.4.5
- Express-session: 1.17.3

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com
- CSS3: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript: https://javascript.info
- Node.js: https://nodejs.org/docs/

---

## 📧 Support

**Default Admin Login**
- URL: http://localhost:3000/admin
- Password: emagi2026

**Contact Details (Update These)**
- WhatsApp: +254794473854
- Instagram: @emagidigital
- Email: hello@emagidigital.com

---

**Last Updated**: 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
