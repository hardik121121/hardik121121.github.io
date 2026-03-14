"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import resume from "@/resume.json";
import {
  siFastapi,
  siHuggingface,
  siJavascript,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpencv,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siTailwindcss,
  siTensorflow,
} from "simple-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ICONS: Record<string, { path: string; hex: string; title: string }> = {
  python: siPython,
  javascript: siJavascript,
  react: siReact,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  fastapi: siFastapi,
  tensorflow: siTensorflow,
  pytorch: siPytorch,
  langchain: siLangchain,
  huggingface: siHuggingface,
  mongodb: siMongodb,
  tailwind: siTailwindcss,
  opencv: siOpencv,
  pandas: siPandas,
};

export const SkillSection = () => {
  const t = useTranslations("resume");
  const { skills } = resume;

  return (
    <TooltipProvider>
      <ul className="mt-4 flex w-full flex-wrap gap-3">
        {skills.map(({ id, nameKey, url }) => {
          const icon = ICONS[id];
          if (!icon) return null;

          const iconEl = (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary p-2 transition hover:bg-accent">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    style={{ fill: `#${icon.hex}` }}
                  >
                    <title>{icon.title}</title>
                    <path d={icon.path} />
                  </svg>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(nameKey)}</p>
              </TooltipContent>
            </Tooltip>
          );

          return (
            <li key={id}>
              {url ? (
                <Link href={url} target="_blank" rel="noreferrer">
                  {iconEl}
                </Link>
              ) : (
                iconEl
              )}
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
};
