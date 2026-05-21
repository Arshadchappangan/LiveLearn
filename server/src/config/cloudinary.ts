import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
    const api_key = process.env.CLOUDINARY_API_KEY;
    const api_secret = process.env.CLOUDINARY_API_SECRET;

    if (!cloud_name || !api_key || !api_secret) {
        throw new Error(
            "Missing Cloudinary credentials. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to server/.env"
        );
    }

    cloudinary.config({ cloud_name, api_key, api_secret });
}

configureCloudinary();

export default cloudinary;
