const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mongo-meals';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/seed', async (req, res) => {
  try {
    const MenuItem = require('./models/MenuItem');
    const menuItems = [
      {
        "id": 1,
        "name": "Paneer Tikka",
        "category": "Starters",
        "type": "veg",
        "price": 280,
        "description": "Marinated cottage cheese cubes grilled in a traditional tandoor with capsicum and onions.",
        "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&fit=crop"
      },
      {
        "id": 2,
        "name": "Crispy Samosa",
        "category": "Starters",
        "type": "veg",
        "price": 90,
        "description": "Golden crispy pastry stuffed with spiced potato and green peas, served with mint chutney.",
        "image": "https://images.unsplash.com/photo-1601050690117-6a7ded8ae15d?w=800&fit=crop"
      },
      {
        "id": 3,
        "name": "Hara Bhara Kabab",
        "category": "Starters",
        "type": "veg",
        "price": 240,
        "description": "Pan-fried patties made with spinach, green peas, potatoes and aromatic Indian spices.",
        "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&fit=crop"
      },
      {
        "id": 4,
        "name": "Veg Spring Roll",
        "category": "Starters",
        "type": "veg",
        "price": 220,
        "description": "Crispy deep-fried rolls filled with finely shredded stir-fried vegetables.",
        "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&fit=crop"
      },
      {
        "id": 5,
        "name": "Aloo Tikki Chaat",
        "category": "Starters",
        "type": "veg",
        "price": 160,
        "description": "Crispy potato patties topped with sweet yogurt, tamarind chutney and sev.",
        "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&fit=crop"
      },
      {
        "id": 6,
        "name": "Paneer Butter Masala",
        "category": "Main Course",
        "type": "veg",
        "price": 330,
        "description": "Fresh paneer cubes simmered in a velvety, rich tomato and cashew butter gravy.",
        "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&fit=crop"
      },
      {
        "id": 7,
        "name": "Dal Makhani",
        "category": "Main Course",
        "type": "veg",
        "price": 290,
        "description": "Slow-cooked black lentils simmered overnight with fresh cream, butter and mild spices.",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&fit=crop"
      },
      {
        "id": 8,
        "name": "Kadhai Paneer",
        "category": "Main Course",
        "type": "veg",
        "price": 320,
        "description": "Paneer and bell peppers cooked in a spicy, freshly ground wok masala.",
        "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&fit=crop"
      },
      {
        "id": 9,
        "name": "Chana Masala",
        "category": "Main Course",
        "type": "veg",
        "price": 250,
        "description": "Tender chickpeas cooked in a tangy North Indian onion-tomato gravy.",
        "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&fit=crop"
      },
      {
        "id": 10,
        "name": "Malai Kofta",
        "category": "Main Course",
        "type": "veg",
        "price": 340,
        "description": "Soft cottage cheese dumplings served in a creamy, sweet and rich cashew gravy.",
        "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&fit=crop"
      },
      {
        "id": 11,
        "name": "Yellow Dal Tadka",
        "category": "Main Course",
        "type": "veg",
        "price": 220,
        "description": "Yellow lentils tempered with ghee, cumin seeds, garlic and red chilies.",
        "image": "https://images.unsplash.com/photo-1618449840665-9088c7b3263c?w=800&fit=crop"
      },
      {
        "id": 12,
        "name": "Veg Dum Biryani",
        "category": "Rice Dishes",
        "type": "veg",
        "price": 320,
        "description": "Fragrant long-grain basmati rice layered with mixed vegetables, saffron and spices.",
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&fit=crop"
      },
      {
        "id": 13,
        "name": "Jeera Rice",
        "category": "Rice Dishes",
        "type": "veg",
        "price": 180,
        "description": "Steamed basmati rice tossed with roasted cumin seeds and fresh coriander.",
        "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&fit=crop"
      },
      {
        "id": 14,
        "name": "Special Dal Khichdi",
        "category": "Rice Dishes",
        "type": "veg",
        "price": 240,
        "description": "Wholesome comforting rice and moong dal porridge tempered with garlic ghee.",
        "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&fit=crop"
      },
      {
        "id": 15,
        "name": "Peas Pulao",
        "category": "Rice Dishes",
        "type": "veg",
        "price": 210,
        "description": "Aromatic basmati rice cooked with sweet green peas and whole spices.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&fit=crop"
      },
      {
        "id": 16,
        "name": "Butter Naan",
        "category": "Breads",
        "type": "veg",
        "price": 65,
        "description": "Soft tandoori flatbread brushed generously with fresh melted butter.",
        "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&fit=crop"
      },
      {
        "id": 17,
        "name": "Garlic Naan",
        "category": "Breads",
        "type": "veg",
        "price": 80,
        "description": "Tandoor-baked flatbread infused with minced fresh garlic and coriander.",
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&fit=crop"
      },
      {
        "id": 18,
        "name": "Tandoori Roti",
        "category": "Breads",
        "type": "veg",
        "price": 40,
        "description": "Whole wheat flatbread baked crispy in clay oven tandoor.",
        "image": "https://images.unsplash.com/photo-1619894991209-9f9694be045a?w=800&fit=crop"
      },
      {
        "id": 19,
        "name": "Lachha Paratha",
        "category": "Breads",
        "type": "veg",
        "price": 75,
        "description": "Multi-layered flaky whole wheat flatbread cooked with ghee.",
        "image": "https://images.unsplash.com/photo-1664487521-a30ad0e93a44?w=800&fit=crop"
      },
      {
        "id": 20,
        "name": "Gulab Jamun (2 pcs)",
        "category": "Desserts",
        "type": "veg",
        "price": 130,
        "description": "Warm milk dumplings soaked in cardamom and rose sugar syrup.",
        "image": "https://images.unsplash.com/photo-1666274377-c785a53d40de?w=800&fit=crop"
      },
      {
        "id": 21,
        "name": "Kaju Katli",
        "category": "Desserts",
        "type": "veg",
        "price": 350,
        "description": "Classic diamond-shaped cashew sweet with silver leaf garnish.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop"
      },
      {
        "id": 22,
        "name": "Gajar Ka Halwa",
        "category": "Desserts",
        "type": "veg",
        "price": 180,
        "description": "Traditional slow-cooked carrot pudding with milk, khoya and nuts.",
        "image": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&fit=crop"
      },
      {
        "id": 23,
        "name": "Mango Lassi",
        "category": "Beverages",
        "type": "veg",
        "price": 130,
        "description": "Chilled creamy yogurt drink blended with sweet mango pulp.",
        "image": "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&fit=crop"
      },
      {
        "id": 24,
        "name": "Masala Chai",
        "category": "Beverages",
        "type": "veg",
        "price": 50,
        "description": "Freshly brewed Indian tea with milk, fresh ginger and spices.",
        "image": "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=800&fit=crop"
      },
      {
        "id": 25,
        "name": "Fresh Nimbu Pani",
        "category": "Beverages",
        "type": "veg",
        "price": 70,
        "description": "Refreshing homemade lemonade with black salt and mint.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&fit=crop"
      }
    ];
;
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    
    // Seed Admin User
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    await User.deleteMany({ email: 'admin@mongomeals.com' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Admin User',
      email: 'admin@mongomeals.com',
      password: hashedPassword,
      role: 'admin',
      points: 1000,
      tier: 'Platinum'
    });

    res.send('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px; color:green;">Database successfully seeded (MenuItems + Admin)! Go back to your website and refresh!</h1>');
  } catch(e) {
    res.status(500).send(e.message);
  }
});

app.get('/api/debug-mail', async (req, res) => {
  try {
    const nodemailer = require('nodemailer');
    const emailUser = process.env.EMAIL_USER || "mongomeals@gmail.com";
    const emailPass = process.env.EMAIL_PASS || "uslh azis ojjj irmy";

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        res.status(500).json({
          status: "failed",
          message: "Nodemailer verification failed",
          error: error.message,
          stack: error.stack,
          emailUserConfigureded: emailUser,
          emailPassLength: emailPass ? emailPass.length : 0
        });
      } else {
        res.json({
          status: "success",
          message: "Nodemailer is fully functional and ready to send emails!",
          emailUser: emailUser
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

// Custom Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
