export class DHT11 {
  //new DHT11(1, 28.5, 72, '2026-08-20');
  constructor(id, temperature, humidity, created_at) { //就是建立物件時會執行的東西。
    this.id = id;
    this.temperature = temperature;
    this.humidity = humidity;
    this.created_at = created_at;
  }
}