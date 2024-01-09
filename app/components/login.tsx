"use client";

import { usePrivy } from "@privy-io/react-auth";

export function Login() {
  const { login, logout, authenticated, user } = usePrivy();

  return (
    <>
      {authenticated ? (
        <button className="btn btn-neutral btn-sm" onClick={logout}>
          Log out
        </button>
      ) : (
        <button className="btn btn-primary btn-sm" onClick={login}>
          Log in
        </button>
      )}
    </>
  );
}
