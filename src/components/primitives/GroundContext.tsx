"use client";

import { createContext, useContext } from "react";
import type { Ground, Tone } from "@/lib/design/ground";
import { GROUND } from "@/lib/design/ground";

type GroundInfo = { ground: Ground; tone: Tone };

const GroundCtx = createContext<GroundInfo>({ ground: "white", tone: "light" });

export function GroundProvider({
  ground,
  children,
}: {
  ground: Ground;
  children: React.ReactNode;
}) {
  return (
    <GroundCtx.Provider value={{ ground, tone: GROUND[ground].tone }}>
      {children}
    </GroundCtx.Provider>
  );
}

export function useGround() {
  return useContext(GroundCtx);
}
