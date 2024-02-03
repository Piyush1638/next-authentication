// Import the mongoose library
import mongoose from "mongoose";

// Define a function called dbConnect using async/await
const dbConnect = async () => {
    try {
        // Connect to the MongoDB database using the provided URI from the environment variable
        await mongoose.connect(process.env.MONGO_URI!);

        // Get the connection instance from mongoose
        const connection = mongoose.connection;

        // Listen for the "connected" event and log a success message when the database connection is established
        connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        // Listen for the "error" event and log an error message when there's an issue with the database connection
        connection.on("error", (error) => {
            console.error("Error connecting to database:", error);
            process.exit();
        });
    } catch (error) {
        // Handle any errors that occur during the connection process
        console.error("Error connecting to database:", error);
    }
};

// Export the dbConnect function as the default export of this module
export default dbConnect;
