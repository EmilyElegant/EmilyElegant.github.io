$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function createBarriersegment(x, y, width, height, color, barrierId, isOpen) {
    platforms.push({
      x,
      y,
      width,
      height,
      color,
      barrierId,
      isOpen,
    });
  }

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Make the player image visible in the sidebar and ensure canvas scales nicely
    try {
      if (halleImage) {
        halleImage.style.display = "block";
        halleImage.style.maxWidth = "100%";
        halleImage.style.height = "auto";
      }
    } catch (e) {
      console.warn("Unable to style player image:", e);
    }

    // If HUD exists, update it periodically (best-effort; reads common globals if present)
    setInterval(function () {
      try {
        var sEl = document.getElementById("score");
        var cEl = document.getElementById("collect");
        if (sEl) {
          var s =
            typeof score !== "undefined"
              ? score
              : typeof gameScore !== "undefined"
                ? gameScore
                : 0;
          sEl.textContent = "Score: " + s;
        }
        if (cEl) {
          var collected = 0;
          if (Array.isArray(window.gameObjects)) {
            collected = gameObjects.filter(function (o) {
              return o.collect && o.toRemove;
            }).length;
          }
          cEl.textContent = "Collectables: " + collected;
        }
      } catch (e) {
        // ignore read errors; HUD is best-effort
      }
    }, 300);

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // Redesigned Platforms & Barriers — a left-to-right progression with floating islands
    // Primary horizontal barrier near starter zone. Right side opens after first collectable.
    createBarriersegment(0, 480, 500, 20, "rgb(242,48,9)", "bar480left", false);
    createBarriersegment(
      500,
      480,
      canvas.width - 500,
      20,
      "rgb(242,48,9)",
      "bar480right",
      false,
    );

    // Starter platforms (safe zone -> jump challenge)
    createPlatform(60, 420, 120, 20, "#fff");
    createPlatform(220, 360, 160, 20, "#ffc0cb");
    createPlatform(420, 300, 120, 20, "rgb(242,48,9)");

    // Big mid-section: wide platform with a gap and floating islands above
    createPlatform(620, 240, 200, 20, "Lightblue");
    createPlatform(760, 180, 80, 20, "#fff");
    createPlatform(920, 320, 140, 20, "#fff");
    createPlatform(1100, 180, 80, 20, "rgb(242,48,9)");

    // Vertical cluster (alternate route)
    createPlatform(300, 200, 80, 20);
    createPlatform(360, 150, 60, 20);

    // Edge platforms near goal to encourage precision jumping
    createPlatform(canvas.width - 140, 140, 100, 20, "#ffe6e6");

    // Optional farther barrier kept off-canvas to maintain compatibility with any large-level layouts
    createBarriersegment(0, 1000, 600, 20, "blue", "bar1000left", false);
    createBarriersegment(
      600,
      1000,
      canvas.width - 600,
      20,
      "blue",
      "bar1000right",
      false,
    );

    // Collectables: place them to guide the player across the level
    createCollectable("diamond", 80, 380, 0, 0);
    createCollectable("database", 480, 260, 0, 0);
    createCollectable("diamond", 700, 200, 0, 0);
    createCollectable("database", 1020, 140, 0, 0);

    // Cannons: mixed placements with varied delays to create rhythm
    // Left-side cannons (early challenge)
    createCannon("left", 150, 1800);
    createCannon("left", 320, 2400);

    // Right-side cannons (later challenge)
    createCannon("right", 1000, 2200);

    // Top cannons that drop/projectiles downward from above key gaps
    createCannon("top", 650, 2000);
    createCannon("top", 900, 2600);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////

    // Debug: log canvas and platforms to inspect barrier placement
    console.log(
      "%c canvas size:",
      "color: teal; font-weight: bold;",
      canvas.width,
      canvas.height,
    );
    console.log(
      "%c platforms count:",
      "color: teal; font-weight: bold;",
      platforms.length,
    );
    console.log(
      "%c barriers:",
      "color: teal; font-weight: bold;",
      platforms.filter(function (p) {
        return p.barrierId !== undefined;
      }),
    );
    console.log(
      "%c first 10 platforms:",
      "color: teal; font-weight: bold;",
      platforms.slice(0, 10),
    );
  }

  registerSetup(setup);
});
