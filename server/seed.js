const sequelize = require('./database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

async function seed() {
    await sequelize.sync({ force: true }); // Reset database to fix schema issues

    // Check if admin exists
    const adminEmail = process.env.ADMIN_EMAIL || 'Vaqif';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Vaqif123@';

    const adminExists = await User.findOne({ where: { email: adminEmail } });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });
        console.log(`Admin user ${adminEmail} created`);
    } else {
        console.log('Admin user already exists');
    }

    // Seed Cars
    const carsCount = await require('./models/Car').count();
    if (carsCount === 0) {
        await require('./models/Car').bulkCreate([
            { name: 'BMW 5 Series', price: 120, type: 'Limousine', image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=800&q=80', rating: 4.9, fuel: 'Petrol' },
            { name: 'Mercedes E-Class', price: 140, type: 'Sedan', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80', rating: 4.8, fuel: 'Diesel' },
            { name: 'Audi Q7', price: 180, type: 'SUV', image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800&q=80', rating: 4.9, fuel: 'Hybrid' },
        ]);
        console.log('Cars seeded');
    }

    // Seed Drivers
    const Driver = require('./models/Driver');
    const driversCount = await Driver.count();
    if (driversCount === 0) {
        await Driver.bulkCreate([
            {
                name: 'Elchin Aliyev',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
                experience: 8,
                rating: 4.9,
                languages: 'Azerbaijani, Russian, English',
                price: 50,
                available: true
            },
            {
                name: 'Mehman Mammadov',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
                experience: 12,
                rating: 5.0,
                languages: 'Azerbaijani, Turkish, English',
                price: 65,
                available: true
            },
            {
                name: 'Rashad Guliyev',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                experience: 5,
                rating: 4.8,
                languages: 'Azerbaijani, English',
                price: 45,
                available: true
            }
        ]);
        console.log('Drivers seeded');
    }

    process.exit();
}

seed();
