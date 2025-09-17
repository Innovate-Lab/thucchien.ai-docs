# Product Context: Tại sao cần có tài liệu này?

## 1. Vấn đề cần giải quyết

Việc sử dụng nhiều mô hình AI từ các nhà cung cấp khác nhau (Google, Azure, v.v.) tạo ra sự phức tạp cho nhà phát triển:
- **Nhiều API khác nhau:** Mỗi nhà cung cấp có một bộ API, SDK và quy trình xác thực riêng.
- **Khó khăn trong việc chuyển đổi:** Việc chuyển từ mô hình này sang mô hình khác đòi hỏi phải thay đổi code đáng kể.
- **Thiếu một nguồn tài liệu duy nhất:** Nhà phát triển phải tham khảo nhiều trang tài liệu khác nhau, gây mất thời gian và dễ xảy ra lỗi.

LiteLLM Proxy đã giải quyết vấn đề này ở tầng kỹ thuật bằng cách tạo ra một endpoint duy nhất. Tuy nhiên, vẫn còn thiếu một tài liệu hướng dẫn tập trung, rõ ràng để người dùng có thể khai thác tối đa sức mạnh của proxy này.

## 2. Giải pháp

Trang tài liệu Docusaurus này được tạo ra để trở thành **nguồn thông tin chính thức và duy nhất** cho các nhà phát triển sử dụng [AI Thực Chiến](https://thucchien.ai) gateway, một dịch vụ LiteLLM Proxy được cung cấp dưới dạng hosted.

- **Cung cấp sự rõ ràng:** Tài liệu được viết từ góc độ của người dùng cuối, tập trung vào việc sử dụng dịch vụ thông qua API key thay vì các chi tiết kỹ thuật về việc tự host LiteLLM. Người dùng chỉ cần đọc một tài liệu duy nhất được viết riêng cho dịch vụ của chúng tôi.
- **Giảm thời gian tích hợp:** Với các ví dụ "sao chép-dán" (copy-paste), nhà phát triển có thể tích hợp các mô hình AI vào ứng dụng của họ một cách nhanh chóng.
- **Tăng cường trải nghiệm người dùng:** Một trang tài liệu chuyên nghiệp, có cấu trúc tốt, dễ tìm kiếm sẽ cải thiện đáng kể trải nghiệm của nhà phát triển, giúp họ tập trung vào việc xây dựng ứng dụng thay vì loay hoay với các API.

## 3. Trải nghiệm người dùng mục tiêu

Một nhà phát triển khi truy cập vào trang tài liệu này sẽ có thể:
1.  **Hiểu ngay lập tức** mục đích và lợi ích của LiteLLM Proxy.
2.  **Nắm được cách xác thực** và gửi yêu cầu đầu tiên trong vòng vài phút.
3.  **Tìm thấy ví dụ code** phù hợp với ngôn ngữ/công cụ họ đang sử dụng.
4.  **Dễ dàng triển khai** các tác vụ từ đơn giản (sinh văn bản) đến phức tạp (sinh video) mà không gặp khó khăn.
