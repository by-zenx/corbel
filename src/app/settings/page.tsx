"use client";

import { useEffect, useState } from "react";
import { PageHeading } from "@/components/shell/page-heading";

type Palette = "mono" | "pastel" | "ocean" | "sage";
type Theme = "light" | "dark";

export default function SettingsPage() {
  const [currentPalette, setCurrentPalette] = useState<Palette>("mono");
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  useEffect(() => {
    const p = (document.documentElement.dataset.palette || "mono") as Palette;
    const t = (document.documentElement.dataset.theme || "light") as Theme;
    setCurrentPalette(p);
    setCurrentTheme(t);
  }, []);

  const handlePaletteChange = (pal: Palette) => {
    setCurrentPalette(pal);
    document.documentElement.dataset.palette = pal;
    try {
      localStorage.setItem("corbel:palette", JSON.stringify(pal));
    } catch (e) {}
  };

  const handleThemeChange = (th: Theme) => {
    setCurrentTheme(th);
    document.documentElement.dataset.theme = th;
    try {
      localStorage.setItem("corbel:theme", JSON.stringify(th));
    } catch (e) {}
  };

  return (
    <>
      <PageHeading title="Settings" />

      <div data-view="settings">
        <section className="card" style={{ maxWidth: "760px", margin: "0 auto 24px" }}>
          <header className="card__head">
            <h2 className="card__title">Appearance & Theme</h2>
          </header>

          <div style={{ display: "grid", gap: "24px", padding: "8px 0" }}>
            {/* Theme Switcher */}
            <div>
              <p style={{ fontWeight: 600, marginBottom: "10px", fontSize: "14px" }}>
                Mode
              </p>
              <div className="seg" role="radiogroup" aria-label="Theme mode">
                <button
                  type="button"
                  aria-checked={currentTheme === "light"}
                  onClick={() => handleThemeChange("light")}
                >
                  Light mode
                </button>
                <button
                  type="button"
                  aria-checked={currentTheme === "dark"}
                  onClick={() => handleThemeChange("dark")}
                >
                  Dark mode
                </button>
              </div>
            </div>

            {/* 4 Palettes Switcher */}
            <div>
              <p style={{ fontWeight: 600, marginBottom: "10px", fontSize: "14px" }}>
                Color Palette
              </p>
              <div className="pal">
                <button
                  className="pal__opt"
                  type="button"
                  aria-checked={currentPalette === "mono"}
                  onClick={() => handlePaletteChange("mono")}
                >
                  <span className="pal__sw">
                    <i style={{ background: "#121212" }} />
                    <i style={{ background: "#efefed" }} />
                  </span>
                  Mono (Default)
                </button>

                <button
                  className="pal__opt"
                  type="button"
                  aria-checked={currentPalette === "pastel"}
                  onClick={() => handlePaletteChange("pastel")}
                >
                  <span className="pal__sw">
                    <i style={{ background: "#2a6f9a" }} />
                    <i style={{ background: "#a9d2f1" }} />
                  </span>
                  Pastel
                </button>

                <button
                  className="pal__opt"
                  type="button"
                  aria-checked={currentPalette === "ocean"}
                  onClick={() => handlePaletteChange("ocean")}
                >
                  <span className="pal__sw">
                    <i style={{ background: "#173f5f" }} />
                    <i style={{ background: "#9fdce0" }} />
                  </span>
                  Ocean
                </button>

                <button
                  className="pal__opt"
                  type="button"
                  aria-checked={currentPalette === "sage"}
                  onClick={() => handlePaletteChange("sage")}
                >
                  <span className="pal__sw">
                    <i style={{ background: "#2f6b4f" }} />
                    <i style={{ background: "#cfe3c8" }} />
                  </span>
                  Sage
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
