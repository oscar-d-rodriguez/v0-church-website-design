import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCanonicalUrl,
  normalizeSiteLocale,
  parseSiteConfigurationPayload,
} from "../lib/site-configuration.ts";

test("normalizeSiteLocale defaults to en-US", () => {
  assert.equal(normalizeSiteLocale(), "en-US");
  assert.equal(normalizeSiteLocale("unexpected"), "en-US");
});

test("normalizeSiteLocale accepts es", () => {
  assert.equal(normalizeSiteLocale("es"), "es");
});

test("buildCanonicalUrl always prefixes slash", () => {
  assert.equal(
    buildCanonicalUrl("events/revival-night", "https://example.org"),
    "https://example.org/events/revival-night",
  );
  assert.equal(
    buildCanonicalUrl("/ministries/worship", "https://example.org"),
    "https://example.org/ministries/worship",
  );
});

test("parseSiteConfigurationPayload validates required shape", () => {
  const parsed = parseSiteConfigurationPayload({
    source: "contentful",
    locale: "en-US",
    preview: false,
    siteConfiguration: null,
  });

  assert.deepEqual(parsed, {
    source: "contentful",
    locale: "en-US",
    preview: false,
    siteConfiguration: null,
  });
  assert.equal(
    parseSiteConfigurationPayload({ source: "unknown", locale: "en-US", preview: false }),
    null,
  );
});
