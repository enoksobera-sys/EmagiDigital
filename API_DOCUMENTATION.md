# 🔌 Emagi Digital - API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

Protected endpoints require admin session. Login at `/admin/login` with the admin password.

---

## 📊 Portfolio Endpoints

### Get All Portfolio Items

**Endpoint:** `GET /api/portfolio`

**Public Access:** ✅ Yes

**Query Parameters:** None

**Response:**
```json
[
  {
    "id": "1234567890",
    "title": "Luxury Brand Campaign",
    "category": "Digital Campaign",
    "description": "High-end marketing campaign for luxury brand",
    "image": "base64-encoded-image-or-null",
    "createdAt": "2026-04-04T10:00:00.000Z"
  }
]
```

**Example:**
```javascript
fetch('/api/portfolio')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Get Single Portfolio Item

**Endpoint:** `GET /api/portfolio/:id`

**Public Access:** ✅ Yes

**URL Parameters:**
- `id` (required): Portfolio item ID

**Response:**
```json
{
  "id": "1234567890",
  "title": "Luxury Brand Campaign",
  "category": "Digital Campaign",
  "description": "High-end marketing campaign for luxury brand",
  "image": "base64-encoded-image-or-null",
  "createdAt": "2026-04-04T10:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Portfolio item not found"
}
```
**Status:** 404

**Example:**
```javascript
fetch('/api/portfolio/1234567890')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Create Portfolio Item

**Endpoint:** `POST /api/portfolio`

**Public Access:** ❌ No (Admin Only)

**Authentication:** Required (admin session)

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Project Title",
  "category": "Brand Strategy",
  "description": "Project description",
  "image": "base64-encoded-string-or-null"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "title": "Project Title",
  "category": "Brand Strategy",
  "description": "Project description",
  "image": "base64-encoded-string-or-null",
  "createdAt": "2026-04-04T10:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Missing required fields"
}
```
**Status:** 400

**Example:**
```javascript
const project = {
  title: "Luxury Website Redesign",
  category: "Web Design",
  description: "Complete website redesign for luxury brand",
  image: null
};

fetch('/api/portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(project)
})
.then(res => res.json())
.then(data => console.log(data));
```

---

### Delete Portfolio Item

**Endpoint:** `DELETE /api/portfolio/:id`

**Public Access:** ❌ No (Admin Only)

**Authentication:** Required (admin session)

**URL Parameters:**
- `id` (required): Portfolio item ID

**Response:**
```json
{
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Portfolio item not found"
}
```
**Status:** 404

**Example:**
```javascript
fetch('/api/portfolio/1234567890', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🔐 Authentication Endpoints

### Admin Login

**Endpoint:** `POST /admin/login`

**Public Access:** ✅ Yes

**Content-Type:** `application/x-www-form-urlencoded`

**Request Body:**
```
password=emagi2026
```

**Response:** Redirects to `/admin` on success or shows error message

**Example:**
```javascript
const formData = new FormData();
formData.append('password', 'emagi2026');

fetch('/admin/login', {
  method: 'POST',
  body: formData
})
.then(res => res.text())
.then(html => console.log(html));
```

---

### Admin Logout

**Endpoint:** `GET /admin/logout`

**Public Access:** ✅ Yes

**Response:** Redirects to `/` and destroys session

---

## 📋 Portfolio Item Structure

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Auto | Unique identifier (timestamp) |
| `title` | String | ✅ Yes | Project title |
| `category` | String | ✅ Yes | Project category |
| `description` | String | ✅ Yes | Project description |
| `image` | String | ❌ No | Base64-encoded image |
| `createdAt` | Date | Auto | Creation timestamp |

### Valid Categories

- Brand Strategy
- Visual Identity
- Digital Campaign
- Motion Graphics
- Web Design
- Packaging

---

## 🔄 Data Format Examples

### Portfolio Item (Full)
```json
{
  "id": "1712234400000",
  "title": "Luxury E-Commerce Platform",
  "category": "Web Design",
  "description": "Premium e-commerce experience for luxury fashion brand with custom animations and sophisticated UX",
  "image": "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
  "createdAt": "2026-04-04T10:00:00.000Z"
}
```

### Base64 Image Encoding
```javascript
// Convert image file to Base64
const file = document.getElementById('imageInput').files[0];
const reader = new FileReader();

reader.onload = (e) => {
  const base64 = e.target.result.split(',')[1];
  console.log(base64); // Use this in request
};

reader.readAsDataURL(file);
```

---

## ⚠️ Error Responses

### 400 - Bad Request
```json
{
  "error": "Missing required fields"
}
```
**Cause:** Required fields missing or invalid data

### 404 - Not Found
```json
{
  "error": "Portfolio item not found"
}
```
**Cause:** Item ID doesn't exist

### 401 - Unauthorized
**Cause:** Admin authentication required but not provided

---

## 🧪 Testing with cURL

### Get All Projects
```bash
curl http://localhost:3000/api/portfolio
```

### Create Project (with admin session)
```bash
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "category": "Brand Strategy",
    "description": "Test description"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:3000/api/portfolio/1234567890
```

---

## 🔌 Integration Examples

### JavaScript Fetch
```javascript
// Get all portfolios
const getPortfolios = async () => {
  const response = await fetch('/api/portfolio');
  return await response.json();
};

// Add portfolio
const addPortfolio = async (title, category, description, image = null) => {
  const response = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category, description, image })
  });
  return await response.json();
};

// Delete portfolio
const deletePortfolio = async (id) => {
  const response = await fetch(`/api/portfolio/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};
```

### Axios
```javascript
// Get all
axios.get('/api/portfolio').then(res => console.log(res.data));

// Add
axios.post('/api/portfolio', {
  title: 'New Project',
  category: 'Digital Campaign',
  description: 'Description'
}).then(res => console.log(res.data));

// Delete
axios.delete('/api/portfolio/123').then(res => console.log(res.data));
```

### jQuery
```javascript
// Get all
$.get('/api/portfolio', function(data) {
  console.log(data);
});

// Add
$.post('/api/portfolio', {
  title: 'New Project',
  category: 'Digital Campaign',
  description: 'Description'
}, function(data) {
  console.log(data);
});

// Delete
$.ajax({
  url: '/api/portfolio/123',
  type: 'DELETE',
  success: function(data) {
    console.log(data);
  }
});
```

---

## 📊 Rate Limiting (Recommended)

For production, implement rate limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## 🔐 Security Headers (Recommended)

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 📈 Extending the API

### Add New Endpoint Example
```javascript
// Get portfolio by category
app.get('/api/portfolio/category/:category', (req, res) => {
  const items = portfolio.filter(p => p.category === req.params.category);
  res.json(items);
});
```

### Add Pagination
```javascript
app.get('/api/portfolio', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const start = (page - 1) * limit;
  
  res.json({
    items: portfolio.slice(start, start + limit),
    total: portfolio.length,
    page,
    pages: Math.ceil(portfolio.length / limit)
  });
});
```

---

## 🗂️ Data Storage

### Current: JSON File
```
data/portfolio.json
```

### Upgrade to MongoDB
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

## 📞 API Status

**Status Page Endpoint (Optional):**
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "uptime": 12345,
  "environment": "production"
}
```

---

## 📚 Additional Resources

- [Express.js API](https://expressjs.com/en/api/express.html)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

**API Version:** 1.0.0  
**Last Updated:** 2026-04-04  
**Maintainer:** Emagi Digital
