const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database');
const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
const Driver = require('./models/Driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

dotenv.config();

// Mail Transporter Settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: '"CityCars.az" <noreply@citycars.az>',
            to,
            subject,
            text,
            html
        });
        console.log('Email sent to:', to);
    } catch (error) {
        console.error('Email error:', error);
    }
};

const app = express();
app.use(cors());
app.use(express.json());

// Sync Database
sequelize.sync({ alter: true }).then(async () => {
    console.log('Database synced');

    // Auto-update Admin Credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL || 'Vaqif';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Vaqif123@';

    try {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Check if a user with the admin email already exists
        let user = await User.findOne({ where: { email: adminEmail } });

        if (user) {
            // Update existing user to admin
            user.password = hashedPassword;
            user.role = 'admin';
            await user.save();
            console.log(`User promoted/updated to admin: ${adminEmail}`);
        } else {
            // Check if ANY admin exists (to update their credentials)
            let admin = await User.findOne({ where: { role: 'admin' } });

            if (admin) {
                admin.email = adminEmail;
                admin.password = hashedPassword;
                await admin.save();
                console.log(`Existing admin credentials updated to: ${adminEmail}`);
            } else {
                // Create new admin
                await User.create({
                    name: 'Administrator',
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'admin'
                });
                console.log(`New admin created: ${adminEmail}`);
            }
        }
    } catch (error) {
        console.error("Error updating admin credentials:", error);
    }
});

// Middleware for auth
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}

// Routes

// Auth
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role: 'user' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.json({ token, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.isBlacklisted) {
            return res.status(403).json({ message: 'Your account has been restricted. Contact support.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.json({ token, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/profile is already defined above

app.put('/api/auth/profile', authenticateToken, async (req, res) => {
    const { name, phone, address, email } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        // Email update might require verification, skipping for now or allow if not taken

        await user.save();

        // Return updated user without password
        const updatedUser = user.toJSON();
        delete updatedUser.password;

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Forgot Password Workflow
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = Math.random().toString(36).substr(2, 12);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
        await user.save();

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
        const resetLink = `${frontendUrl}/reset-password?token=${token}`;

        console.log(`Generating reset link for ${email}: ${resetLink}`);

        await sendEmail(
            email,
            'Password Reset Request - CityCars.az',
            `Click the link to reset your password: ${resetLink}`,
            `<h1>Password Reset</h1>
             <p>You requested a password reset. Click the button below to complete the process:</p>
             <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #ff3b3b; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
             <p>If the button doesn't work, copy and paste this link: <br/> ${resetLink}</p>
             <p>This link will expire in 1 hour.</p>`
        );

        res.json({ message: 'Reset email sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(`Received reset request for token: ${token}`);
    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cars
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/cars', authenticateToken, isAdmin, async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/cars/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Car.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Car updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/cars/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Car.destroy({ where: { id: req.params.id } });
        res.json({ message: "Car deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Bookings
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        // Send Notification Email
        await sendEmail(
            booking.email,
            'Booking Confirmation - CityCars.az',
            `Hello ${booking.firstName}, your booking #${booking.id} has been received.`,
            `<h1>Booking Confirmed!</h1><p>Dear ${booking.firstName}, your reservation for vehicle ID #${booking.carId} has been successfully recorded.</p>`
        );

        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/bookings', authenticateToken, isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/bookings/:id/status', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = status;
        await booking.save();
        res.json({ message: 'Booking status updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tracking
app.get('/api/bookings/:id/tracking', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Contact
app.post('/api/contact', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);

        // Send Confirmation to User
        await sendEmail(
            contact.email,
            'Message Received - CityCars.az',
            `Hello ${contact.name}, we have received your message: "${contact.subject}"`,
            `<p>Hi ${contact.name},</p><p>Thank you for contacting CityCars.az. We have received your inquiry regarding <b>${contact.subject}</b> and will get back to you shortly.</p>`
        );

        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/messages', authenticateToken, isAdmin, async (req, res) => {
    try {
        const messages = await Contact.findAll();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/messages/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Contact.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Drivers
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/drivers', authenticateToken, isAdmin, async (req, res) => {
    try {
        const driver = await Driver.create(req.body);
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/drivers/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Driver.destroy({ where: { id: req.params.id } });
        res.json({ message: "Driver deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/drivers/:id/blacklist', authenticateToken, isAdmin, async (req, res) => {
    try {
        const driver = await Driver.findByPk(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });

        driver.isBlacklisted = !driver.isBlacklisted;
        await driver.save();
        res.json({ message: `Driver ${driver.isBlacklisted ? 'blacklisted' : 'activated'}`, isBlacklisted: driver.isBlacklisted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Payments (Mock Integration)
app.post('/api/payments/process', async (req, res) => {
    const { amount, bookingId, cardNumber } = req.body;
    try {
        console.log(`Processing payment of $${amount} for booking #${bookingId}`);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success
        res.json({
            success: true,
            transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            message: 'Payment processed successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Payment failed' });
    }
});

// Users (Admin)
app.get('/api/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/users/:id/blacklist', authenticateToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isBlacklisted = !user.isBlacklisted; // Toggle
        await user.save();
        res.json({ message: `User ${user.isBlacklisted ? 'blacklisted' : 'activated'}`, isBlacklisted: user.isBlacklisted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ name, email, phone, address });
        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Stats
app.get('/api/admin/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [cars, bookings, users, messages] = await Promise.all([
            Car.count(),
            Booking.count(),
            User.count(),
            Contact.count()
        ]);
        res.json({ cars, bookings, users, messages });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
