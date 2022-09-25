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

      <main className="h-screen w-screen overflow-auto bg-gray-900 flex justify-center">
        <div className="w-full md:w-192 lg:w-192">
          <WeatherGrid />
        </div>
      </main>

      <footer className=""></footer>
    </div>
  );
};

export default Home;
