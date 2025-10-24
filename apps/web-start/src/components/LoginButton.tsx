import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="btn-primary text-lg px-8 py-4"
    >
      Get Started
    </button>
  );
}

