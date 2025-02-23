import Product from "../model/Product.model.js";
import User from "../model/User.model.js";

import products from "./dataSample.js";
import mongoose from "mongoose";


const mongoURI = "";
mongoose.connect(mongoURI);

const seeder = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.create({
            name: "Admin",
            email: "root@gmail.com",
            password: "123456",
            role: "admin"
        });

        const adminUser = createdUsers._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser};
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported");
        process.exit();
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

seeder();