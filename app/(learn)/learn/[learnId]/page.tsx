import LearnSectionheaders from "../../_learn_compoenets/learnsections";
import WahtLearn from "../../_learn_compoenets/whatlearn";
import CourseModule from "../../_learn_compoenets/courseModule";
import RecemondedBlock from "../../_learn_compoenets/recomendedBlock";
import CategoryCompoent from "../../_learn_compoenets/ReveiwsCompoent";
import HeroSection from "./_learncomponents/HeroSection";

function LearnPage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <div className="transform -translate-y-24 ">
        <div className="mt-10  container mx-auto">
          <LearnSectionheaders />
        </div>
        <div className="mt-10 container mx-auto">
          <WahtLearn />
        </div>
        <div className="mt-10 container mx-auto">
          <CourseModule />
        </div>
        <div className="mt-10 container mx-auto">
          <RecemondedBlock />
        </div>
        <div className="mt-10 container mx-auto">
          <CategoryCompoent />
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
