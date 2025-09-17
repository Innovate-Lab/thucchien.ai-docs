# Active Context: Trạng thái công việc hiện tại

## 1. Công việc đang tập trung

- **Hoàn thành:** Cập nhật Memory Bank.
- **Nhiệm vụ tiếp theo:** Bắt đầu triển khai tính năng tìm kiếm local (local search) cho trang tài liệu.

## 2. Các thay đổi gần đây

- **Gỡ bỏ tính năng tìm kiếm:**
    - **Gỡ cài đặt plugin:** Gỡ bỏ gói `docusaurus-lunr-search` khỏi dự án.
    - **Cập nhật cấu hình:** Xóa bỏ hoàn toàn cấu hình plugin tìm kiếm khỏi file `docusaurus.config.ts`.
- **Chuyển đổi sang Algolia DocSearch:**
    - **Gỡ bỏ plugin cũ:** Xóa plugin `docusaurus-lunr-search` khỏi dự án.
    - **Cập nhật cấu hình:** Cập nhật file `docusaurus.config.ts` để tích hợp Algolia DocSearch, sử dụng các giá trị placeholder cho API keys.
- **Cập nhật trang tham khảo:**
    - **Khôi phục liên kết LiteLLM:** Dựa trên phản hồi của người dùng, đã thêm lại các liên kết đến tài liệu chính thức của LiteLLM vào trang `references.md`.
- **Sửa lỗi biên dịch MDX:**
    - **Khắc phục lỗi cú pháp:** Sửa lỗi thẻ đóng không khớp trong file `text-to-speech.mdx` bằng cách thay thế `</code></pre>` bằng `</CodeBlock>`, giải quyết vấn đề biên dịch thất bại.
- **Hoàn thiện tính nhất quán tài liệu:**
    - **Đồng bộ hóa code examples:** Thay thế các biến `LITELLM_MASTER_KEY` bằng `VBI_API_KEY` và cập nhật các comment liên quan trong tất cả các file hướng dẫn (`.mdx`) để đảm bảo tính nhất quán.
    - **Sửa lỗi component:** Thay thế các thẻ `<pre><code>` không đúng chuẩn bằng component `<CodeBlock>` của Docusaurus trong file `text-to-speech.mdx`.
    - **Cập nhật trang tham khảo:** Viết lại trang `references.md` để gỡ bỏ các liên kết trực tiếp đến tài liệu của LiteLLM, thay vào đó hướng người dùng đến tài liệu của các nhà cung cấp mô hình gốc.
- **Cập nhật ngữ nghĩa tài liệu:**
    - **Thay đổi định vị:** Chuyển đổi cách diễn đạt trong tài liệu từ việc hướng dẫn người dùng tự host "LiteLLM Proxy" sang hướng dẫn sử dụng dịch vụ "[AI Thực Chiến](https://thucchien.ai) gateway" đã được hosted sẵn.
    - **Đơn giản hóa xác thực:** Cập nhật trang `core-concepts.md` để giải thích quy trình xác thực bằng API key do nhà cung cấp cấp, loại bỏ các chi tiết kỹ thuật không cần thiết về `LITELLM_MASTER_KEY`.
    - **Cập nhật giới thiệu:** Tinh chỉnh trang `introduction.md` để giới thiệu dịch vụ dưới tên "[AI Thực Chiến](https://thucchien.ai) gateway" và nhấn mạnh sự đơn giản cho người dùng cuối.
- **Tùy chỉnh Theme cho Code Block:** Tạo file theme Prism tùy chỉnh (`src/utils/prismTheme.ts`) và cập nhật `docusaurus.config.ts` để áp dụng bảng màu mới cho việc tô sáng cú pháp, đảm bảo tính nhất quán về giao diện.
- **Áp dụng Bảng màu Mới:** Cập nhật file `src/css/custom.css` để triển khai bảng màu mới theo yêu cầu, bao gồm việc định nghĩa lại các biến màu chính, màu nền và màu chữ cho cả hai chế độ sáng và tối.
- **Sửa lỗi Tô sáng Cú pháp (Syntax Highlighting):** Thay thế các khối code `<pre><code>` không chuẩn bằng component `<CodeBlock>` của Docusaurus trong các file `.mdx`. Điều này khắc phục lỗi không hiển thị màu cho code.
- **Cập nhật CSS cho Code Block:** Thêm các quy tắc CSS tùy chỉnh vào `src/css/custom.css` để cải thiện giao diện của các khối code, bao gồm việc thêm đường viền, bo góc và hiệu ứng đổ bóng.
- **Thêm kiểu cho Nút Sao chép:** Bổ sung CSS để đảm bảo nút sao chép code hiển thị rõ ràng và cung cấp phản hồi trực quan cho người dùng khi tương tác (ví dụ: thay đổi màu khi di chuột qua, hiển thị trạng thái "Đã sao chép").
- **Khởi tạo Memory Bank:** Hoàn thành việc thiết lập các file cốt lõi cho Memory Bank theo yêu cầu từ `.clinerules`.
- **Xóa Blog Nav:** Đã xóa liên kết "Blog" khỏi thanh điều hướng và chân trang để đơn giản hóa giao diện người dùng.
- **Cấu hình Prism:** Cập nhật `docusaurus.config.ts` để thêm `bash`, `diff`, và `json` vào danh sách `additionalLanguages`, cho phép tô sáng cú pháp cho các ngôn ngữ này.

## 3. Các quyết định và ưu tiên

- **Ưu tiên Memory Bank:** Hoàn thành việc tạo tất cả các file cốt lõi của Memory Bank là ưu tiên số một.
- **Hoàn tất sửa lỗi Docusaurus:** Ngay sau khi Memory Bank được khởi tạo, công việc tiếp theo là quay lại sửa lỗi cho tất cả các file `.mdx` còn lại để trang tài liệu có thể chạy ổn định.
- **Xác nhận với người dùng:** Sau khi tất cả các file đã được sửa và server chạy thành công, cần phải xác nhận lại với người dùng rằng trang web đã hoạt động như mong đợi.

## 4. Bài học kinh nghiệm

- **Lỗi biên dịch MDX:** Cần phải rất cẩn thận khi đưa các chuỗi ký tự chứa dấu ngoặc nhọn (`<`, `>`) vào nội dung MDX. Sử dụng cú pháp `{'<string>'}` là một giải pháp hiệu quả để tránh các lỗi phân tích cú pháp JSX.
- **Tầm quan trọng của `.clinerules`:** Các quy tắc trong file này có độ ưu tiên cao nhất và phải được thực hiện ngay lập tức, kể cả khi đang làm dở một nhiệm vụ khác.
