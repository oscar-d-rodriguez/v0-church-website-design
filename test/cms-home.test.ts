import test from "node:test";
import assert from "node:assert/strict";
import { getCmsHomeContent } from "../lib/cms-home.ts";
import { getAboutIcon } from "../lib/about-icons.ts";
import { getMinistryIcon } from "../lib/ministries-icons.ts";
import { getYouthActivityIcon } from "../lib/youth-icons.ts";
import { Baby, BookOpen, Globe, HandHeart, Heart, Mountain, Music, Music2, Sparkles, Target, UserCircle, Users } from "lucide-react";

function withCmsResponse(response: unknown, callback: () => Promise<void>) {
  const originalFetch = globalThis.fetch;
  const originalBaseUrl = process.env.CMS_API_BASE_URL;

  globalThis.fetch = async () =>
    new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
    });
  process.env.CMS_API_BASE_URL = "http://backend.test/api";

  return callback().finally(() => {
    globalThis.fetch = originalFetch;
    if (originalBaseUrl === undefined) {
      delete process.env.CMS_API_BASE_URL;
    } else {
      process.env.CMS_API_BASE_URL = originalBaseUrl;
    }
  });
}

test("maps CMS About images, alt text, and card order", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "es",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "about",
            eyebrow: " Nuestra comunidad ",
            headline: " Sobre nosotros ",
            description: " Crecemos juntos. ",
            images: {
              main: {
                image: {
                  url: "https://images.ctfassets.net/main.jpg",
                  title: "Main image",
                  description: null,
                  width: 1400,
                  height: 933,
                  contentType: "image/jpeg",
                },
                altText: " Comunidad reunida ",
              },
              secondary: {
                image: {
                  url: "https://images.ctfassets.net/secondary.jpg",
                  title: "Secondary image",
                  description: null,
                  width: 1394,
                  height: 1400,
                  contentType: "image/jpeg",
                },
                altText: " Iglesia ",
              },
              tertiary: {
                image: null,
                altText: null,
              },
            },
            imageOverlay: { badge: " Comunidad ", headline: " Fe " },
            cards: [
              { icon: "sparkles", headline: " Vision ", description: " Dos " },
              { icon: "target", headline: " Mission ", description: " Uno " },
            ],
          },
        ],
      },
    },
    async () => {
      const result = await getCmsHomeContent({ locale: "es" });

      assert.equal(result?.locale, "es");
      assert.equal(result?.home.about?.images.main.image?.url, "https://images.ctfassets.net/main.jpg");
      assert.equal(result?.home.about?.images.main.image?.width, 1400);
      assert.equal(result?.home.about?.images.main.altText, "Comunidad reunida");
      assert.deepEqual(result?.home.about?.cards.map((card) => card.headline), ["Vision", "Mission"]);
      assert.deepEqual(result?.home.about?.cards.map((card) => card.icon), ["sparkles", "target"]);
    },
  );
});

test("missing CMS About section remains nullable for local fallback", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "en-US",
      page: {
        sections: [{ type: "hero", contentMode: "shared", slides: [] }],
      },
    },
    async () => {
      const result = await getCmsHomeContent({ locale: "en-US" });
      assert.equal(result?.home.about, null);
    },
  );
});

test("maps known About icons and safely falls back for unknown keys", () => {
  assert.equal(getAboutIcon("heart"), Heart);
  assert.equal(getAboutIcon("sparkles"), Sparkles);
  assert.equal(getAboutIcon("target"), Target);
  assert.equal(getAboutIcon("unknown"), Heart);
});

test("maps the CMS Ministries section with localized content and configured order", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "es",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "ministries",
            eyebrow: " Sirviendo Juntos ",
            headline: " Nuestros Ministerios ",
            backgroundImage: {
              url: "https://images.ctfassets.net/ministries.webp",
              title: "Ministries",
              description: null,
              width: 1400,
              height: 1400,
              contentType: "image/webp",
            },
            ministries: [
              { slug: "worship", icon: "music", title: " Alabanza ", shortDescription: " Música " },
              { slug: "children", icon: "baby", title: " Niños ", shortDescription: " Fe " },
              { slug: "men", icon: "users", title: " Hombres ", shortDescription: " Comunidad " },
              { slug: "women", icon: "userCircle", title: " Mujeres ", shortDescription: " Apoyo " },
              { slug: "outreach", icon: "globe", title: " Alcance ", shortDescription: " Servicio " },
              { slug: "prayer", icon: "handHeart", title: " Oración ", shortDescription: " Intercesión " },
            ],
          },
        ],
      },
    },
    async () => {
      const result = await getCmsHomeContent({ locale: "es" });
      const ministries = result?.home.ministries;

      assert.equal(ministries?.type, "ministries");
      assert.equal(ministries?.eyebrow, "Sirviendo Juntos");
      assert.equal(ministries?.headline, "Nuestros Ministerios");
      assert.equal(ministries?.backgroundImage?.url, "https://images.ctfassets.net/ministries.webp");
      assert.deepEqual(ministries?.ministries.map((ministry) => ministry.slug), [
        "worship",
        "children",
        "men",
        "women",
        "outreach",
        "prayer",
      ]);
      assert.deepEqual(ministries?.ministries.map((ministry) => ministry.title), [
        "Alabanza",
        "Niños",
        "Hombres",
        "Mujeres",
        "Alcance",
        "Oración",
      ]);
    },
  );
});

