# Tech Context: Công nghệ và Công cụ

## 1. Công nghệ chính

- **LiteLLM:** Nền tảng cốt lõi, đóng vai trò là proxy để hợp nhất các API.
- **Docusaurus:** Framework để xây dựng trang web tài liệu. Dựa trên React và Node.js.
- **MDX:** Một phần mở rộng của Markdown cho phép sử dụng các component JSX/React bên trong file tài liệu. Được sử dụng để tạo các yếu tố tương tác như Tabs.
- **Node.js / npm:** Môi trường chạy và quản lý các gói phụ thuộc cho Docusaurus.

## 2. Các dịch vụ AI (Backend)

- **Google Gemini:** Cung cấp các mô hình sinh văn bản, hình ảnh và giọng nói.
- **Azure OpenAI:** Cung cấp các mô hình sinh văn bản (GPT series).
- **Google Vertex AI:** Cung cấp các mô hình chuyên dụng như sinh hình ảnh (Imagen) và sinh video (Veo).

## 3. Công cụ và Thư viện (Phía Client)

Các ví dụ trong tài liệu sử dụng các công cụ và thư viện sau:

- **`curl`:** Công cụ dòng lệnh để thực hiện các yêu cầu HTTP. Hữu ích cho việc kiểm tra nhanh.
- **Python:** Ngôn ngữ lập trình chính được sử dụng trong các ví dụ.
    - **`requests`:** Thư viện Python phổ biến để thực hiện các yêu cầu HTTP.
    - **`openai`:** Thư viện client chính thức của OpenAI, tương thích với LiteLLM Proxy.
    - **`litellm`:** Thư viện client của chính LiteLLM.

## 4. Môi trường phát triển

- **IDE:** VSCode.
- **Terminal:** Sử dụng `bash` trên hệ điều hành Linux.
- **Quản lý gói:** `npm` để quản lý các gói phụ thuộc của Docusaurus.
- **Server phát triển:** `npm run start` để khởi chạy server Docusaurus ở chế độ live-reload.
