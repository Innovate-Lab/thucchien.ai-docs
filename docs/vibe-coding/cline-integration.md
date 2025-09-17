---
sidebar_position: 2
---

# Tích hợp với CLine

[CLine](https://cline.bot/) là một công cụ terminal AI mạnh mẽ, cho phép bạn tương tác với các mô hình ngôn ngữ lớn ngay từ dòng lệnh. Bằng cách tích hợp CLine với **AI Thực Chiến Gateway**, bạn có thể thực hành VibeCoding một cách hiệu quả.

## Cấu hình CLine

Để kết nối CLine với gateway, bạn cần cấu hình một nhà cung cấp mô hình (model provider) tùy chỉnh.

1.  **Mở file cấu hình:**
    Mở file `config.yaml` của CLine. Bạn thường có thể tìm thấy nó ở `~/.cline/config.yaml`.

2.  **Thêm Model Provider:**
    Thêm đoạn cấu hình sau vào dưới mục `providers`:

    ```yaml
    providers:
      # ... các provider khác của bạn
      - name: thucchien_ai
        api_base: https://api0.lab.vbi-server.com/v1
        api_key: YOUR_VBI_API_KEY # Thay thế bằng API key của bạn
        # Tùy chọn: Đặt một model mặc định
        default_model: gemini-1.5-pro-latest
    ```

    **Quan trọng:**
    -   Thay thế `YOUR_VBI_API_KEY` bằng `VBI_API_KEY` của bạn.
    -   `api_base` phải trỏ đến `https://api0.lab.vbi-server.com/v1`.

3.  **Lưu và sử dụng:**
    Lưu file `config.yaml`. Bây giờ bạn có thể gọi các mô hình từ gateway bằng cách chỉ định provider:

    ```bash
    cline -p thucchien_ai "Viết một script Python để lấy dữ liệu thời tiết từ OpenWeatherMap"
    ```

    Hoặc nếu bạn đã đặt `default_model`, bạn có thể gọi trực tiếp.

## Ví dụ thực tế

Bây giờ, bạn có thể bắt đầu "VibeCoding" ngay trong terminal:

-   **Tạo một file HTML:**
    ```bash
    cline -p thucchien_ai "Tạo mã HTML cho một trang web portfolio đơn giản" > index.html
    ```

-   **Viết một script:**
    ```bash
    cline -p thucchien_ai "Viết một script bash để tìm tất cả các file .log lớn hơn 100MB" > find_logs.sh
    ```

-   **Debug code:**
    ```bash
    cat my_script.py | cline -p thucchien_ai "Tìm lỗi trong đoạn code Python này"
    ```

Bằng cách này, CLine và AI Thực Chiến Gateway trở thành một cặp đôi mạnh mẽ, giúp bạn tăng tốc độ phát triển và hiện thực hóa ý tưởng ngay từ dòng lệnh.
