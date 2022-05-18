export const connections = [{
        source: "Vancouver",
        destination: "Calgary",
        pathway1: [
            [84, 60, 114, 58],
            [119, 57, 148, 53],
            [154, 53, 184, 50]
        ]
    },
    {
        source: "Vancouver",
        destination: "Seattle",
        pathway1: [
            [66, 80, 67, 106]
        ],
        pathway2: [
            [79, 78, 81, 107]
        ]
    },
    {
        source: "Seattle",
        destination: "Calgary",
        pathway1: [
            [83, 113, 112, 113],
            [116, 112, 146, 108],
            [150, 106, 173, 90],
            [177, 82, 189, 59]
        ],
    },
    {
        source: "Seattle",
        destination: "Helena",
        pathway1: [
            [79, 128, 107, 134],
            [111, 135, 141, 142],
            [146, 142, 174, 149],
            [179, 151, 207, 156],
            [214, 158, 241, 163],
            [248, 166, 274, 171]
        ],
    },
    {
        source: "Seattle",
        destination: "Portland",
        pathway1: [
            [59, 128, 51, 155]
        ],
        pathway2: [
            [71, 131, 64, 157]
        ]
    },
    {
        source: "Portland",
        destination: "Salt Lake City",
        pathway1: [
            [60, 163, 87, 168],
            [95, 172, 123, 182],
            [129, 185, 153, 200],
            [157, 203, 179, 222],
            [184, 228, 203, 248],
            [208, 255, 222, 277]
        ],
    },
    {
        source: "Portland",
        destination: "San Francisco",
        pathway1: [
            [41, 176, 32, 201],
            [28, 208, 23, 234],
            [22, 241, 20, 269],
            [21, 276, 22, 302],
            [23, 311, 28, 338]
        ],
        pathway2: [
            [55, 179, 45, 205],
            [41, 211, 35, 238],
            [35, 244, 34, 271],
            [35, 277, 36, 305],
            [39, 311, 43, 338]
        ]
    },
    {
        source: "San Francisco",
        destination: "Salt Lake City",
        pathway1: [
            [50, 335, 78, 327],
            [82, 326, 110, 317],
            [114, 315, 142, 306],
            [146, 305, 174, 295],
            [178, 294, 206, 286]
        ],
        pathway2: [
            [54, 348, 82, 340],
            [85, 337, 113, 329],
            [118, 328, 146, 319],
            [150, 318, 178, 309],
            [181, 307, 210, 299]
        ]
    },
    {
        source: "San Francisco",
        destination: "Los Angeles",
        pathway1: [
            [39, 364, 49, 389],
            [53, 398, 68, 420],
            [74, 426, 93, 445]
        ],
        pathway2: [
            [51, 358, 62, 384],
            [64, 388, 80, 412],
            [83, 417, 103, 438]
        ]
    },
    {
        source: "Los Angeles",
        destination: "Las Vegas",
        pathway1: [
            [108, 431, 118, 403],
            [128, 398, 158, 394]
        ],
    },
    {
        source: "Los Angeles",
        destination: "Phoenix",
        pathway1: [
            [115, 441, 145, 439],
            [151, 437, 181, 437],
            [188, 437, 216, 445]
        ],
    },
    {
        source: "Los Angeles",
        destination: "El Paso",
        pathway1: [
            [125, 455, 148, 472],
            [151, 476, 177, 487],
            [182, 490, 210, 497],
            [214, 497, 243, 501],
            [248, 501, 277, 500],
            [280, 499, 310, 493]
        ],
    },
    {
        source: "Las Vegas",
        destination: "Salt Lake City",
        pathway1: [
            [178, 387, 199, 367],
            [202, 362, 214, 338],
            [216, 331, 219, 305]
        ],
    },
    {
        source: "Calgary",
        destination: "Winnipeg",
        pathway1: [
            [205, 43, 231, 33],
            [238, 29, 267, 24],
            [272, 24, 302, 23],
            [307, 22, 335, 24],
            [342, 25, 370, 34],
            [376, 37, 402, 47]
        ]
    },
    {
        source: "Calgary",
        destination: "Helena",
        pathway1: [
            [207, 54, 225, 76],
            [229, 81, 246, 104],
            [250, 108, 268, 130],
            [272, 137, 290, 158]
        ]
    },
    {
        source: "Salt Lake City",
        destination: "Helena",
        pathway1: [
            [228, 266, 245, 242],
            [247, 235, 263, 212],
            [265, 207, 280, 184]
        ]
    },
    {
        source: "Salt Lake City",
        destination: "Denver",
        pathway1: [
            [235, 280, 263, 286],
            [267, 287, 297, 294],
            [301, 295, 331, 300]
        ],
        pathway2: [
            [232, 295, 259, 300],
            [265, 301, 292, 307],
            [299, 309, 327, 314]
        ]
    },
    {
        source: "Phoenix",
        destination: "Denver",
        pathway1: [
            [222, 443, 234, 418],
            [236, 411, 251, 389],
            [253, 382, 271, 360],
            [274, 355, 297, 338],
            [303, 334, 329, 323]
        ],
    },
    {
        source: "Phoenix",
        destination: "Santa Fe",
        pathway1: [
            [236, 447, 263, 435],
            [268, 432, 295, 420],
            [300, 417, 326, 405]
        ],
    },
    {
        source: "Phoenix",
        destination: "El Paso",
        pathway1: [
            [231, 456, 260, 464],
            [264, 467, 292, 474],
            [297, 476, 326, 485]
        ],
    },
    {
        source: "Helena",
        destination: "Winnipeg",
        pathway1: [
            [299, 157, 320, 138],
            [324, 134, 345, 113],
            [348, 109, 369, 89],
            [372, 84, 394, 64]
        ],
    },
    {
        source: "Helena",
        destination: "Duluth",
        pathway1: [
            [302, 169, 332, 169],
            [336, 169, 366, 168],
            [371, 168, 400, 168],
            [405, 169, 435, 168],
            [439, 168, 468, 168],
            [473, 168, 503, 168]
        ],
    },
    {
        source: "Helena",
        destination: "Omaha",
        pathway1: [
            [313, 182, 340, 194],
            [345, 196, 372, 206],
            [378, 209, 404, 219],
            [408, 223, 436, 232],
            [440, 236, 467, 246]
        ],
    },
    {
        source: "Helena",
        destination: "Denver",
        pathway1: [
            [298, 180, 309, 208],
            [310, 212, 322, 240],
            [323, 244, 334, 271],
            [337, 277, 347, 303]
        ],
    },
    {
        source: "Denver",
        destination: "Omaha",
        pathway1: [
            [350, 307, 373, 289],
            [379, 285, 405, 273],
            [409, 271, 438, 263],
            [446, 262, 475, 259]
        ],
    },
    {
        source: "Denver",
        destination: "Kansas City",
        pathway1: [
            [363, 316, 393, 318],
            [396, 319, 425, 316],
            [430, 316, 459, 310],
            [463, 309, 490, 298]
        ],
        pathway2: [
            [362, 329, 392, 332],
            [398, 331, 425, 329],
            [431, 329, 460, 323],
            [466, 322, 493, 312]
        ],
    },
    {
        source: "Denver",
        destination: "Oklahoma City",
        pathway1: [
            [354, 337, 374, 358],
            [379, 359, 405, 370],
            [409, 373, 437, 377],
            [442, 379, 472, 379]
        ],
    },
    {
        source: "Denver",
        destination: "Santa Fe",
        pathway1: [
            [347, 332, 344, 359],
            [344, 366, 343, 393]
        ],
    },
    {
        source: "Santa Fe",
        destination: "Oklahoma City",
        pathway1: [
            [353, 403, 383, 400],
            [388, 399, 417, 396],
            [423, 396, 451, 392]
        ],
    },
    {
        source: "Santa Fe",
        destination: "El Paso",
        pathway1: [
            [341, 419, 339, 445],
            [338, 454, 337, 481]
        ],
    },
    {
        source: "El Paso",
        destination: "Oklahoma City",
        pathway1: [
            [342, 482, 370, 474],
            [375, 472, 402, 460],
            [405, 455, 429, 441],
            [434, 438, 454, 417],
            [458, 411, 476, 389]
        ],
    },
    {
        source: "El Paso",
        destination: "Dallas",
        pathway1: [
            [359, 491, 389, 487],
            [394, 486, 423, 482],
            [430, 481, 459, 477],
            [463, 477, 492, 473]
        ],
    },
    {
        source: "El Paso",
        destination: "Houston",
        pathway1: [
            [343, 497, 368, 511],
            [371, 513, 400, 522],
            [405, 523, 433, 528],
            [439, 529, 467, 529],
            [473, 528, 502, 524],
            [507, 521, 535, 514]
        ],
    },
    {
        source: "Winnipeg",
        destination: "Saint St. Marie",
        pathway1: [
            [423, 56, 452, 62],
            [458, 65, 487, 70],
            [492, 72, 521, 78],
            [527, 80, 556, 86],
            [561, 86, 590, 93],
            [597, 93, 625, 99]
        ]
    },
    {
        source: "Winnipeg",
        destination: "Duluth",
        pathway1: [
            [418, 66, 438, 86],
            [443, 90, 462, 109],
            [466, 113, 487, 133],
            [491, 137, 511, 157]
        ]
    },
    {
        source: "Duluth",
        destination: "Saint St. Marie",
        pathway1: [
            [528, 150, 556, 137],
            [563, 133, 590, 124],
            [594, 121, 622, 112]
        ]
    },
    {
        source: "Duluth",
        destination: "Toronto",
        pathway1: [
            [524, 163, 552, 160],
            [558, 159, 587, 153],
            [592, 153, 621, 149],
            [626, 148, 655, 142],
            [661, 142, 690, 138],
            [694, 137, 723, 132]
        ],
    },
    {
        source: "Duluth",
        destination: "Chicago",
        pathway1: [
            [523, 175, 547, 190],
            [552, 190, 580, 201],
            [586, 202, 615, 209]
        ],
    },
    {
        source: "Duluth",
        destination: "Omaha",
        pathway1: [
            [506, 182, 497, 209],
            [494, 216, 484, 242]
        ],
        pathway2: [
            [518, 186, 508, 213],
            [505, 219, 496, 245]
        ]
    },
    {
        source: "Omaha",
        destination: "Chicago",
        pathway1: [
            [495, 251, 519, 234],
            [523, 232, 547, 215],
            [554, 215, 584, 219],
            [588, 219, 617, 224]
        ]
    },
    {
        source: "Omaha",
        destination: "Kansas City",
        pathway1: [
            [487, 267, 500, 293]
        ],
        pathway2: [
            [498, 262, 512, 286]
        ]
    },
    {
        source: "Kansas City",
        destination: "Saint Louis",
        pathway1: [
            [515, 291, 544, 291],
            [550, 291, 580, 291]
        ],
        pathway2: [
            [515, 304, 544, 303],
            [550, 305, 579, 305]
        ]
    },
    {
        source: "Kansas City",
        destination: "Oklahoma City",
        pathway1: [
            [506, 313, 498, 339],
            [497, 345, 488, 373]
        ],
        pathway2: [
            [518, 316, 511, 343],
            [509, 349, 501, 377]
        ]
    },
    {
        source: "Oklahoma City",
        destination: "Little Rock",
        pathway1: [
            [497, 380, 527, 380],
            [532, 382, 562, 381]
        ],
    },
    {
        source: "Oklahoma City",
        destination: "Dallas",
        pathway1: [
            [492, 396, 495, 424],
            [497, 431, 501, 458]
        ],
        pathway2: [
            [504, 392, 508, 422],
            [509, 427, 513, 457]
        ]
    },
    {
        source: "Dallas",
        destination: "Little Rock",
        pathway1: [
            [520, 446, 536, 421],
            [539, 417, 557, 394]
        ],
    },
    {
        source: "Dallas",
        destination: "Houston",
        pathway1: [
            [513, 476, 532, 498]
        ],
        pathway2: [
            [522, 468, 541, 489]
        ]
    },
    {
        source: "Houston",
        destination: "New Orleans",
        pathway1: [
            [555, 499, 584, 497],
            [590, 496, 619, 492]
        ],
    },
    {
        source: "Saint Louis",
        destination: "Chicago",
        pathway1: [
            [580, 287, 594, 262],
            [598, 254, 615, 234]
        ],
        pathway2: [
            [590, 291, 606, 269],
            [609, 263, 626, 240]
        ],
    },
    {
        source: "Saint Louis",
        destination: "Pittsburgh",
        pathway1: [
            [597, 303, 622, 290],
            [626, 287, 651, 273],
            [655, 271, 680, 257],
            [685, 253, 711, 237],
            [715, 237, 741, 222]
        ],
    },
    {
        source: "Saint Louis",
        destination: "Nashville",
        pathway1: [
            [598, 317, 625, 326],
            [629, 329, 657, 337]
        ],
    },
    {
        source: "Saint Louis",
        destination: "Little Rock",
        pathway1: [
            [590, 315, 586, 343],
            [583, 349, 579, 378]
        ],
    },
    {
        source: "Little Rock",
        destination: "Nashville",
        pathway1: [
            [583, 386, 611, 382],
            [616, 381, 642, 369],
            [646, 367, 668, 349]
        ],
    },
    {
        source: "Little Rock",
        destination: "New Orleans",
        pathway1: [
            [582, 398, 596, 424],
            [596, 428, 611, 453],
            [612, 458, 626, 483]
        ],
    },
    {
        source: "Saint St. Marie",
        destination: "Montreal",
        pathway1: [
            [641, 94, 664, 76],
            [668, 73, 695, 58],
            [699, 56, 727, 47],
            [731, 45, 760, 39],
            [766, 38, 795, 37]
        ]
    },
    {
        source: "Saint St. Marie",
        destination: "Toronto",
        pathway1: [
            [649, 106, 679, 111],
            [684, 113, 714, 118]
        ]
    },
    {
        source: "Chicago",
        destination: "Toronto",
        pathway1: [
            [622, 203, 644, 186],
            [648, 183, 672, 165],
            [678, 162, 705, 156],
            [709, 152, 730, 135]
        ],
    },
    {
        source: "Chicago",
        destination: "Pittsburgh",
        pathway1: [
            [636, 210, 664, 202],
            [673, 200, 701, 197],
            [708, 196, 738, 196]
        ],
        pathway2: [
            [641, 222, 671, 215],
            [675, 214, 704, 209],
            [709, 209, 738, 210]
        ],
    },
    {
        source: "New Orleans",
        destination: "Atlanta",
        pathway1: [
            [629, 485, 639, 458],
            [645, 449, 659, 426],
            [665, 419, 683, 398],
            [688, 393, 710, 374]
        ],
        pathway2: [
            [641, 489, 653, 464],
            [655, 457, 671, 434],
            [674, 429, 693, 409],
            [697, 403, 718, 384]
        ],
    },
    {
        source: "New Orleans",
        destination: "Miami",
        pathway1: [
            [651, 493, 677, 480],
            [681, 475, 711, 468],
            [717, 468, 748, 468],
            [752, 470, 777, 484],
            [785, 488, 807, 508],
            [809, 513, 830, 534]
        ],
    },
    {
        source: "Nashville",
        destination: "Pittsburgh",
        pathway1: [
            [662, 331, 674, 308],
            [679, 300, 698, 278],
            [703, 274, 728, 259],
            [731, 255, 747, 231]
        ],
    },
    {
        source: "Nashville",
        destination: "Raleigh",
        pathway1: [
            [681, 329, 706, 316],
            [712, 311, 741, 305],
            [748, 304, 776, 306]
        ],
    },
    {
        source: "Nashville",
        destination: "Atlanta",
        pathway1: [
            [687, 346, 711, 363]
        ],
    },
    {
        source: "Atlanta",
        destination: "Raleigh",
        pathway1: [
            [725, 362, 745, 343],
            [750, 338, 771, 318]
        ],
        pathway2: [
            [734, 371, 754, 352],
            [760, 348, 781, 328]
        ],
    },
    {
        source: "Atlanta",
        destination: "Charleston",
        pathway1: [
            [737, 379, 766, 379],
            [771, 380, 803, 381]
        ],
    },
    {
        source: "Atlanta",
        destination: "Miami",
        pathway1: [
            [731, 389, 749, 411],
            [753, 415, 772, 438],
            [775, 443, 795, 465],
            [798, 470, 816, 491],
            [820, 499, 838, 520]
        ],
    },
    {
        source: "Toronto",
        destination: "Montreal",
        pathway1: [
            [778, 57, 804, 45],
            [749, 81, 771, 63],
            [732, 113, 743, 88]
        ]
    },
    {
        source: "Toronto",
        destination: "Pittsburgh",
        pathway1: [
            [746, 138, 750, 166],
            [749, 172, 752, 201]
        ]
    },
    {
        source: "Pittsburgh",
        destination: "New York",
        pathway1: [
            [759, 196, 785, 182],
            [789, 178, 814, 164]
        ],
        pathway2: [
            [766, 207, 791, 192],
            [797, 188, 822, 174]
        ],
    },
    {
        source: "Pittsburgh",
        destination: "Washington",
        pathway1: [
            [768, 220, 793, 232],
            [798, 235, 824, 249]
        ],
    },
    {
        source: "Pittsburgh",
        destination: "Raleigh",
        pathway1: [
            [768, 236, 773, 263],
            [772, 270, 778, 298]
        ],
    },
    {
        source: "Raleigh",
        destination: "Washington",
        pathway1: [
            [783, 307, 803, 284],
            [806, 280, 828, 258]
        ],
        pathway2: [
            [794, 316, 814, 295],
            [819, 289, 838, 269]
        ],
    },
    {
        source: "Raleigh",
        destination: "Charleston",
        pathway1: [
            [794, 325, 817, 341],
            [829, 346, 819, 373]
        ],
        pathway2: [],
    },
    {
        source: "Montreal",
        destination: "Boston",
        pathway1: [
            [829, 44, 851, 61],
            [856, 67, 879, 85]
        ],
        pathway2: [
            [823, 55, 844, 73],
            [849, 78, 872, 95]
        ],
    },
    {
        source: "Montreal",
        destination: "New York",
        pathway1: [
            [815, 63, 818, 90],
            [819, 95, 825, 123],
            [826, 131, 830, 158]
        ]
    },
    {
        source: "New York",
        destination: "Boston",
        pathway1: [
            [885, 117, 870, 141],
            [867, 147, 853, 172]
        ],
        pathway2: [
            [875, 110, 859, 133],
            [857, 141, 842, 162]
        ],
    },
    {
        source: "New York",
        destination: "Washington",
        pathway1: [
            [834, 183, 835, 211],
            [835, 215, 837, 243]
        ],
        pathway2: [
            [847, 182, 849, 209],
            [849, 215, 850, 243]
        ],
    },
    {
        source: "Charleston",
        destination: "Miami",
        pathway1: [
            [817, 391, 818, 418],
            [818, 425, 822, 453],
            [825, 459, 832, 486],
            [836, 494, 848, 518]
        ],
    },
]


