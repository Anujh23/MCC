// Browser location for the Maps API pages: the /locate/ link page and the client app's Try.

/** Best GPS fix within `waitMs`; stops early once it's within `goodM` metres. Rejects if location is denied. */
export function getFix(waitMs = 15_000, goodM = 30): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) return reject(new Error('unsupported'));
    let best: GeolocationPosition | null = null;
    const finish = () => {
      navigator.geolocation.clearWatch(watch);
      clearTimeout(timer);
      best ? resolve(best) : reject(new Error('no-fix'));
    };
    const watch = navigator.geolocation.watchPosition(
      (p) => {
        if (!best || p.coords.accuracy < best.coords.accuracy) best = p;
        if (p.coords.accuracy <= goodM) finish();
      },
      (e) => {
        if (e.code !== e.PERMISSION_DENIED) return; // keep waiting on timeouts / weak signal
        navigator.geolocation.clearWatch(watch);
        clearTimeout(timer);
        reject(e);
      },
      { enableHighAccuracy: true, maximumAge: 0 },
    );
    const timer = setTimeout(finish, waitMs);
  });
}

/** What to tell the person when getFix() fails. */
export function geoError(e: unknown): string {
  if (e instanceof GeolocationPositionError) return 'Location is off for this page. Turn it on in your browser settings, then try again.';
  if (e instanceof Error && e.message === 'unsupported') return 'This browser can’t share location. Try another browser.';
  return 'Could not get your location. Move to an open area and try again.';
}

/** Place name for display only (locality, city, state, PIN) or null. Uses BigDataCloud's free client-side API, which
 *  must be called from the browser with the device's own location; the name is never stored or sent to API clients. */
export async function placeName(lat: number, lng: number): Promise<string | null> {
  try {
    const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    if (!r.ok) return null;
    const d = await r.json();
    const parts = [d.locality, d.city, d.principalSubdivision, d.postcode].filter((x) => typeof x === 'string' && x.trim());
    return [...new Set(parts)].join(', ') || null;
  } catch {
    return null;
  }
}
