interface Params {
  category: "MEDICINE" | "ESSENTIALS";
  initPrice: number;
  unit: string;
  initStock: number;
  stripPerDus: number;
  butirPerStrip: number;
  itemPerDus: number;
}

export const parsedStockAndPrice = (params: Params) => {
  const {
    category,
    unit,
    initStock,
    initPrice,
    stripPerDus,
    butirPerStrip,
    itemPerDus,
  } = params;

  let price = 0;
  let stock = 0;
  
  if (category === "MEDICINE") {
    switch (unit) {
      case "DUS": {
        const totalPriceStrip = Math.ceil(initPrice / stripPerDus);
        const totalPriceButir = Math.ceil(totalPriceStrip / butirPerStrip);
        price = totalPriceButir;

        const stockStrip = initStock * stripPerDus;
        const stockButir = stockStrip * butirPerStrip;
        stock = stockButir;
        break;
      }
      case "STRIP": {
        price = Math.ceil(initPrice / butirPerStrip);
        stock = Math.ceil(initStock * butirPerStrip);

        break;
      }
      default: {
        price = initPrice;
        stock = initStock;
        break;
      }
    }
  } else {
    switch (unit) {
      case "DUS": {
        const totalPriceItem = Math.ceil(initPrice / itemPerDus);
        price = totalPriceItem;
        break;
      }
      default: {
        price = initPrice;
        stock = initStock;
      }
    }
  }

  return {
    price,
    stock,
  };
};
