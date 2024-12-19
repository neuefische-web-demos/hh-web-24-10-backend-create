import useSWR from "swr";
import Link from "next/link";
import JokeForm from "@/components/JokeForm";

export default function HomePage() {
  const { data, isLoading } = useSWR("/api/jokes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <JokeForm />
      <ul>
        {data.map((joke) => (
          <li key={joke._id}>
            <Link href={`/${joke._id}`}>{joke.joke}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
