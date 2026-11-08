import Image from "next/image";
import Hero from "./components/Home/Hero";
import FeaturedWork from "./components/Home/FeaturedWork";
import EngineeringStack from "./components/Home/EngineeringStack";
import ContactCTA from "./components/Home/ContactCTA";
import ParallaxDivider from "./components/Home/ParallaxDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ParallaxDivider />
      <EngineeringStack />
      <ContactCTA />
    </>
  );
}
