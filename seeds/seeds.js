import mongoose from 'mongoose';
import Category from '../models/category.js';

// Define the seed data
const categoriesData = [
    //expense
    {
        name: 'Shopping',
        type: 'expense',
        icon: 'shopping-outline',
        color: '#2ecc71',
    },
    {
        name: 'Home',
        type: 'expense',
        icon: 'home-outline',
        color: '#e74c3c',
    },
    {
        name: 'Travel',
        type: 'expense',
        icon: 'airplane',
        color: '#e74c3c',
    },
    {
        name: 'Electronics',
        type: 'expense',
        icon: 'cable-data',
        color: '#e74c3c',
    },
    {
        name: 'Snack',
        type: 'expense',
        icon: 'cupcake',
        color: '#e74c3c',
    },
    {
        name: 'Gift',
        type: 'expense',
        icon: 'gift-outline',
        color: '#e74c3c',
    },
    {
        name: 'Education',
        type: 'expense',
        icon: 'book-open-variant',
        color: '#e74c3c',
    },
    {
        name: 'Transportation',
        type: 'expense',
        icon: 'bus',
        color: '#e74c3c',
    },
    {
        name: 'Telephone',
        type: 'expense',
        icon: 'phone-outline',
        color: '#e74c3c',
    },
    {
        name: 'Food',
        type: 'expense',
        icon: 'food',
        color: '#e74c3c',
    },
    {
        name: 'Sport',
        type: 'expense',
        icon: 'dumbbell',
        color: '#e74c3c',
    },
    {
        name: 'Car',
        type: 'expense',
        icon: 'car-outline',
        color: '#e74c3c',
    },
    {
        name: 'Bills',
        type: 'expense',
        icon: 'attach-money',
        color: '#e74c3c',
    },
    {
        name: 'Health',
        type: 'expense',
        icon: 'medical-bag',
        color: '#e74c3c',
    },
    {
        name: 'Entertainment',
        type: 'expense',
        icon: 'gamepad-variant-outline',
        color: '#e74c3c',
    },
    {
        name: 'Pets',
        type: 'expense',
        icon: 'dog',
        color: '#e74c3c',
    },
    {
        name: 'Smoking',
        type: 'expense',
        icon: 'smoking',
        color: '#e74c3c',
    },
    {
        name: 'Beauty',
        type: 'expense',
        icon: 'lipstick',
        color: '#e74c3c',
    },
    {
        name: 'Kids',
        type: 'expense',
        icon: 'baby-face-outline',
        color: '#e74c3c',
    },
    {
        name: 'Vegetables',
        type: 'expense',
        icon: 'carrot',
        color: '#e74c3c',
    },
    {
        name: 'Rental',
        type: 'expense',
        icon: 'home-alert',
        color: '#e74c3c',
    },
    {
        name: 'Maintenance',
        type: 'expense',
        icon: 'cog-outline',
        color: '#e74c3c',
    },

    //income
    {
        name: 'Salary',
        type: 'income',
        icon: 'wallet-outline',
        color: '#e74c3c',
    },
    {
        name: 'Rental',
        type: 'income',
        icon: 'home-alert',
        color: '#e74c3c',
    },
    {
        name: 'Awards',
        type: 'income',
        icon: 'trophy-award',
        color: '#e74c3c',
    },
    {
        name: 'Refunds',
        type: 'income',
        icon: 'swap-horizontal-circle-outline',
        color: '#e74c3c',
    },
    {
        name: 'Others',
        type: 'income',
        icon: 'dots-hexagon',
        color: '#e74c3c',
    },
];

// Define the seeding logic
const seedDatabase = async (userId) => {
    try {
        // Map the categoriesData to add the userId field
        const categoriesWithUserId = categoriesData.map(cat => ({
            ...cat,
            userId: userId,
        }));

        // Insert the seed data into the Category collection
        await Category.insertMany(categoriesWithUserId);

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

export default seedDatabase;
