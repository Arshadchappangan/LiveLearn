import sharp from "sharp";
import cloudinary from "@/config/cloudinary";

export class CloudinaryService {
    async uploadAvatar(filePath: Express.Multer.File) {
        const obtimizedImage = await sharp(filePath.buffer)
            .resize(500, 500)
            .jpeg({ quality: 80 })
            .toBuffer();

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "avatars/avatars" },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            ).end(obtimizedImage);
        })
    }
}

