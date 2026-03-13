import { DescriptionSection } from "@/components/section/description-section";
import { ProjectSection } from "@/components/section/project-section";
import { SkillSection } from "@/components/section/skill-section";
import { WorkSection } from "@/components/section/work/work-section";
import { GitHubContributionsGraph } from "@/features/github/components/contributions-graph";
import { getGitHubContributions } from "@/features/github/server/get-contributions";
import { ResumeDescription } from "@/features/resume/resume-description";
import resume from "@/resume.json";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { type ReactNode } from "react";

const Home = async () => {
  const [tHome, tResume] = await Promise.all([
    getTranslations("home-page"),
    getTranslations("resume"),
  ]);
  const { basics } = resume;
  const avatarSrc = "/logo/image.svg";
  const pixelPerfect = (chunks: ReactNode) => (
    <span className="relative inline-flex w-fit">
      <Image alt="" className="absolute -left-1 bottom-0 h-3 w-3 animate-spark" height={12} src="/sparkle.png" width={12} />
      <Image alt="" className="absolute left-4 top-0 h-2 w-2 animate-spark2" height={12} src="/sparkle.png" width={12} />
      <Image alt="" className="absolute -bottom-2 left-9 h-1.5 w-1.5 animate-spark" height={12} src="/sparkle.png" width={12} />
      <Image alt="" className="absolute -top-0.5 left-14 h-2.5 w-2.5 animate-spark1" height={12} src="/sparkle.png" width={12} />
      <Image alt="" className="absolute -right-3 -top-1 h-4 w-4 animate-spark delay-75" height={12} src="/sparkle.png" width={12} />
      {chunks}
    </span>
  );
  const contributions = await getGitHubContributions();

  return (
    <main className="flex max-w-screen flex-col items-center font-light">
      <div className="w-full md:max-w-xl">
        <div className="mx-8 flex flex-col gap-10 md:mx-0">
          <section>
            <div className="relative flex w-full">
              <div className="relative block size-20 shrink-0 md:size-28">
                <Image alt="" fill src={avatarSrc} />
              </div>
              <div className="absolute top-1/2 left-20 md:left-28">
                <h2 className="text-lg leading-6 font-medium">
                  {tResume(basics.nameKey)}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {tHome.rich("tagline", { pixelPerfect })}
                </p>
              </div>
            </div>
            <ResumeDescription />
          </section>
          <section>
            <h2 className="mb-4 w-full text-xl font-medium">
              {tHome("about-heading")}
            </h2>
            <DescriptionSection />
          </section>
          <section>
            <GitHubContributionsGraph contributions={contributions} />
          </section>
          <section>
            <h2 className="mb-4 w-full text-xl font-medium">
              {tHome("skills-heading")}
            </h2>
            <SkillSection />
          </section>
          <section>
            <h2 className="mb-4 w-full text-xl font-medium">
              {tHome("experience-heading")}
            </h2>
            <WorkSection />
          </section>
          <section>
            <h2 className="mb-4 w-full text-xl font-medium">
              {tHome("projects-heading")}
            </h2>
            <ProjectSection />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
