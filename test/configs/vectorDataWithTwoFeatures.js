export default {
  view: {
    center: [0, 0],
    zoom: 0
  },
  layers: [{
    type: 'Vector',
    source: {
      type: 'Vector',
      data: {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-9.4921875,
                    18.312810846425442
                  ],
                  [-19.6875, -22.91792293614602],
                  [
                    42.890625,
                    3.162455530237848
                  ],
                  [-9.4921875,
                    18.312810846425442
                  ]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    1.0546875,
                    46.800059446787316
                  ],
                  [-8.4375,
                    40.44694705960048
                  ],
                  [
                    23.5546875,
                    29.22889003019423
                  ],
                  [
                    1.0546875,
                    46.800059446787316
                  ]
                ]
              ]
            }
          }
        ]
      }
    }
  }]
}
