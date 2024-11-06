import Phaser from 'phaser';

class Label extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, style = {}, imageKey = null) {
    super(scene, x, y);

    // Existing setup code
    const defaultTextStyle = {
      fontSize: '16px',
      color: '#020202',
      fontFamily: 'Poppins',
      fontStyle: 'bold',
      padding: { x: 5, y: 3 },
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

    // Create background
    this.background = this.scene.add.graphics();
    this.drawBackground();

    // Create label text
    this.labelText = this.scene.add.text(0, 0, text, this.textStyle).setOrigin(0.5, 0.5);

    // Add optional icon image
    this.image = null;
    if (imageKey) {
      this.image = this.scene.add.image(-this.backgroundStyle.width / 2 + 20, 0, imageKey).setOrigin(0.5, 0.4).setScale(0.7);
    }

    if (this.image) {
      this.labelText.setX(this.labelText.x + 20); // Move text slightly right to accommodate the image
    }

    this.add([this.background, this.labelText, this.image].filter(Boolean)); // Add all components to container
    scene.add.existing(this);
  }

  drawBackground() {
    this.background.clear();
    this.background.fillStyle(
        Phaser.Display.Color.HexStringToColor(this.backgroundStyle.backgroundColor).color,
        1
    );
    this.background.fillRoundedRect(
        -this.backgroundStyle.width / 2,
        -this.backgroundStyle.height / 2,
        this.backgroundStyle.width,
        this.backgroundStyle.height,
        this.backgroundStyle.borderRadius
    );

    if (this.backgroundStyle.strokeColor && this.backgroundStyle.strokeWidth) {
      this.background.lineStyle(
          this.backgroundStyle.strokeWidth,
          Phaser.Display.Color.HexStringToColor(this.backgroundStyle.strokeColor).color,
          1
      );
      this.background.strokeRoundedRect(
          -this.backgroundStyle.width / 2,
          -this.backgroundStyle.height / 2,
          this.backgroundStyle.width,
          this.backgroundStyle.height,
          this.backgroundStyle.borderRadius
      );
    }
  }

  setText(newText) {
    this.labelText.setText(newText);
  }

  setBorderColor(color) {
    this.backgroundStyle.strokeColor = color;
    this.drawBackground(); // Redraw background with new color
  }

  setImage(imageKey,imageScale = 0.7) {
    this.image = this.scene.add.image(-this.backgroundStyle.width / 2 + 20, 0, imageKey).setOrigin(0.5, 0.4).setScale(imageScale);
  }

}

export default Label;