---
sidebar_position: 1
---

# Giới thiệu

Chào mừng bạn đến với tài liệu hướng dẫn sử dụng [AI Thực Chiến](https://thucchien.ai) gateway. Tài liệu này sẽ cung cấp cho bạn mọi thông tin cần thiết để tích hợp các mô hình Trí tuệ nhân tạo (AI) mạnh mẽ vào ứng dụng của bạn chỉ với một API key duy nhất.

## [AI Thực Chiến](https://thucchien.ai) gateway là gì?

[AI Thực Chiến](https://thucchien.ai) gateway là một cổng kết nối (gateway) hợp nhất, giúp bạn truy cập các mô hình AI hàng đầu một cách đơn giản và hiệu quả. Thay vì phải quản lý nhiều API phức tạp từ các nhà cung cấp khác nhau, bạn chỉ cần gửi yêu cầu đến một endpoint duy nhất do chúng tôi cung cấp:

`https://api.thucchien.ai`

Hệ thống sẽ tự động định tuyến yêu cầu của bạn đến đúng mô hình và nhà cung cấp tương ứng, sau đó trả về kết quả.

## Lợi ích chính

- **Đơn giản hóa:** Một API duy nhất cho nhiều mô hình AI phức tạp.
- **Linh hoạt:** Dễ dàng chuyển đổi giữa các mô hình (ví dụ: từ `gemini-2.5-flash` sang `gemini-2.5-pro`) chỉ bằng cách thay đổi một tham số duy nhất trong yêu cầu của bạn.
- **Giao diện Chuẩn hoá:** LiteLLM cung cấp một tầng tương thích API, chuẩn hoá tất cả các lệnh gọi đến nhiều nhà cung cấp LLM (Google, OpenAI, Claude,...) theo định dạng của OpenAI. Kiến trúc này cho phép hoán đổi các mô hình một cách linh hoạt chỉ bằng cách thay đổi tham số model. Mặc dù giao diện được thống nhất, các tham số mở rộng (`extended parameters`) vẫn được hỗ trợ để khai thác các tính năng độc quyền của từng nhà cung cấp, tất cả đều thông qua một endpoint duy nhất.

## Các loại mô hình được hỗ trợ

Tài liệu này sẽ hướng dẫn bạn cách sử dụng các loại mô hình sau:

- **[Sinh văn bản (Text Generation)](./text-generation.mdx):** Tạo ra văn bản, trả lời câu hỏi, tóm tắt nội dung.
- **[Sinh hình ảnh (Image Generation)](./image-generation.mdx):** Tạo ra hình ảnh từ mô tả văn bản.
- **[Sinh video (Video Generation)](./video-generation-veo3.mdx):** Tạo ra các đoạn video ngắn từ mô tả.
- **[Chuyển văn bản thành giọng nói (Text-to-Speech)](./text-to-speech.mdx):** Chuyển đổi văn bản thành file âm thanh.

Hãy bắt đầu với [Các khái niệm cốt lõi](./core-concepts.mdx) để hiểu về cách xác thực và gửi yêu cầu đầu tiên của bạn.
