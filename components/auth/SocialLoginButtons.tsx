import React from "react";
import { Button } from "@/components/ui/button";
import { doSocialLogin } from "@/app/actions";

const textColor = '#FDDD57'; // Colore del testo principale (oro)
const buttonBorderColor = '#4C6D1C'; // Colore del bordo del pulsante (verde)

export default function SocialLoginButtons() {
  return (
    <div className="grid gap-4">
      <Button
        variant="outline" // Usa il variant appropriato
        className="w-full"
        style={{
          color: textColor,
          border: `2px solid ${textColor}`,
          backgroundColor: 'transparent',
        }}
        onClick={() => doSocialLogin("google")}
      >
        Sign In with Google
      </Button>
      <Button
        variant="outline" // Usa il variant appropriato
        className="w-full"
        style={{
          color: textColor,
          border: `2px solid ${textColor}`,
          backgroundColor: 'transparent',
        }}
        onClick={() => doSocialLogin("github")}
      >
        Sign In with Github
      </Button>
    </div>
  );
}
