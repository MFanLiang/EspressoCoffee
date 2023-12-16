// @see https://stylelint.bootcss.com/

// 导出的配置项，具体是啥意思，可以看官网的解释

module.exports = {
  extends: [
    // 'stylelint-config-standard',
    // 'stylelint-config-html/vue',
    // 'stylelint-config-standard-scss',
    // 'stylelint-config-recommended-vue/scss',
    // 'stylelint-config-recess-order',
    // 'stylelint-config-prettier',
  ],
  overrides: [
    // {
    //   files: ['**/*.(scss|css|vue|html)'],
    //   customesyntax: 'postcss-scss',
    // },
    // {
    //   files: ['**/*.(html|vue)'],
    //   customesyntax: 'postcss-html',
    // }
  ],
  // ignoreFiles: [
  //   '**/*.js',
  //   '**/*.jsx',
  //   '**/*.ts',
  //   '**/*.tsx',
  //   '**/*.json',
  //   '**/*.md',
  //   '**/*.yaml',
  // ],
  /** 
   * null --> 关闭该规则
   * always --> 必须
   */
  // rules: {
  //   'value-keyword-case': null,
  //   'no-descending-specificity': null,
  //   'funciton-url-quotes': 'always',
  //   'no-empty-source': null,
  //   'selector-class-pattern': null,
  //   'property-no-unknown': null,
  //   'block-opening-brace-space-before': 'always',
  //   'value-no-vendor-prefix': null,
  //   'property-no-vendor-prefix': null,
  //   'selector-pseudo-class-no-unknown': [
  //     true,
  //     {
  //       ignorePseudoClasses: ['global', 'v-deep', 'deep'],
  //     }
  //   ]
  // },
};
