/* eslint-disable @typescript-eslint/no-explicit-any */
import { openNewTabWithUrl } from "../../utils";
import logo from "../../assets/icons/logo.svg";
import twitter from "../../assets/icons/twitter.svg";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin.svg";

interface SocialLinkProps {
  platform: string;
  url: string;
  icon: string;
  altText: string;
}

interface SocialLinksProps {
  links: { platform: string; url: string; icon: string; altText: string }[];
}

const socialLinks = [
  {
    platform: "X",
    url: "https://x.com/eventcoveafrica",
    icon: twitter,
    altText: "Twitter",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/14oyN4uSwpE/?mibextid=wwXIfr",
    icon: facebook,
    altText: "Facebook",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/eventcove.africa",
    icon: instagram,
    altText: "Instagram",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/eventcove-africa",
    icon: linkedin,
    altText: "LinkedIn",
  },
];

const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  url,
  icon,
  altText,
}) => {
  return (
    <li
      onClick={() => openNewTabWithUrl(url)}
      className="flex gap-2 items-center text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100"
    >
      <img
        src={icon}
        alt={altText}
        className="object-contain h-6 w-6"
        aria-label={altText}
        sizes="(max-width: 768px) 100px, 155px"
      />
      <span className="sr-only">{altText}</span> {platform}
    </li>
  );
};

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <ul className="w-full flex justify-between md:gap-4 gap-1 flex-wrap">
      {links.map((link: any) => (
        <SocialLink
          key={link.platform}
          platform={link.platform}
          url={link.url}
          icon={link.icon}
          altText={link.altText}
        />
      ))}
    </ul>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex lg:flex-row flex-col justify-between">
      <div className="flex-1 flex flex-col justify-between">
        <img
          src={logo}
          alt="Eventcove Technology Inc. logo"
          className="w-[130px] lg:mb-3 mb-1"
          loading="lazy"
        />
        <p className="text-dark_100 text-sm font-normal">
          &copy; {currentYear} Eventcove Technology Inc. All rights reserved.
        </p>
      </div>

      <div className="flex-1 lg:mt-0 mt-2">
        <div className="flex-1 flex flex-col justify-between">
          <h4 className="text-dark_100 text-sm font-normal mb-2">
            Connect with us
          </h4>
          <SocialLinks links={socialLinks} />{" "}
        </div>
      </div>
    </footer>
  );
}
