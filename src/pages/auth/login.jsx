/* eslint-disable no-unused-vars */
import GoogleAuth from "@components/auth/GoogleAuth";

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center flex-col gap-8 min-h-screen">
      <h1 className="text-4xl">Welcome to Movix app</h1>
      <GoogleAuth />
    </div>
  );
}