test("maps Ministry icons and safely falls back for unknown keys", () => {
  assert.equal(getMinistryIcon("music"), Music);
  assert.equal(getMinistryIcon("baby"), Baby);
  assert.equal(getMinistryIcon("users"), Users);
  assert.equal(getMinistryIcon("userCircle"), UserCircle);
  assert.equal(getMinistryIcon("globe"), Globe);
  assert.equal(getMinistryIcon("handHeart"), HandHeart);
  assert.equal(getMinistryIcon("unknown"), Users);
});

test("maps the CMS Youth section with English content, ordered activities, CTA, and images", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "en-US",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "youth",
            eyebrow: " Faith for the Next Generation ",
            headline: " Youth Ministry ",
            description: " Young people grow in faith. ",
            activitiesHeading: " Activities & Events ",
            activities: [
              { icon: "music2", text: " Youth Worship Nights " },
              { icon: "bookOpen", text: " Weekly Bible Study " },
              { icon: "mountain", text: " Annual Retreats " },
            ],
            primaryCta: { label: " Follow Us ", url: "https://www.instagram.com/legacyleadersofficial/" },
            images: {
              main: {
                image: { url: "https://images.ctfassets.net/youth1.jpg", title: "Youth 1", description: null, width: 1400, height: 933, contentType: "image/jpeg" },
                altText: " Youth Ministry ",
                overlayText: " Legacy Leaders ",
              },
              secondary: {
                image: { url: "https://images.ctfassets.net/youth2.jpg", title: "Youth 2", description: null, width: 1000, height: 1000, contentType: "image/jpeg" },
                altText: " Youth Worship ",
              },
              tertiary: {
                image: { url: "https://images.ctfassets.net/youth3.jpg", title: "Youth 3", description: null, width: 1000, height: 1000, contentType: "image/jpeg" },
                altText: " Youth Community ",
              },
            },
            floatingBadge: " NEW ",
          },
        ],
      },
    },
    async () => {
      const youth = (await getCmsHomeContent({ locale: "en-US" }))?.home.youth;

      assert.equal(youth?.type, "youth");
      assert.equal(youth?.eyebrow, "Faith for the Next Generation");
      assert.equal(youth?.headline, "Youth Ministry");
      assert.equal(youth?.primaryCta?.label, "Follow Us");
      assert.equal(youth?.primaryCta?.url, "https://www.instagram.com/legacyleadersofficial/");
      assert.deepEqual(youth?.activities.map((activity) => activity.text), [
        "Youth Worship Nights",
        "Weekly Bible Study",
        "Annual Retreats",
      ]);
      assert.deepEqual(youth?.activities.map((activity) => activity.icon), ["music2", "bookOpen", "mountain"]);
      assert.equal(youth?.images.main.image?.url, "https://images.ctfassets.net/youth1.jpg");
      assert.equal(youth?.images.main.altText, "Youth Ministry");
      assert.equal(youth?.images.main.overlayText, "Legacy Leaders");
      assert.equal(youth?.images.secondary.image?.url, "https://images.ctfassets.net/youth2.jpg");
      assert.equal(youth?.images.secondary.altText, "Youth Worship");
      assert.equal(youth?.images.tertiary.image?.url, "https://images.ctfassets.net/youth3.jpg");
      assert.equal(youth?.images.tertiary.altText, "Youth Community");
      assert.equal(youth?.floatingBadge, "NEW");
    },
  );
});

