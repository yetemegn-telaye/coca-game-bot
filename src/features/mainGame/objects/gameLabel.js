import Phaser from 'phaser';

class Label extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, style = {}, imageKey = null) {
    super(scene, x, y);

    
    const defaultTextStyle = {
      fontSize: '16px',
      color: '#020202',
      fontFamily: 'Poppins',
      fontStyle: 'bold',
      padding: { x: 0, y: 5 },
      align: 'center'
    };

    const defaultBackgroundStyle = {
      backgroundColor: '#ffffff',
      width: 120,
      height: 40,
      borderRadius: 10,
      strokeColor: '#000000',
      strokeWidth: 2
    };

    this.textStyle = { ...defaultTextStyle, ...style.text };
    this.backgroundStyle = { ...defaultBackgroundStyle, ...style.background };

    
    const background = this.scene.add.graphics();


    background.fillStyle(
      Phaser.Display.Color.HexStringToColor(this.backgroundStyle.backgroundColor).setTo(255,255,255).color,
      1
    );

    background.fillRoundedRect(
      -this.backgroundStyle.width / 2, // Offset X
      -this.backgroundStyle.height / 2, // Offset Y
      this.backgroundStyle.width, // Width
      this.backgroundStyle.height, // Height
      this.backgroundStyle.borderRadius // Border radius for corners
    );

  
    if (this.backgroundStyle.strokeColor && this.backgroundStyle.strokeWidth) {
      background.lineStyle(
        this.backgroundStyle.strokeWidth,
        Phaser.Display.Color.HexStringToColor(this.backgroundStyle.strokeColor).color,
        1
      );
      background.strokeRoundedRect(
        -this.backgroundStyle.width / 2, 
        -this.backgroundStyle.height / 2, 
        this.backgroundStyle.width, 
        this.backgroundStyle.height, 
        this.backgroundStyle.borderRadius 
      );
    }

    
    this.labelText = this.scene.add.text(0, 0, text, this.textStyle).setOrigin(0.5, 0.5);

    
    this.image = null;
    if (imageKey) {
      this.image = this.scene.add.image(-this.backgroundStyle.width / 2 + 20, 0, imageKey);
      this.image.setOrigin(0.5, 0.4);
      this.image.setScale(0.7);
    }

    
    if (this.image) {
      this.labelText.setX(this.labelText.x + 20); // Move text slightly right to accommodate the image
    }

    // Add the background, image (if present), and text to the label container
    this.add([background]);
    if (this.image) this.add(this.image);
    this.add(this.labelText);

   
    scene.add.existing(this);
  }

  setText(newText) {
    this.labelText.setText(newText);
  }
}

export default Label;
