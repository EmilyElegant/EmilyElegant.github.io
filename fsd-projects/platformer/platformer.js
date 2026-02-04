$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

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


    // TODO 2 - Create Platforms evel 1//
       // Horizontal baarrier at y=500 left half block permanenlty, right after fist collectable.
      createBarriersegment(0, 500,600,20, "blue", "bar500up", false)
      createBarriersegment(
        600,
        500,
        canvas.width - 600,
        20,
        "blue",
        "bar500right",
        false
      ); // right side (opens after 1st collectable)

      // example platfomrs for level 1
      createPlatform(100, 250, 100, 20)
      createPlatform(400, 400, 50, 20)
      createPlatform(300, 200, 100, 20)
      createPlatform(200, 250, 100, 20, "Lightblue")

      //Level 2//
      //Horizontal baarrier at y=1000: left half blocks permanently right half (x >= 600) opens after second collectable.
      createBarriersegment(0,1000,600, 20, "blue", "bar1000left", false); // left side (stays closed)
      createBarriersegment(
        600,
        1000,
        canvas.width - 600,
        20,
        "blue",
        "bar1000right",
        false,

      ); // right side (opens after 2nd collectable)

      createPlatform(570, 570, 50, 20);
      createPlatform(750, 450, 50, 20);
      createPlatform(600, 300, 50, 20);
      createPlatform(800, 200, 25, 20);
      createPlatform(735, 200, 80, 20, "Lightblue");

      //Level 3//
      createPlatform(1110, 625, 25, 20);
      createPlatform(1320, 525, 10, 20);
      createPlatform(1110, 300, 10, 20);
      createPlatform(1350, 200, 5, 20);

    
      // TODO 3 - Create Collectables
     //Level 1//
     createCollectable("database", 100, 100, 0, 0);
     //Level 2//
     createCollectable("database", 800, 25, 0, 0);
     //Level 3//
     createCollectable("database", 1350, 1, 0, 0);
     createCollectable("database", 400, 600 , 0, 0);
     // TODO 4 - Create Cannons
     //Level 1//
     // Use the correct function name and lowercase side. Lowered delay so cannon fires visibly.
     createCannon("left", 300, 1500);
     createCannon("left", 50, 2000);
     createCannon("left", 600, 2000);

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




