/* Field ranges, option lists, class profiles and sample records.
   Derived from your three CSVs. Edit freely, or replace with a call to your own backend.
   `metrics` and `importance` are optional: add them per model once you have trained models,
   and the dashboard will show the accuracy line and the "what the model relies on" table. */
window.CONFIG = {
 "crop": {
  "fields": [
   {
    "key": "N",
    "label": "Nitrogen",
    "unit": "kg/ha",
    "step": 1,
    "min": 0,
    "max": 133,
    "default": 37
   },
   {
    "key": "P",
    "label": "Phosphorus",
    "unit": "kg/ha",
    "step": 1,
    "min": 5,
    "max": 144,
    "default": 51
   },
   {
    "key": "K",
    "label": "Potassium",
    "unit": "kg/ha",
    "step": 1,
    "min": 6,
    "max": 205,
    "default": 32
   },
   {
    "key": "temperature",
    "label": "Temperature",
    "unit": "°C",
    "step": 0.5,
    "min": 10.5,
    "max": 42.5,
    "default": 25.5
   },
   {
    "key": "humidity",
    "label": "Relative humidity",
    "unit": "%",
    "step": 1,
    "min": 14,
    "max": 99,
    "default": 80
   },
   {
    "key": "ph",
    "label": "Soil pH",
    "unit": "",
    "step": 0.1,
    "min": 4.3,
    "max": 9,
    "default": 6.4
   },
   {
    "key": "rainfall",
    "label": "Rainfall",
    "unit": "mm",
    "step": 1,
    "min": 21,
    "max": 281,
    "default": 95
   }
  ],
  "categories": {},
  "profiles": {
   "rice": {
    "N": [
     62.9,
     79.89,
     95
    ],
    "P": [
     36,
     47.58,
     58
    ],
    "K": [
     36,
     39.87,
     44
    ],
    "temperature": [
     20.874246448,
     23.6893322105,
     26.466964434
    ],
    "humidity": [
     80.34648350600001,
     82.2728215389,
     84.053051091
    ],
    "ph": [
     5.3808832698,
     6.425470922140001,
     7.4761043353000005
    ],
    "rainfall": [
     191.59958292,
     236.18111359399998,
     283.98410760999997
    ]
   },
   "maize": {
    "N": [
     61.9,
     77.76,
     95.10000000000001
    ],
    "P": [
     37,
     48.44,
     59
    ],
    "K": [
     16,
     19.79,
     24
    ],
    "temperature": [
     18.641080801,
     22.3892039102,
     25.703666062
    ],
    "humidity": [
     57.795838648,
     65.0922494467,
     72.80623804000001
    ],
    "ph": [
     5.7161215025,
     6.2451897224,
     6.8018678379
    ],
    "rainfall": [
     64.740988855,
     84.766987663,
     107.23934222999999
    ]
   },
   "chickpea": {
    "N": [
     24,
     40.09,
     57.10000000000001
    ],
    "P": [
     57,
     67.79,
     78
    ],
    "K": [
     76,
     79.92,
     85
    ],
    "temperature": [
     17.298360463999998,
     18.8728467519,
     20.630339458
    ],
    "humidity": [
     14.7097208,
     16.8604394237,
     19.345458921
    ],
    "ph": [
     6.3052658323,
     7.33695662374,
     8.4931120026
    ],
    "rainfall": [
     69.151344035,
     80.0589772605,
     90.914950057
    ]
   },
   "kidneybeans": {
    "N": [
     5.9,
     20.75,
     35.10000000000001
    ],
    "P": [
     57.9,
     67.54,
     79
    ],
    "K": [
     15.9,
     20.05,
     24
    ],
    "temperature": [
     16.509391437,
     20.1150846851,
     23.790962825
    ],
    "humidity": [
     18.719488109,
     21.6053567295,
     24.681951277
    ],
    "ph": [
     5.5647519904,
     5.749410585870001,
     5.9500719181
    ],
    "rainfall": [
     67.64297377999999,
     105.91977754210001,
     139.81411702
    ]
   },
   "pigeonpeas": {
    "N": [
     5,
     20.73,
     37
    ],
    "P": [
     57,
     67.73,
     77
    ],
    "K": [
     16.9,
     20.29,
     24
    ],
    "temperature": [
     19.485804446,
     27.7417622259,
     35.130007259
    ],
    "humidity": [
     34.679076361999996,
     48.0616330847,
     63.466362737000004
    ],
    "ph": [
     4.719775278999999,
     5.794174879790001,
     7.0531320029
    ],
    "rainfall": [
     100.53886718000001,
     149.4575638135,
     191.06821888
    ]
   },
   "mothbeans": {
    "N": [
     4.9,
     21.44,
     36
    ],
    "P": [
     37,
     48.01,
     58
    ],
    "K": [
     16,
     20.23,
     24
    ],
    "temperature": [
     25.310324428,
     28.1949204842,
     31.030005318
    ],
    "humidity": [
     43.646537695,
     53.16041802790001,
     61.591060414
    ],
    "ph": [
     4.1566733579,
     6.83117408269,
     9.076087439
    ],
    "rainfall": [
     33.805915853,
     51.198487045700006,
     70.50410832200001
    ]
   },
   "mungbean": {
    "N": [
     4,
     20.99,
     35.10000000000001
    ],
    "P": [
     37,
     47.28,
     59
    ],
    "K": [
     15,
     19.87,
     24
    ],
    "temperature": [
     27.412070074,
     28.5257747353,
     29.732656227
    ],
    "humidity": [
     81.129682169,
     85.49997454300001,
     89.116085669
    ],
    "ph": [
     6.360870916600001,
     6.72395694037,
     7.1286876667
    ],
    "rainfall": [
     38.084893748,
     48.403600902899996,
     58.014432393
    ]
   },
   "blackgram": {
    "N": [
     21.9,
     40.02,
     57
    ],
    "P": [
     58,
     67.47,
     78
    ],
    "K": [
     15,
     19.24,
     24
    ],
    "temperature": [
     26.422765483,
     29.9733396789,
     33.863589898
    ],
    "humidity": [
     61.289770751,
     65.1184255887,
     68.781374054
    ],
    "ph": [
     6.5964432896,
     7.13395162948,
     7.5819628093
    ],
    "rainfall": [
     62.299877916,
     67.8841511832,
     73.59514189400001
    ]
   },
   "lentil": {
    "N": [
     3,
     18.77,
     36.10000000000001
    ],
    "P": [
     58.9,
     68.36,
     78.10000000000001
    ],
    "K": [
     15,
     19.41,
     23.10000000000001
    ],
    "temperature": [
     19.588740199,
     24.509052402600002,
     28.681952084000002
    ],
    "humidity": [
     60.845309224,
     64.8047846785,
     68.995409408
    ],
    "ph": [
     6.1668481027,
     6.927931571609999,
     7.6717562376
    ],
    "rainfall": [
     37.070846247,
     45.680454204,
     53.052232633
    ]
   },
   "pomegranate": {
    "N": [
     4,
     18.87,
     38.10000000000001
    ],
    "P": [
     7.9,
     18.75,
     27.10000000000001
    ],
    "K": [
     36,
     40.21,
     44
    ],
    "temperature": [
     18.905553903,
     21.837841721999997,
     24.638284181
    ],
    "humidity": [
     86.081489717,
     90.1255037895,
     94.264402049
    ],
    "ph": [
     5.7650714453,
     6.4291718411700005,
     7.0603976605000005
    ],
    "rainfall": [
     103.572921,
     107.52844239699999,
     111.28023195
    ]
   },
   "banana": {
    "N": [
     85,
     100.23,
     117
    ],
    "P": [
     72,
     82.01,
     92.10000000000001
    ],
    "K": [
     45,
     50.05,
     55
    ],
    "temperature": [
     25.358652907,
     27.3767983057,
     29.223474032000002
    ],
    "humidity": [
     76.525317734,
     80.35812258109999,
     84.17964014
    ],
    "ph": [
     5.6305060627,
     5.98389318024,
     6.3274521706
    ],
    "rainfall": [
     91.458490833,
     104.6269804001,
     117.60893731000002
    ]
   },
   "mango": {
    "N": [
     2.9000000000000004,
     20.07,
     37
    ],
    "P": [
     17,
     27.18,
     37
    ],
    "K": [
     26,
     29.92,
     34
    ],
    "temperature": [
     27.693996064,
     31.2087701513,
     35.37857906
    ],
    "humidity": [
     46.164863468,
     50.1565726953,
     53.753705113
    ],
    "ph": [
     4.7569307704,
     5.766372799660001,
     6.7797872361
    ],
    "rainfall": [
     90.29541934,
     94.70451504479999,
     98.86977709
    ]
   },
   "grapes": {
    "N": [
     6,
     23.18,
     39
    ],
    "P": [
     121.9,
     132.53,
     142
    ],
    "K": [
     195,
     200.11,
     204
    ],
    "temperature": [
     11.173053789999999,
     23.849575120049998,
     39.043203419
    ],
    "humidity": [
     80.277078367,
     81.8752275212,
     83.483021253
    ],
    "ph": [
     5.6195966734,
     6.025936681099999,
     6.4180723966999995
    ],
    "rainfall": [
     65.896795921,
     69.611828886,
     74.035372248
    ]
   },
   "watermelon": {
    "N": [
     83,
     99.42,
     118
    ],
    "P": [
     7,
     17,
     27
    ],
    "K": [
     45,
     50.22,
     55
    ],
    "temperature": [
     24.408997078,
     25.591767237499997,
     26.75044597
    ],
    "humidity": [
     80.986075993,
     85.16037529360001,
     89.138930307
    ],
    "ph": [
     6.11373009,
     6.49577830157,
     6.8835851935
    ],
    "rainfall": [
     42.832311361,
     50.7862189449,
     57.99113296
    ]
   },
   "muskmelon": {
    "N": [
     83,
     100.32,
     117
    ],
    "P": [
     7,
     17.72,
     26
    ],
    "K": [
     46,
     50.08,
     54.10000000000001
    ],
    "temperature": [
     27.419468188,
     28.663065756,
     29.789622646
    ],
    "humidity": [
     90.52574385999999,
     92.34280196089999,
     94.551914062
    ],
    "ph": [
     6.0845461888,
     6.35880545179,
     6.7042990368
    ],
    "rainfall": [
     21.016177768000002,
     24.689952066,
     28.710875214
    ]
   },
   "apple": {
    "N": [
     2,
     20.8,
     35
    ],
    "P": [
     122,
     134.22,
     144
    ],
    "K": [
     196,
     199.89,
     205
    ],
    "temperature": [
     21.25597291,
     22.6309424132,
     23.751419602000002
    ],
    "humidity": [
     90.445337192,
     92.3333828756,
     94.50888706900001
    ],
    "ph": [
     5.5955951403999995,
     5.929662931809999,
     6.2858106752000005
    ],
    "rainfall": [
     103.02978504,
     112.654779275,
     122.19905577
    ]
   },
   "orange": {
    "N": [
     4.9,
     19.58,
     37
    ],
    "P": [
     7,
     16.55,
     28.10000000000001
    ],
    "K": [
     6,
     10.01,
     14
    ],
    "temperature": [
     11.895962961,
     22.7657254967,
     32.327023568
    ],
    "humidity": [
     90.30684104299999,
     92.17020876340001,
     94.361338659
    ],
    "ph": [
     6.2485224825,
     7.01695745276,
     7.797822265700001
    ],
    "rainfall": [
     102.12321586,
     110.47496871999999,
     117.65861681000001
    ]
   },
   "papaya": {
    "N": [
     34,
     49.88,
     68
    ],
    "P": [
     48,
     59.05,
     68
    ],
    "K": [
     46,
     50.04,
     54
    ],
    "temperature": [
     24.855436935,
     33.7238587388,
     42.409464541000006
    ],
    "humidity": [
     90.551486512,
     92.4033876826,
     94.44566119
    ],
    "ph": [
     6.5511063518,
     6.74144237274,
     6.9652358515
    ],
    "rainfall": [
     62.205580519,
     142.6278388629,
     234.53163081
    ]
   },
   "coconut": {
    "N": [
     3,
     21.98,
     37
    ],
    "P": [
     6,
     16.93,
     29
    ],
    "K": [
     26,
     30.59,
     35
    ],
    "temperature": [
     25.549429328,
     27.4098921723,
     29.209457087
    ],
    "humidity": [
     91.398991596,
     94.84427180610001,
     98.63874584599999
    ],
    "ph": [
     5.5678205247,
     5.97656212619,
     6.3753983505
    ],
    "rainfall": [
     140.73171406,
     175.686645804,
     218.01305267
    ]
   },
   "cotton": {
    "N": [
     102,
     117.77,
     133
    ],
    "P": [
     37,
     46.24,
     57.10000000000001
    ],
    "K": [
     15,
     19.56,
     24
    ],
    "temperature": [
     22.448987129,
     23.988957895200002,
     25.531420513
    ],
    "humidity": [
     75.87219119,
     79.8434742538,
     84.148871254
    ],
    "ph": [
     6.1265982529,
     6.91267549578,
     7.8125669595
    ],
    "rainfall": [
     64.983752264,
     80.3980431193,
     93.661297336
    ]
   },
   "jute": {
    "N": [
     63,
     78.4,
     91
    ],
    "P": [
     38,
     46.86,
     57
    ],
    "K": [
     35,
     39.99,
     44
    ],
    "temperature": [
     23.278312402,
     24.9583758265,
     26.568327172
    ],
    "humidity": [
     72.225021872,
     79.6398642063,
     87.89262800600001
    ],
    "ph": [
     6.1280705515000005,
     6.7327775681699995,
     7.3197571481
    ],
    "rainfall": [
     153.73416794,
     174.792797536,
     194.06580039000002
    ]
   },
   "coffee": {
    "N": [
     83.9,
     101.2,
     117
    ],
    "P": [
     18,
     28.74,
     39
    ],
    "K": [
     26,
     29.94,
     35
    ],
    "temperature": [
     23.406856838,
     25.5404768193,
     27.537632266
    ],
    "humidity": [
     52.108607146,
     58.869846300300004,
     67.436826029
    ],
    "ph": [
     6.1350374719000005,
     6.79030827457,
     7.289694116300001
    ],
    "rainfall": [
     122.82382806,
     158.066294882,
     192.72827946
    ]
   }
  },
  "samples": [
   {
    "N": 44,
    "P": 63,
    "K": 15,
    "temperature": 26.42333018,
    "humidity": 64.51136845,
    "ph": 7.338929556,
    "rainfall": 63.46546487,
    "label": "blackgram"
   },
   {
    "N": 24,
    "P": 21,
    "K": 42,
    "temperature": 20.82210727,
    "humidity": 87.22815682,
    "ph": 6.999014379,
    "rainfall": 109.4429934,
    "label": "pomegranate"
   },
   {
    "N": 2,
    "P": 24,
    "K": 38,
    "temperature": 24.55981624,
    "humidity": 91.63536236,
    "ph": 5.922935513,
    "rainfall": 111.9684622,
    "label": "pomegranate"
   },
   {
    "N": 31,
    "P": 6,
    "K": 26,
    "temperature": 29.12859129,
    "humidity": 91.30924833,
    "ph": 5.741367375,
    "rainfall": 157.2388553,
    "label": "coconut"
   },
   {
    "N": 13,
    "P": 57,
    "K": 25,
    "temperature": 28.30041493,
    "humidity": 86.20681554,
    "ph": 6.86308576,
    "rainfall": 50.47333854,
    "label": "mungbean"
   },
   {
    "N": 11,
    "P": 72,
    "K": 22,
    "temperature": 29.37735586,
    "humidity": 44.82294584,
    "ph": 6.842744374,
    "rainfall": 172.40168,
    "label": "pigeonpeas"
   },
   {
    "N": 82,
    "P": 24,
    "K": 33,
    "temperature": 26.53543168,
    "humidity": 67.09608099,
    "ph": 6.809593554,
    "rainfall": 120.6494434,
    "label": "coffee"
   },
   {
    "N": 4,
    "P": 59,
    "K": 25,
    "temperature": 27.68515114,
    "humidity": 81.94268594,
    "ph": 6.227134139,
    "rainfall": 54.62243308,
    "label": "mungbean"
   },
   {
    "N": 17,
    "P": 29,
    "K": 26,
    "temperature": 26.14162144,
    "humidity": 93.28415295,
    "ph": 6.071897347,
    "rainfall": 195.4115025,
    "label": "coconut"
   },
   {
    "N": 11,
    "P": 36,
    "K": 31,
    "temperature": 27.92063282,
    "humidity": 51.77965917,
    "ph": 6.47544932,
    "rainfall": 100.2585673,
    "label": "mango"
   },
   {
    "N": 82,
    "P": 75,
    "K": 55,
    "temperature": 27.34585147,
    "humidity": 78.4873835,
    "ph": 6.281069505,
    "rainfall": 92.15524332,
    "label": "banana"
   },
   {
    "N": 14,
    "P": 5,
    "K": 36,
    "temperature": 24.92639065,
    "humidity": 85.19098079,
    "ph": 5.832525853,
    "rainfall": 104.7693804,
    "label": "pomegranate"
   },
   {
    "N": 104,
    "P": 26,
    "K": 30,
    "temperature": 24.40726724,
    "humidity": 62.65692638,
    "ph": 6.410992833,
    "rainfall": 148.6977358,
    "label": "coffee"
   },
   {
    "N": 48,
    "P": 62,
    "K": 47,
    "temperature": 25.34756111,
    "humidity": 93.02871078,
    "ph": 6.803094965,
    "rainfall": 174.4012337,
    "label": "papaya"
   },
   {
    "N": 21,
    "P": 135,
    "K": 198,
    "temperature": 23.86087054,
    "humidity": 94.92048112,
    "ph": 5.765015126,
    "rainfall": 105.0241329,
    "label": "apple"
   },
   {
    "N": 74,
    "P": 54,
    "K": 38,
    "temperature": 25.65553461,
    "humidity": 83.47021081,
    "ph": 7.120272972,
    "rainfall": 217.3788583,
    "label": "rice"
   },
   {
    "N": 0,
    "P": 49,
    "K": 18,
    "temperature": 29.68361658,
    "humidity": 87.93598094,
    "ph": 6.990095452,
    "rainfall": 41.82490236,
    "label": "mungbean"
   },
   {
    "N": 136,
    "P": 36,
    "K": 24,
    "temperature": 22.74446976,
    "humidity": 80.41198458,
    "ph": 7.59781958,
    "rainfall": 90.07326633,
    "label": "cotton"
   },
   {
    "N": 16,
    "P": 71,
    "K": 24,
    "temperature": 18.33124824,
    "humidity": 38.40975482,
    "ph": 4.946369874,
    "rainfall": 139.6483317,
    "label": "pigeonpeas"
   },
   {
    "N": 1,
    "P": 12,
    "K": 30,
    "temperature": 27.754298,
    "humidity": 95.94643831,
    "ph": 5.56222383,
    "rainfall": 131.0900076,
    "label": "coconut"
   },
   {
    "N": 100,
    "P": 80,
    "K": 52,
    "temperature": 27.53911354,
    "humidity": 77.25629897,
    "ph": 6.049801781,
    "rainfall": 110.3262123,
    "label": "banana"
   },
   {
    "N": 83,
    "P": 38,
    "K": 35,
    "temperature": 25.70822684,
    "humidity": 52.88667115,
    "ph": 7.18915558,
    "rainfall": 136.7325092,
    "label": "coffee"
   },
   {
    "N": 40,
    "P": 79,
    "K": 17,
    "temperature": 21.12695586,
    "humidity": 63.18738532,
    "ph": 6.403683619,
    "rainfall": 38.71834464,
    "label": "lentil"
   },
   {
    "N": 56,
    "P": 58,
    "K": 49,
    "temperature": 37.13165026,
    "humidity": 94.60761797,
    "ph": 6.69215564,
    "rainfall": 172.4788062,
    "label": "papaya"
   },
   {
    "N": 86,
    "P": 36,
    "K": 24,
    "temperature": 26.54986394,
    "humidity": 72.89187265,
    "ph": 5.787268394,
    "rainfall": 73.33636055,
    "label": "maize"
   },
   {
    "N": 82,
    "P": 18,
    "K": 48,
    "temperature": 29.09588297,
    "humidity": 94.16748386,
    "ph": 6.159050816,
    "rainfall": 26.70581328,
    "label": "muskmelon"
   },
   {
    "N": 15,
    "P": 11,
    "K": 38,
    "temperature": 23.12808226,
    "humidity": 92.68328358,
    "ph": 6.630646083,
    "rainfall": 109.3930157,
    "label": "pomegranate"
   },
   {
    "N": 2,
    "P": 36,
    "K": 31,
    "temperature": 30.90225239,
    "humidity": 49.95955487,
    "ph": 5.73171945,
    "rainfall": 91.77522598,
    "label": "mango"
   },
   {
    "N": 24,
    "P": 140,
    "K": 205,
    "temperature": 12.087022,
    "humidity": 83.59398734,
    "ph": 5.93202852,
    "rainfall": 68.66813363,
    "label": "grapes"
   },
   {
    "N": 34,
    "P": 60,
    "K": 16,
    "temperature": 31.35730791,
    "humidity": 64.24992106,
    "ph": 7.322555223,
    "rainfall": 63.85668948,
    "label": "blackgram"
   },
   {
    "N": 91,
    "P": 55,
    "K": 15,
    "temperature": 18.09300227,
    "humidity": 72.61024172,
    "ph": 6.376651091,
    "rainfall": 78.96159541,
    "label": "maize"
   },
   {
    "N": 62,
    "P": 59,
    "K": 41,
    "temperature": 24.2248758,
    "humidity": 74.89465426,
    "ph": 7.175170657,
    "rainfall": 192.4931257,
    "label": "jute"
   },
   {
    "N": 40,
    "P": 30,
    "K": 35,
    "temperature": 20.89273273,
    "humidity": 91.07776977,
    "ph": 6.269663963,
    "rainfall": 104.4407083,
    "label": "pomegranate"
   },
   {
    "N": 109,
    "P": 91,
    "K": 53,
    "temperature": 29.66727337,
    "humidity": 83.51014178,
    "ph": 6.010095853,
    "rainfall": 110.2511102,
    "label": "banana"
   },
   {
    "N": 107,
    "P": 38,
    "K": 29,
    "temperature": 26.65069302,
    "humidity": 57.56695719,
    "ph": 6.35118177,
    "rainfall": 145.105065,
    "label": "coffee"
   },
   {
    "N": 22,
    "P": 55,
    "K": 20,
    "temperature": 33.95309131,
    "humidity": 69.96100028,
    "ph": 7.423530351,
    "rainfall": 61.16350463,
    "label": "blackgram"
   },
   {
    "N": 30,
    "P": 70,
    "K": 79,
    "temperature": 20.26942271,
    "humidity": 19.96978871,
    "ph": 7.313122235,
    "rainfall": 69.64449182,
    "label": "chickpea"
   },
   {
    "N": 12,
    "P": 142,
    "K": 203,
    "temperature": 31.3115978,
    "humidity": 82.56407013,
    "ph": 5.972850838,
    "rainfall": 65.01095312,
    "label": "grapes"
   },
   {
    "N": 19,
    "P": 57,
    "K": 23,
    "temperature": 23.6734328,
    "humidity": 47.2879691,
    "ph": 7.342409555,
    "rainfall": 141.1250722,
    "label": "pigeonpeas"
   },
   {
    "N": 97,
    "P": 25,
    "K": 50,
    "temperature": 26.22005978,
    "humidity": 80.90127035,
    "ph": 6.093814669,
    "rainfall": 49.08553937,
    "label": "watermelon"
   }
  ]
 },
 "fertilizer": {
  "fields": [
   {
    "key": "Temperature",
    "label": "Temperature",
    "unit": "°C",
    "step": 0.5,
    "min": 4,
    "max": 55,
    "default": 26
   },
   {
    "key": "Moisture",
    "label": "Soil moisture",
    "unit": "fraction",
    "step": 0.01,
    "min": 0.22,
    "max": 0.98,
    "default": 0.6
   },
   {
    "key": "Rainfall",
    "label": "Rainfall",
    "unit": "mm",
    "step": 1,
    "min": 0,
    "max": 363,
    "default": 96
   },
   {
    "key": "PH",
    "label": "Soil pH",
    "unit": "",
    "step": 0.1,
    "min": 3.9000000000000004,
    "max": 8.9,
    "default": 6.300000000000001
   },
   {
    "key": "Nitrogen",
    "label": "Nitrogen",
    "unit": "kg/ha",
    "step": 1,
    "min": 35,
    "max": 95,
    "default": 59
   },
   {
    "key": "Phosphorous",
    "label": "Phosphorus",
    "unit": "kg/ha",
    "step": 1,
    "min": 0,
    "max": 178,
    "default": 58
   },
   {
    "key": "Potassium",
    "label": "Potassium",
    "unit": "kg/ha",
    "step": 1,
    "min": 0,
    "max": 160,
    "default": 59
   },
   {
    "key": "Carbon",
    "label": "Soil carbon",
    "unit": "%",
    "step": 0.05,
    "min": 0,
    "max": 3.25,
    "default": 1.4500000000000002
   }
  ],
  "categories": {
   "Soil": [
    "Acidic",
    "Alkaline",
    "Loamy",
    "Neutral",
    "Peaty"
   ],
   "Crop": [
    "adzuki beans",
    "apple",
    "banana",
    "black gram",
    "chickpea",
    "coconut",
    "coffee",
    "cotton",
    "grapes",
    "ground nut",
    "jute",
    "kidney beans",
    "lentil",
    "maize",
    "mango",
    "millet",
    "moth beans",
    "mung bean",
    "muskmelon",
    "orange",
    "papaya",
    "peas",
    "pigeon peas",
    "pomegranate",
    "rice",
    "rubber",
    "sugarcane",
    "tea",
    "tobacco",
    "watermelon",
    "wheat"
   ]
  },
  "profiles": {
   "Compost": {
    "Temperature": [
     19.844397328,
     27.109688526245332,
     34.538097336
    ],
    "Moisture": [
     0.4196088864,
     0.5941078151146667,
     0.7654219626000001
    ],
    "Rainfall": [
     42.22773161,
     116.05443683856267,
     204.15971728000002
    ],
    "PH": [
     6.1944109478,
     6.736333575095999,
     7.368875567800001
    ],
    "Nitrogen": [
     54.700099518,
     63.819650416293335,
     75.526724256
    ],
    "Phosphorous": [
     56.068389962,
     96.81717059981334,
     148.57310126
    ],
    "Potassium": [
     53.43001161,
     88.28422978405334,
     145.4078102
    ],
    "Carbon": [
     -0.06911023840000077,
     0.6415572336453333,
     0.9567353306
    ]
   },
   "Balanced NPK Fertilizer": {
    "Temperature": [
     19.382999736,
     28.622643451363057,
     44.870584046
    ],
    "Moisture": [
     0.7067985218,
     0.7594271202292994,
     0.8058027156
    ],
    "Rainfall": [
     40.612524104,
     115.83974466968154,
     215.31307756000004
    ],
    "PH": [
     6.573611887,
     6.976225653681528,
     7.3183372140000005
    ],
    "Nitrogen": [
     53.342331918,
     63.5206423366879,
     76.695148464
    ],
    "Phosphorous": [
     73.762218026,
     118.27186473273886,
     152.60237587999998
    ],
    "Potassium": [
     60.988191324,
     109.44580743312102,
     148.76599896
    ],
    "Carbon": [
     1.0969474308,
     1.7451168202420384,
     2.2889648312
    ]
   },
   "Water Retaining Fertilizer": {
    "Temperature": [
     19.010893484,
     27.143899590425182,
     35.666460142000005
    ],
    "Moisture": [
     0.4050630418,
     0.5353027424548148,
     0.6675179528
    ],
    "Rainfall": [
     41.006863622000004,
     106.06796596836148,
     187.95051482000002
    ],
    "PH": [
     6.1923676668,
     6.734255330274074,
     7.3305030274
    ],
    "Nitrogen": [
     54.093771042,
     62.47205255731852,
     73.41871223400001
    ],
    "Phosphorous": [
     56.578833572,
     96.30923931748148,
     148.05353432
    ],
    "Potassium": [
     55.00922817,
     88.70139726668148,
     144.00409958
    ],
    "Carbon": [
     1.136397409,
     1.7811954655629632,
     2.3909613662
    ]
   },
   "Organic Fertilizer": {
    "Temperature": [
     19.946149769999998,
     26.311713231452632,
     31.985835576000003
    ],
    "Moisture": [
     0.7136172264,
     0.7721534217368422,
     0.8309637222
    ],
    "Rainfall": [
     47.673634502,
     135.7801945287263,
     251.20038696000006
    ],
    "PH": [
     6.062404733199999,
     6.508885927094736,
     7.5514291034
    ],
    "Nitrogen": [
     53.697570754,
     65.28635865894736,
     79.17672902800001
    ],
    "Phosphorous": [
     54.282644672,
     68.016682758,
     78.72669054
    ],
    "Potassium": [
     51.776461876,
     68.47252174968422,
     95.46036327000002
    ],
    "Carbon": [
     1.2187983524,
     1.791263439894737,
     2.4492381908
    ]
   },
   "Gypsum": {
    "Temperature": [
     22.769444136999997,
     29.79475116653846,
     34.932234916
    ],
    "Moisture": [
     0.4243696327,
     0.5990077033269231,
     0.7758395291
    ],
    "Rainfall": [
     46.126189905,
     101.26016869384615,
     186.31419935999998
    ],
    "PH": [
     8.1461544582,
     8.627858567403846,
     8.82843282
    ],
    "Nitrogen": [
     55.776211541,
     62.484670152115385,
     70.02649375
    ],
    "Phosphorous": [
     51.667284779,
     85.63980047884615,
     154.26029201
    ],
    "Potassium": [
     52.430539059,
     76.02078388653845,
     141.80300047
    ],
    "Carbon": [
     0.5633679705,
     1.511553504596154,
     2.3946161343
    ]
   },
   "Lime": {
    "Temperature": [
     20.96122007,
     26.581572768254144,
     31.00976199
    ],
    "Moisture": [
     0.434148748,
     0.6049058742154696,
     0.778839494
    ],
    "Rainfall": [
     62.54211536,
     133.1370754748066,
     226.3170315
    ],
    "PH": [
     3.908612908,
     5.493323294657459,
     5.957467026
    ],
    "Nitrogen": [
     56.44651673,
     66.94850826972376,
     80.69527087
    ],
    "Phosphorous": [
     51.2563989,
     69.27693179469613,
     100.8794867
    ],
    "Potassium": [
     51.68268147,
     67.16276545906076,
     83.66387919
    ],
    "Carbon": [
     0.602747049,
     1.5129412766408838,
     2.362647797
    ]
   },
   "DAP": {
    "Temperature": [
     17.683791531,
     27.08551831337666,
     42.48345927200001
    ],
    "Moisture": [
     0.4307925109,
     0.5958931798358634,
     0.7761530477
    ],
    "Rainfall": [
     43.98007423,
     121.75453057321631,
     238.07390967
    ],
    "PH": [
     4.7116730487,
     5.970150371071157,
     7.777020387000001
    ],
    "Nitrogen": [
     51.51473452,
     61.47201514204934,
     75.827509305
    ],
    "Phosphorous": [
     23.479529981,
     33.60127828936432,
     48.012700848
    ],
    "Potassium": [
     41.326810543,
     56.50803748485768,
     71.63737030400002
    ],
    "Carbon": [
     0.6280365966000001,
     1.4796676872950663,
     2.3318861865000002
    ]
   },
   "Urea": {
    "Temperature": [
     16.509261006,
     28.68079221745455,
     48.11340045800001
    ],
    "Moisture": [
     0.4095038415,
     0.6141125081688311,
     0.8007724031000001
    ],
    "Rainfall": [
     30.593302471,
     84.59245900765585,
     180.1847253400001
    ],
    "PH": [
     5.490914925799999,
     6.567659954019481,
     7.721784218000001
    ],
    "Nitrogen": [
     35.52771842,
     42.33498195194805,
     49.626937683
    ],
    "Phosphorous": [
     30.610285776,
     63.607387355,
     134.77791778
    ],
    "Potassium": [
     41.286488307999996,
     64.35630996941559,
     113.34126059000005
    ],
    "Carbon": [
     0.7023632483,
     1.5206787320194806,
     2.4060548498000007
    ]
   },
   "Muriate of Potash": {
    "Temperature": [
     19.224179765000002,
     27.095672608042943,
     33.505516015
    ],
    "Moisture": [
     0.4294308215,
     0.6001526444079754,
     0.763954501
    ],
    "Rainfall": [
     19.96662366,
     73.49881172298159,
     133.7489521
    ],
    "PH": [
     5.538385744999999,
     6.273911781665644,
     7.5051058145
    ],
    "Nitrogen": [
     52.661647375,
     58.31105540239264,
     65.029675145
    ],
    "Phosphorous": [
     52.22751573,
     77.09208148972392,
     141.06288425000002
    ],
    "Potassium": [
     -20.50910839,
     35.88462403251533,
     49.25647185
    ],
    "Carbon": [
     0.6575267105,
     1.4925185979233129,
     2.362789296
    ]
   },
   "General Purpose Fertilizer": {
    "Temperature": [
     20.54478151,
     29.03243727,
     38.48502069
    ],
    "Moisture": [
     0.706040656,
     0.8623036016451613,
     0.972361206
    ],
    "Rainfall": [
     20.73019635,
     106.27831215258065,
     200.5244807
    ],
    "PH": [
     6.152069896,
     6.443582777451613,
     6.753936977
    ],
    "Nitrogen": [
     54.73142417,
     64.51489027709677,
     74.79939362
    ],
    "Phosphorous": [
     55.79241258,
     65.34492772322581,
     79.38361993
    ],
    "Potassium": [
     54.04429373,
     70.6269695051613,
     88.89948312
    ],
    "Carbon": [
     1.031886795,
     1.6323851476451612,
     2.314584309
    ]
   }
  },
  "remarks": {
   "Balanced NPK Fertilizer": "Provides a balanced mix of nitrogen, phosphorus, and potassium for loamy soils. Prefer this for general-purpose fertilization in well-structured soils.",
   "Compost": "Enhances organic matter and improves soil structure. Prefer this for low-carbon soils to boost soil health naturally.",
   "DAP": "Rich in phosphorus, essential for root development. Prefer this for phosphorus-deficient soils to improve plant establishment.",
   "General Purpose Fertilizer": "Suitable for general use across various soil and crop types. Prefer this when no specific deficiency is detected.",
   "Gypsum": "Corrects alkaline soil, adds calcium and sulfur. Prefer this to lower soil pH and enhance soil structure.",
   "Lime": "Neutralizes acidic soil and improves pH balance. Prefer this to correct low soil pH, improving nutrient availability.",
   "Muriate of Potash": "High potassium content, improves fruit and flower quality. Prefer this for potassium-deficient soils to enhance crop productivity.",
   "Organic Fertilizer": "Enhances fertility naturally, ideal for peaty soils. Prefer this to improve soil fertility while maintaining organic farming practices.",
   "Urea": "Provides high nitrogen, ideal for rapid leafy growth. Prefer this for nitrogen-deficient soils as it supports vegetative growth.",
   "Water Retaining Fertilizer": "Improves water retention in dry soils. Prefer this for soils with low moisture to prevent water stress in plants."
  },
  "samples": [
   {
    "Temperature": 22.52841743,
    "Moisture": 0.792463494,
    "Rainfall": 249.2899971,
    "PH": 5.242213908,
    "Nitrogen": 74.4017201,
    "Phosphorous": 30.29786725,
    "Potassium": 58.49540264,
    "Carbon": 2.091472486,
    "Soil": "Peaty",
    "Crop": "rubber",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 27.10402534,
    "Moisture": 0.698666778,
    "Rainfall": 87.94817195,
    "PH": 5.658669168,
    "Nitrogen": 54.74288667,
    "Phosphorous": -37.64973873,
    "Potassium": 46.48610533,
    "Carbon": 1.117903579,
    "Soil": "Acidic",
    "Crop": "tobacco",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 25.06090279,
    "Moisture": 0.648249181,
    "Rainfall": 58.3454809,
    "PH": 7.184989439,
    "Nitrogen": 56.16467721,
    "Phosphorous": 115.4118238,
    "Potassium": 76.43397995,
    "Carbon": 1.320795335,
    "Soil": "Loamy",
    "Crop": "lentil",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 39.42115572,
    "Moisture": 0.724773125,
    "Rainfall": 129.8398763,
    "PH": 6.845112227,
    "Nitrogen": 72.60175055,
    "Phosphorous": 133.7351046,
    "Potassium": 110.9652593,
    "Carbon": 0.712706784,
    "Soil": "Loamy",
    "Crop": "papaya",
    "Fertilizer": "Compost"
   },
   {
    "Temperature": 22.88531361,
    "Moisture": 0.592075771,
    "Rainfall": 117.7120748,
    "PH": 6.400163417,
    "Nitrogen": 57.70458324,
    "Phosphorous": 82.23125322,
    "Potassium": 64.5282984,
    "Carbon": -0.280559958,
    "Soil": "Acidic",
    "Crop": "orange",
    "Fertilizer": "Compost"
   },
   {
    "Temperature": 24.50147423,
    "Moisture": 0.45419448,
    "Rainfall": 92.08641666,
    "PH": 5.42245436,
    "Nitrogen": 54.70423513,
    "Phosphorous": 30.71338264,
    "Potassium": 34.51072377,
    "Carbon": 1.152486989,
    "Soil": "Acidic",
    "Crop": "moth beans",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 52.71331909,
    "Moisture": 0.71231168,
    "Rainfall": 121.5734487,
    "PH": 5.49688573,
    "Nitrogen": 72.0778236,
    "Phosphorous": 177.3144812,
    "Potassium": -20.50910839,
    "Carbon": 0.647958653,
    "Soil": "Acidic",
    "Crop": "adzuki beans",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 23.7288909,
    "Moisture": 0.646531169,
    "Rainfall": 377.0250926,
    "PH": 5.230603291,
    "Nitrogen": 81.34109546,
    "Phosphorous": 37.44828616,
    "Potassium": 66.40718991,
    "Carbon": 1.219952461,
    "Soil": "Acidic",
    "Crop": "rubber",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 12.18706571,
    "Moisture": 0.825152187,
    "Rainfall": 67.78176353,
    "PH": 6.149029584,
    "Nitrogen": 55.30267998,
    "Phosphorous": 57.73241399,
    "Potassium": 49.16270827,
    "Carbon": 1.096469039,
    "Soil": "Peaty",
    "Crop": "grapes",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 29.94952892,
    "Moisture": 0.479999761,
    "Rainfall": 27.20223155,
    "PH": 6.623758096,
    "Nitrogen": 55.6126676,
    "Phosphorous": 134.2243298,
    "Potassium": -20.50910839,
    "Carbon": 1.07281605,
    "Soil": "Neutral",
    "Crop": "muskmelon",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 44.45708425,
    "Moisture": 0.58956264,
    "Rainfall": 306.0816006,
    "PH": 6.537771896,
    "Nitrogen": 49.80314916,
    "Phosphorous": 47.97327756,
    "Potassium": 61.95756872,
    "Carbon": 1.073023762,
    "Soil": "Acidic",
    "Crop": "millet",
    "Fertilizer": "Urea"
   },
   {
    "Temperature": 27.68168975,
    "Moisture": 0.614300748,
    "Rainfall": 41.65602408,
    "PH": 6.385966825,
    "Nitrogen": 56.16360136,
    "Phosphorous": 51.31722779,
    "Potassium": 57.04148512,
    "Carbon": 2.03855146,
    "Soil": "Acidic",
    "Crop": "mung bean",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 30.92390632,
    "Moisture": 0.474242396,
    "Rainfall": 110.3912888,
    "PH": 6.263780473,
    "Nitrogen": 59.91092105,
    "Phosphorous": 54.92840907,
    "Potassium": 62.38150385,
    "Carbon": 1.944726478,
    "Soil": "Acidic",
    "Crop": "ground nut",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 22.29584341,
    "Moisture": 0.532747896,
    "Rainfall": 108.5442494,
    "PH": 5.923067428,
    "Nitrogen": 65.63551639,
    "Phosphorous": 54.84459402,
    "Potassium": 55.80155901,
    "Carbon": 1.416627601,
    "Soil": "Acidic",
    "Crop": "apple",
    "Fertilizer": "Lime"
   },
   {
    "Temperature": 27.43479291,
    "Moisture": 0.479723678,
    "Rainfall": 116.1536281,
    "PH": 5.38278794,
    "Nitrogen": 70.29774698,
    "Phosphorous": 177.3144812,
    "Potassium": 159.5640307,
    "Carbon": 1.74224489,
    "Soil": "Acidic",
    "Crop": "coconut",
    "Fertilizer": "Lime"
   },
   {
    "Temperature": 19.72325857,
    "Moisture": 0.596857891,
    "Rainfall": 48.49960007,
    "PH": 7.108540608,
    "Nitrogen": 54.17896167,
    "Phosphorous": 92.18464839,
    "Potassium": 61.66534006,
    "Carbon": 1.887158784,
    "Soil": "Loamy",
    "Crop": "lentil",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 42.88882865,
    "Moisture": 0.368288745,
    "Rainfall": 87.86776443,
    "PH": 6.48697381,
    "Nitrogen": 72.65320353,
    "Phosphorous": 83.96531566,
    "Potassium": 62.87422946,
    "Carbon": 2.511427743,
    "Soil": "Neutral",
    "Crop": "papaya",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 44.85882729,
    "Moisture": 0.75503306,
    "Rainfall": 226.5645419,
    "PH": 6.925164707,
    "Nitrogen": 94.44874864,
    "Phosphorous": 115.0434978,
    "Potassium": 126.2062655,
    "Carbon": 2.425331873,
    "Soil": "Loamy",
    "Crop": "papaya",
    "Fertilizer": "Balanced NPK Fertilizer"
   },
   {
    "Temperature": 51.27462969,
    "Moisture": 0.736488453,
    "Rainfall": 136.6333164,
    "PH": 8.82843282,
    "Nitrogen": 67.40973029,
    "Phosphorous": 31.87717968,
    "Potassium": 51.32636195,
    "Carbon": 1.902952411,
    "Soil": "Peaty",
    "Crop": "adzuki beans",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 32.99469103,
    "Moisture": 0.668530463,
    "Rainfall": 123.4692524,
    "PH": 6.139179891,
    "Nitrogen": 62.7866559,
    "Phosphorous": 79.92205846,
    "Potassium": 62.39371071,
    "Carbon": 1.848494487,
    "Soil": "Peaty",
    "Crop": "ground nut",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 30.5162132,
    "Moisture": 0.708082723,
    "Rainfall": 195.1839096,
    "PH": 5.974269288,
    "Nitrogen": 78.07494684,
    "Phosphorous": 58.39721421,
    "Potassium": 65.38645885,
    "Carbon": 1.411245641,
    "Soil": "Peaty",
    "Crop": "coconut",
    "Fertilizer": "Lime"
   },
   {
    "Temperature": 22.86630132,
    "Moisture": 0.616513034,
    "Rainfall": 39.56630335,
    "PH": 6.36691013,
    "Nitrogen": 49.26241924,
    "Phosphorous": 62.13160101,
    "Potassium": -20.50910839,
    "Carbon": 0.674180396,
    "Soil": "Acidic",
    "Crop": "lentil",
    "Fertilizer": "Urea"
   },
   {
    "Temperature": 24.98564484,
    "Moisture": 0.442355038,
    "Rainfall": 182.2431193,
    "PH": 4.757012776,
    "Nitrogen": 67.03097115,
    "Phosphorous": 23.21299185,
    "Potassium": 47.72786027,
    "Carbon": 0.548641068,
    "Soil": "Acidic",
    "Crop": "tea",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 31.66304982,
    "Moisture": 0.582018256,
    "Rainfall": 128.0627062,
    "PH": 6.616262961,
    "Nitrogen": 63.21690039,
    "Phosphorous": 58.84839396,
    "Potassium": 84.83929666,
    "Carbon": 2.301456833,
    "Soil": "Acidic",
    "Crop": "ground nut",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 19.44057444,
    "Moisture": 0.694843164,
    "Rainfall": 48.01789909,
    "PH": 6.720911205,
    "Nitrogen": 51.26189804,
    "Phosphorous": 177.3144812,
    "Potassium": 47.61640076,
    "Carbon": 2.143963522,
    "Soil": "Loamy",
    "Crop": "peas",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 14.694763,
    "Moisture": 0.452172501,
    "Rainfall": 44.19592528,
    "PH": 6.229589494,
    "Nitrogen": 50.28313965,
    "Phosphorous": 25.19990413,
    "Potassium": 42.80652814,
    "Carbon": -0.280559958,
    "Soil": "Acidic",
    "Crop": "peas",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 22.2777865,
    "Moisture": 0.493737236,
    "Rainfall": 105.4834095,
    "PH": 6.784491024,
    "Nitrogen": 57.09062718,
    "Phosphorous": 114.9975066,
    "Potassium": 97.05021204,
    "Carbon": 2.268553135,
    "Soil": "Neutral",
    "Crop": "wheat",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 29.5875008,
    "Moisture": 0.707811807,
    "Rainfall": 110.1728025,
    "PH": 6.348976606,
    "Nitrogen": 66.69303566,
    "Phosphorous": 79.30653704,
    "Potassium": 68.13189885,
    "Carbon": 0.495703405,
    "Soil": "Acidic",
    "Crop": "orange",
    "Fertilizer": "Compost"
   },
   {
    "Temperature": 20.25020963,
    "Moisture": 0.726292975,
    "Rainfall": 76.96215776,
    "PH": 5.853353802,
    "Nitrogen": 54.04301613,
    "Phosphorous": 52.68187906,
    "Potassium": 44.76894289,
    "Carbon": 0.815642105,
    "Soil": "Acidic",
    "Crop": "tobacco",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 24.35267701,
    "Moisture": 0.589526901,
    "Rainfall": 116.1951491,
    "PH": 5.933667929,
    "Nitrogen": 61.88805602,
    "Phosphorous": 71.57117506,
    "Potassium": 57.58041402,
    "Carbon": 0.688686846,
    "Soil": "Acidic",
    "Crop": "apple",
    "Fertilizer": "Lime"
   },
   {
    "Temperature": 31.03584201,
    "Moisture": 0.534621231,
    "Rainfall": 59.77108557,
    "PH": 6.052727546,
    "Nitrogen": 57.35904529,
    "Phosphorous": 50.51000156,
    "Potassium": 51.45519794,
    "Carbon": 1.728261929,
    "Soil": "Acidic",
    "Crop": "lentil",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 26.3833378,
    "Moisture": 0.503904064,
    "Rainfall": 75.16666193,
    "PH": 6.031294799,
    "Nitrogen": 55.34645877,
    "Phosphorous": 45.69975932,
    "Potassium": 52.49552757,
    "Carbon": 1.187596165,
    "Soil": "Acidic",
    "Crop": "tobacco",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 30.76145452,
    "Moisture": 0.606816211,
    "Rainfall": 122.3153856,
    "PH": 6.784963659,
    "Nitrogen": 67.05287096,
    "Phosphorous": 153.1455908,
    "Potassium": 138.5052327,
    "Carbon": 2.14174906,
    "Soil": "Neutral",
    "Crop": "sugarcane",
    "Fertilizer": "Water Retaining Fertilizer"
   },
   {
    "Temperature": 26.17297107,
    "Moisture": 0.417800439,
    "Rainfall": 306.0816006,
    "PH": 5.795535416,
    "Nitrogen": 53.86505682,
    "Phosphorous": -37.64973873,
    "Potassium": 49.82037554,
    "Carbon": 0.837449255,
    "Soil": "Acidic",
    "Crop": "maize",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 23.63460742,
    "Moisture": 0.370747545,
    "Rainfall": 188.8361697,
    "PH": 7.453900434,
    "Nitrogen": 70.828746,
    "Phosphorous": 99.19686388,
    "Potassium": 111.6888712,
    "Carbon": 0.800174949,
    "Soil": "Neutral",
    "Crop": "jute",
    "Fertilizer": "Compost"
   },
   {
    "Temperature": 27.15041623,
    "Moisture": 0.610769385,
    "Rainfall": 36.70517265,
    "PH": 6.406206914,
    "Nitrogen": 56.75973583,
    "Phosphorous": 79.62017443,
    "Potassium": 43.97501309,
    "Carbon": 2.088094934,
    "Soil": "Loamy",
    "Crop": "lentil",
    "Fertilizer": "Muriate of Potash"
   },
   {
    "Temperature": 29.8671244,
    "Moisture": 0.427645544,
    "Rainfall": 64.09787405,
    "PH": 5.543996178,
    "Nitrogen": 59.77947861,
    "Phosphorous": 25.96377295,
    "Potassium": 55.2647006,
    "Carbon": 0.605830494,
    "Soil": "Acidic",
    "Crop": "mango",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 23.34190238,
    "Moisture": 0.434553823,
    "Rainfall": 263.5961562,
    "PH": 4.813625929,
    "Nitrogen": 70.09978585,
    "Phosphorous": 41.69610331,
    "Potassium": 44.76233627,
    "Carbon": 1.196675737,
    "Soil": "Acidic",
    "Crop": "tea",
    "Fertilizer": "DAP"
   },
   {
    "Temperature": 50.17984508,
    "Moisture": 0.410703422,
    "Rainfall": 130.7665901,
    "PH": 7.470403924,
    "Nitrogen": 68.7861082,
    "Phosphorous": 96.98976975,
    "Potassium": 75.92471287,
    "Carbon": 0.908326256,
    "Soil": "Neutral",
    "Crop": "orange",
    "Fertilizer": "Compost"
   },
   {
    "Temperature": 30.21698482,
    "Moisture": 0.393426631,
    "Rainfall": 236.5919711,
    "PH": 5.490792056,
    "Nitrogen": 77.71790094,
    "Phosphorous": 48.79611203,
    "Potassium": 65.73474825,
    "Carbon": 1.121015865,
    "Soil": "Acidic",
    "Crop": "rubber",
    "Fertilizer": "DAP"
   }
  ]
 },
 "yield": {
  "fields": [
   {
    "key": "Soil_pH",
    "label": "Soil pH",
    "unit": "",
    "step": 0.1,
    "min": 5.5,
    "max": 8,
    "default": 6.5
   },
   {
    "key": "Temperature",
    "label": "Temperature",
    "unit": "°C",
    "step": 0.5,
    "min": 4,
    "max": 45.5,
    "default": 23
   },
   {
    "key": "Humidity",
    "label": "Relative humidity",
    "unit": "%",
    "step": 1,
    "min": 54,
    "max": 80,
    "default": 77
   },
   {
    "key": "Wind_Speed",
    "label": "Wind speed",
    "unit": "km/h",
    "step": 0.5,
    "min": 2,
    "max": 18,
    "default": 10
   },
   {
    "key": "N",
    "label": "Nitrogen",
    "unit": "kg/ha",
    "step": 1,
    "min": 45,
    "max": 91,
    "default": 65
   },
   {
    "key": "P",
    "label": "Phosphorus",
    "unit": "kg/ha",
    "step": 1,
    "min": 36,
    "max": 72,
    "default": 54
   },
   {
    "key": "K",
    "label": "Potassium",
    "unit": "kg/ha",
    "step": 1,
    "min": 27,
    "max": 60,
    "default": 42
   }
  ],
  "categories": {
   "Crop_Type": [
    "Barley",
    "Corn",
    "Cotton",
    "Potato",
    "Rice",
    "Soybean",
    "Sugarcane",
    "Sunflower",
    "Tomato",
    "Wheat"
   ],
   "Soil_Type": [
    "Clay",
    "Loamy",
    "Peaty",
    "Saline",
    "Sandy"
   ],
   "Month": [
    "Auto (today)",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ]
  },
  "samples": [
   {
    "Soil_pH": 6.25,
    "Temperature": 16.0978468065,
    "Humidity": 80,
    "Wind_Speed": 9.0209567697,
    "N": 78,
    "P": 60,
    "K": 48,
    "Crop_Type": "Sugarcane",
    "Soil_Type": "Clay",
    "Crop_Yield": 11.6337401798
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 20.5523850788,
    "Humidity": 79.4476149212,
    "Wind_Speed": 10.958734484,
    "N": 91,
    "P": 72,
    "K": 60,
    "Crop_Type": "Sugarcane",
    "Soil_Type": "Loamy",
    "Crop_Yield": 56.8551290708
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 20.055546536,
    "Humidity": 79.944453464,
    "Wind_Speed": 11.8781249874,
    "N": 55,
    "P": 40.5,
    "K": 35,
    "Crop_Type": "Tomato",
    "Soil_Type": "Peaty",
    "Crop_Yield": 25.4941581929
   },
   {
    "Soil_pH": 6.25,
    "Temperature": 12.8335530323,
    "Humidity": 80,
    "Wind_Speed": 12.0155240597,
    "N": 54,
    "P": 50,
    "K": 44,
    "Crop_Type": "Soybean",
    "Soil_Type": "Clay",
    "Crop_Yield": 18.3061510207
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 21.0888921664,
    "Humidity": 78.9111078336,
    "Wind_Speed": 13.4418522985,
    "N": 50,
    "P": 40,
    "K": 30,
    "Crop_Type": "Barley",
    "Soil_Type": "Sandy",
    "Crop_Yield": 52.9922059426
   },
   {
    "Soil_pH": 6.25,
    "Temperature": 12.6176248825,
    "Humidity": 80,
    "Wind_Speed": 8.5131652053,
    "N": 60,
    "P": 45,
    "K": 40,
    "Crop_Type": "Tomato",
    "Soil_Type": "Clay",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 6.25,
    "Temperature": 42.8632427126,
    "Humidity": 57.1367572874,
    "Wind_Speed": 7.1722075675,
    "N": 66,
    "P": 55,
    "K": 48,
    "Crop_Type": "Cotton",
    "Soil_Type": "Clay",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 8,
    "Temperature": 26.405711291,
    "Humidity": 73.594288709,
    "Wind_Speed": 6.7672818654,
    "N": 65,
    "P": 60.5,
    "K": 49.5,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Saline",
    "Crop_Yield": 19.4908367516
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 20.2175444127,
    "Humidity": 79.7824555873,
    "Wind_Speed": 12.9961894164,
    "N": 55,
    "P": 40,
    "K": 27,
    "Crop_Type": "Wheat",
    "Soil_Type": "Sandy",
    "Crop_Yield": 58.8908650124
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 12.9586736516,
    "Humidity": 80,
    "Wind_Speed": 3.4177792668,
    "N": 65,
    "P": 48,
    "K": 36,
    "Crop_Type": "Sugarcane",
    "Soil_Type": "Sandy",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 8,
    "Temperature": 31.7797296003,
    "Humidity": 68.2202703997,
    "Wind_Speed": 9.1612730328,
    "N": 65,
    "P": 49.5,
    "K": 45,
    "Crop_Type": "Tomato",
    "Soil_Type": "Saline",
    "Crop_Yield": 16.0945584556
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 15.1394915735,
    "Humidity": 80,
    "Wind_Speed": 12.402044067,
    "N": 55,
    "P": 40,
    "K": 27,
    "Crop_Type": "Wheat",
    "Soil_Type": "Sandy",
    "Crop_Yield": 30.2848078526
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 21.5407667466,
    "Humidity": 78.4592332534,
    "Wind_Speed": 0.2887151093,
    "N": 60,
    "P": 44,
    "K": 30,
    "Crop_Type": "Corn",
    "Soil_Type": "Sandy",
    "Crop_Yield": 59.8193126234
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 19.3341024722,
    "Humidity": 80,
    "Wind_Speed": 13.3614277626,
    "N": 55,
    "P": 49.5,
    "K": 38.5,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Peaty",
    "Crop_Yield": 58.8253915637
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 35.3643212496,
    "Humidity": 64.6356787504,
    "Wind_Speed": 14.8688941965,
    "N": 63,
    "P": 60,
    "K": 55,
    "Crop_Type": "Soybean",
    "Soil_Type": "Loamy",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 8,
    "Temperature": 23.8626187002,
    "Humidity": 76.1373812998,
    "Wind_Speed": 4.560300142,
    "N": 78,
    "P": 60.5,
    "K": 45,
    "Crop_Type": "Corn",
    "Soil_Type": "Saline",
    "Crop_Yield": 35.2445709509
   },
   {
    "Soil_pH": 8,
    "Temperature": 32.7682030972,
    "Humidity": 67.2317969028,
    "Wind_Speed": 13.3373376522,
    "N": 65,
    "P": 60.5,
    "K": 49.5,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Saline",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 28.6596312269,
    "Humidity": 71.3403687731,
    "Wind_Speed": 8.8445185829,
    "N": 70,
    "P": 60,
    "K": 50,
    "Crop_Type": "Barley",
    "Soil_Type": "Loamy",
    "Crop_Yield": 10.9958716767
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 12.9165278568,
    "Humidity": 80,
    "Wind_Speed": 6.5686405187,
    "N": 55,
    "P": 49.5,
    "K": 38.5,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Peaty",
    "Crop_Yield": 16.6691198359
   },
   {
    "Soil_pH": 8,
    "Temperature": 18.1841222063,
    "Humidity": 80,
    "Wind_Speed": 9.3507438651,
    "N": 71.5,
    "P": 55,
    "K": 40.5,
    "Crop_Type": "Potato",
    "Soil_Type": "Saline",
    "Crop_Yield": 47.1836026473
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 37.1209648209,
    "Humidity": 62.8790351791,
    "Wind_Speed": 10.6376073729,
    "N": 91,
    "P": 72,
    "K": 60,
    "Crop_Type": "Sugarcane",
    "Soil_Type": "Loamy",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 30.2238951645,
    "Humidity": 69.7761048355,
    "Wind_Speed": 10.8521776387,
    "N": 60.5,
    "P": 49.5,
    "K": 42,
    "Crop_Type": "Cotton",
    "Soil_Type": "Peaty",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 32.740160759,
    "Humidity": 67.259839241,
    "Wind_Speed": 6.9453382854,
    "N": 77,
    "P": 66,
    "K": 60,
    "Crop_Type": "Cotton",
    "Soil_Type": "Loamy",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 8,
    "Temperature": 20.8931628644,
    "Humidity": 79.1068371356,
    "Wind_Speed": 16.3467445332,
    "N": 84.5,
    "P": 66,
    "K": 49.5,
    "Crop_Type": "Rice",
    "Soil_Type": "Saline",
    "Crop_Yield": 35.6024798753
   },
   {
    "Soil_pH": 6.25,
    "Temperature": 27.6336439027,
    "Humidity": 72.3663560973,
    "Wind_Speed": 9.6932992114,
    "N": 60,
    "P": 55,
    "K": 44,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Clay",
    "Crop_Yield": 16.7730706565
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 22.2848812959,
    "Humidity": 77.7151187041,
    "Wind_Speed": 7.450580248,
    "N": 60,
    "P": 44,
    "K": 30,
    "Crop_Type": "Corn",
    "Soil_Type": "Sandy",
    "Crop_Yield": 53.2576735984
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 17.2483516515,
    "Humidity": 80,
    "Wind_Speed": 13.3526056971,
    "N": 63,
    "P": 60,
    "K": 55,
    "Crop_Type": "Soybean",
    "Soil_Type": "Loamy",
    "Crop_Yield": 59.0333835935
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 18.2151997265,
    "Humidity": 80,
    "Wind_Speed": 13.0617364605,
    "N": 70,
    "P": 66,
    "K": 55,
    "Crop_Type": "Sunflower",
    "Soil_Type": "Loamy",
    "Crop_Yield": 71.7365782991
   },
   {
    "Soil_pH": 8,
    "Temperature": 28.4504752642,
    "Humidity": 71.5495247358,
    "Wind_Speed": 4.7178467788,
    "N": 71.5,
    "P": 60.5,
    "K": 54,
    "Crop_Type": "Cotton",
    "Soil_Type": "Saline",
    "Crop_Yield": 10.3153834557
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 15.7176498708,
    "Humidity": 80,
    "Wind_Speed": 9.7072057322,
    "N": 50,
    "P": 40,
    "K": 30,
    "Crop_Type": "Barley",
    "Soil_Type": "Sandy",
    "Crop_Yield": 27.0643461735
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 34.7905997252,
    "Humidity": 65.2094002748,
    "Wind_Speed": 9.7190130253,
    "N": 55,
    "P": 40,
    "K": 27,
    "Crop_Type": "Potato",
    "Soil_Type": "Sandy",
    "Crop_Yield": 0
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 12.572552688,
    "Humidity": 80,
    "Wind_Speed": 11.2326837278,
    "N": 60,
    "P": 44,
    "K": 30,
    "Crop_Type": "Corn",
    "Soil_Type": "Sandy",
    "Crop_Yield": 19.0772403736
   },
   {
    "Soil_pH": 6.75,
    "Temperature": 19.1532726812,
    "Humidity": 80,
    "Wind_Speed": 6.6443192567,
    "N": 55,
    "P": 44,
    "K": 36,
    "Crop_Type": "Cotton",
    "Soil_Type": "Sandy",
    "Crop_Yield": 53.3390064993
   },
   {
    "Soil_pH": 8,
    "Temperature": 26.0181741599,
    "Humidity": 73.9818258401,
    "Wind_Speed": 9.1361088787,
    "N": 71.5,
    "P": 60.5,
    "K": 54,
    "Crop_Type": "Cotton",
    "Soil_Type": "Saline",
    "Crop_Yield": 26.1653179969
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 18.1236125604,
    "Humidity": 80,
    "Wind_Speed": 6.5825094023,
    "N": 60.5,
    "P": 45,
    "K": 31.5,
    "Crop_Type": "Potato",
    "Soil_Type": "Peaty",
    "Crop_Yield": 48.1507953203
   },
   {
    "Soil_pH": 6.5,
    "Temperature": 22.4089917789,
    "Humidity": 77.5910082211,
    "Wind_Speed": 7.3480568048,
    "N": 77,
    "P": 60,
    "K": 45,
    "Crop_Type": "Wheat",
    "Soil_Type": "Loamy",
    "Crop_Yield": 64.8642623633
   },
   {
    "Soil_pH": 8,
    "Temperature": 29.9208980647,
    "Humidity": 70.0791019353,
    "Wind_Speed": 10.2630526028,
    "N": 65,
    "P": 49.5,
    "K": 45,
    "Crop_Type": "Tomato",
    "Soil_Type": "Saline",
    "Crop_Yield": 27.8539377899
   },
   {
    "Soil_pH": 5.5,
    "Temperature": 29.1963256307,
    "Humidity": 70.8036743693,
    "Wind_Speed": 12.2103221468,
    "N": 71.5,
    "P": 54,
    "K": 38.5,
    "Crop_Type": "Rice",
    "Soil_Type": "Peaty",
    "Crop_Yield": 38.2156382608
   },
   {
    "Soil_pH": 6.25,
    "Temperature": 13.0784550555,
    "Humidity": 80,
    "Wind_Speed": 3.6182400624,
    "N": 54,
    "P": 50,
    "K": 44,
    "Crop_Type": "Soybean",
    "Soil_Type": "Clay",
    "Crop_Yield": 19.911392671
   },
   {
    "Soil_pH": 8,
    "Temperature": 33.9470441508,
    "Humidity": 66.0529558492,
    "Wind_Speed": 10.6774423062,
    "N": 78,
    "P": 60.5,
    "K": 45,
    "Crop_Type": "Corn",
    "Soil_Type": "Saline",
    "Crop_Yield": 0
   }
  ],
  "baseline": 26.878479701613436
 }
};