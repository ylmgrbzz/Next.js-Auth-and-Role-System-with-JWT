"use client";

export default function LoginPage() {
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

    console.log(response);
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
