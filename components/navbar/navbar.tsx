import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { AwardIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Navbar = async () => {
  const t = await getTranslations("common");

  return (
    <nav className="m-8 flex justify-center">
      <div className="flex w-full items-center justify-between md:max-w-xl">
        <div className="flex gap-4">
          <Link className="capitalize" href="/">
            {t("portfolio")}
          </Link>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="lg:w-auto lg:px-3"
          >
            <Link href="/certifications">
              <AwardIcon className="h-[1.2rem] w-[1.2rem] lg:hidden" />
              <span className="hidden lg:inline">{t("certifications")}</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
