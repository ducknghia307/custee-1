import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export function InputOTPPattern({ onOTPChange }) {
  const [otp, setOTP] = useState("");

  const handleChange = (value) => {
    setOTP(value);
    onOTPChange(value); // Call the callback function to set the OTP in the parent component
  };

  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={handleChange}>
      <InputOTPGroup style={{ display: "flex", gap: "6px", margin: "auto" }}>
        {[...Array(6)].map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            style={{
              width: "60px",
              height: "60px",
              textAlign: "center",
              fontSize: "24px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
