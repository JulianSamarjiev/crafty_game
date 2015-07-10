if(Meteor.isClient){
  Meteor.startup(function(){
    // The Grid component allows an element to be located
    //  on a grid of tiles
    Crafty.c('Grid', {
      init: function() {
        this.attr({
          w: Game.map_grid.tile.width,
          h: Game.map_grid.tile.height
        })
      },

      // Locate this entity at the given position on the grid
      at: function(x, y) {
        if (x === undefined && y === undefined) {
          return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
        } else {
          this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
          return this;
        }
      }
    });

    // An "Actor" is an entity that is drawn in 2D on canvas
    //  via our logical coordinate grid
    Crafty.c('Actor', {
      init: function() {
        this.requires('2D, Canvas, Grid');
      },
    });

    // This is the player-controlled character
    Crafty.c('PlayerCharacter', {
      init: function() {
        this.requires('Actor, Fourway, Color, Collision')
          .fourway(4)
          .color('rgb(20, 75, 40)')
          .stopOnSolids();
      },
      // Registers a stop-movement function to be called when
      //  this entity hits an entity with the "Solid" component
      stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
      },

      // Stops the movement
      stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
          this.x -= this._movement.x;
          this.y -= this._movement.y;
        }
      }
    });

    // A Tree is just an Actor with a certain color
    Crafty.c('Tree', {
      init: function() {
        this.requires('Actor, Color, Solid')
          .color('rgb(20, 125, 40)');
      },
    });

    // A Bush is just an Actor with a certain color
    Crafty.c('Bush', {
      init: function() {
        this.requires('Actor, Color, Solid')
          .color('rgb(20, 185, 40)');
      },
    });
  });
}
