import Hero from "../components/hero";
import ContainerMain from "../components/mainContainer";

export default function Home() {
  return (
    <ContainerMain
      title="Jaival Saija"
      description="I'm a DevOps engineer and a developer who loves to learn and explore new technologies."
    >
      <Hero />
    </ContainerMain>
  );
}