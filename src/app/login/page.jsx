"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log({ username });

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const { success } = await response.json();

    if (success) {
      const next = searchParams.get("next");
      console.log({ next });
      router.push(next ? next : "/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
