export type GhRelease = {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
};

const REPOSITORY = "kyu91/yumyum-agent";
const FALLBACK_URL = "https://github.com/kyu91/yumyum-agent/releases/latest";

export function pickDmg(release: GhRelease): string | null {
  return release.assets.find((asset) => asset.name.endsWith(".dmg"))?.browser_download_url ?? null;
}

export async function getLatestRelease(): Promise<{ url: string; version: string | null }> {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 900 },
    });

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const release = (await response.json()) as GhRelease;
    const url = pickDmg(release);
    if (!url) throw new Error("No DMG asset found");

    return { url, version: release.tag_name || null };
  } catch (error) {
    console.warn("Could not load the latest release", error);
    return { url: FALLBACK_URL, version: null };
  }
}
