let cloudinary;
if (typeof window === "undefined") {
    // Import only on the server
    const { v2 } = require("cloudinary");
    cloudinary = v2;
    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    });
}
export default cloudinary;
