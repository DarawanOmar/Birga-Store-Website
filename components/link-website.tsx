import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { getTranslations } from "next-intl/server";

async function LinkWebsite() {
  const t = await getTranslations("intro.website");
  return (
    <div className="flex flex-col justify-center items-center relative ">
      <p className=" mb-4">{t("view_store")}</p>
      <Link
        href={"https://www.birgastore.rosselgroup.co/store"}
        className={buttonVariants({
          variant: "default",
        })}
        target="_blank"
        rel="noreferrer"
      >
        {t("link")}
      </Link>
    </div>
  );
}

export default LinkWebsite;
