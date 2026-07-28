(function () {
  "use strict";

  var SITE_BASE = "https://lorenzobombello.be";
  var FALLBACK_IMAGE = SITE_BASE + "/images/og-image.jpg";
  var PAGE = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var PAGE_DESCRIPTIONS_NL = {
    "index.html": "Lorenzo Bombello, onderhoudstechnieker in Gent met focus op Siemens PLC, TIA Portal en industriële automatisatie.",
    "motivatie.html": "Motivatie en groeitraject van Lorenzo Bombello als onderhoudstechnieker in Gent binnen Siemens PLC en TIA Portal automatisatie.",
    "projecten.html": "Smart Factory-projecten van Lorenzo Bombello in Siemens TIA Portal: van PLC-opbouw tot HMI, alarmbeheer en validatie.",
    "project1.html": "Project 1 Smart Factory: Siemens PLC hardware- en netwerkconfiguratie, UDT-structuren en datablocks in TIA Portal.",
    "project2.html": "Project 2 Smart Factory: WinCC Unified HMI, faceplates en alarmbeheer in Siemens TIA Portal.",
    "project3.html": "Project 3 Smart Factory: systeemintegratie, testen en validatie van PLC, HMI en alarmbeheer.",
    "certificates.html": "Certificaten en diploma's van Lorenzo Bombello: onderhoudstechnicus, Siemens PLC-modules, VCA en technische opleidingen.",
    "video.html": "TIA Portal video's over PLC-programmering, HMI-ontwikkeling en industriële automatisatie door Lorenzo Bombello.",
    "automation-experience.html": "Interactieve automatisatie-ervaring met conveyor, robotica en PLC-logica voor industriële demonstraties.",
    "automation-lab.html": "Virtual Automation Lab met live PLC I/O, sensoren en sequentiebesturing in een geautomatiseerde cel.",
    "robot-pick-place.html": "Interactieve Robot Pick and Place-demo met industriële sequentiesturing en realtime PLC-signalen.",
    "pneumatics-lab.html": "Interactieve PLC en pneumatica-demo met ventielen, cilindersturing en I/O-diagnose.",
    "project-image-viewer.html": "Bekijk Smart Factory projectafbeeldingen in volledig scherm."
  };
  var PAGE_KEYWORDS = {
    "index.html": "onderhoudstechnieker Gent, Siemens PLC, TIA Portal, industrial maintenance technician, industriële automatisatie",
    "projecten.html": "Siemens PLC projecten, TIA Portal project, Smart Factory, HMI, industriële automatisering",
    "project1.html": "PLC configuratie, Siemens S7-1200, TIA Portal V19, UDT, Data Blocks",
    "project2.html": "WinCC Unified, HMI ontwikkeling, alarmbeheer, TIA Portal",
    "project3.html": "systeemintegratie, PLC validatie, industriële automatisatie test",
    "motivatie.html": "technisch profiel, onderhoudstechnieker, automatisatie loopbaan",
    "certificates.html": "diploma onderhoudstechnicus, PLC certificaten, VCA Basis",
    "video.html": "TIA Portal video, PLC programmering, HMI tutorials",
    "automation-experience.html": "virtual automation experience, PLC simulatie, industriële demonstratie",
    "automation-lab.html": "conveyor automation lab, PLC I/O demo",
    "robot-pick-place.html": "robot pick and place simulatie, industriële robotica",
    "pneumatics-lab.html": "PLC pneumatica, ventielsturing, cilinder demo",
  var DEFAULT_KEYWORDS = "onderhoudstechnieker Gent, Siemens PLC, TIA Portal, industrial automation, electrical maintenance";
  var currentLang = (document.documentElement.getAttribute("lang") || "nl").toLowerCase();
  var currentPage = PAGE || "index.html";
  var pagePath = currentPage === "" ? "index.html" : currentPage;
  var canonicalLink = document.querySelector('link[rel="canonical"]');
  var canonicalUrl = SITE_BASE + "/" + pagePath;
  var pageTitle = (document.title || "").trim();
  var descriptionMeta = document.querySelector('meta[name="description"]');
  var ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
  var pageDescription = (descriptionMeta && descriptionMeta.content) || (ogDescriptionMeta && ogDescriptionMeta.content) || PAGE_DESCRIPTIONS_NL[currentPage] || "";
  var pageImage = (document.querySelector('meta[property="og:image"]') || {}).content || FALLBACK_IMAGE;

  function setCanonicalUrl() {
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonicalUrl);
      return;
    }
    ensureLink("canonical", { href: canonicalUrl });
  }

  function updateContentMeta(selector, fallback) {
    var meta = document.querySelector(selector);
    if (!meta) return ensureMeta(selector, fallback);
    if (fallback.content) meta.setAttribute("content", fallback.content);
    return meta;
  }

  function ensureMeta(selector, createAttrs) {
    var existing = document.querySelector(selector);
    if (existing) {
      if (createAttrs.content) existing.setAttribute("content", createAttrs.content);
      return existing;
    }

    var meta = document.createElement("meta");
    Object.keys(createAttrs).forEach(function (key) {
      meta.setAttribute(key, createAttrs[key]);
    });
    document.head.appendChild(meta);
    return meta;
  }

  function ensureLink(rel, attrs) {
    var selector = 'link[rel="' + rel + '"]';
    if (attrs.hreflang) selector += '[hreflang="' + attrs.hreflang + '"]';
    var existing = document.querySelector(selector);
    if (existing) return existing;

    var link = document.createElement("link");
    link.setAttribute("rel", rel);
    Object.keys(attrs).forEach(function (key) {
      link.setAttribute(key, attrs[key]);
    });
    document.head.appendChild(link);
    return link;
  }

  function ensureJsonLd(id, data) {
    if (document.querySelector('script[type="application/ld+json"][data-seo-id="' + id + '"]')) return;

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-id", id);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function absoluteUrl(href) {
    try {
      return new URL(href, canonicalUrl).href;
    } catch (error) {
      return href;
    }
  }

  function breadcrumb(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map(function (item, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.url)
        };
      })
    };
  }

  function pageSchema(extra) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      isPartOf: {
        "@id": SITE_BASE + "#website"
      }
    };

    Object.keys(extra || {}).forEach(function (key) {
      schema[key] = extra[key];
    });

    return schema;
  }

  function setCommonMetadata() {
    setCanonicalUrl();

    if (pageDescription) {
      ensureMeta('meta[name="description"]', {
        name: "description",
        content: pageDescription
      });
    }

    updateContentMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl
    });

    updateContentMeta('meta[property="og:image"]', {
      property: "og:image",
      content: pageImage
    });

    if (pageTitle) {
      updateContentMeta('meta[property="og:title"]', {
        property: "og:title",
        content: pageTitle
      });
      updateContentMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: pageTitle
      });
    }

    if (pageDescription) {
      updateContentMeta('meta[property="og:description"]', {
        property: "og:description",
        content: pageDescription
      });
      updateContentMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: pageDescription
      });
    }

    updateContentMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: pageImage
    });

    ensureMeta('meta[name="keywords"]', {
      name: "keywords",
      content: PAGE_KEYWORDS[currentPage] || DEFAULT_KEYWORDS
    });

    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "Lorenzo Bombello"
    });

    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: isViewer ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:large"
    });

    ensureMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: pageTitle
    });

    ensureMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: pageTitle
    });

    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: isViewer ? "summary" : "summary_large_image"
    });

    ensureLink("icon", {
      href: absoluteUrl("favicon.svg"),
      type: "image/svg+xml"
    });

    ensureLink("manifest", {
      href: "site.webmanifest"
    });

    if (!isViewer) {
      ["nl", "en", "fr", "x-default"].forEach(function (lang) {
        ensureLink("alternate", {
          hreflang: lang,
          href: canonicalUrl
        });
      });
    }
  }

  function buildGlobalIdentitySchema() {
    ensureJsonLd("global-identity", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": SITE_BASE + "#person",
          name: "Lorenzo Bombello",
          jobTitle: "Industrial Maintenance Technician",
          url: SITE_BASE,
          image: SITE_BASE + "/images/lorenzo.jpg",
          knowsAbout: [
            "Siemens PLC",
            "TIA Portal",
            "WinCC Unified",
            "Industrial Automation",
            "Electrical Maintenance"
          ]
        },
        {
          "@type": "WebSite",
          "@id": SITE_BASE + "#website",
          url: SITE_BASE,
          name: "Lorenzo Bombello",
          inLanguage: ["nl", "en", "fr"]
        },
        pageSchema({
          inLanguage: currentLang === "in" ? "en" : currentLang,
          about: {
            "@id": SITE_BASE + "#person"
          }
        })
      ]
    });
  }

  function buildIndexSchema() {
    var person = {
      "@type": "Person",
      "@id": SITE_BASE + "#person",
      name: "Lorenzo Bombello",
      jobTitle: "Industrial Maintenance Technician",
      description: pageDescription,
      url: SITE_BASE,
      image: SITE_BASE + "/images/lorenzo.jpg",
      knowsAbout: [
        "Siemens PLC",
        "TIA Portal",
        "WinCC Unified",
        "Industrial Automation",
        "Electrical Maintenance"
      ],
      worksFor: {
        "@type": "Organization",
        name: "Volvo Cars Ghent"
      }
    };

    var website = {
      "@type": "WebSite",
      "@id": SITE_BASE + "#website",
      url: SITE_BASE,
      name: "Lorenzo Bombello",
      publisher: {
        "@id": SITE_BASE + "#person"
      },
      inLanguage: ["nl", "en", "fr"]
    };

    var organization = {
      "@type": "Organization",
      "@id": SITE_BASE + "#organization",
      name: "Lorenzo Bombello",
      url: SITE_BASE,
      logo: SITE_BASE + "/images/logo-icon-dark.png"
    };

    ensureJsonLd("index-graph", {
      "@context": "https://schema.org",
      "@graph": [
        organization,
        person,
        website,
        pageSchema({
          about: {
            "@id": SITE_BASE + "#person"
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: SITE_BASE + "/images/lorenzo.jpg"
          },
          inLanguage: ["nl", "en", "fr"]
        })
      ]
    });
  }

  function buildProjectCollectionSchema() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".project-card")).map(function (card, index) {
      var title = (card.querySelector("h2") || card.querySelector("h3") || {}).textContent || "";
      var description = (card.querySelector("p") || {}).textContent || "";
      var link = card.querySelector('a[href$="project1.html"],a[href$="project2.html"],a[href$="project3.html"]');
      if (!title || !link) return null;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: title.trim(),
          description: description.trim(),
          url: absoluteUrl(link.getAttribute("href"))
        }
      };
    }).filter(Boolean);

    ensureJsonLd("projects-collection", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items
          },
          breadcrumb: {
            "@id": canonicalUrl + "#breadcrumb"
          }
        }),
        breadcrumb([
          { name: "Home", url: "index.html#home" },
          { name: "Projecten", url: "projecten.html" }
        ])
      ]
    });
  }

  function buildVideoSchema() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".video-card")).map(function (card, index) {
      var iframe = card.querySelector("iframe");
      var title = (card.querySelector("h2") || {}).textContent || "";
      var description = (card.querySelector("p") || {}).textContent || "";
      if (!iframe || !title) return null;

      var embedUrl = iframe.getAttribute("src") || "";
      var videoId = embedUrl.split("/embed/")[1] || "";

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: title.trim(),
          description: description.trim(),
          embedUrl: absoluteUrl(embedUrl),
          thumbnailUrl: videoId ? "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg" : FALLBACK_IMAGE,
          url: canonicalUrl
        }
      };
    }).filter(Boolean);

    ensureJsonLd("video-collection", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items
          },
          breadcrumb: {
            "@id": canonicalUrl + "#breadcrumb"
          }
        }),
        breadcrumb([
          { name: "Home", url: "index.html#home" },
          { name: "Video's", url: "video.html" }
        ])
      ]
    });
  }

  function buildCertificatesSchema() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".certificate-card")).map(function (card, index) {
      var title = (card.querySelector("h3") || {}).textContent || "";
      var description = (card.querySelector("p") || {}).textContent || "";
      if (!title) return null;

      var fallbackAnchor = card.id ? "#" + card.id : "#certificaat-" + (index + 1);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: title.trim(),
          description: description.trim(),
          url: canonicalUrl + fallbackAnchor
        }
      };
    }).filter(Boolean);

    ensureJsonLd("certificates-collection", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items
          },
          breadcrumb: {
            "@id": canonicalUrl + "#breadcrumb"
          }
        }),
        breadcrumb([
          { name: "Home", url: "index.html#home" },
          { name: "Opleiding", url: "index.html#opleiding" },
          { name: "Certificaten", url: "certificates.html" }
        ])
      ]
    });
  }

  function buildExperienceSchema() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".experience-card")).map(function (card, index) {
      var title = (card.querySelector("h2") || card.querySelector("h3") || {}).textContent || "";
      var description = (card.querySelector("p") || {}).textContent || "";
      var link = card.querySelector('a[href*="automation-lab.html"],a[href*="robot-pick-place.html"],a[href*="pneumatics-lab.html"]');
      if (!title || !link) return null;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: title.trim(),
          description: description.trim(),
          url: absoluteUrl(link.getAttribute("href"))
        }
      };
    }).filter(Boolean);

    ensureJsonLd("experience-collection", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items
          },
          breadcrumb: {
            "@id": canonicalUrl + "#breadcrumb"
          }
        }),
        breadcrumb([
          { name: "Home", url: "index.html#home" },
          { name: "Interactief automatisatielab", url: "automation-experience.html" }
        ])
      ]
    });
  }

  function buildViewerSchema() {
    var source = new URLSearchParams(location.search).get("src") || "";
    var caption = pageTitle.replace(/\s*\|\s*Lorenzo Bombello$/i, "").trim() || pageTitle;

    ensureJsonLd(PAGE + "-viewer", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          primaryImageOfPage: {
            "@type": "ImageObject",
            contentUrl: absoluteUrl(source),
            url: absoluteUrl(source),
            caption: caption
          }
        }),
        {
          "@type": "ImageObject",
          contentUrl: absoluteUrl(source),
          url: absoluteUrl(source),
          caption: caption
        }
      ]
    });
  }

  function optimizeImages() {
    var images = Array.prototype.slice.call(document.querySelectorAll("img"));

    function setNaturalDimensions(img) {
      if (!img || !img.complete) return;
      if (!img.getAttribute("width") && img.naturalWidth) {
        img.setAttribute("width", String(img.naturalWidth));
      }
      if (!img.getAttribute("height") && img.naturalHeight) {
        img.setAttribute("height", String(img.naturalHeight));
      }
    }

    images.forEach(function (img) {
      var classes = img.className || "";
      var id = img.id || "";
      var isDecorative = img.getAttribute("aria-hidden") === "true";
      var isAboveFold = id === "heroBanner" || classes.indexOf("brand-icon") !== -1 || classes.indexOf("profile-photo") !== -1;

      if (!img.getAttribute("decoding")) {
        img.setAttribute("decoding", "async");
      }

      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", isAboveFold ? "eager" : "lazy");
      }

      if (!isDecorative && !img.getAttribute("alt")) {
        img.setAttribute("alt", pageTitle || "Afbeelding");
      }

      setNaturalDimensions(img);

      if (!img.complete) {
        img.addEventListener("load", function () {
          setNaturalDimensions(img);
        }, { once: true });
      }
    });
  }

  setCommonMetadata();
  optimizeImages();
  buildGlobalIdentitySchema();

  if (PAGE === "index.html" || PAGE === "") {
    buildIndexSchema();
  } else if (PAGE === "projecten.html") {
    buildProjectCollectionSchema();
  } else if (PAGE === "automation-experience.html") {
    buildExperienceSchema();
  } else if (PAGE === "video.html") {
    buildVideoSchema();
  } else if (PAGE === "certificates.html") {
    buildCertificatesSchema();
  } else if (PAGE === "project-image-viewer.html") {
    buildViewerSchema();
  } else {
    var breadcrumbItems = [{ name: "Home", url: "index.html#home" }];

    if (PAGE === "motivatie.html") {
      breadcrumbItems.push({ name: "Motivatie", url: "motivatie.html" });
    } else if (PAGE === "automation-lab.html") {
      breadcrumbItems.push({ name: "Automatisatielab", url: "automation-lab.html" });
    } else if (PAGE === "pneumatics-lab.html") {
      breadcrumbItems.push({ name: "PLC & Pneumatics", url: "pneumatics-lab.html" });
    } else if (PAGE === "robot-pick-place.html") {
      breadcrumbItems.push({ name: "Robot Pick & Place", url: "robot-pick-place.html" });
    } else if (PAGE === "project1.html") {
      breadcrumbItems.push({ name: "Projecten", url: "projecten.html" }, { name: "Smart Factory — Basis", url: "project1.html" });
    } else if (PAGE === "project2.html") {
      breadcrumbItems.push({ name: "Projecten", url: "projecten.html" }, { name: "Smart Factory — HMI & Alarmbeheer", url: "project2.html" });
    } else if (PAGE === "project3.html") {
      breadcrumbItems.push({ name: "Projecten", url: "projecten.html" }, { name: "Smart Factory — Final Project", url: "project3.html" });
    }

    ensureJsonLd(PAGE + "-page", {
      "@context": "https://schema.org",
      "@graph": [
        pageSchema({
          breadcrumb: {
            "@id": canonicalUrl + "#breadcrumb"
          }
        }),
        breadcrumb(breadcrumbItems)
      ]
    });
  }
})();
