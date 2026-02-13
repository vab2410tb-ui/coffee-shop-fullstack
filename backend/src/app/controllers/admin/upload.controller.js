import { v2 as cloudinary } from 'cloudinary';

class UploadImg {
    async Upload(req, res) {
        try {
            const { image, type } = req.body; // Giả sử frontend gửi thêm 'type' (main hoặc detail)

            // Xác định folder dựa trên loại ảnh
            const targetFolder = type === 'detail' 
                ? 'nab_coffee/products/details' 
                : 'nab_coffee/products/main';

            const result = await cloudinary.uploader.upload(image, {
                upload_preset: 'nab_coffee_upload',
                folder: targetFolder, // 👈 Đây là cách tạo folder động
                allowed_formats: ['png', 'jpeg', 'jpg', 'svg', 'webp'],
                // Đừng set public_id cố định nếu không muốn bị ghi đè ảnh cũ
            });

            // Trả về kết quả cho client
            return res.status(200).json({
                message: "Upload thành công!",
                url: result.secure_url,
                public_id: result.public_id
            });

        } catch (err) {
            console.error("Lỗi upload:", err);
            return res.status(500).json({ message: "Upload thất bại", error: err });
        }
    }
}

export default new UploadImg();