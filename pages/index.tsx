import type { NextPage } from "next";
import Head from "next/head";
import WeatherGrid from "../components/WeatherGrid";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen overflow-auto bg-gray-900 flex place-content-center">
        <WeatherGrid />
      </main>

      <footer className=""></footer>
    </div>
  );
};

export default Home;
