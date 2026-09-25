/** Join class names, skipping falsy values. Supports `{'class': condition}` maps. */
export function nexaCn(
  ...parts: Array<string | false | null | undefined | Record<string, boolean | undefined>>
): string {
  const out: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (typeof part === 'string') {
      if (part.trim()) out.push(part.trim());
    } else {
      for (const [key, enabled] of Object.entries(part)) {
        if (enabled) out.push(key);
      }
    }
  }
  return out.join(' ');
}

let counter = 0;

/** SSR-safe unique id generator for aria associations. */
export function nexaUniqueId(prefix = 'nexa'): string {
  counter += 1;
  return `${prefix}-${counter.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
