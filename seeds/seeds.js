import mongoose from 'mongoose';
import Category from '../models/category.js';

// Define the seed data
const categoriesData = [
    //expense
    {
        name: 'Shopping',
        type: 'expense',
        icon: 'shopping-outline',
        color: '#658354',
    },
    {
        name: 'Home',
        type: 'expense',
        icon: 'home-outline',
        color: '#658354',
    },
    {
        name: 'Travel',
        type: 'expense',
        icon: 'airplane',
        color: '#658354',
    },
    {
        name: 'Electronics',
        type: 'expense',
        icon: 'cable-data',
        color: '#658354',
    },
    {
        name: 'Snack',
        type: 'expense',
        icon: 'cupcake',
        color: '#658354',
    },
    {
        name: 'Gift',
        type: 'expense',
        icon: 'gift-outline',
        color: '#658354',
    },
    {
        name: 'Education',
        type: 'expense',
        icon: 'book-open-variant',
        color: '#658354',
    },
    {
        name: 'Transportation',
        type: 'expense',
        icon: 'bus',
        color: '#658354',
    },
    {
        name: 'Telephone',
        type: 'expense',
        icon: 'phone-outline',
        color: '#658354',
    },
    {
        name: 'Food',
        type: 'expense',
        icon: 'food',
        color: '#658354',
    },
    {
        name: 'Sport',
        type: 'expense',
        icon: 'dumbbell',
        color: '#658354',
    },
    {
        name: 'Car',
        type: 'expense',
        icon: 'car-outline',
        color: '#658354',
    },
    {
        name: 'Bills',
        type: 'expense',
        icon: 'billboard',
        color: '#658354',
    },
    {
        name: 'Health',
        type: 'expense',
        icon: 'medical-bag',
        color: '#658354',
    },
    {
        name: 'Entertainment',
        type: 'expense',
        icon: 'gamepad-variant-outline',
        color: '#658354',
    },
    {
        name: 'Pets',
        type: 'expense',
        icon: 'dog',
        color: '#658354',
    },
    {
        name: 'Smoking',
        type: 'expense',
        icon: 'smoking',
        color: '#658354',
    },
    {
        name: 'Beauty',
        type: 'expense',
        icon: 'lipstick',
        color: '#658354',
    },
    {
        name: 'Kids',
        type: 'expense',
        icon: 'baby-face-outline',
        color: '#658354',
    },
    {
        name: 'Vegetables',
        type: 'expense',
        icon: 'carrot',
        color: '#658354',
    },
    {
        name: 'Rental',
        type: 'expense',
        icon: 'home-alert',
        color: '#658354',
    },
    {
        name: 'Maintenance',
        type: 'expense',
        icon: 'cog-outline',
        color: '#658354',
    },

    //income
    {
        name: 'Salary',
        type: 'income',
        icon: 'wallet-outline',
        color: '#658354',
    },
    {
        name: 'Rental',
        type: 'income',
        icon: 'home-alert',
        color: '#658354',
    },
    {
        name: 'Awards',
        type: 'income',
        icon: 'trophy-award',
        color: '#658354',
    },
    {
        name: 'Refunds',
        type: 'income',
        icon: 'swap-horizontal-circle-outline',
        color: '#658354',
    },
    {
        name: 'Others',
        type: 'income',
        icon: 'dots-hexagon',
        color: '#658354',
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
