const { default: SlippiGame } = require('@slippi/slippi-js');
const fs=require('fs');
var slpFileList;
fs.readdir("./",  
  { withFileTypes: true }, 
  (err, files) => { 
  if(err){ 
    console.log(err);
  }
  else { 
    slpFileList=files;
	var i=0;
	for(i=0;i<slpFileList.length;i++){
		if(slpFileList[i].name.substring(slpFileList[i].name.length-4)===".slp"){
			process(slpFileList[i].name);
		}
	}
  }
  });
function process(fileIn){
	const game = new SlippiGame(fileIn);
	const settings = game.getSettings();
	const stats = game.getStats();
	const frames = game.getFrames();
	const combos=game.comboComputer.combos;
	var comboComputer={combos};
	var toJson={settings,comboComputer,frames,stats};
	toJson=JSON.stringify(toJson);
	var jsonName=fileIn.substring(0,fileIn.length-4);
	jsonName+=".json";
	fs.writeFile(jsonName, toJson, (err) => { 
		if (err) 
			console.log(err); 
		else { 
			console.log(jsonName+" written successfully"); 
		} 
	});  
}