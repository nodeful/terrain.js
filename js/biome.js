Biome = function(draw){

	var northwest = [];
	var northeast = [];
	var southeast = [];
	var southwest = [];

	var bioarray = [];
	var rand;

	var reallocateArrays = function(){
		for(var x=1; x<=draw; x++){
			for(var y=1; y<=draw; y++){
				northwest[x][y] = bioarray[draw-x][draw + y-1];
				northeast[x][y] = bioarray[draw + x-1][draw+y-1];
				southeast[x][y] = bioarray[draw + x-1][draw-y];
				southwest[x][y] = bioarray[draw-x][draw-y];
			}
		}


	}

	var generateLayer = function(ar){
		var newLayer = [];
		for(var i = 0; i< draw*2; i++){
			var sea = 0;
			var plane = 0;
			var hill = 0;
			if(i==0){
				var left = 0
				var right = ar[i+1];
				var bottom = ar[i];
			}else if(i==draw*2){
				var left = ar[i-1];
				var right = 0
				var bottom = ar[i];
			}else{
				var left = ar[i-1];
				var right = ar[i+1];
				var bottom = ar[i];
			}



			switch(left){
				case -1:
					sea++;
					break;
				case 0:
					plane++;
					break;
				case 1:
					hill++
					break;
			}

			switch(right){
				case -1:
					sea++;
					break;
				case 0:
					plane++;
					break;
				case 1:
					hill++
					break;
			}
			switch(bottom){
				case -1:
					sea++;
					break;
				case 0:
					plane++;
					break;
				case 1:
					hill++
					break;
			}

			var max = Math.max(sea, plane, hill);

			var result;
			var resultCount = 0;
			var newVar;
			switch(max){
				case sea:
					result = -1;
					resultCount = sea;
					break;
				case plane:
					result = 0;
					resultCount = plane;
					break;
				case hill:
					result = 1;
					resultCount = hill;
					break;
			}
			if(resultCount = 3){
				rand = Math.random();
				if(rand > 0.5){
					newVar = 0;
				}else if(rand>0.25){
					newVar = -1;
				}else{
					newVar = 1;
				}
			}else{
				rand = Math.random();
				if(rand>0.3){
					newVar = result;
				}else{
					rand = 0;
					while(rand == result){
						rand = Math.round(Math.random()*2-1);
					}
					newVar = rand;
				}
			}
			newLayer[i] = newVar;

		}
		return newLayer;
	}

	for(var x=0; x<=draw*2; x++){
		bioarray[x] = [];
		for(var y=0; y<=draw*2+1; y++){
			bioarray[x][y] = 0;
		}
	}

	for(var x=0; x<=draw;x++){
		northwest[x] = [];
		northeast[x] = [];
		southeast[x] = [];
		southwest[x] = [];
		for(var y=0; y<=draw;y++){
			northwest[x][y] = 0;
			northeast[x][y] = 0;
			southeast[x][y] = 0;
			southwest[x][y] = 0;
		}
	}

	var tempArray = [];

	for(var i = 0; i<draw*2; i++){
		tempArray[i] = Math.round(Math.random()*2-1);
	}

	for(var y = 0; y<draw*2; y++){
		if(y ==0){
			tempArray = generateLayer(tempArray);
		}else{
			for(var x = 0; x<draw*2; x++){
				tempArray[x] = bioarray[x][y-1];
			}
			tempArray = generateLayer(tempArray);
		}
		for(var x = 0;x<draw*2;x++){
			bioarray[x][y] = tempArray[x];
		}

	}


	reallocateArrays();
	this.northwest = northwest;
	this.northeast = northeast;
	this.southeast = southeast;
	this.southwest = southwest;


    this.getObject = function(){
    	return object;
    }

    this.shiftNorth = function(){
		for(var x = 1; x<=draw; x++){
			southeast[x][0]=northeast[x][1];
			southwest[x][0]=northwest[x][1];
			northeast[x].shift();
			northwest[x].shift();
			northeast[x][0]=0;
			northwest[x][0]=0;
			southeast[x].unshift(0);
			southwest[x].unshift(0);
			southeast[x].pop();
			southwest[x].pop();
		}

		for(var x=1; x<=draw; x++){
			tempArray[draw-x] = northwest[x][draw-1];
			tempArray[draw+x-1] = northeast[x][draw-1];
		}
		tempArray = generateLayer(tempArray);
		for(var x=1; x<=draw; x++){
			northwest[x][draw] = tempArray[draw-x];
			northeast[x][draw] = tempArray[draw+x-1];
		}
		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;

	}

	this.shiftSouth = function(){
		for(var x = 1; x<=draw; x++){
			northeast[x][0]=southeast[x][1];
			northwest[x][0]=southwest[x][1];
			southeast[x].shift();
			southwest[x].shift();
			southeast[x][0]=0;
			southwest[x][0]=0;
			northeast[x].unshift(0);
			northwest[x].unshift(0);
			northeast[x].pop();
			northwest[x].pop();
		}

		for(var x=1; x<=draw; x++){
			tempArray[draw-x] = southwest[x][draw-1];
			tempArray[draw+x-1] = southeast[x][draw-1];
		}
		tempArray = generateLayer(tempArray);
		for(var x=1; x<=draw; x++){
			southwest[x][draw] = tempArray[draw-x];
			southeast[x][draw] = tempArray[draw+x-1];
		}

		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;

	}

	this.shiftEast = function(){


			northwest[0] = northeast[1];
			southwest[0] = southeast[1];
			northeast.shift();
			southeast.shift();
			northeast[0]=0;
			southeast[0]=0;
			northeast[draw] = [];
			southeast[draw] = [];
			northwest.unshift(0);
			southwest.unshift(0);
			northwest.pop();
			southwest.pop();

		for(var y=1; y<=draw; y++){
			tempArray[draw-y] = southeast[draw-1][y];
			tempArray[draw+y-1] = northeast[draw-1][y];
		}
		tempArray = generateLayer(tempArray);
		for(var y=1; y<=draw; y++){
			southeast[draw][y] = tempArray[draw-y];
			northeast[draw][y] = tempArray[draw+y-1];
		}
		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;

	}

	this.shiftWest = function(){


			northeast[0] = northwest[1];
			southeast[0] = southwest[1];
			northwest.shift();
			southwest.shift();
			northwest[0]=0;
			southwest[0]=0;
			northwest[draw] = [];
			southwest[draw] = [];
			northeast.unshift(0);
			southeast.unshift(0);
			northeast.pop();
			southeast.pop();

		for(var y=1; y<=draw; y++){
			tempArray[draw-y] = southwest[draw-1][y];
			tempArray[draw+y-1] = northwest[draw-1][y];
		}
		tempArray = generateLayer(tempArray);
		for(var y=1; y<=draw; y++){
			southwest[draw][y] = tempArray[draw-y];
			northwest[draw][y] = tempArray[draw+y-1];
		}
		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;

	}


}
