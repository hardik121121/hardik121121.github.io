import resume from "@/resume.json";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const AchievementSection = async () => {
  const t = await getTranslations("resume");

  return (
    <div className="flex flex-col">
      {resume.achievements.map((achievement) => (
        <Link
          className="group hover:bg-accent flex items-start gap-4 rounded-lg p-4 transition-colors"
          href={achievement.url}
          key={achievement.id}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="mt-0.5 h-8 w-8 shrink-0">
            <div className="block h-full w-full dark:hidden">
              <Image
                alt={t(achievement.titleKey)}
                className="h-8 w-8"
                height={32}
                src={achievement.logo}
                width={32}
              />
            </div>
            <div className="hidden h-full w-full dark:block">
              <Image
                alt={t(achievement.titleKey)}
                className="h-8 w-8"
                height={32}
                src={achievement.logoDark}
                width={32}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex w-full items-start justify-between gap-2">
              <h3 className="text-sm leading-5 group-hover:underline group-hover:underline-offset-4">
                {t(achievement.titleKey)}
              </h3>
              <p className="text-muted-foreground shrink-0 text-xs">
                {achievement.date}
              </p>
            </div>
            <p className="text-muted-foreground text-xs font-light">
              {t(achievement.descriptionKey)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
