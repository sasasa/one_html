module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      // プリセットに @babel/preset-env を指定する
      '@babel/preset-env',
      {
        // サポートするブラウザ、この設定に応じて、必要な polyfill のみが import される
        "targets": {
          "ie": 11
        },
        // 必要な polyfill のみを import させたい場合、'usage'を指定する（必須）
        useBuiltIns: 'usage',
        // polyfill を利用する core-js のバージョンを指定する（指定しないとバージョン2が利用され警告が出力される）
        corejs: 3,
        // trueにすると利用しているポリフィルなどの情報が出力される
        // polyfill が import されているかどうかを確認するためのものなので必須ではない
        debug: true
      }
    ]
  ];

  return { presets };
};