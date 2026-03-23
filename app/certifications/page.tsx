import { Button } from "@/components/ui/button";
import resume from "@/resume.json";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "38 certifications earned by Hardik Arora in AI, ML, cloud, and software engineering.",
  alternates: { canonical: "https://hardikarora.me/certifications" },
  openGraph: {
    url: "https://hardikarora.me/certifications",
    title: "Certifications | Hardik Arora",
    description:
      "38 certifications earned by Hardik Arora in AI, ML, cloud, and software engineering.",
  },
};

const CertificationsPage = async () => {
  const t = await getTranslations("resume");

  return (
    <main className="flex max-w-screen flex-col items-center font-light">
      <div className="w-full md:max-w-xl">
        <div className="mx-8 flex flex-col gap-6 md:mx-0">
          <h1 className="text-xl font-medium">Certifications</h1>
          <div className="flex flex-col">
            {resume.certifications.map((cert) => {
              const CertContent = (
                <div className="flex flex-1 items-center gap-4">
                  <div className="h-8 w-8">
                    <div className="block h-full w-full dark:hidden">
                      <Image
                        alt={`${t(cert.nameKey)} Logo`}
                        className="h-8 w-8"
                        height={32}
                        src={cert.logo}
                        width={32}
                      />
                    </div>
                    <div className="hidden h-full w-full dark:block">
                      <Image
                        alt={`${t(cert.nameKey)} Logo`}
                        className="h-8 w-8"
                        height={32}
                        src={cert.logoDark}
                        width={32}
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start">
                    <div className="flex w-full flex-row justify-between">
                      <h3 className="leading-6 group-hover:underline">
                        {t(cert.nameKey)}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {cert.date}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs font-light">
                      {t(cert.issuerKey)}
                    </p>
                  </div>
                </div>
              );

              return (
                <Button
                  asChild={!!cert.url}
                  className={`flex h-fit items-center p-4 ${!cert.url && "hover:bg-transparent"}`}
                  key={cert.id}
                  variant="ghost"
                >
                  {cert.url ? (
                    <Link
                      href={cert.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {CertContent}
                    </Link>
                  ) : (
                    CertContent
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CertificationsPage;
