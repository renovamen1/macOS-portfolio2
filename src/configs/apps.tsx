import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";
import Twitter from "~/components/apps/Twitter";
import Linkedin from "~/components/apps/Linkedin";
import PrabinStudio from "~/components/apps/PrabinStudio";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Apps",
    desktop: false,
    img: "img/icons/app-store.svg"
  },
  {
    id: "prabinstudio",
    title: "Prabin's Studio",
    desktop: true,
    width: 980,
    height: 640,
    minWidth: 720,
    minHeight: 480,
    x: -40,
    img: "/logo/ip2.png",
    content: <PrabinStudio />
  },
  {
    id: "portfolio",
    title: "Portfolio",
    desktop: true,
    width: 860,
    height: 500,
    show: true,
    y: -40,
    img: "img/icons/obsidian.svg",
    content: <Bear />
  },
  {
    id: "letter",
    title: "Letter",
    desktop: true,
    width: 600,
    height: 580,
    y: -20,
    img: "/img/icons/mail.png",
    content: <Typora />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 900,
    height: 600,
    x: 80,
    y: -30,
    img: "img/icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "twitter",
    title: "X",
    desktop: true,
    width: 410,
    height: 600,
    img: "img/icons/xapp.svg",
    content: <Twitter />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/Renovamen/playground-macos"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    desktop: true,
    width: 410,
    height: 600,
    img: "img/icons/linkedin.svg",
    content: <Linkedin />
  }
];

export default apps;
