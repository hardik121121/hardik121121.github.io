"use client";

import { WorkSummary } from "@/components/section/work/work-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import resume from "@/resume.json";
import { useTranslations } from "next-intl";

export const WorkSection = () => {
  const t = useTranslations("resume");
  const { work } = resume;

  return (
    <Accordion collapsible type="single">
      {work.map((company) => {
        return (
          <AccordionItem key={company.id} value={company.id}>
            <AccordionTrigger>
              <div className="flex flex-1 items-center gap-4 px-4">
                <div className="h-8 w-8">
                  <div className="block h-full w-full dark:hidden">
                    <Image
                      alt={`${company.id} Logo`}
                      className="h-8 w-8"
                      height={32}
                      src={company.logo}
                      width={32}
                    />
                  </div>
                  <div className="hidden h-full w-full dark:block">
                    <Image
                      alt={`${company.id} Logo`}
                      className="h-8 w-8"
                      height={32}
                      src={company.logoDark}
                      width={32}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <div className="flex w-full flex-row justify-between ">
                    <h3 className="leading-6">{t(company.nameKey)}</h3>
                    <p className="text-xs text-muted-foreground">
                      {`${company.startDate} - ${t(company.endDateKey)}`}
                    </p>
                  </div>
                  <p className="text-xs font-light text-muted-foreground">
                    {t(company.positionKey)}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-16">
              <p className="pb-4">
                <WorkSummary summary={t(company.summaryKey)} />
              </p>
              <ul className="ml-4">
                {company.highlights.map((highlightKey) => (
                  <li
                    className="list-disc marker:text-muted-foreground/40"
                    key={highlightKey}
                  >
                    {t(highlightKey)}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1">
                {company.skills.map(({ id, nameKey, url }) => (
                  <li key={id}>
                    {url ? (
                      <Link
                        className={badgeVariants({ variant: "secondary" })}
                        href={url}
                      >
                        {t(nameKey)}
                      </Link>
                    ) : (
                      <Badge variant="secondary">{t(nameKey)}</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
