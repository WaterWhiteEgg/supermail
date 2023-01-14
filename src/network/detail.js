import { requestHome } from "./request";

export function getdetailItem(iid) {
    return requestHome({
        url: "/detail",
        params: {
            iid
        }
    })
}

export class GoodsItem {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.disc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class ShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods

    }
}