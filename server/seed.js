const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Reservation = require('./models/Reservation');
const Reward = require('./models/Reward');
const RewardHistory = require('./models/RewardHistory');

// Existing data extracted from src/data/menuData.js
const menuItems = [
  {
    "id": 1,
    "name": "Khaman Dhokla",
    "category": "Starters",
    "type": "veg",
    "price": 190,
    "description": "Soft, spongy steamed gram flour cake with a tangy and mildly sweet taste, topped with mustard seeds and curry leaves.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6f/SPECIAL_SURATI_KHAMAN.jpg"
  },
  {
    "id": 2,
    "name": "Khandvi",
    "category": "Starters",
    "type": "veg",
    "price": 180,
    "description": "Delicate gram flour and buttermilk rolls seasoned with mustard seeds, coconut and coriander.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Gate_of_Khandvi.jpg"
  },
  {
    "id": 3,
    "name": "Methi Gota",
    "category": "Starters",
    "type": "veg",
    "price": 160,
    "description": "Crispy deep-fried fritters made with fresh fenugreek leaves and spiced gram flour batter.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Methi_na_Gota.jpg"
  },
  {
    "id": 4,
    "name": "Patra",
    "category": "Starters",
    "type": "veg",
    "price": 200,
    "description": "Colocasia leaves rolled with spiced gram flour paste, steamed and then pan-fried to perfection.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Patra_-_Gujarati_Snack.jpg"
  },
  {
    "id": 5,
    "name": "Handvo",
    "category": "Starters",
    "type": "veg",
    "price": 220,
    "description": "A savory baked cake made of rice and lentil batter mixed with vegetables and spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Handavo3.jpg"
  },
  {
    "id": 6,
    "name": "Fafda",
    "category": "Starters",
    "type": "veg",
    "price": 150,
    "description": "Crispy, crunchy strips made from chickpea flour — the iconic Gujarati snack often paired with jalebi.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/40/Fafda.jpg"
  },
  {
    "id": 7,
    "name": "Muthiya",
    "category": "Starters",
    "type": "veg",
    "price": 170,
    "description": "Steamed and pan-fried dumplings made from flour, vegetables and a blend of spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Gujrati_Muthia.jpg"
  },
  {
    "id": 8,
    "name": "Lilva Kachori",
    "category": "Starters",
    "type": "veg",
    "price": 230,
    "description": "Deep-fried pastry stuffed with spiced green pigeon peas — a seasonal winter delicacy.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Kachori.jpg"
  },
  {
    "id": 9,
    "name": "Dabeli",
    "category": "Starters",
    "type": "veg",
    "price": 120,
    "description": "A popular street food — spiced potato filling in a soft bread bun with pomegranate, sev and chutneys.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/62/Daabeli.JPG"
  },
  {
    "id": 10,
    "name": "Sev Khamani",
    "category": "Starters",
    "type": "veg",
    "price": 180,
    "description": "Coarsely ground dhokla topped with vibrant sev, pomegranate seeds and a tempering of mustard seeds.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/67/Sev_khamani.jpg"
  },
  {
    "id": 11,
    "name": "Khichu",
    "category": "Starters",
    "type": "veg",
    "price": 140,
    "description": "A semi-cooked rice flour preparation served hot with sesame oil — a comfort food from Gujarat.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Khichu.JPG"
  },
  {
    "id": 12,
    "name": "Undhiyu",
    "category": "Main Course",
    "type": "veg",
    "price": 380,
    "description": "A one-pot seasonal mixed vegetable curry slow-cooked with fenugreek dumplings and fresh coconut.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Undhiyu.jpg"
  },
  {
    "id": 13,
    "name": "Sev Tameta Nu Shak",
    "category": "Main Course",
    "type": "veg",
    "price": 240,
    "description": "A tangy tomato curry richly flavored with jaggery and topped generously with crispy sev.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sev_Tameta.jpg"
  },
  {
    "id": 14,
    "name": "Dal Dhokli",
    "category": "Main Course",
    "type": "veg",
    "price": 280,
    "description": "A comforting one-pot dish of spiced toor lentil stew with soft whole wheat flour dumplings.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Dal_Dhokali.jpg"
  },
  {
    "id": 15,
    "name": "Ringan No Olo",
    "category": "Main Course",
    "type": "veg",
    "price": 220,
    "description": "Fire-roasted eggplant mash tempered with mustard seeds, garlic and fresh coriander.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Baigan_Bharta_from_Nagpur.JPG"
  },
  {
    "id": 16,
    "name": "Bhindi Sambhariya",
    "category": "Main Course",
    "type": "veg",
    "price": 250,
    "description": "Fresh okra stuffed with a spiced coconut and peanut masala, stir-fried until tender.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/34/Bharwan_bhindi.jpg"
  },
  {
    "id": 17,
    "name": "Lasaniya Batata",
    "category": "Main Course",
    "type": "veg",
    "price": 210,
    "description": "Baby potatoes cooked in a bold, spicy garlic-based gravy — a rustic Gujarati classic.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Batata_nu_shaak.jpg"
  },
  {
    "id": 18,
    "name": "Kaju Gathiya",
    "category": "Main Course",
    "type": "veg",
    "price": 320,
    "description": "A rich and indulgent curry of cashews and crispy gram flour noodles in a luscious tomato-onion base.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/66/Ghatiya_2013-11-30_18-09.jpg"
  },
  {
    "id": 19,
    "name": "Rasawala Batata",
    "category": "Main Course",
    "type": "veg",
    "price": 200,
    "description": "Potatoes simmered in a thin, tangy, spiced tomato broth — a light yet flavorful curry.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Aloo_tamatar.jpg"
  },
  {
    "id": 20,
    "name": "Chana Masala",
    "category": "Main Course",
    "type": "veg",
    "price": 260,
    "description": "Hearty chickpeas slow-cooked in an aromatic, tangy and spiced tomato-onion gravy.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chana_masala.jpg"
  },
  {
    "id": 21,
    "name": "Mag Ni Dal",
    "category": "Main Course",
    "type": "veg",
    "price": 220,
    "description": "Yellow split moong lentils tempered with ghee, cumin, green chili and ginger — simple and nourishing.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Moong_dal.jpg"
  },
  {
    "id": 22,
    "name": "Tindora Nu Shak",
    "category": "Main Course",
    "type": "veg",
    "price": 200,
    "description": "Tender ivy gourd sautéed with mustard seeds, sesame seeds and a blend of Gujarati spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Tindora_sabji.jpg"
  },
  {
    "id": 23,
    "name": "Galka Nu Shak",
    "category": "Main Course",
    "type": "veg",
    "price": 190,
    "description": "Ridge gourd stir-fried with fresh coconut and simple home spices — light and digestive.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/55/Turai_ki_sabzi.jpg"
  },
  {
    "id": 24,
    "name": "Kobi Batata",
    "category": "Main Course",
    "type": "veg",
    "price": 200,
    "description": "Shredded cabbage and potatoes stir-fried with mustard seeds and turmeric — a simple home-style dish.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/05/Cabbage_potato_stir_fry.jpg"
  },
  {
    "id": 25,
    "name": "Vaghareli Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 240,
    "description": "Spiced rice and lentil porridge tempered with whole spices, served with a dollop of ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Khichdi_(1).jpg"
  },
  {
    "id": 26,
    "name": "Ram Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 220,
    "description": "A lighter, wholesome rice and moong dal one-pot meal cooked with seasonal vegetables.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/36/Khichdi.jpg"
  },
  {
    "id": 27,
    "name": "Rajwadi Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 300,
    "description": "A royal, rich variation of khichdi enriched with cashews, ghee and aromatic dry fruits.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/Daal_khichdi.jpg"
  },
  {
    "id": 28,
    "name": "Jeera Rice",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 180,
    "description": "Fragrant long-grain basmati rice cooked with cumin seeds and finished with a drizzle of ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Jeera_rice.jpg"
  },
  {
    "id": 29,
    "name": "Veg Pulao",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 250,
    "description": "Aromatic basmati rice cooked with seasonal vegetables, whole spices and fresh herbs.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Veg_pulao.jpg"
  },
  {
    "id": 30,
    "name": "Tuver Pulao",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 260,
    "description": "Seasonal fresh pigeon peas cooked with fragrant basmati rice and Gujarati spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tuvar_Pulao.jpg"
  },
  {
    "id": 31,
    "name": "Fada Ni Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 230,
    "description": "Broken wheat cooked with green moong lentils and tempered with ghee and spices.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lapsi_broken_wheat.jpg"
  },
  {
    "id": 32,
    "name": "Sadi Khichdi",
    "category": "Rice Dishes",
    "type": "veg",
    "price": 180,
    "description": "A plain, simple and comforting rice and lentil porridge — the ultimate comfort food.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/36/Khichdi.jpg"
  },
  {
    "id": 33,
    "name": "Thepla",
    "category": "Breads",
    "type": "veg",
    "price": 120,
    "description": "Soft flatbreads made with whole wheat flour, fresh fenugreek leaves and spices — a Gujarati staple.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Thepla.jpg"
  },
  {
    "id": 34,
    "name": "Bhakhri",
    "category": "Breads",
    "type": "veg",
    "price": 100,
    "description": "Crispy, wholesome whole wheat or millet flatbread — a classic accompaniment to Gujarati sabzis.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Bhakri.jpg"
  },
  {
    "id": 35,
    "name": "Bajra No Rotlo",
    "category": "Breads",
    "type": "veg",
    "price": 110,
    "description": "Thick pearl millet flatbread cooked on an open flame, served with jaggery and ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Bajra_Roti.jpg"
  },
  {
    "id": 36,
    "name": "Jowar No Rotlo",
    "category": "Breads",
    "type": "veg",
    "price": 110,
    "description": "Nutritious sorghum flatbread — a rustic, gluten-free bread from rural Gujarat.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/68/Jowar_roti.jpg"
  },
  {
    "id": 37,
    "name": "Puran Poli",
    "category": "Breads",
    "type": "veg",
    "price": 180,
    "description": "Sweet flatbread stuffed with a rich filling of chana dal, jaggery and cardamom.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Puran_poli.jpg"
  },
  {
    "id": 38,
    "name": "Dhebra",
    "category": "Breads",
    "type": "veg",
    "price": 130,
    "description": "Deep-fried, spiced pearl millet bread often made with fenugreek and sesame seeds.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Methi_Thepla.jpg"
  },
  {
    "id": 39,
    "name": "Khakhra",
    "category": "Breads",
    "type": "veg",
    "price": 90,
    "description": "Thin, crispy whole wheat flatbread roasted to perfection — a healthy everyday Gujarati snack.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/12/Khakra.jpg"
  },
  {
    "id": 40,
    "name": "Phulka Roti",
    "category": "Breads",
    "type": "veg",
    "price": 100,
    "description": "Light, puffed whole wheat flatbreads cooked over direct flame, served with ghee.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Chapati_2.jpg"
  },
  {
    "id": 41,
    "name": "Puri",
    "category": "Breads",
    "type": "veg",
    "price": 130,
    "description": "Golden, deep-fried puffed bread made from whole wheat flour — festive and delicious.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Puri_with_potato_curry.jpg"
  },
  {
    "id": 42,
    "name": "Shrikhand",
    "category": "Desserts",
    "type": "veg",
    "price": 200,
    "description": "Thick, creamy strained yogurt sweetened with sugar and infused with saffron and cardamom.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/64/Shrikhand.jpg"
  },
  {
    "id": 43,
    "name": "Basundi",
    "category": "Desserts",
    "type": "veg",
    "price": 220,
    "description": "Thickened sweetened milk garnished with saffron, pistachios and cardamom — a creamy dessert.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Basundi.jpg"
  },
  {
    "id": 44,
    "name": "Mohanthal",
    "category": "Desserts",
    "type": "veg",
    "price": 240,
    "description": "A rich, dense gram flour fudge made with ghee, sugar and fragrant cardamom — a festive sweet.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/02/Mohanthal.jpg"
  },
  {
    "id": 45,
    "name": "Sukhdi",
    "category": "Desserts",
    "type": "veg",
    "price": 160,
    "description": "A simple, wholesome sweet made from whole wheat flour, ghee and jaggery — a traditional treat.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Sukhdi.jpg"
  },
  {
    "id": 46,
    "name": "Kaju Katli",
    "category": "Desserts",
    "type": "veg",
    "price": 350,
    "description": "Diamond-shaped cashew fudge with a delicate silver leaf garnish — the king of Indian sweets.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Kaju_Katli.jpg"
  },
  {
    "id": 47,
    "name": "Jalebi",
    "category": "Desserts",
    "type": "veg",
    "price": 150,
    "description": "Crispy, golden spiral-shaped sweets soaked in fragrant sugar syrup — served hot for best taste.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/04/Jalebi_Sweet.JPG"
  },
  {
    "id": 48,
    "name": "Gajar Halwa",
    "category": "Desserts",
    "type": "veg",
    "price": 200,
    "description": "Slow-cooked grated carrots with milk, ghee, sugar and cardamom — a warm winter dessert.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/91/Gajar_ka_halwa.jpg"
  },
  {
    "id": 49,
    "name": "Magas",
    "category": "Desserts",
    "type": "veg",
    "price": 180,
    "description": "Soft, melt-in-mouth gram flour and ghee sweet — a traditional Gujarati festival favorite.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Besan_Ladoo.jpg"
  },
  {
    "id": 50,
    "name": "Ghooghra",
    "category": "Desserts",
    "type": "veg",
    "price": 170,
    "description": "Deep-fried pastry pockets stuffed with sweet coconut, dry fruits and khoya filling.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Karanji.jpg"
  },
  {
    "id": 51,
    "name": "Doodhpak",
    "category": "Desserts",
    "type": "veg",
    "price": 210,
    "description": "Creamy rice pudding cooked slowly in full-fat milk with saffron, cardamom and dry fruits.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/40/Kheer_with_condensed_milk..JPG"
  },
  {
    "id": 52,
    "name": "Vaghareli Chaas",
    "category": "Beverages",
    "type": "veg",
    "price": 80,
    "description": "Tempered spiced buttermilk with mustard seeds, curry leaves and green chili — a digestive drink.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Chaas.jpg"
  },
  {
    "id": 53,
    "name": "Keri No Ras",
    "category": "Beverages",
    "type": "veg",
    "price": 150,
    "description": "Pure, sweet Alphonso mango pulp — the essence of Indian summers, served chilled.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/27/Aamras.jpg"
  },
  {
    "id": 54,
    "name": "Piyush",
    "category": "Beverages",
    "type": "veg",
    "price": 130,
    "description": "A rich, sweet drink made by blending shrikhand with chilled buttermilk and saffron.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Piyush_drink.jpg"
  },
  {
    "id": 55,
    "name": "Nimbu Pani",
    "category": "Beverages",
    "type": "veg",
    "price": 70,
    "description": "Refreshing Indian lemonade with a choice of sweet, salty or both — the perfect summer cooler.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Nimbu_Pani.jpg"
  },
  {
    "id": 56,
    "name": "Rose Sharbat",
    "category": "Beverages",
    "type": "veg",
    "price": 90,
    "description": "A beautifully pink, fragrant drink made with real rose syrup, served ice-cold.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/52/Rose_Sharbat.jpg"
  },
  {
    "id": 57,
    "name": "Jaljeera",
    "category": "Beverages",
    "type": "veg",
    "price": 80,
    "description": "A tangy, spiced cumin and mint water — an appetite stimulant and digestive drink.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jaljeera.jpg"
  },
  {
    "id": 58,
    "name": "Masala Chai",
    "category": "Beverages",
    "type": "veg",
    "price": 60,
    "description": "Indian spiced tea brewed with ginger, cardamom, cloves and cinnamon — soul in a cup.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/89/Chai_In_Sakora.jpg"
  },
  {
    "id": 59,
    "name": "Fudina Chaas",
    "category": "Beverages",
    "type": "veg",
    "price": 80,
    "description": "Cool, refreshing mint-flavored buttermilk — a perfect accompaniment to any Gujarati thali.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/Mint_buttermilk.jpg"
  }
];

