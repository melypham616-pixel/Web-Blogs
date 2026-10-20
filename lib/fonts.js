import { Playfair_Display, Be_Vietnam_Pro, Old_Standard_TT, Dancing_Script } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const beVietnam = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600", "700"], variable: "--f-body", display: "swap" });
const oldStandard = Old_Standard_TT({ subsets: ["latin", "vietnamese"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--f-old", display: "swap" });
const dancing = Dancing_Script({ subsets: ["latin", "vietnamese"], weight: ["500", "700"], variable: "--f-script", display: "swap" });

export const fontVariables = `${playfair.variable} ${beVietnam.variable} ${oldStandard.variable} ${dancing.variable}`;
