const floralBloom = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: 'Floral Bloom',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Center Glow',
      ks: {
        o: { a: 0, k: 90 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 180, s: [360] },
          ],
        },
        p: { a: 0, k: [256, 256, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [24, 24, 100] },
            { t: 60, s: [100, 100, 100] },
            { t: 180, s: [88, 88, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [48, 48] }, nm: 'Ellipse' },
            { ty: 'fl', c: { a: 0, k: [0.996, 0.906, 0.914, 1] }, o: { a: 0, k: 100 }, r: 1, nm: 'Fill' },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
          nm: 'Center Group',
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
    ...[0, 72, 144, 216, 288].map((rotation, index) => ({
      ddd: 0,
      ind: index + 2,
      ty: 4,
      nm: `Petal ${index + 1}`,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 18 + index * 6, s: [0] },
            { t: 36 + index * 6, s: [100] },
            { t: 180, s: [86] },
          ],
        },
        r: { a: 0, k: rotation },
        p: { a: 0, k: [256, 256, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [18, 18, 100] },
            { t: 48 + index * 5, s: [100, 100, 100] },
            { t: 180, s: [96, 96, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, -96] }, s: { a: 0, k: [82, 172] }, nm: 'Ellipse' },
            { ty: 'fl', c: { a: 0, k: [0.957, 0.793, 0.844, 1] }, o: { a: 0, k: 100 }, r: 1, nm: 'Fill' },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
          nm: 'Petal Group',
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    })),
  ],
}

export default floralBloom
