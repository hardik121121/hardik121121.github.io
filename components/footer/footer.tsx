import resume from "@/resume.json";
import { HeartIcon, LinkedinIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { siGithub, siX } from "simple-icons";

const Footer = async () => {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const { socialMedia } = resume.basics;

  const navLinks = [
    { href: "/", label: tCommon("portfolio") },
    { href: "/projects", label: tCommon("projects") },
    { href: "/certifications", label: tCommon("certifications") },
    { href: "/blog", label: tCommon("blog") },
    { href: "/contact", label: tCommon("contact") },
  ];

  return (
    <footer className="mx-8 mt-16 mb-10 flex justify-center">
      <div className="flex w-full flex-col gap-6 md:max-w-xl">
        <div className="bg-border h-px w-full" />

        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              {t("nav-heading")}
            </p>
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm capitalize transition-colors"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              {t("connect-heading")}
            </p>
            <div className="flex gap-3">
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                href={socialMedia.github.url}
                rel="noopener noreferrer"
                target="_blank"
                title="GitHub"
              >
                <svg
                  aria-label="GitHub"
                  className="h-4 w-4"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <path className="fill-current" d={siGithub.path} />
                </svg>
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                href={socialMedia.linkedIn.url}
                rel="noopener noreferrer"
                target="_blank"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                href={socialMedia.x.url}
                rel="noopener noreferrer"
                target="_blank"
                title="X"
              >
                <svg
                  aria-label="X"
                  className="h-4 w-4"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <path className="fill-current" d={siX.path} />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-border h-px w-full" />

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground flex items-center gap-1 text-xs">
            {t("made-with")}
            <HeartIcon className="size-3 fill-transparent transition duration-200 ease-out hover:fill-red-500 hover:text-red-500" />
            {t("by")}
          </p>
          <p className="text-muted-foreground text-xs">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
