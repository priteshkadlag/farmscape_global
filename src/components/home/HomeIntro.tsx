"use client";

import Image from "next/image";
import { useEffect, type CSSProperties } from "react";

const decide = `try{var d=document.documentElement;d.dataset.intro=matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"play";delete d.dataset.introState}catch(e){document.documentElement.dataset.intro="skip"}`;
/** Homepage-only brand opening. All choreography is in globals.css. */
export function HomeIntro() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.intro = reduceMotion ? "skip" : "play";
    delete root.dataset.introState;
    const done = window.setTimeout(() => (root.dataset.introState = "done"), 3200);
    return () => {
      window.clearTimeout(done);
      root.dataset.intro = "skip";
      root.dataset.introState = "done";
    };
  }, []);

  return (
    <>
      <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: decide }} />
      <div className="intro" aria-hidden="true">
        <div className="intro-stage">
          <div className="intro-grid bg-blueprint-dark absolute inset-0" />
          <div className="intro-glow" />
          <span className="intro-coordinate intro-coordinate-nw">15.4909° N</span>
          <span className="intro-coordinate intro-coordinate-ne">73.8278° E</span>
          <span className="intro-coordinate intro-coordinate-sw">FG / 001</span>
          <span className="intro-coordinate intro-coordinate-se">GOA · INDIA</span>

          <div className="intro-lockup">
            <svg className="intro-structure" viewBox="0 0 640 360" fill="none" aria-hidden="true">
              <g className="intro-structure-grid" stroke="#9b8cff" strokeOpacity="0.38" strokeWidth="1">
                <path d="M40 310H600M80 270H560M120 230H520M160 190H480" />
                <path d="M40 310L160 190M150 310L240 190M260 310L320 190M380 310L400 190M490 310L480 190M600 310L560 190" />
              </g>
              <g className="intro-frame" stroke="#f7f6f2" strokeWidth="2" strokeLinejoin="round">
                <path style={{ "--draw-delay": "0.12s" } as CSSProperties} pathLength="1" d="M150 285V105" />
                <path style={{ "--draw-delay": "0.22s" } as CSSProperties} pathLength="1" d="M490 285V105" />
                <path style={{ "--draw-delay": "0.34s" } as CSSProperties} pathLength="1" d="M150 105L320 32L490 105" />
                <path style={{ "--draw-delay": "0.46s" } as CSSProperties} pathLength="1" d="M150 105H490" />
                <path style={{ "--draw-delay": "0.58s" } as CSSProperties} pathLength="1" d="M150 285H490" />
                <path style={{ "--draw-delay": "0.68s" } as CSSProperties} pathLength="1" d="M150 105L235 68L320 105L405 68L490 105" />
                <path style={{ "--draw-delay": "0.76s" } as CSSProperties} pathLength="1" d="M235 68V285M320 32V285M405 68V285" />
                <path className="intro-force-path" stroke="#a996ff" style={{ "--draw-delay": "0.92s" } as CSSProperties} pathLength="1" d="M320 32V285" />
              </g>
              <g className="intro-load-arrows" stroke="#a996ff" strokeWidth="1.5">
                <path d="M235 10V52M229 44L235 52L241 44" />
                <path d="M320 0V22M314 14L320 22L326 14" />
                <path d="M405 10V52M399 44L405 52L411 44" />
              </g>
              <g className="intro-foundations" fill="#a996ff">
                <path d="M132 285H168L178 302H122Z" />
                <path d="M302 285H338L348 302H292Z" />
                <path d="M472 285H508L518 302H462Z" />
              </g>
            </svg>

            <div className="intro-logo-frame">
              <span className="intro-corner intro-corner-tl" />
              <span className="intro-corner intro-corner-tr" />
              <span className="intro-corner intro-corner-br" />
              <span className="intro-corner intro-corner-bl" />
              <div className="intro-logo-mask">
                <Image src="/media/brand/formscape-global-logo-white.png" alt="" width={428} height={100} preload className="intro-logo" sizes="(max-width: 640px) 72vw, 430px" />
                <span className="intro-scan" />
              </div>
            </div>

            <div className="intro-meaning">
              <span className="intro-meaning-line">Concept</span>
              <i />
              <span className="intro-meaning-line">Calculation</span>
              <i />
              <span className="intro-meaning-line">Construction</span>
            </div>
            <div className="intro-measure intro-measure-brand">
              <span className="intro-measure-fill" />
              {Array.from({ length: 9 }, (_, index) => <i key={index} style={{ left: `${index * 12.5}%` }} />)}
            </div>
            <p className="intro-discipline">Ideas engineered into enduring structures</p>
          </div>
        </div>

      </div>
    </>
  );
}
