# 🚀 Happy birth day 2006-2026 - Vũ Trụ MEMEs Khoa

Trang web tương tác chúc mừng sinh nhật độc bản dành cho Khoa: kết hợp không gian vũ trụ huyền ảo, sao băng định kỳ bay qua, Hộp Quà 3D và các meme tự động trôi bồng bềnh từ dưới lên trên ở 2 bên.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: React 18 + Vite (Cực nhanh và nhẹ)
- **Styling**: Tailwind CSS + Custom Cosmic Glow, Scanlines & Floating Stream Keyframes
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Particles / Vũ trụ sao**: `@tsparticles/react`, `@tsparticles/slim`, `canvas-confetti`
- **Animation**: `framer-motion` (Typewriter effect, Modal Lightbox, sao băng)
- **Icons**: `lucide-react`
- **Sound System**: Web Audio API (Tạo âm thanh chimes & vụ nổ chân thực)

---

## 📦 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Cài đặt các thư viện phụ thuộc:
```bash
pnpm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server):
```bash
pnpm dev
```
Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:3000`.

### 3. Build sản phẩm hoàn thiện (Production):
```bash
pnpm run build
```

---

## 📸 Hướng Dẫn Thay Thế Ảnh

1. Toàn bộ 23 ảnh trong thư mục `meme_img` đã được tự động sao chép sang thư mục `public/meme_img/`.
2. Khi muốn thêm hoặc thay ảnh mới, chỉ cần thả ảnh vào thư mục `public/meme_img/` và cập nhật đường dẫn trong `src/data/photosData.js`.
3. Ảnh được hiển thị tinh gọn dưới dạng khung tranh hiện đại, **không gắn caption hay tag**, tự động trôi liên tục từ dưới lên trên.

---

## 🌟 Trải Nghiệm 3 Màn Chơi (User Journey)

1. **Scene 1 - Vũ Trụ**: Hiệu ứng mạng lưới sao kết nối bằng tương tác chuột, sao băng định kỳ bay ngang bầu trời, dòng chữ chúc mừng sinh nhật Khoa gõ Typewriter.
2. **Scene 2 - Hộp Quà 3D**: Hộp quà hologram phát sáng lơ lửng, cho phép xoay 360 độ tự do bằng chuột với hiệu ứng kim tuyến rực rỡ.
3. **Scene 3 - Vũ Trụ MEMEs Khoa (Zero-Gravity Free Floating)**:
   - Nắp hộp quà phát nổ cùng âm thanh boom và pháo hoa rực rỡ 3 màu (Cyan - Tím - Trắng).
   - Các ảnh meme **trôi nổi tự do trong không gian không trọng lực** trên khắp màn hình.
   - Hiệu ứng chuyển động hữu cơ (Organic float theo nhiều hướng và xoay góc nhẹ nhàng).
   - **Tương tác kéo thả (Drag & Drop)**: Người dùng có thể dùng chuột kéo quăng các tấm ảnh tự do đi bất cứ đâu trên màn hình.
   - Nhấp vào ảnh để mở Lightbox phóng to xem cận cảnh. Có nút "Đổi đợt meme khác" để luân chuyển qua toàn bộ 23 tấm ảnh.
   - Ở giữa màn hình là tấm thiệp *"Happy birth day"* cố định nổi bật với chữ ký *"From Hieu & Trung w/ luv"*.
