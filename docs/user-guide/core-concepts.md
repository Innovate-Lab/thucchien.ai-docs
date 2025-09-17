---
sidebar_position: 2
---

# Các khái niệm cốt lõi

Trước khi đi vào chi tiết từng loại mô hình, hãy cùng nắm vững một vài khái niệm nền tảng. Tất cả các tương tác với LiteLLM Proxy đều tuân theo các nguyên tắc chung dưới đây.

## Endpoint Thống nhất

Điểm mạnh nhất của LiteLLM Proxy là cung cấp một endpoint duy nhất cho tất cả các tương tác. Thay vì phải nhớ nhiều URL khác nhau, bạn chỉ cần gửi tất cả các yêu cầu đến:

`https://api0.lab.vbi-server.com`

Hệ thống sẽ tự động xử lý và định tuyến dựa trên nội dung yêu cầu của bạn. Hầu hết các API (sinh văn bản, hình ảnh, giọng nói) đều tuân theo cấu trúc của OpenAI API. Các trường hợp đặc biệt như sinh video sẽ được ghi chú rõ ràng trong phần tài liệu riêng.

## Xác thực (Authentication)

Để sử dụng [AI Thực Chiến](https://thucchien.ai) gateway, bạn cần một API key. Key này sẽ được chúng tôi cung cấp.

Bạn cần gửi key này trong header `Authorization` của mỗi yêu cầu theo định dạng `Bearer`.

**Ví dụ header:**
```
Authorization: Bearer YOUR_API_KEY
```

Hãy thay `YOUR_API_KEY` bằng API key mà bạn đã nhận được. Nếu không có header này hoặc key không hợp lệ, hệ thống sẽ trả về lỗi `401 Unauthorized`.

## Định tuyến Model (Model Routing)

Để chọn một mô hình cụ thể để xử lý yêu cầu của bạn, bạn chỉ cần chỉ định tên của nó trong trường `model` của body request.

**Ví dụ Body Request (JSON):**
```json
{
  "model": "gpt-5-mini",
  "messages": [
    {
      "role": "user",
      "content": "Hello, world!"
    }
  ]
}
```

Trong ví dụ trên, proxy sẽ nhận diện `"model": "gpt-5-mini"` và tự động chuyển tiếp yêu cầu đến dịch vụ Azure OpenAI đã được cấu hình tương ứng với model `gpt-5-mini`.

Để sử dụng một model khác, ví dụ như `gemini-2.5-pro`, bạn chỉ cần thay đổi giá trị này:
```json
{
  "model": "gemini-2.5-pro",
  "messages": [
    {
      "role": "user",
      "content": "Hello, world!"
    }
  ]
}
```

Sự linh hoạt này cho phép bạn thử nghiệm và chuyển đổi giữa các mô hình mà không cần thay đổi bất kỳ logic nào khác trong ứng dụng của mình.
