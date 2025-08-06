import HeroInput from "@/components/hero-input";
import Upload from "@/components/upload/page";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="pb-10">
          <Upload />
        </div>
        <div>
          <HeroInput />
        </div>
      </div>
    </div>
  );
}
