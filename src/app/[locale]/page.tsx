import { getSanityHomePage } from "@/sanity/services";
import Image from "next/image";

export default async function Home() {
  const home = await getSanityHomePage();

  console.log("Home Page Data:", home);
  return <div className="bg-sand">ola</div>;
}
