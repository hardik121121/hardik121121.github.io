import { Icon } from "@/components/ui/icon";
import resume from "@/resume.json";
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "lucide-react";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hardik Arora — AI/ML Engineer. Reach out via email, LinkedIn, or GitHub.",
  alternates: { canonical: "https://hardikarora.me/contact" },
  openGraph: {
    url: "https://hardikarora.me/contact",
    title: "Contact | Hardik Arora",
    description:
      "Get in touch with Hardik Arora — AI/ML Engineer. Reach out via email, LinkedIn, or GitHub.",
  },
};

const ContactPage = async () => {
  const t = await getTranslations("contact-page");
  const { basics } = resume;
  const { socialMedia } = basics;

  const primary = [
    {
      icon: <MailIcon />,
      label: t("email.label"),
      value: basics.email,
      href: `mailto:${basics.email}`,
      external: false,
    },
    {
      icon: <LinkedinIcon />,
      label: t("linkedin.label"),
      value: t("linkedin.value"),
      href: socialMedia.linkedIn.url,
      external: true,
    },
    {
      icon: <GithubIcon />,
      label: t("github.label"),
      value: t("github.value"),
      href: socialMedia.github.url,
      external: true,
    },
    {
      icon: <MapPinIcon />,
      label: t("location.label"),
      value: `${basics.location.city}, ${basics.location.region}`,
      href: "https://www.google.com/maps/place/Dayal+Bagh,+Agra,+Uttar+Pradesh+282005/",
      external: true,
    },
  ];

  const otherSocials = [
    {
      key: "medium",
      label: t("medium.label"),
      handle: socialMedia.medium.handle,
      href: socialMedia.medium.url,
      logo: socialMedia.medium.logo,
      logoDark: socialMedia.medium.logoDark,
    },
    {
      key: "dailydev",
      label: t("dailydev.label"),
      handle: socialMedia.dailydev.handle,
      href: socialMedia.dailydev.url,
      logo: socialMedia.dailydev.logo,
      logoDark: socialMedia.dailydev.logoDark,
    },
    {
      key: "x",
      label: t("x.label"),
      handle: socialMedia.x.handle,
      href: socialMedia.x.url,
      logo: socialMedia.x.logo,
      logoDark: socialMedia.x.logoDark,
    },
    {
      key: "reddit",
      label: t("reddit.label"),
      handle: socialMedia.reddit.handle,
      href: socialMedia.reddit.url,
      logo: socialMedia.reddit.logo,
      logoDark: socialMedia.reddit.logoDark,
    },
    {
      key: "discord",
      label: t("discord.label"),
      handle: socialMedia.discord.handle,
      href: socialMedia.discord.url,
      logo: socialMedia.discord.logo,
      logoDark: socialMedia.discord.logoDark,
    },
    {
      key: "whatsapp",
      label: t("whatsapp.label"),
      handle: socialMedia.whatsapp.handle,
      href: socialMedia.whatsapp.url,
      logo: socialMedia.whatsapp.logo,
      logoDark: socialMedia.whatsapp.logoDark,
    },
  ];

  return (
    <main className="flex max-w-screen flex-col items-center font-light">
      <div className="w-full md:max-w-xl">
        <div className="mx-8 flex flex-col gap-6 md:mx-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-medium">{t("heading")}</h1>
            <p className="text-muted-foreground text-sm">{t("subheading")}</p>
          </div>

          <div className="flex flex-col">
            {primary.map((contact) => (
              <Link
                className="group hover:bg-accent flex items-center gap-4 rounded-lg p-4 transition-colors"
                href={contact.href}
                key={contact.label}
                rel={contact.external ? "noopener noreferrer" : undefined}
                target={contact.external ? "_blank" : undefined}
              >
                <Icon className="text-muted-foreground group-hover:text-foreground shrink-0 transition-colors">
                  {contact.icon}
                </Icon>
                <div className="flex flex-col">
                  <p className="text-muted-foreground text-xs">
                    {contact.label}
                  </p>
                  <p className="text-sm group-hover:underline group-hover:underline-offset-4">
                    {contact.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-base font-medium">
              {t("other-socials-heading")}
            </h2>
            <div className="flex flex-wrap gap-3 px-4">
              {otherSocials.map((social) => {
                const icon = (
                  <div className="bg-secondary hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg border p-2 transition-colors">
                    <Image
                      alt={social.label}
                      className="block h-5 w-5 dark:hidden"
                      height={20}
                      src={social.logo}
                      width={20}
                    />
                    <Image
                      alt={social.label}
                      className="hidden h-5 w-5 dark:block"
                      height={20}
                      src={social.logoDark}
                      width={20}
                    />
                  </div>
                );

                return social.href ? (
                  <Link
                    href={social.href}
                    key={social.key}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`${social.label} · ${social.handle}`}
                  >
                    {icon}
                  </Link>
                ) : (
                  <div
                    key={social.key}
                    title={`${social.label} · ${social.handle}`}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
