const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('.'));

// Session setup
app.use(session({
  secret: 'emagi-luxury-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Simple auth middleware
const adminAuth = (req, res, next) => {
  if (!req.session.admin) {
    return res.redirect('/admin/login');
  }
  next();
};

// Data storage (in production, use database)
let portfolio = [];
const portfolioFile = path.join(__dirname, 'data', 'portfolio.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Load portfolio data
const loadPortfolio = () => {
  try {
    if (fs.existsSync(portfolioFile)) {
      portfolio = JSON.parse(fs.readFileSync(portfolioFile, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading portfolio:', error);
    portfolio = [];
  }
};

// Save portfolio data
const savePortfolio = () => {
  try {
    fs.writeFileSync(portfolioFile, JSON.stringify(portfolio, null, 2));
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
};

// Load portfolio on startup
loadPortfolio();

// ===== API ROUTES =====

// Get all portfolio items
app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});

// Get single portfolio item
app.get('/api/portfolio/:id', (req, res) => {
  const item = portfolio.find(p => p.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Portfolio item not found' });
  }
});

// ===== ADMIN ROUTES =====

// Admin login page
app.get('/admin/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emagi Digital - Admin Login</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%);
          font-family: 'DM Sans', system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #fff;
        }
        .login-container {
          background: rgba(212, 175, 55, 0.04);
          border: 2px solid #D4AF37;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15);
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin-bottom: 32px;
          text-align: center;
          color: #D4AF37;
        }
        .form-group {
          margin-bottom: 24px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }
        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #D4AF37, #AA8C2C);
          color: #0a0a0a;
          border: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h1>Admin Login</h1>
        <form method="POST" action="/admin/login">
          <div class="form-group">
            <label for="password">Admin Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Admin login handler
app.post('/admin/login', (req, res) => {
  const password = req.body.password;
  // Default password - change in production!
  if (password === 'emagi2026') {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%);
            font-family: 'DM Sans', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #fff;
          }
          .container { text-align: center; }
          p { color: #ff6b6b; margin-bottom: 20px; }
          a { color: #D4AF37; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Invalid password. Please try again.</p>
          <a href="/admin/login">Back to login</a>
        </div>
      </body>
      </html>
    `);
  }
});

// Admin dashboard
app.get('/admin', adminAuth, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emagi Digital - Admin Dashboard</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%);
          font-family: 'DM Sans', system-ui, sans-serif;
          color: #fff;
          padding: 40px 20px;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #D4AF37;
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #D4AF37;
        }
        .logout-btn {
          background: linear-gradient(135deg, #D4AF37, #AA8C2C);
          color: #0a0a0a;
          border: none;
          padding: 10px 24px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.3);
        }
        .section {
          background: rgba(212, 175, 55, 0.04);
          border: 2px solid #D4AF37;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }
        h2 {
          color: #D4AF37;
          margin-bottom: 24px;
          font-size: 1.6rem;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }
        input, textarea, select {
          width: 100%;
          padding: 12px;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        button {
          background: linear-gradient(135deg, #D4AF37, #AA8C2C);
          color: #0a0a0a;
          border: none;
          padding: 12px 32px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.3);
        }
        .portfolio-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .portfolio-card {
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 12px;
          padding: 16px;
          background: rgba(212, 175, 55, 0.02);
        }
        .portfolio-card h3 {
          margin: 0 0 8px;
          color: #D4AF37;
        }
        .portfolio-card p {
          margin: 4px 0;
          font-size: 0.9rem;
          color: #a0a0a0;
        }
        .delete-btn {
          background: #ff6b6b;
          color: #fff;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s ease;
        }
        .delete-btn:hover {
          background: #ff5252;
        }
        .success-message {
          background: #51cf66;
          color: #fff;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Emagi Digital - Admin</h1>
          <form method="GET" action="/admin/logout" style="margin: 0;">
            <button type="submit" class="logout-btn">Logout</button>
          </form>
        </header>

        <div class="section">
          <h2>Add New Portfolio Project</h2>
          <div class="success-message" id="successMessage">Project added successfully!</div>
          <form onsubmit="addPortfolio(event)">
            <div class="form-row">
              <div class="form-group">
                <label for="title">Project Title *</label>
                <input type="text" id="title" required>
              </div>
              <div class="form-group">
                <label for="category">Category *</label>
                <select id="category" required>
                  <option value="">Select Category</option>
                  <option value="Brand Strategy">Brand Strategy</option>
                  <option value="Visual Identity">Visual Identity</option>
                  <option value="Digital Campaign">Digital Campaign</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description *</label>
              <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="image">Project Image</label>
              <input type="file" id="image" accept="image/*">
            </div>
            <button type="submit">Add Project</button>
          </form>
        </div>

        <div class="section">
          <h2>Portfolio Projects</h2>
          <div id="portfolioList" class="portfolio-list">Loading...</div>
        </div>
      </div>

      <script>
        // Load portfolio
        const loadPortfolio = async () => {
          try {
            const response = await fetch('/api/portfolio');
            const projects = await response.json();
            const container = document.getElementById('portfolioList');
            
            if (projects.length === 0) {
              container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a0a0a0;">No projects yet. Add your first project above.</p>';
            } else {
              container.innerHTML = projects.map(p => \`
                <div class="portfolio-card">
                  <h3>\${p.title}</h3>
                  <p><strong>Category:</strong> \${p.category}</p>
                  <p>\${p.description}</p>
                  <button type="button" class="delete-btn" onclick="deleteProject('\${p.id}')">Delete</button>
                </div>
              \`).join('');
            }
          } catch (error) {
            console.error('Error loading portfolio:', error);
          }
        };

        // Add portfolio
        const addPortfolio = async (e) => {
          e.preventDefault();
          
          const title = document.getElementById('title').value;
          const category = document.getElementById('category').value;
          const description = document.getElementById('description').value;
          const imageInput = document.getElementById('image');
          
          let image = null;
          if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = async (event) => {
              image = event.target.result.split(',')[1];
              await submitProject(title, category, description, image);
            };
            reader.readAsDataURL(imageInput.files[0]);
          } else {
            await submitProject(title, category, description, null);
          }
        };

        const submitProject = async (title, category, description, image) => {
          try {
            const response = await fetch('/api/portfolio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, category, description, image })
            });
            
            if (response.ok) {
              document.getElementById('title').value = '';
              document.getElementById('category').value = '';
              document.getElementById('description').value = '';
              document.getElementById('image').value = '';
              document.getElementById('successMessage').style.display = 'block';
              setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
              }, 3000);
              loadPortfolio();
            }
          } catch (error) {
            alert('Error adding project: ' + error.message);
          }
        };

        // Delete portfolio
        const deleteProject = async (id) => {
          if (!confirm('Are you sure you want to delete this project?')) return;
          try {
            const response = await fetch(\`/api/portfolio/\${id}\`, {
              method: 'DELETE'
            });
            if (response.ok) {
              loadPortfolio();
            }
          } catch (error) {
            alert('Error deleting project: ' + error.message);
          }
        };

        // Load on page load
        loadPortfolio();
      </script>
    </body>
    </html>
  `);
});

// Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Add portfolio item
app.post('/api/portfolio', adminAuth, (req, res) => {
  const { title, category, description, image } = req.body;
  
  if (!title || !category || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newItem = {
    id: Date.now().toString(),
    title,
    category,
    description,
    image: image || null,
    createdAt: new Date()
  };

  portfolio.push(newItem);
  savePortfolio();
  
  res.json(newItem);
});

// Delete portfolio item
app.delete('/api/portfolio/:id', adminAuth, (req, res) => {
  const index = portfolio.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Portfolio item not found' });
  }

  portfolio.splice(index, 1);
  savePortfolio();
  
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎨 Emagi Digital running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔐 Default password: emagi2026 (change this in production!)`);
});
