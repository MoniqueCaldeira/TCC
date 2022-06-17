class Inventory{
   constructor(x,y,scale){
      const TAM = 60;
      this.x = x;
      this.y = y;
      this.image = loadImage("assets/item/box.png");
      this.sprite = createSprite(this.x, this.y,TAM,TAM);
      this.sprite.addImage(this.image);
      this.sprite.scale = scale;
   }

}