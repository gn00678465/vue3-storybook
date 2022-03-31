module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要轉換的單位，默認為"px"
      viewportWidth: 750, //  設計稿的視口寬度
      unitPrecision: 5, // 單位轉換後保留的精度
      propList: ['*'], // 能轉化為vw的屬性列表
      viewportUnit: 'vw', //  希望使用的視口單位
      fontViewportUnit: 'vw', // 字體使用的視口單位
      selectorBlackList: ['.ignore', '.hairlines', '.ig-'], // 需要忽略的CSS選擇器
      minPixelValue: 1, // 最小的轉換數值，如果為1的話，只有大於1的值會被轉換
      mediaQuery: false, // mediaQuery 裡的單位是否需要轉換
      replace: true, // 是否直接更換屬性值，而不添加備用屬性
      include: undefined, // 如果設置了include，那將只有匹配到的文件才會被轉換，例如只轉換 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
      landscape: false, // 是否添加根據 landscapeWidth 生成的媒體查詢條件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 橫屏時使用的單位
      landscapeWidth: 568 // 橫屏時使用的視口寬度
    }
  }
}