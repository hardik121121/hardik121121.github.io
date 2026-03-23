import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  CodeIcon,
  Github,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { type ReactNode } from "react";

export const ResumeDescription = async () => {
  const t = await getTranslations("resume-description");
  const company = (chunks: ReactNode) => (
    <Link
      className="group relative inline-flex items-center"
      href="https://www.watermelon.us/"
      rel="noreferrer"
      target="_blank"
    >
      <p className="relative inline-flex items-center gap-0.5">
        <span className="inline-block translate-x-4 opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          🍉
        </span>
        <span className="inline-block -translate-x-4 font-medium transition duration-200 ease-out group-hover:translate-x-0 group-hover:text-green-700">
          {chunks}
        </span>
      </p>
    </Link>
  );

  return (
    <div className="text-sm">
      <div className="flex flex-col gap-1">
        <div className="flex h-6 w-fit items-center gap-3 p-0 px-3 font-light whitespace-nowrap">
          <Icon className="ml-2">
            <CodeIcon />
          </Icon>
          <span>{t.rich("headline", { company })}</span>
        </div>
        <Button
          asChild
          variant="link"
          className="flex h-6 w-fit items-center gap-3 p-0 font-light"
        >
          <Link
            href="https://www.google.com/maps/place/Dayal+Bagh,+Agra,+Uttar+Pradesh+282005/"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="ml-2">
              <HomeIcon />
            </Icon>
            <p>{t("location")}</p>
          </Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="flex h-6 w-fit items-center gap-3 p-0 font-light"
        >
          <Link href="mailto:hardikarora483@gmail.com">
            <Icon className="ml-2">
              <MailIcon />
            </Icon>
            <p>{t("email")}</p>
          </Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="flex h-6 w-fit items-center gap-3 p-0 font-light"
        >
          <Link
            href="https://www.linkedin.com/in/hardik-arora121/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="ml-2">
              <LinkedinIcon />
            </Icon>
            <p>{t("linkedin")}</p>
          </Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="flex h-6 w-fit items-center gap-3 p-0 font-light"
        >
          <Link
            href="https://github.com/hardik121121"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="ml-2">
              <Github />
            </Icon>
            <p>{t("github")}</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};
