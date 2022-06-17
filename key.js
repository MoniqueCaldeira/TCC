class Key{
   constructor(position, image, scale){
      this.x = inventory[position].x;
      this.y = inventory[position].y;
      this.image = image;
      this.sprite = createSprite(this.x,this.y);
      this.sprite.addImage(image);
      this.sprite.scale = scale;
      this.sprite.setCollider("rectangle", 0, 0, 500,500);
   }
}