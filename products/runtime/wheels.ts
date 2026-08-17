export const domains = [
  "hostel mess",
  "pharmacy queue",
  "college gate",
  "local train",
  "kirana shop",
  "clinic waiting room",
  "bus depot",
  "library issue desk",
];

export const users = [
  "an anxious first-year",
  "a parent who cannot read English",
  "a night-shift security guard",
  "a 70-year-old sharing a phone",
  "a vendor with one free hand",
  "a student on a two-bar network",
  "a receptionist managing two queues",
  "a commuter holding a child",
];

export const constraints = [
  "no colour",
  "one screen",
  "works in sunlight",
  "no icons",
  "one continuous line",
  "must be understood in four seconds",
  "no English",
  "paper only",
];

export const objects = [
  "umbrella",
  "token",
  "receipt",
  "ID card",
  "water bottle",
  "locker key",
  "queue number",
  "bus ticket",
];

export function pick<T>(list: T[], seed: number) {
  return list[Math.abs(seed) % list.length];
}

export function spinTriple(seed = Date.now()) {
  return {
    domain: pick(domains, seed),
    user: pick(users, seed >> 3),
    constraint: pick(constraints, seed >> 6),
    object: pick(objects, seed >> 9),
  };
}