test("maps Spanish Youth content and nullable CTA for fallback rendering", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "es",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "youth",
            eyebrow: " Fe para la Próxima Generación ",
            headline: " Legacy Leaders ",
            description: " Jóvenes fortaleciendo su fe. ",
            activitiesHeading: " Actividades ",
            activities: [{ icon: "bookOpen", text: " Estudio Bíblico " }],
            primaryCta: null,
            images: { main: {}, secondary: {}, tertiary: {} },
            floatingBadge: null,
          },
        ],
      },
    },
    async () => {
      const youth = (await getCmsHomeContent({ locale: "es" }))?.home.youth;

      assert.equal(youth?.eyebrow, "Fe para la Próxima Generación");
      assert.equal(youth?.headline, "Legacy Leaders");
      assert.equal(youth?.description, "Jóvenes fortaleciendo su fe.");
      assert.equal(youth?.activitiesHeading, "Actividades");
      assert.equal(youth?.activities[0].text, "Estudio Bíblico");
      assert.equal(youth?.primaryCta, null);
      assert.equal(youth?.floatingBadge, null);
    },
  );
});

test("maps Youth activity icons and safely falls back for unknown keys", () => {
  assert.equal(getYouthActivityIcon("bookOpen"), BookOpen);
  assert.equal(getYouthActivityIcon("music2"), Music2);
  assert.equal(getYouthActivityIcon("mountain"), Mountain);
  assert.equal(getYouthActivityIcon("unknown"), BookOpen);
});

test("missing CMS Youth section remains nullable for local fallback", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "en-US",
      page: { sections: [{ type: "hero", contentMode: "shared", slides: [] }] },
    },
    async () => {
      const result = await getCmsHomeContent({ locale: "en-US" });
      assert.equal(result?.home.youth, null);
    },
  );
});

test("maps CMS Contact content, service time order, and map metadata", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "en-US",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "contact",
            eyebrow: " We'd Love to Hear From You ",
            headline: " Contact Us ",
            contactInfo: {
              address: " 15220 Main St, Bellevue, WA 98007 ",
              phone: " (425) 644-6356 ",
              email: " iglesia.hosanna@gmail.com ",
            },
            serviceTimes: [
              { day: " Friday ", timeDescription: " 7:00 PM - Bible Study " },
              { day: " Sunday ", timeDescription: " 2:00 PM - Service " },
              { day: " Tuesday ", timeDescription: " 7:00 PM - Prayer " },
            ],
            map: {
              embedUrl: " https://www.google.com/maps/embed?pb=example ",
              title: " Hosanna Church Location ",
            },
          },
        ],
      },
    },
    async () => {
      const contact = (await getCmsHomeContent({ locale: "en-US" }))?.home.contact;

      assert.equal(contact?.eyebrow, "We'd Love to Hear From You");
      assert.equal(contact?.headline, "Contact Us");
      assert.deepEqual(contact?.contactInfo, {
        address: "15220 Main St, Bellevue, WA 98007",
        phone: "(425) 644-6356",
        email: "iglesia.hosanna@gmail.com",
      });
      assert.deepEqual(contact?.serviceTimes, [
        { day: "Friday", timeDescription: "7:00 PM - Bible Study" },
        { day: "Sunday", timeDescription: "2:00 PM - Service" },
        { day: "Tuesday", timeDescription: "7:00 PM - Prayer" },
      ]);
      assert.deepEqual(contact?.map, {
        embedUrl: "https://www.google.com/maps/embed?pb=example",
        title: "Hosanna Church Location",
      });
    },
  );
});

test("maps Spanish CMS Contact values and null phone", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "es",
      page: {
        sections: [
          { type: "hero", contentMode: "shared", slides: [] },
          {
            type: "contact",
            eyebrow: " Queremos Conocerte ",
            headline: " Contáctanos ",
            contactInfo: { address: null, phone: null, email: " iglesia.hosanna@gmail.com " },
            serviceTimes: [{ day: " Viernes ", timeDescription: " 7:00 PM - Estudio Bíblico " }],
            map: null,
          },
        ],
      },
    },
    async () => {
      const contact = (await getCmsHomeContent({ locale: "es" }))?.home.contact;

      assert.equal(contact?.eyebrow, "Queremos Conocerte");
      assert.equal(contact?.headline, "Contáctanos");
      assert.deepEqual(contact?.contactInfo, {
        address: null,
        phone: null,
        email: "iglesia.hosanna@gmail.com",
      });
      assert.deepEqual(contact?.serviceTimes, [
        { day: "Viernes", timeDescription: "7:00 PM - Estudio Bíblico" },
      ]);
      assert.equal(contact?.map, null);
    },
  );
});

test("missing CMS Contact section remains nullable for local fallback", async () => {
  await withCmsResponse(
    {
      source: "contentful",
      locale: "en-US",
      page: { sections: [{ type: "hero", contentMode: "shared", slides: [] }] },
    },
    async () => {
      const result = await getCmsHomeContent({ locale: "en-US" });
      assert.equal(result?.home.contact, null);
    },
  );
});
