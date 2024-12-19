import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Hello!");

    console.log(event.target["joke-input"].value);
    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    console.log("jokeData: ", jokeData);

    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    console.log("response: ", response);

    if (response.ok) {
      console.log("mutate?");
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new joke</label>
      <input
        type="text"
        required
        placeholder="enter joke"
        id="joke-input"
        name="joke"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
