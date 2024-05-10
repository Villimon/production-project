import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <div className={classNames(cls.Navbar, {}, [])}>
      <ThemeSwitcher />
      <div className={classNames(cls.links, {}, [])}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.mainLinks}
          to={"/"}
        >
          Main Page
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>
          About Page
        </AppLink>
      </div>
    </div>
  );
};
