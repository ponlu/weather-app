import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/LandingPage";
import { ICoord, IForecastResponse } from "../interfaces/IForecastResponse";
import { getForecast } from "../lib/server/OpenWeatherAPI";

interface InitialProps {
  forecast: IForecastResponse | null;
}

const Home: NextPage<InitialProps> = ({ forecast }) => {
  return (
    <div className="min-h-screen w-screen overflow-auto bg-gray-900 p-2 flex justify-center">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/images/Clear.png" />
      </Head>

      <main className="w-full md:w-144 lg:w-144">
        <LandingPage initialForecast={forecast} />
      </main>
    </div>
  );
};

export default Home;

const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
export async function getServerSideProps(): Promise<{ props: InitialProps }> {
  const forecast = await getForecast(stockholmCoord);

  return {
    props: {
      forecast,
    },
  };
}
