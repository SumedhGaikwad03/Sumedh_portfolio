import Hero from "../components/Hero";
import Summary from "../components/Summary";
import Projects from "../components/Projects";
import Academics from "../components/Academics";
import Current from "../components/Current";
import Experience from "../components/Experience";
import Technologies from "../components/Technologies";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Summary />
      <Projects />
      <Academics />
      <Current />
      <Experience />
      <Technologies />
      <Contact />
    </>
  );
}
