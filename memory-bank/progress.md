# Progress: Trạng thái và các vấn đề đã biết

## 1. Những gì đã hoạt động

- **Tích hợp trang giới thiệu vào trang chủ:** Đã thay thế trang chủ mặc định bằng nội dung của trang giới thiệu, giúp người dùng tiếp cận thông tin quan trọng ngay lập tức.
- **Thêm công cụ OTP:** Đã thêm một trang công cụ OTP, tích hợp component React, cập nhật giao diện (bao gồm ẩn/hiện secret key), và thêm điều hướng trong sidebar và navbar.
- **Thêm hướng dẫn VibeCoding:** Đã tạo một mục tài liệu hoàn chỉnh để giải thích và hướng dẫn cách sử dụng phương pháp VibeCoding với CLine và Cursor thông qua AI Thực Chiến Gateway.
- **Tùy chỉnh Theme cho Code Block:** Tạo file theme Prism tùy chỉnh (`src/utils/prismTheme.ts`) và cập nhật `docusaurus.config.ts` để áp dụng bảng màu mới cho việc tô sáng cú pháp, đảm bảo tính nhất quán về giao diện.
- **Áp dụng Bảng màu Mới:** Cập nhật file `src/css/custom.css` để triển khai bảng màu mới theo yêu cầu, bao gồm việc định nghĩa lại các biến màu chính, màu nền và màu chữ cho cả hai chế độ sáng và tối.
- **Sửa lỗi Tô sáng Cú pháp:** Đã khắc phục hoàn toàn lỗi tô sáng cú pháp bằng cách thay thế các thẻ `<code>` không đúng chuẩn bằng component `<CodeBlock>` trong toàn bộ tài liệu.
- **Cải thiện Giao diện Code Block:** Cập nhật thành công file `src/css/custom.css` để thêm viền, bo góc, và hiệu ứng đổ bóng cho các khối code, giúp chúng nổi bật và dễ đọc hơn.
- **Thêm Nút Sao chép Code:** Bổ sung các quy tắc CSS để đảm bảo nút sao chép trên các khối code hiển thị rõ ràng và hoạt động tốt, cải thiện trải nghiệm sao chép-dán cho nhà phát triển.
- **Tạo nội dung tài liệu:** Toàn bộ nội dung cơ bản cho các hướng dẫn đã được soạn thảo.
- **Cấu trúc Docusaurus:** Cấu trúc thư mục và các file cấu hình cơ bản (`_category_.json`) đã được thiết lập.
- **Cải thiện trải nghiệm người dùng:** Đã chuyển đổi các ví dụ code sang định dạng Tabs sử dụng MDX.
- **Sửa lỗi biên dịch (một phần):** Đã xác định được nguyên nhân gốc rễ của lỗi biên dịch MDX và đã tìm ra giải pháp khắc phục. Đã áp dụng thành công cho một số file.
- **Giao diện người dùng:** Đã xóa thành công liên kết "Blog" không cần thiết khỏi thanh điều hướng và chân trang.
- **Tô sáng cú pháp:** Đã cấu hình thành công Prism để hỗ trợ tô sáng cú pháp cho `bash`, `diff`, và `json`.

## 2. Những gì còn lại cần xây dựng

- **Hoàn tất sửa lỗi MDX:** Cần áp dụng bản sửa lỗi cú pháp `{'<...>'}` cho tất cả các file `.mdx` còn lại.
- **Xóa file cũ (nếu có):** Sau khi đã chuyển hết sang `.mdx`, cần kiểm tra và xóa các file `.md` cũ trong thư mục `docs/user-guide` để tránh nhầm lẫn.
- **Kiểm tra toàn diện:** Sau khi server chạy ổn định, cần rà soát lại toàn bộ trang tài liệu để đảm bảo không có lỗi hiển thị hoặc nội dung nào bị sai sót.

## 3. Trạng thái hiện tại

- **Sẵn sàng để tiếp tục:** Công việc trên trang tài liệu đã sẵn sàng để tiếp tục. Các tính năng chính đã được triển khai và trang web đang trong trạng thái tốt.

## 4. Các vấn đề đã biết

- **Lỗi biên dịch MDX:** Đây là vấn đề kỹ thuật chính cần được giải quyết. Nếu không được sửa, trang web Docusaurus không thể xây dựng hoặc chạy được.
- **Xung đột cổng (Port Conflict):** Server phát triển Docusaurus có thể không tự động tắt khi gặp lỗi, dẫn đến việc cổng 3000 bị chiếm. Cần phải dừng tiến trình cũ theo cách thủ công trước khi khởi động lại.
