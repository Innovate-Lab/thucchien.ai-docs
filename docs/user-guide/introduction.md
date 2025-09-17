---
sidebar_position: 1
---

# Giới thiệu

Chào mừng bạn đến với tài liệu hướng dẫn sử dụng [AI Thực Chiến](https://thucchien.ai) gateway. Tài liệu này sẽ cung cấp cho bạn mọi thông tin cần thiết để tích hợp các mô hình Trí tuệ nhân tạo (AI) mạnh mẽ vào ứng dụng của bạn chỉ với một API key duy nhất.

## [AI Thực Chiến](https://thucchien.ai) gateway là gì?

[AI Thực Chiến](https://thucchien.ai) gateway là một cổng kết nối (gateway) hợp nhất, giúp bạn truy cập các mô hình AI hàng đầu một cách đơn giản và hiệu quả. Thay vì phải quản lý nhiều API phức tạp từ các nhà cung cấp khác nhau, bạn chỉ cần gửi yêu cầu đến một endpoint duy nhất do chúng tôi cung cấp:

`https://api0.lab.vbi-server.com`

Hệ thống sẽ tự động định tuyến yêu cầu của bạn đến đúng mô hình và nhà cung cấp tương ứng, sau đó trả về kết quả.

## Lợi ích chính

- **Đơn giản hóa:** Một API duy nhất cho nhiều mô hình AI phức tạp.
- **Linh hoạt:** Dễ dàng chuyển đổi giữa các mô hình (ví dụ: từ `gpt-4.1` sang `gemini-2.5-pro`) chỉ bằng cách thay đổi một tham số duy nhất trong yêu cầu của bạn.
- **Thống nhất:** Tất cả các yêu cầu đều tuân theo định dạng API của OpenAI, một tiêu chuẩn quen thuộc với cộng đồng phát triển.
- **Mở rộng:** Dễ dàng thêm các mô hình mới mà không làm thay đổi logic phía client.

## Các loại mô hình được hỗ trợ

Tài liệu này sẽ hướng dẫn bạn cách sử dụng các loại mô hình sau:

- **Sinh văn bản (Text Generation):** Tạo ra văn bản, trả lời câu hỏi, tóm tắt nội dung.
- **Sinh hình ảnh (Image Generation):** Tạo ra hình ảnh từ mô tả văn bản.
- **Sinh video (Video Generation):** Tạo ra các đoạn video ngắn từ mô tả.
- **Chuyển văn bản thành giọng nói (Text-to-Speech):** Chuyển đổi văn bản thành file âm thanh.

Hãy bắt đầu với [Các khái niệm cốt lõi](./core-concepts.md) để hiểu về cách xác thực và gửi yêu cầu đầu tiên của bạn.
