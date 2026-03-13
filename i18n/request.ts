import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en";

  const common = await import(`../messages/${locale}/common.json`);
  const legacy = await import(`../messages/${locale}.json`);

  return {
    locale,
    messages: {
      ...common,
      ...legacy,
    },
  };
});
