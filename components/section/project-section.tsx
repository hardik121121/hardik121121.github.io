"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import resume from "@/resume.json";
import { useTranslations } from "next-intl";

export const ProjectSection = () => {
  const t = useTranslations("resume");
  const { projects } = resume;

  return projects.map((project) => {
    const ProjectContent = (
      <div className="flex flex-1 items-center gap-4">
        <div className="h-8 w-8">
          <div className="block h-full w-full dark:hidden">
            <Image
              alt={`${t(project.nameKey)} Logo`}
              className="h-8 w-8"
              height={32}
              src={project.logo}
              width={32}
            />
          </div>
          <div className="hidden h-full w-full dark:block">
            <Image
              alt={`${t(project.nameKey)} Logo`}
              className="h-8 w-8"
              height={32}
              src={project.logoDark}
              width={32}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start">
          <div className="flex w-full flex-row justify-between">
            <h3 className="leading-6 group-hover:underline">
              {t(project.nameKey)}
            </h3>
            <p className="text-xs text-muted-foreground">{project.year}</p>
          </div>
          <p className="text-xs font-light text-muted-foreground">
            {t(project.descriptionKey)}
          </p>
        </div>
      </div>
    );

    return (
      <Button
        asChild
        className={`flex h-fit items-center p-4 ${!project.url && "hover:bg-transparent"}`}
        key={project.id}
        variant="ghost"
      >
        {project.url ? (
          <Link href={project.url} rel="noopener noreferrer" target="_blank">
            {ProjectContent}
          </Link>
        ) : (
          ProjectContent
        )}
      </Button>
    );
  });
};
