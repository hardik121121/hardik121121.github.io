import { Icon } from "@/components/ui/icon";
import { HeartIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="m-10 flex justify-center">
      <div className="flex items-center gap-1 md:max-w-xl">
        <p className="text-xs">{t("made-with")}</p>
        <span className="inline-flex h-5 w-5 items-center justify-center">
          <Icon className="size-5 shrink-0 scale-80 fill-transparent transition duration-200 ease-out hover:scale-100 hover:fill-red-500 hover:text-red-500">
            <HeartIcon />
          </Icon>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
