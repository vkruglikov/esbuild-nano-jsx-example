import { h as NanoH, Fragment as NanoFragment } from "nano-jsx";

declare global {
  const h: typeof NanoH;
  const Fragment: typeof NanoFragment;
}
