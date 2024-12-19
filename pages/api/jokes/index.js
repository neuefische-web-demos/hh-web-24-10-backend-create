import dbConnect from "@/db/connect";
import Joke from "@/db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    response.status(200).json(jokes);
    return;
  }

  if (request.method === "POST") {
    // CREATE a joke in our database
    // read the body
    const jokeData = request.body;
    console.log("jokeData: ", jokeData);

    await Joke.create(jokeData);

    response.status(201).json({ status: "Joke created" });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}

// BREAK TIME
// Meet back at 10:30