export const getConnection = (source, destination) => {
    const theCon = connections.find((connection) => {
        const c1 = source === connection.source && destination === connection.destination;
        const c2 = source === connection.destination && destination === connection.source
        return c1 || c2;
    })
    return theCon;
}

export const cities = [
    {
        "name": "Atlanta",
        "point": [725,376]
    }, {
        "name": "Boston",
        "point": [885,100]
    }, {
        "name": "Calgary",
        "point": [196,49]
    }, {
        "name": "Charleston",
        "point": [815,386]
    }, {
        "name": "Chicago",
        "point": [631,227]
    }, {
        "name": "Dallas",
        "point": [507,471]
    }, {
        "name": "Denver",
        "point": [346,322]
    }, {
        "name": "Duluth",
        "point": [515,172]
    }, {
        "name": "El Paso",
        "point": [334,494]
    }, {
        "name": "Helena",
        "point": [293,176]
    }, {
        "name": "Houston",
        "point": [546,508]
    }, {
        "name": "Kansas City",
        "point": [507,307]
    }, {
        "name": "Las Vegas",
        "point": [108,453]
    }, {
        "name": "Little Rock",
        "point": [572,392]
    }, {
        "name": "Los Angeles",
        "point": [108,454]
    }, {
        "name": "Miami",
        "point": [843,534]
    }, {
        "name": "Montreal",
        "point": [816,48]
    }, {
        "name": "Nashville",
        "point": [674,345]
    }, {
        "name": "New Orleans",
        "point": [636,504]
    }, {
        "name": "New York",
        "point": [835,173]
    }, {
        "name": "Oklahoma City",
        "point": [487,388]
    }, {
        "name": "Omaha",
        "point": [484,259]
    }, {
        "name": "Phoenix",
        "point": [222,460]
    }, {
        "name": "Pittsburgh",
        "point": [753,215]
    }, {
        "name": "Portland",
        "point": [48,165]
    }, {
        "name": "Raleigh",
        "point": [786,321]
    }, {
        "name": "Saint Louis",
        "point": [588,308]
    }, {
        "name": "Saint St. Marie",
        "point": [636,105]
    }, {
        "name": "Salt Lake City",
        "point": [222,293]
    }, {
        "name": "San Francisco",
        "point": [35,354]
    }, {
        "name": "Santa Fe",
        "point": [341,409]
    }, {
        "name": "Seattle",
        "point": [68,118]
    }, {
        "name": "Toronto",
        "point": [736,128]
    }, {
        "name": "Vancouver",
        "point": [73,67]
    }, {
        "name": "Washington",
        "point": [843,259]
    }, {
        "name": "Winnipeg",
        "point": [407,60]
    }
]

export const getCity = (cityName) => {
    const theCity = cities.find((city) => {
        return city.name === cityName;
    })
    return theCity;
}
