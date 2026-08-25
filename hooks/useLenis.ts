import { hashScrollOffsetPx } from "@/lib/hash-scroll";

let lenisInstance: import("lenis").default | null = null;

export function setLenis(instance: import("lenis").default | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToHash(hash: string, offset = -hashScrollOffsetPx()) {
  lenisInstance?.scrollTo(hash, { offset });
}
