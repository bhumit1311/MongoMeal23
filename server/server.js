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
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/34/Paneer_Tikka.jpg"
  },
  {
    "id": 2,
    "name": "Crispy Samosa",
    "category": "Starters",
    "type": "veg",
    "price": 90,
    "description": "Golden crispy pastry stuffed with spiced potato and green peas, served with mint chutney.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Samosa_dish.jpg"
  },
  {
    "id": 3,
    "name": "Hara Bhara Kabab",
    "category": "Starters",
    "type": "veg",
    "price": 240,
    "description": "Pan-fried patties made with spinach, green peas, potatoes and aromatic Indian spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/Hara_bhara_kabab.jpg"
  },
  {
    "id": 4,
    "name": "Veg Spring Roll",
    "category": "Starters",
    "type": "veg",
    "price": 220,
    "description": "Crispy deep-fried rolls filled with finely shredded stir-fried vegetables.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Spring_rolls.jpg"
  },
  {
    "id": 5,
    "name": "Aloo Tikki Chaat",
    "category": "Starters",
    "type": "veg",
    "price": 160,
    "description": "Crispy potato patties topped with sweet yogurt, tamarind chutney and sev.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Aloo_tikki_chaat.jpg"
  },
  {
    "id": 6,
    "name": "Paneer Butter Masala",
    "category": "Main Course",
    "type": "veg",
    "price": 330,
    "description": "Fresh paneer cubes simmered in a velvety, rich tomato and cashew butter gravy.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/62/Paneer_Butter_Masala_2.jpg"
  },
  {
    "id": 7,
    "name": "Dal Makhani",
    "category": "Main Course",
    "type": "veg",
    "price": 290,
    "description": "Slow-cooked black lentils simmered overnight with fresh cream, butter and mild spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/60/Dal_makhani.jpg"
  },
  {
    "id": 8,
    "name": "Kadhai Paneer",
    "category": "Main Course",
    "type": "veg",
    "price": 320,
    "description": "Paneer and bell peppers cooked in a spicy, freshly ground wok masala.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Kadai_Paneer_Gravey.jpg"
  },
  {
    "id": 9,
    "name": "Chana Masala",
    "category": "Main Course",
    "type": "veg",
    "price": 250,
    "description": "Tender chickpeas cooked in a tangy North Indian onion-tomato gravy.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chana_masala.jpg"
  },
  {
    "id": 10,
    "name": "Malai Kofta",
    "category": "Main Course",
    "type": "veg",
    "price": 340,
    "description": "Soft cottage cheese dumplings served in a creamy, sweet and rich cashew gravy.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Malai_kofta.jpg"
  },
  {
    "id": 11,
    "name": "Yellow Dal Tadka",
    "category": "Main Course",
    "type": "veg",
    "price": 220,
    "description": "Yellow lentils tempered with ghee, cumin seeds, garlic and red chilies.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Moong_dal.jpg"
  },
  {
    "id": 12,
    "name": "Veg Dum Biryani",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 320,
    "description": "Fragrant long-grain basmati rice layered with mixed vegetables, saffron and spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Veg_Biryani.jpg"
  },
  {
    "id": 13,
    "name": "Jeera Rice",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 180,
    "description": "Steamed basmati rice tossed with roasted cumin seeds and fresh coriander.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Jeera_rice.jpg"
  },
  {
    "id": 14,
    "name": "Special Dal Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 240,
    "description": "Wholesome comforting rice and moong dal porridge tempered with garlic ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Khichdi_%281%29.jpg"
  },
  {
    "id": 15,
    "name": "Peas Pulao",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 210,
    "description": "Aromatic basmati rice cooked with sweet green peas and whole spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Veg_pulao.jpg"
  },
  {
    "id": 16,
    "name": "Butter Naan",
    "category": "Breads",
    "type": "veg",
    "price": 65,
    "description": "Soft tandoori flatbread brushed generously with fresh melted butter.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/25/Butter_Naan.jpg"
  },
  {
    "id": 17,
    "name": "Garlic Naan",
    "category": "Breads",
    "type": "veg",
    "price": 80,
    "description": "Tandoor-baked flatbread infused with minced fresh garlic and coriander.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Garlic_naan.jpg"
  },
  {
    "id": 18,
    "name": "Tandoori Roti",
    "category": "Breads",
    "type": "veg",
    "price": 40,
    "description": "Whole wheat flatbread baked crispy in clay oven tandoor.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Chapati_2.jpg"
  },
  {
    "id": 19,
    "name": "Lachha Paratha",
    "category": "Breads",
    "type": "veg",
    "price": 75,
    "description": "Multi-layered flaky whole wheat flatbread cooked with ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Bajra_Roti.jpg"
  },
  {
    "id": 20,
    "name": "Gulab Jamun (2 pcs)",
    "category": "Desserts",
    "type": "veg",
    "price": 130,
    "description": "Warm milk dumplings soaked in cardamom and rose sugar syrup.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Gulab_jamun_%28Indian_sweet%29.jpg"
  },
  {
    "id": 21,
    "name": "Kaju Katli",
    "category": "Desserts",
    "type": "veg",
    "price": 350,
    "description": "Classic diamond-shaped cashew sweet with silver leaf garnish.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Kaju_Katli.jpg"
  },
  {
    "id": 22,
    "name": "Gajar Ka Halwa",
    "category": "Desserts",
    "type": "veg",
    "price": 180,
    "description": "Traditional slow-cooked carrot pudding with milk, khoya and nuts.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/91/Gajar_ka_halwa.jpg"
  },
  {
    "id": 23,
    "name": "Mango Lassi",
    "category": "Beverages",
    "type": "veg",
    "price": 130,
    "description": "Chilled creamy yogurt drink blended with sweet mango pulp.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/27/Aamras.jpg"
  },
  {
    "id": 24,
    "name": "Masala Chai",
    "category": "Beverages",
    "type": "veg",
    "price": 50,
    "description": "Freshly brewed Indian tea with milk, fresh ginger and spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/89/Chai_In_Sakora.jpg"
  },
  {
    "id": 25,
    "name": "Fresh Nimbu Pani",
    "category": "Beverages",
    "type": "veg",
    "price": 70,
    "description": "Refreshing homemade lemonade with black salt and mint.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Nimbu_Pani.jpg"
  }
]
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
