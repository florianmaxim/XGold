/*

 This model prepares the block data.

*/

export default class ModelBlock {

  constructor(props){

  }

  get(number){

    let block = {}

  	var url = 'https://etherchain.org/api/block/'+number;

    console.log(url)

  	fetch(url).then(res => res.json()).then((out) => {

  	  block.number            = out.data[0].number;
  	  block.hash              = out.data[0].hash;
  	  block.size              = out.data[0].size;
  	  block.transactionAmount = out.data[0].tx_count;

      console.log(block.hash);

  		let url = 'https://etherchain.org/api/block/'+block.number+'/tx';

  		fetch(url).then(res => res.json()).then((out) => {

  			block.transactions = out.data;

  			// alert(JSON.stringify(block.transactions[0]));

        return block.hash;

  		});

  	});
  }
}
