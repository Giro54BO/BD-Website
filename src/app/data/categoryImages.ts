import imgRectangle108 from "figma:asset/3933b0d0bffbd89753266fe31fb84ab19652844c.png";
import imgAutomotriz1 from "figma:asset/8fbb02c4d769107d2cb7a1b2bdb714216f6added.png";
import imgRectangle109 from "figma:asset/387bde576e48661baaa1b7edcf923d557d2bf5b8.png";
import imgRectangle110 from "figma:asset/2535b3843b5a5f4858be93048f290ee052d80a00.png";
import imgRectangle111 from "figma:asset/eed34c2474772d44f0e8eb1a3db635b052eaa932.png";

export const categoryImages: Record<string, string> = {
  "1": imgRectangle108,
  "2": imgAutomotriz1,
  "3": imgRectangle109,
  "4": imgRectangle110,
  "5": imgRectangle111,
};

export function getCategoryLabel(categoryName: string): string {
  return categoryName === "Autopartes" ? "Autopartes BigDam" : categoryName;
}

export function getCategoryPath(categoryName: string): string {
  return categoryName === "Autopartes" ? "/search" : `/category/${categoryName.toLowerCase()}`;
}
