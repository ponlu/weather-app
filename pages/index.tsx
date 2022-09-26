import type { NextPage } from "next";
import Head from "next/head";
import WeatherGrid from "../components/WeatherGrid";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-auto bg-gray-900 p-2 flex justify-center">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/images/Clear.png" />
      </Head>

      <main className="w-full md:w-144 lg:w-144">
        <WeatherGrid />
      </main>
    </div>
  );
};

export default Home;
