import React, { useState, useEffect } from 'react';
import styles from './OtpGenerator.module.css';
import * as OTPAuth from 'otpauth';

// Generate TOTP using RFC 6238 algorithm (same as pyotp)
// Uses the 'otpauth' library which is 100% compatible with Google Authenticator and pyotp
function generateOTP(secret: string): { code: string; error?: string } {
  try {
    // Clean the secret key (remove spaces, convert to uppercase)
    const cleanSecret = secret.toUpperCase().replace(/\s/g, '');
    
    // Validate Base32 format (only A-Z and 2-7 are valid)
    const base32Regex = /^[A-Z2-7]+=*$/;
    if (!base32Regex.test(cleanSecret)) {
      return { 
        code: '------', 
        error: 'Secret key phải là Base32 (chỉ chứa A-Z và 2-7)' 
      };
    }
    
    // Create a TOTP instance
    // This is equivalent to: pyotp.TOTP(secret)
    const totp = new OTPAuth.TOTP({
      secret: cleanSecret,
      algorithm: 'SHA1',  // HMAC-SHA1 (default)
      digits: 6,          // 6-digit code
      period: 30,         // 30-second time window
    });
    
    // Generate current OTP code
    // This is equivalent to: totp.now() in pyotp
    const token = totp.generate();
    
    return { code: token };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    console.error('Error generating OTP:', error);
    return { 
      code: '------', 
      error: `Lỗi: ${errorMessage}` 
    };
  }
}

function getTimeRemaining(timeStep: number = 30): number {
  // Calculate remaining time until next OTP refresh
  // Using Unix timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  return timeStep - (now % timeStep);
}

export default function OtpGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [otp, setOtp] = useState('------');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!secretKey) {
      setOtp('------');
      setErrorMessage('');
      return;
    }

    const updateOtp = () => {
      const result = generateOTP(secretKey);
      setOtp(result.code);
      setErrorMessage(result.error || '');
      setTimeRemaining(getTimeRemaining());
    };

    updateOtp();
    const interval = setInterval(updateOtp, 1000);

    return () => clearInterval(interval);
  }, [secretKey]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(otp);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const progressPercentage = (timeRemaining / 30) * 100;

  return (
    <div className={styles.otpContainer}>
      <button
        className={styles.otpButton}
        onClick={() => setIsOpen(!isOpen)}
        title="OTP Generator"
      >
        🔐 OTP
      </button>

      {isOpen && (
        <div className={styles.otpDropdown}>
          <div className={styles.otpHeader}>
            <h3>OTP Generator</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.otpBody}>
            <div className={styles.inputGroup}>
              <label htmlFor="secretKey">Secret Key (Base32):</label>
              <input
                id="secretKey"
                type="text"
                className={styles.secretInput}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Ví dụ: JBSWY3DPEHPK3PXP"
              />
              <div className={styles.inputHint}>
                <small>
                  💡 Thử với secret key mẫu: <button 
                    className={styles.exampleButton}
                    onClick={() => setSecretKey('JBSWY3DPEHPK3PXP')}
                  >
                    JBSWY3DPEHPK3PXP
                  </button>
                </small>
              </div>
            </div>

            {errorMessage && (
              <div className={styles.errorMessage}>
                <span className={styles.errorIcon}>⚠️</span>
                {errorMessage}
              </div>
            )}

            <div className={styles.otpDisplay}>
              <div className={styles.otpCode}>{otp}</div>
              <button
                className={styles.copyButton}
                onClick={handleCopy}
                disabled={otp === '------'}
                title="Copy OTP"
              >
                {isCopied ? (
                  <>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={styles.buttonIcon}
                    >
                      <path 
                        d="M13.5 4.5L6 12L2.5 8.5" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={styles.buttonIcon}
                    >
                      <rect 
                        x="5" 
                        y="5" 
                        width="9" 
                        height="9" 
                        rx="1" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                      />
                      <path 
                        d="M3 10.5V3C3 2.44772 3.44772 2 4 2H10.5" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {secretKey && (
              <div className={styles.timerSection}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className={styles.timeRemaining}>
                  Làm mới sau: {timeRemaining}s
                </div>
              </div>
            )}

            {/* <div className={styles.otpInfo}>
              <small>
                💡 Sử dụng thuật toán TOTP (RFC 6238) tương thích với Microsoft Authenticator
                <br />
                ⏱️ Mã OTP tự động làm mới mỗi 30 giây dựa trên Unix timestamp
              </small>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
