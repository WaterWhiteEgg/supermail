import { requestHome } from "./request";

export function getdetailItem(iid) {
    return requestHome({
        url: "/detail",
        params: {
            iid
        }
    })
}
export function getdetailRecommend() {
    return requestHome({
        url: "/recommend"
    })
}

export class GoodsItemNet {
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

export class GoodsParam {
    constructor(info, rule) {
        // image有些商家可能没有
        this.image = info.image ? info.image[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export class Product {
    constructor(img, info) {
        this.image = img[0];
        this.iid = info.iid;
        this.desc = info.desc;
        this.title = info.title;
        this.price = info.lowNowPrice
    }
}