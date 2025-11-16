# OTP Generator Component

## Tổng quan
Component này tạo mã OTP (One-Time Password) 6 chữ số dựa trên thuật toán TOTP (Time-based One-Time Password) theo chuẩn RFC 6238.

## Thuật toán TOTP (RFC 6238)

### Cách hoạt động:
1. **Unix Timestamp**: Sử dụng thời gian Unix hiện tại (số giây từ 1/1/1970)
2. **Time Step**: Chia timestamp cho 30 giây để tạo counter
3. **HMAC-SHA1**: Áp dụng HMAC-SHA1 với secret key và counter
4. **Dynamic Truncation**: Lấy 6 chữ số cuối từ hash

### Công thức:
```
current_time = Unix timestamp (giây)
counter = floor(current_time / 30)
otp = HMAC-SHA1(secret_key, counter) % 1,000,000
```

## Tương thích

Component này tương thích 100% với:
- ✅ **Python pyotp**: `pyotp.TOTP(secret).now()`
- ✅ **Google Authenticator**
- ✅ **Microsoft Authenticator**
- ✅ **Authy**
- ✅ **Mọi ứng dụng 2FA hỗ trợ TOTP**

## Ví dụ sử dụng

### Secret Key mẫu
```
Secret: JBSWY3DPEHPK3PXP
```

### So sánh với Python
```python
import pyotp

# Tạo TOTP với secret key
totp = pyotp.TOTP('JBSWY3DPEHPK3PXP')

# Lấy mã OTP hiện tại (cùng kết quả với component)
current_otp = totp.now()
print(f"Current OTP: {current_otp}")
```

### Chu kỳ làm mới
- Mã OTP tự động làm mới mỗi **30 giây**
- Countdown timer hiển thị thời gian còn lại
- Progress bar trực quan hóa thời gian

## Cài đặt

Component sử dụng thư viện `jsotp` - implementation JavaScript của thuật toán TOTP:

```bash
npm install jsotp
```

## Đặc điểm kỹ thuật

- **Algorithm**: TOTP (Time-based One-Time Password)
- **Hash Function**: HMAC-SHA1
- **Time Step**: 30 seconds
- **Digits**: 6
- **Encoding**: Base32
- **Standard**: RFC 6238

## Bảo mật

⚠️ **Lưu ý quan trọng**:
- Secret key là thông tin nhạy cảm - không chia sẻ công khai
- Component này chỉ dùng cho mục đích học tập và testing
- Trong production, secret key nên được mã hóa và lưu trữ an toàn

## Tham khảo

- [RFC 6238 - TOTP Specification](https://tools.ietf.org/html/rfc6238)
- [pyotp Documentation](https://pyauth.github.io/pyotp/)
- [jsotp Library](https://github.com/LanceGin/jsotp)
