import { v2 as cloudinary } from 'cloudinary';

class UploadImg {
    async Upload(req, res) {
        try {
            const { image, type } = req.body; 

            // Xác định folder dựa trên loại ảnh
            const targetFolder = type === 'detail' 
                ? 'nab_coffee/products/details' 
                : 'nab_coffee/products/main';

            const result = await cloudinary.uploader.upload(image, {
                upload_preset: 'nab_coffee_upload',
                folder: targetFolder, 
                allowed_formats: ['png', 'jpeg', 'jpg', 'svg', 'webp'],
            });

            // Trả về kết quả cho client
            return res.status(200).json({
                message: "Upload thành công!",
                url: result.secure_url,
                public_id: result.public_id
            });

        } catch (err) {
            console.error("eror upload:", err);
            return res.status(500).json({ message: "Upload fail", error: err });
        }
    }
}

export default new UploadImg();