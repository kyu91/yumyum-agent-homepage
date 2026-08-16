import assert from "node:assert/strict";
import test from "node:test";
import { pickDmg, type GhRelease } from "./release.ts";

test("picks the DMG and ignores its checksum asset", () => {
  const release: GhRelease = {
    tag_name: "v1.2.3",
    assets: [
      { name: "YumYum-Agent-v1.2.3-macOS.dmg.sha256", browser_download_url: "checksum" },
      { name: "YumYum-Agent-v1.2.3-macOS.dmg", browser_download_url: "download" },
    ],
  };

  assert.equal(pickDmg(release), "download");
});

test("returns null when no DMG asset exists", () => {
  assert.equal(
    pickDmg({ tag_name: "v1.2.3", assets: [{ name: "notes.txt", browser_download_url: "notes" }] }),
    null,
  );
});

test("does not throw for an empty assets array", () => {
  assert.doesNotThrow(() => pickDmg({ tag_name: "v1.2.3", assets: [] }));
});
