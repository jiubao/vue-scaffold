// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
    },
    "postcss-px2remvw": {
      exclude: /(\/|\\)(node_modules|member|memberBook|QAndA|upgradeStrategy|orderConfirm|qy-form-goods|qy-form-radio|cardBag|venueDiscount|bagList|ballotList|cardDetail|coupon|growth|inviteList|expenseList|tradeList|cardList|countCardDetail|disablebCardList|venueManage|inviteRecharge|index-list1)(\/|\\)/,
      forceRemProps: [ 'font', 'font-size']
    }
  }
}