const categories = ["Starters","Main Course","Rice Dishes","Breads","Desserts","Beverages"];

const dashboardOrders = [
  {
    id: 'ORD-2024-001', date: '2024-12-15', status: 'Completed',
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 480 },
      { name: 'Paneer Butter Masala', quantity: 1, price: 380 },
      { name: 'Gulab Jamun', quantity: 2, price: 150 },
      { name: 'Lassi', quantity: 2, price: 120 },
    ]
  },
  {
    id: 'ORD-2024-002', date: '2024-11-28', status: 'Completed',
    items: [
      { name: 'Pav Bhaji', quantity: 2, price: 250 },
      { name: 'Mutton Rogan Josh', quantity: 1, price: 580 },
      { name: 'Rasmalai', quantity: 1, price: 185 },
    ]
  },
  {
    id: 'ORD-2025-003', date: '2025-01-10', status: 'Completed',
    items: [
      { name: 'Tandoori Chicken', quantity: 2, price: 450 },
      { name: 'Masala Chai', quantity: 3, price: 80 },
    ]
  },
];

const dashboardReservations = [
  { name: 'Alexander Sterling', phone: '1234567890', date: '2025-07-15', time: '19:30', guests: 4, table: 3, status: 'Confirmed' },
  { name: 'Alexander Sterling', phone: '1234567890', date: '2025-08-02', time: '20:00', guests: 2, table: 1, status: 'Confirmed' },
  { name: 'Alexander Sterling', phone: '1234567890', date: '2025-08-20', time: '19:00', guests: 8, table: 10, status: 'Pending' },
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mongo-meals';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Clear existing
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Reservation.deleteMany({});
    await Reward.deleteMany({});
    await RewardHistory.deleteMany({});
    console.log('Cleared existing collections.');

    // Seed Categories
    const categoryDocs = categories.map((name, index) => ({ name, order: index }));
    await Category.insertMany(categoryDocs);
    console.log('Successfully seeded categories!');
    
    // Seed Menu Items
    await MenuItem.insertMany(menuItems);
    console.log('Successfully seeded menu items!');

    // Seed Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@mongomeals.com',
      password: hashedPassword,
      role: 'admin',
      points: 1000,
      tier: 'Platinum'
    });
    console.log('Successfully seeded admin user (admin@mongomeals.com / admin123)!');

    // Seed Orders
    const orderDocs = dashboardOrders.map(o => {
      const subtotal = o.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.05;
      const serviceFee = 50;
      const total = subtotal + tax + serviceFee;
      return {
        userId: adminUser._id,
        items: o.items,
        subtotal,
        tax,
        serviceFee,
        total,
        status: o.status,
        createdAt: new Date(o.date)
      };
    });
    await Order.insertMany(orderDocs);
    console.log('Successfully seeded orders!');

    // Seed Reservations
    const reservationDocs = dashboardReservations.map(r => ({
      userId: adminUser._id,
      name: r.name,
      phone: r.phone,
      date: r.date,
      guests: r.guests,
      table: r.table,
      status: r.status
    }));
    await Reservation.insertMany(reservationDocs);
    console.log('Successfully seeded reservations!');

    // Seed Rewards
    const rewards = [
      { name: 'Free Soft Drink', description: 'Quench your thirst with a complimentary beverage.', pointsCost: 200, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop' },
      { name: 'Dessert', description: 'Enjoy any signature dessert from our menu.', pointsCost: 400, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop' },
      { name: 'Starter', description: 'Choose any fine starter of your choice.', pointsCost: 700, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&h=400&fit=crop' },
      { name: '₹250 Voucher', description: 'Get a flat ₹250 off on your next dining bill.', pointsCost: 1000, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' }
    ];
    await Reward.insertMany(rewards);
    console.log('Successfully seeded rewards!');

    // Seed Reward History
    const historyDocs = [
      { userId: adminUser._id, type: 'Earned', points: 500, description: 'Welcome Bonus Points', date: new Date('2025-06-01') },
      { userId: adminUser._id, type: 'Earned', points: 700, description: 'Spent on Dining', date: new Date('2025-06-15') },
      { userId: adminUser._id, type: 'Redeemed', points: 200, description: 'Redeemed Free Soft Drink', date: new Date('2025-06-20') }
    ];
    await RewardHistory.insertMany(historyDocs);
    console.log('Successfully seeded reward history!');
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  });
