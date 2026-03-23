import { AchievementSection } from "@/components/section/achievement-section";
import { DescriptionSection } from "@/components/section/description-section";
import { ProjectSection } from "@/components/section/project-section";
import { SkillSection } from "@/components/section/skill-section";
import { WorkSection } from "@/components/section/work/work-section";
import {
  GitHubContributionFallback,
  GitHubContributionsGraph,
} from "@/features/github/components/contributions-graph";
import { getGitHubContributions } from "@/features/github/server/get-contributions";
import { ResumeDescription } from "@/features/resume/resume-description";
import resume from "@/resume.json";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense, type ReactNode } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "https://hardikarora.me" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hardik Arora",
  url: "https://hardikarora.me",
  email: "hardikarora483@gmail.com",
  jobTitle: "AI/ML Engineer",
  description:
    "Hardik Arora — AI/ML Engineer from Agra, India. Hands-on experience building and deploying ML models, passionate about scalable AI solutions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/hardik121121",
    "https://www.linkedin.com/in/hardik-arora121/",
    "https://x.com/HardikArora121",
    "https://medium.com/@hardikarora483",
  ],
};

const Home = async () => {
  const [tHome, tResume] = await Promise.all([
    getTranslations("home-page"),
    getTranslations("resume"),
  ]);
  const { basics } = resume;
  const avatarSrc = "/logo/image.svg";
  const pixelPerfect = (chunks: ReactNode) => (
    <span className="relative inline-flex w-fit">
      <Image
        alt=""
        className="animate-spark absolute bottom-0 -left-1 h-3 w-3"
        height={12}
        src="/sparkle.png"
        style={{ width: "auto", height: "auto" }}
        width={12}
      />
      <Image
        alt=""
        className="animate-spark2 absolute top-0 left-4 h-2 w-2"
        height={12}
        src="/sparkle.png"
        style={{ width: "auto", height: "auto" }}
        width={12}
      />
      <Image
        alt=""
        className="animate-spark absolute -bottom-2 left-9 h-1.5 w-1.5"
        height={12}
        src="/sparkle.png"
        style={{ width: "auto", height: "auto" }}
        width={12}
      />
      <Image
        alt=""
        className="animate-spark1 absolute -top-0.5 left-14 h-2.5 w-2.5"
        height={12}
        src="/sparkle.png"
        style={{ width: "auto", height: "auto" }}
        width={12}
      />
      <Image
        alt=""
        className="animate-spark absolute -top-1 -right-3 h-4 w-4 delay-75"
        height={12}
        src="/sparkle.png"
        style={{ width: "auto", height: "auto" }}
        width={12}
      />
      {chunks}
    </span>
  );
  const contributions = getGitHubContributions();

  return (
    <main className="flex max-w-screen flex-col items-center font-light">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <div className="w-full md:max-w-xl">
        <div className="mx-8 flex flex-col gap-10 md:mx-0">
          <section>
            <div className="relative flex w-full">
              <div className="relative block size-20 shrink-0 md:size-28">
                <Image alt="" fill src={avatarSrc} />
              </div>
              <div className="absolute top-1/2 left-20 -translate-y-1/2 md:left-28">
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
            <Suspense fallback={<GitHubContributionFallback />}>
              <GitHubContributionsGraph contributions={contributions} />
            </Suspense>
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
          <section>
            <h2 className="mb-4 w-full text-xl font-medium">
              {tHome("achievements-heading")}
            </h2>
            <AchievementSection />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
