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
    "image": "https://images.unsplash.com/photo-1601050690297-108e487d7b3d?w=800&fit=crop"
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
    "image": "https://images.unsplash.com/photo-1546833998-8778e4a20b31?w=800&fit=crop"
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
    "image": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&fit=crop"
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
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&fit=crop"
  },
  {
    "id": 19,
    "name": "Lachha Paratha",
    "category": "Breads",
    "type": "veg",
    "price": 75,
    "description": "Multi-layered flaky whole wheat flatbread cooked with ghee.",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&fit=crop"
  },
  {
    "id": 20,
    "name": "Gulab Jamun (2 pcs)",
    "category": "Desserts",
    "type": "veg",
    "price": 130,
    "description": "Warm milk dumplings soaked in cardamom and rose sugar syrup.",
    "image": "https://images.unsplash.com/photo-1571006682858-a4c8a51d1020?w=800&fit=crop"
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
