export class BH1750{
  constructor(id, illuminance, created_at){ //照度
  //id      → constructor 傳進來的「參數」
  //this.id → 這個物件自己的「屬性」
  //「我根本沒有在 class 前面宣告 id 啊？」
  // 答案是：JavaScript 不需要你事先宣告這些實例屬性。
    this.id = id;
    this.illuminance = illuminance;//lx 是照度（Illuminance）的單位，中文通常叫「勒克斯（lux）」
    this.created_at = created_at;
  }
}
// class BH1750 {                     // 類別
//     constructor(                   // 建構子
//         id,                        // 參數
//         illuminance,               // 參數
//         created_at                 // 參數
//     ) {
//         this.id = id;              // 物件的實例屬性
//         this.illuminance = illuminance; // 物件的實例屬性
//         this.created_at = created_at;   // 物件的實例屬性
//     }
// }