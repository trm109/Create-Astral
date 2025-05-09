onEvent("recipes", (event) => {
    //Wire Mill
    // Let's making the rolling mill more relevant by making cables require create addition rods

    // Originally I was going to have the wire mill be an upgraded rolling mill but the above code
    //  changes the input to rods instead of ingots. I kind of like this a bit more. Downsides is that it may be annoying
    //  to use both machines for an item they may not craft often, outside of circuit automation.
    // Still, I'll let the wire mill produce wires.
    //
    const WIRE_MATERIALS = ["iron", "gold", "copper"];
    for (let material of WIRE_MATERIALS) {
        event.custom({
            type: "techreborn:wire_mill",
            power: 2,
            time: 300,
            ingredients: [
                {
                    // create calls it golden sheet, otherwise material + _sheet
                    item: (material === "gold") ? "create:golden_sheet" :
                        "create:" + material + "_sheet",
                    count: 2,
                },
            ],
            results: [
                {
                    item: "createaddition:" + material + "_wire",
                    count: 6,
                },
            ],
        });
    }
    //Compressor
    event.custom({
        type: "techreborn:compressor",
        power: 10,
        time: 300,
        ingredients: [
            {
                item: "techreborn:compressed_plantball",
                count: 4,
            },
        ],
        results: [
            {
                item: "createaddition:biomass",
                count: 1,
            },
        ],
    });
    event.custom({
        type: "techreborn:compressor",
        power: 10,
        time: 600,
        ingredients: [
            {
                item: "createastral:fragile_sheet",
                count: 16,
            },
        ],
        results: [
            {
                item: "createastral:fragile_rocket_fin",
                count: 1,
            },
        ],
    });

    //Grinder
    // Remove all block techreborn grinding recipes

    // I'm not giving these recipes below to crushing wheel (they're kind of redundant)

    // Remove grinder recipes that either have a unique crushing recipe, or doesn't make sense to grind

    // Remove recipes that clutter without adding enough value

    // Add crushing unique crushing recipes to grinder
    // 0: input / 1: output amount / 2: output / 3: custom time / 4: custom power
    // NOTE: some crushing recipes are auto-generated from milling recipes, which means not all these recipes will be removed.
    //  They may remove upgraded crushing recipes though. The quest book will make it clear that
    //  some milling recipes may be upgraded by the grinder instead of the crushing wheel.
    const DEFAULT_GRIND_TIME = 100; // five seconds
    const DEFAULT_GRIND_POWER = 5;
    const CRUSHING_RECIPES_TO_BECOME_GRINDING = [
        ["minecraft:clay_ball", 1, "techreborn:clay_dust", undefined, undefined], // showing the 4th and 5th for demonstration
        ["minecraft:amethyst_cluster", 7, "minecraft:amethyst_shard"],
        ["minecraft:prismarine_crystals", 2, "minecraft:quartz"],
        ["minecraft:saddle", 3, "minecraft:leather"],
        ["minecraft:wheat", 3, "create:wheat_flour"],
        ["minecraft:ender_pearl", 2, "ae2:ender_dust"],
        ["tconstruct:necrotic_bone", 6, "minecraft:bone_meal"],
        ["minecraft:dried_kelp", 1, "minecraft:gunpowder"],
        ["create:sturdy_sheet", 1, "createastral:fragile_sheet"]
    ];

    for (let recipe of CRUSHING_RECIPES_TO_BECOME_GRINDING) {
        event.remove({type: "create:crushing", input: recipe[0]});
        event.custom({
            type: "techreborn:grinder",
            time: recipe[3] || DEFAULT_GRIND_TIME,
            power: recipe[4] || DEFAULT_GRIND_POWER,

            ingredients: [
                {
                    item: recipe[0],
                    count: 1,
                },
            ],
            results: [
                {
                    item: recipe[2],
                    count: recipe[1],
                },
            ],
        });
    }

    event.custom({
        type: "techreborn:grinder",
        time: 100, // 5 seconds?
        power: 5,

        ingredients: [
            {
                item: "minecraft:pointed_dripstone",
                count: 1,
            },
        ],
        results: [
            {
                item: "minecraft:clay_ball",
                count: 1,
            },
        ],
    });

    // centrifuge
    event.custom({
        type: "techreborn:centrifuge",
        power: 8,
        time: 500,
        ingredients: [
            {
                item: "farmersdelight:rich_soil",
                count: 2,
            },
        ],
        results: [
            {
                item: "minecraft:coarse_dirt",
                count: 2,
            },
            {
                item: "techreborn:saltpeter_dust",
                count: 4,
            },
        ],
    });

    event.custom({
        type: "techreborn:centrifuge",
        power: 100,
        time: 500,
        ingredients: [
            {
                item: "yttr:yttrium_dust",
                count: 4,
            },
        ],
        results: [
            {
                item: "createastral:crushed_raw_calorite",
                count: 3,
            },
            {
                item: "createastral:uranium_residue",
                count: 1,
            },
        ],
    });

    event.custom({
        type: "techreborn:centrifuge",
        power: 8,
        time: 500,
        ingredients: [
            {
                item: "ae2:certus_quartz_crystal",
                count: 1,
            },
            {
                item: "techreborn:cell",
                count: 13
            }
        ],
        results: [
            {
                item: "techreborn:cell",
                nbt: {
                    fluid: "ad_astra:oxygen",
                },
                count: 10,
            },
            {
                item: "techreborn:cell",
                nbt: {
                    fluid: "techreborn:silicon",
                },
                count: 3,
            },
        ],
    });


    // Vacuum Freezer

    event.custom({
        type: "techreborn:vacuum_freezer",
        power: 25,
        time: 100,
        ingredients: [
            {
                fluid: "minecraft:water",
                holder: "techreborn:cell",
            },
        ],
        results: [
            {
                item: "techreborn:cell",
                nbt: {
                    fluid: "kubejs:supercooled_water",
                },
            },
        ],
    });

    // Crafting Table recipes
    event
        .shapeless("3x minecraft:paper", [
            "techreborn:saw_dust",
            "techreborn:saw_dust",
            "techreborn:saw_dust",
            "minecraft:water_bucket",
        ])
        .replaceIngredient("minecraft:water_bucket", "minecraft:bucket")
        .id("techreborn:crafting_table/paper_manual_only");
});
