---
sidebar_position: 3
---

# Tích hợp với Cursor

[Cursor](https://cursor.com/) là một trình soạn thảo code được xây dựng dựa trên VSCode, được tối ưu hóa cho việc lập trình với AI. Việc tích hợp Cursor với **AI Thực Chiến Gateway** cho phép bạn tận dụng các mô hình mạnh mẽ ngay trong môi trường code của mình.

## Cấu hình Cursor

Cursor hỗ trợ việc sử dụng các mô hình OpenAI-compatible, giúp việc tích hợp trở nên dễ dàng.

1.  **Mở cài đặt AI:**
    Trong Cursor, mở bảng điều khiển AI (thường bằng `Cmd+K` hoặc `Ctrl+K`) và tìm đến phần cài đặt mô hình (`Model Settings`).

2.  **Thêm mô hình tùy chỉnh:**
    Tìm tùy chọn để thêm một mô hình tùy chỉnh ("Custom Model") hoặc "OpenAI-compatible".

3.  **Điền thông tin:**
    Bạn sẽ cần cung cấp các thông tin sau:
    -   **Model Name / ID:** Đặt một tên gợi nhớ, ví dụ: `gemini-1.5-pro-latest`. Đây là tên sẽ hiển thị trong danh sách chọn mô hình của Cursor.
    -   **API Base:** `https://api0.lab.vbi-server.com/v1`
    -   **API Key:** `YOUR_VBI_API_KEY` (Thay thế bằng `VBI_API_KEY` của bạn)

4.  **Lưu và chọn mô hình:**
    Lưu lại cấu hình. Bây giờ, bạn có thể chọn mô hình tùy chỉnh của mình (`gemini-1.5-pro-latest`) từ danh sách các mô hình có sẵn trong Cursor.

## Ví dụ thực tế

Với Cursor đã được cấu hình, bạn có thể thực hành VibeCoding một cách liền mạch:

-   **Tạo component React:**
    Mở một file `.jsx` trống, sau đó mở ô chat AI và nhập:
    `"Tạo một component React tên là 'UserProfile' để hiển thị tên, tuổi và email của người dùng. Sử dụng props để truyền dữ liệu."`

-   **Refactor code:**
    Chọn một đoạn code trong trình soạn thảo, mở chat AI và yêu cầu:
    `"Tối ưu hóa hàm này để chạy nhanh hơn."`

-   **Viết tài liệu:**
    Chọn một hàm hoặc class, và yêu cầu AI:
    `"Viết docstring cho đoạn code này theo chuẩn Google."`

Sự kết hợp giữa giao diện thông minh của Cursor và sức mạnh của các mô hình từ **AI Thực Chiến Gateway** sẽ nâng cao đáng kể năng suất và trải nghiệm lập trình của bạn.
