import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup style={{ display: "flex", gap: "6px", margin:"auto" }}>
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
