import type { Metadata } from "next";

import HomePage from "@/features/home/home.page";

export const metadata: Metadata = {
  title: "Home",
}

const Home = () => {
  return <HomePage/>;
};

export default Home;
