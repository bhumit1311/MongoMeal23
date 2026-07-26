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
    id: 1,
    name: 'Khaman Dhokla',
    category: 'Starters',
    type: 'veg',
    price: 190,
    description: 'Authentic Gujarati Khaman Dhokla, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/yellow%20spongy%20savory%20cake%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=12345'
  },
  {
    id: 2,
    name: 'Khandvi',
    category: 'Starters',
    type: 'veg',
    price: 320,
    description: 'Authentic Gujarati Khandvi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/yellow%20gram%20flour%20rolls%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=24690'
  },
  {
    id: 3,
    name: 'Methi Gota',
    category: 'Starters',
    type: 'veg',
    price: 410,
    description: 'Authentic Gujarati Methi Gota, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/fried%20fenugreek%20fritters%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=37035'
  },
  {
    id: 4,
    name: 'Patra',
    category: 'Starters',
    type: 'veg',
    price: 250,
    description: 'Authentic Gujarati Patra, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/colocasia%20leaves%20rolls%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=49380'
  },
  {
    id: 5,
    name: 'Handvo',
    category: 'Starters',
    type: 'veg',
    price: 190,
    description: 'Authentic Gujarati Handvo, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/savory%20baked%20vegetable%20cake%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=61725'
  },
  {
    id: 6,
    name: 'Fafda',
    category: 'Starters',
    type: 'veg',
    price: 240,
    description: 'Authentic Gujarati Fafda, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/crispy%20yellow%20gram%20flour%20strips%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=74070'
  },
  {
    id: 7,
    name: 'Muthiya',
    category: 'Starters',
    type: 'veg',
    price: 300,
    description: 'Authentic Gujarati Muthiya, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/steamed%20vegetable%20dumplings%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=86415'
  },
  {
    id: 8,
    name: 'Lilva Kachori',
    category: 'Starters',
    type: 'veg',
    price: 330,
    description: 'Authentic Gujarati Lilva Kachori, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/fried%20pastry%20stuffed%20with%20green%20peas%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=98760'
  },
  {
    id: 9,
    name: 'Dabeli',
    category: 'Starters',
    type: 'veg',
    price: 380,
    description: 'Authentic Gujarati Dabeli, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spicy%20potato%20burger%20indian%20street%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=111105'
  },
  {
    id: 10,
    name: 'Sev Khamani',
    category: 'Starters',
    type: 'veg',
    price: 210,
    description: 'Authentic Gujarati Sev Khamani, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/crushed%20savory%20cake%20with%20crispy%20noodles%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=123450'
  },
  {
    id: 11,
    name: 'Khichu',
    category: 'Starters',
    type: 'veg',
    price: 340,
    description: 'Authentic Gujarati Khichu, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/steamed%20rice%20flour%20dough%20with%20oil%20and%20spices%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=135795'
  },
  {
    id: 12,
    name: 'Undhiyu',
    category: 'Main Course',
    type: 'veg',
    price: 290,
    description: 'Authentic Gujarati Undhiyu, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/mixed%20vegetable%20curry%20with%20green%20beans%20and%20potatoes%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=148140'
  },
  {
    id: 13,
    name: 'Sev Tameta Nu Shak',
    category: 'Main Course',
    type: 'veg',
    price: 260,
    description: 'Authentic Gujarati Sev Tameta Nu Shak, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/tomato%20curry%20topped%20with%20crispy%20gram%20flour%20noodles%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=160485'
  },
  {
    id: 14,
    name: 'Dal Dhokli',
    category: 'Main Course',
    type: 'veg',
    price: 170,
    description: 'Authentic Gujarati Dal Dhokli, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/lentil%20stew%20with%20wheat%20flour%20dumplings%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=172830'
  },
  {
    id: 15,
    name: 'Ringan No Olo',
    category: 'Main Course',
    type: 'veg',
    price: 320,
    description: 'Authentic Gujarati Ringan No Olo, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/roasted%20mashed%20eggplant%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=185175'
  },
  {
    id: 16,
    name: 'Bhindi Sambhariya',
    category: 'Main Course',
    type: 'veg',
    price: 390,
    description: 'Authentic Gujarati Bhindi Sambhariya, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/stuffed%20okra%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=197520'
  },
  {
    id: 17,
    name: 'Lasaniya Batata',
    category: 'Main Course',
    type: 'veg',
    price: 310,
    description: 'Authentic Gujarati Lasaniya Batata, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spicy%20garlic%20potato%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=209865'
  },
  {
    id: 18,
    name: 'Kaju Gathiya',
    category: 'Main Course',
    type: 'veg',
    price: 390,
    description: 'Authentic Gujarati Kaju Gathiya, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/cashew%20and%20crispy%20noodle%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=222210'
  },
  {
    id: 19,
    name: 'Rasawala Batata',
    category: 'Main Course',
    type: 'veg',
    price: 200,
    description: 'Authentic Gujarati Rasawala Batata, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/potato%20curry%20with%20thin%20gravy%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=234555'
  },
  {
    id: 20,
    name: 'Chana Masala',
    category: 'Main Course',
    type: 'veg',
    price: 160,
    description: 'Authentic Gujarati Chana Masala, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spicy%20chickpea%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=246900'
  },
  {
    id: 21,
    name: 'Mag Ni Dal',
    category: 'Main Course',
    type: 'veg',
    price: 190,
    description: 'Authentic Gujarati Mag Ni Dal, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/yellow%20moong%20lentil%20soup%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=259245'
  },
  {
    id: 22,
    name: 'Tindora Nu Shak',
    category: 'Main Course',
    type: 'veg',
    price: 420,
    description: 'Authentic Gujarati Tindora Nu Shak, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/ivy%20gourd%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=271590'
  },
  {
    id: 23,
    name: 'Galka Nu Shak',
    category: 'Main Course',
    type: 'veg',
    price: 230,
    description: 'Authentic Gujarati Galka Nu Shak, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sponge%20gourd%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=283935'
  },
  {
    id: 24,
    name: 'Kobi Batata',
    category: 'Main Course',
    type: 'veg',
    price: 340,
    description: 'Authentic Gujarati Kobi Batata, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/cabbage%20and%20potato%20curry%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=296280'
  },
  {
    id: 25,
    name: 'Vaghareli Khichdi',
    category: 'Rice Dishes',
    type: 'veg',
    price: 210,
    description: 'Authentic Gujarati Vaghareli Khichdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spicy%20yellow%20rice%20and%20lentil%20porridge%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=308625'
  },
  {
    id: 26,
    name: 'Ram Khichdi',
    category: 'Rice Dishes',
    type: 'veg',
    price: 310,
    description: 'Authentic Gujarati Ram Khichdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/rice%20mixed%20with%20vegetables%20and%20lentils%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=320970'
  },
  {
    id: 27,
    name: 'Rajwadi Khichdi',
    category: 'Rice Dishes',
    type: 'veg',
    price: 330,
    description: 'Authentic Gujarati Rajwadi Khichdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/royal%20rich%20rice%20and%20lentil%20dish%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=333315'
  },
  {
    id: 28,
    name: 'Jeera Rice',
    category: 'Rice Dishes',
    type: 'veg',
    price: 420,
    description: 'Authentic Gujarati Jeera Rice, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/white%20rice%20cooked%20with%20cumin%20seeds%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=345660'
  },
  {
    id: 29,
    name: 'Veg Pulao',
    category: 'Rice Dishes',
    type: 'veg',
    price: 150,
    description: 'Authentic Gujarati Veg Pulao, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/rice%20cooked%20with%20mixed%20vegetables%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=358005'
  },
  {
    id: 30,
    name: 'Tuver Pulao',
    category: 'Rice Dishes',
    type: 'veg',
    price: 180,
    description: 'Authentic Gujarati Tuver Pulao, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/rice%20cooked%20with%20pigeon%20peas%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=370350'
  },
  {
    id: 31,
    name: 'Fada Ni Khichdi',
    category: 'Rice Dishes',
    type: 'veg',
    price: 250,
    description: 'Authentic Gujarati Fada Ni Khichdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/broken%20wheat%20and%20lentil%20porridge%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=382695'
  },
  {
    id: 32,
    name: 'Sadi Khichdi',
    category: 'Rice Dishes',
    type: 'veg',
    price: 430,
    description: 'Authentic Gujarati Sadi Khichdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/simple%20plain%20rice%20and%20lentil%20porridge%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=395040'
  },
  {
    id: 33,
    name: 'Thepla',
    category: 'Breads',
    type: 'veg',
    price: 370,
    description: 'Authentic Gujarati Thepla, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/flatbread%20made%20with%20fenugreek%20leaves%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=407385'
  },
  {
    id: 34,
    name: 'Bhakhri',
    category: 'Breads',
    type: 'veg',
    price: 160,
    description: 'Authentic Gujarati Bhakhri, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/crispy%20thick%20whole%20wheat%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=419730'
  },
  {
    id: 35,
    name: 'Bajra No Rotlo',
    category: 'Breads',
    type: 'veg',
    price: 370,
    description: 'Authentic Gujarati Bajra No Rotlo, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/thick%20pearl%20millet%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=432075'
  },
  {
    id: 36,
    name: 'Jowar No Rotlo',
    category: 'Breads',
    type: 'veg',
    price: 360,
    description: 'Authentic Gujarati Jowar No Rotlo, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/thick%20sorghum%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=444420'
  },
  {
    id: 37,
    name: 'Puran Poli',
    category: 'Breads',
    type: 'veg',
    price: 370,
    description: 'Authentic Gujarati Puran Poli, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20stuffed%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=456765'
  },
  {
    id: 38,
    name: 'Dhebra',
    category: 'Breads',
    type: 'veg',
    price: 310,
    description: 'Authentic Gujarati Dhebra, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/fried%20pearl%20millet%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=469110'
  },
  {
    id: 39,
    name: 'Khakhra',
    category: 'Breads',
    type: 'veg',
    price: 150,
    description: 'Authentic Gujarati Khakhra, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/crispy%20thin%20roasted%20flatbread%20indian%20snack%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=481455'
  },
  {
    id: 40,
    name: 'Phulka Roti',
    category: 'Breads',
    type: 'veg',
    price: 370,
    description: 'Authentic Gujarati Phulka Roti, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/soft%20puffed%20whole%20wheat%20flatbread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=493800'
  },
  {
    id: 41,
    name: 'Puri',
    category: 'Breads',
    type: 'veg',
    price: 440,
    description: 'Authentic Gujarati Puri, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/deep%20fried%20puffed%20bread%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=506145'
  },
  {
    id: 42,
    name: 'Shrikhand',
    category: 'Desserts',
    type: 'veg',
    price: 340,
    description: 'Authentic Gujarati Shrikhand, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20strained%20yogurt%20dessert%20with%20saffron%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=518490'
  },
  {
    id: 43,
    name: 'Basundi',
    category: 'Desserts',
    type: 'veg',
    price: 330,
    description: 'Authentic Gujarati Basundi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweetened%20thickened%20milk%20dessert%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=530835'
  },
  {
    id: 44,
    name: 'Mohanthal',
    category: 'Desserts',
    type: 'veg',
    price: 230,
    description: 'Authentic Gujarati Mohanthal, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/gram%20flour%20fudge%20dessert%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=543180'
  },
  {
    id: 45,
    name: 'Sukhdi',
    category: 'Desserts',
    type: 'veg',
    price: 210,
    description: 'Authentic Gujarati Sukhdi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/wheat%20flour%20and%20jaggery%20sweet%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=555525'
  },
  {
    id: 46,
    name: 'Kaju Katli',
    category: 'Desserts',
    type: 'veg',
    price: 350,
    description: 'Authentic Gujarati Kaju Katli, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/cashew%20fudge%20diamond%20shaped%20sweet%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=567870'
  },
  {
    id: 47,
    name: 'Jalebi',
    category: 'Desserts',
    type: 'veg',
    price: 440,
    description: 'Authentic Gujarati Jalebi, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/orange%20crispy%20spiral%20sweet%20soaked%20in%20syrup%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=580215'
  },
  {
    id: 48,
    name: 'Gajar Halwa',
    category: 'Desserts',
    type: 'veg',
    price: 170,
    description: 'Authentic Gujarati Gajar Halwa, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20carrot%20pudding%20dessert%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=592560'
  },
  {
    id: 49,
    name: 'Magas',
    category: 'Desserts',
    type: 'veg',
    price: 240,
    description: 'Authentic Gujarati Magas, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/gram%20flour%20sweet%20balls%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=604905'
  },
  {
    id: 50,
    name: 'Ghooghra',
    category: 'Desserts',
    type: 'veg',
    price: 220,
    description: 'Authentic Gujarati Ghooghra, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20fried%20pastry%20stuffed%20with%20coconut%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=617250'
  },
  {
    id: 51,
    name: 'Doodhpak',
    category: 'Desserts',
    type: 'veg',
    price: 280,
    description: 'Authentic Gujarati Doodhpak, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20milk%20and%20rice%20pudding%20indian%20food%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=629595'
  },
  {
    id: 52,
    name: 'Vaghareli Chaas',
    category: 'Beverages',
    type: 'veg',
    price: 370,
    description: 'Authentic Gujarati Vaghareli Chaas, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spiced%20buttermilk%20drink%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=641940'
  },
  {
    id: 53,
    name: 'Keri No Ras',
    category: 'Beverages',
    type: 'veg',
    price: 400,
    description: 'Authentic Gujarati Keri No Ras, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20mango%20puree%20indian%20dessert%20drink%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=654285'
  },
  {
    id: 54,
    name: 'Piyush',
    category: 'Beverages',
    type: 'veg',
    price: 380,
    description: 'Authentic Gujarati Piyush, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20thick%20yogurt%20and%20shrikhand%20drink%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=666630'
  },
  {
    id: 55,
    name: 'Nimbu Pani',
    category: 'Beverages',
    type: 'veg',
    price: 280,
    description: 'Authentic Gujarati Nimbu Pani, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/indian%20lemonade%20drink%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=678975'
  },
  {
    id: 56,
    name: 'Rose Sharbat',
    category: 'Beverages',
    type: 'veg',
    price: 310,
    description: 'Authentic Gujarati Rose Sharbat, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/sweet%20pink%20rose%20drink%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=691320'
  },
  {
    id: 57,
    name: 'Jaljeera',
    category: 'Beverages',
    type: 'veg',
    price: 270,
    description: 'Authentic Gujarati Jaljeera, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spicy%20cumin%20flavored%20drink%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=703665'
  },
  {
    id: 58,
    name: 'Masala Chai',
    category: 'Beverages',
    type: 'veg',
    price: 440,
    description: 'Authentic Gujarati Masala Chai, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/spiced%20milk%20tea%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=716010'
  },
  {
    id: 59,
    name: 'Fudina Chaas',
    category: 'Beverages',
    type: 'veg',
    price: 430,
    description: 'Authentic Gujarati Fudina Chaas, prepared with traditional spices and fresh ingredients for a delightful taste.',
    image: 'https://image.pollinations.ai/prompt/mint%20flavored%20buttermilk%20drink%20indian%20beverage%20high%20quality%20professional%20food%20photography?width=600&height=400&nologo=true&seed=728355'
  }
];
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
