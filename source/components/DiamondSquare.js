//Perlin Noise would be another option
//https://www.clicktorelease.com/code/perlin/chrome.html
//https://codepen.io/ya7gisa0/pen/vGJvWw

/*

Can Diamond Square grow forever?

*/

export default class DiamondSquare{
  constructor(width, height, segments, smoothingFactor, transactions){

    //block data
    this.transactions = transactions;

    //geometry data

    this.width = width;
  	this.height = height;
  	this.segments = segments;
  	this.smoothingFactor = smoothingFactor;

  	this.terrain = [];

    for(var i = 0; i <= this.segments; i++) {
			this.terrain[i] = new Array();
			for(var j = 0; j <= this.segments; j++) {
				this.terrain[i][j] = 0;
			}
		}
  }

	generate() {
		var size = this.segments;
		// var size = this.segments+1;

    // length = 8,                   divide by two    until it's not divisible anymore
		for(var length = this.segments; length >= 2;      length /= 2) {


      //take half of the length
			var half = length/2;


      // //////console.log('length: '+length);
      // //////console.log('halt: '+half);

      //take half of the smoothing factor
      //this.smoothingFactor /= 2;


      /*
        squares

      */

      var counter = 0

			for(var x = 0; x < this.segments; x += length) {
				for(var y = 0; y < this.segments; y += length) {

          if(counter>this.transactions.length-1)
             counter = 0;

          //sum up the square's corners:
					var sum =
          this.terrain[x][y]                // top left
					this.terrain[x+length][y]+        // top right
					this.terrain[x][y+length]+        // lower left
					this.terrain[x+length][y+length]; // lower right

          // //////console.log(`top left (x:${x}, y:${y}): ${this.terrain[x][y]}`)
          // //////console.log(`top right (x:${x+length}, y:${y}): ${this.terrain[x+length][y]}`)
          // //////console.log(`lover left (x:${x}, y:${y+length}): ${this.terrain[x][y+length]}`)
          // //////console.log(`lower right (x:${x+length}, y:${y+length}): ${this.terrain[x+length][y+length]}`)
          //
          // //////console.log('sum: '+average)

          // divide by the amounter of corners to get the average
					var average = sum / 4;

          // add factor(random)
            // magic value
            // let value = 0;

            //smooth
  					// let value = average + 2*this.smoothingFactor*Math.random()-this.smoothingFactor;

            //transaction
              //take a random transaction's amount
              //TODO DO NOT MAKE THIS RANDOM- RANDONESS COMES FROM CHAIN ALREADY!

              //random
              // let amount = this.transactions[Math.floor(Math.random()*((this.transactions.length-1)+1))].amount;

              //one after another
              let amount = this.transactions[counter].amount;


                amount = amount/1000000000000000000;

                //console.log('square amount: '+amount)


            let value = average + amount;

                // value = value*this.smoothingFactor*Math.random()-this.smoothingFactor;


          //define the square's center
					this.terrain[x+half][y+half] = value;

          ////console.log('square point:'+(x+half)+','+(y+half)+':'+average)

          counter++;
				}
			}

      /*

        diamonds

      */

      var counter = 0;

			for(var x = 0; x < this.segments; x += half) {

				for(var y = (x+half)%length; y < this.segments; y += length) {

          if(counter>this.transactions.length-1)
             counter = 0;

          //sum up the diamond's corners
					var sum =
          this.terrain[(x-half+size)%size][y]+  // middle left
					this.terrain[(x+half)%size][y]+       // middle right
					this.terrain[x][(y+half)%size]+       // middle top
					this.terrain[x][(y-half+size)%size];  // middle bottom

          //take the average value
					var average = sum/4;

          //add factor
            //magic value
            // average = 1

            //smooth
  					//let value = average + 2*this.smoothingFactor*Math.random()-this.smoothingFactor;

            //transaction's whatever
            //transaction
              //take a random transaction's fee
              //TODO DO NOT MAKE THIS RANDOM! - RANDONESS COMES FROM CHAIN ALREADY!

              //random
              // let tx = this.transactions[Math.floor(Math.random()*((this.transactions.length-1)+1))];
              //one after another
              let tx = this.transactions[counter];

              let fee;
              
              if(tx.amount){
                fee = tx.amount/1000000000000000000;
              }else{
                fee = tx.price*tx.gasUsed; //fee = gasPrice/gasUsed
                fee = fee/1000000000000000000;
              }

                //console.log('diamond fee: '+fee);


            let value = average + fee;

                value = value*fee*Math.random()-fee;


          //define the diamond's center
					this.terrain[x][y] = value;

          ////console.log('diamond point:'+(x)+','+(y)+':'+average)

					// values on the top and right edges
					if(x === 0)
						this.terrain[this.segments][y] = average;
					if(y === 0)
						this.terrain[x][this.segments] = average;
				}
			}
		}
		return this.terrain;
	};
};
