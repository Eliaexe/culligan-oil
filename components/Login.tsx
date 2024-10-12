// Importa i componenti necessari
import React from 'react';
import CredentialLoginForm from '@/components/auth/CredentialLoginForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screenpx-4">
      <div className="w-full max-w-md space-y-6"> 
        <CredentialLoginForm />
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default LoginPage;
