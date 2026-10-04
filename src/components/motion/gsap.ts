"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger, SplitText);

export const EASE = "expo.out";

export { gsap, ScrollTrigger, SplitText, useGSAP };
