DiamondSquare = function(size, ns, draw, bi){

	var bio;
	var biome = bi;

	this.setBiome = function(bi){
		biome = bi;
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

		for(var x=-draw; x<=draw; x++){
			if(x == 0) x++;
			if(x == -draw) {
				northwest[draw][draw] = north(northwest[draw][draw-1], biome.northwest[draw][draw]);
			}else if(x == 1){
				northeast[1][draw] = ne(northwest[1][draw], northeast[1][draw-1], biome.northeast[1][draw]);
			}else if(x<0){
				northwest[-x][draw] = ne(northwest[-x+1][draw], northwest[-x][draw-1], biome.northwest[-x][draw]);
			}else if(x>0){
				northeast[x][draw] = ne(northeast[x-1][draw], northeast[x][draw-1], biome.northeast[x][draw]);
			}
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

		for(var x=-draw; x<=draw; x++){
			if(x == 0) x++;
			if(x == -draw) {
				southwest[draw][draw] = south(southwest[draw][draw-1], biome.southwest[draw][draw]);
			}else if(x == 1){
				southeast[1][draw] = se(southwest[1][draw], southeast[1][draw-1], biome.southeast[1][draw]);
			}else if(x<0){
				southwest[-x][draw] = se(southwest[-x+1][draw], southwest[-x][draw-1], biome.southwest[-x][draw]);
			}else if(x>0){
				southeast[x][draw] = se(southeast[x-1][draw], southeast[x][draw-1], biome.southeast[x][draw]);
			}
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

		for(var y=-draw; y<=draw; y++){
			if(y == 0) y++;
			if(y == -draw) {
				southeast[draw][draw] = east(southeast[draw-1][draw], biome.southeast[draw][draw]);
			}else if(y == 1){
				northeast[draw][1] = ne(northeast[draw-1][1], southeast[draw][1], biome.northeast[draw][1]);
			}else if(y<0){
				southeast[draw][-y] = ne(southeast[draw-1][-y], southeast[draw][-y+1], biome.southeast[draw][-y]);
			}else if(y>0){
				northeast[draw][y] = ne(northeast[draw-1][y], northeast[draw][y-1], biome.northeast[draw][y]);
			}
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

		for(var y=-draw; y<=draw; y++){
			if(y == 0) y++;
			if(y == -draw) {
				southwest[draw][draw] = west(southwest[draw-1][draw], biome.southwest[draw][draw]);
			}else if(y == 1){
				northwest[draw][1] = nw(northwest[draw-1][1], southwest[draw][1], biome.northwest[draw][1]);
			}else if(y<0){
				southwest[draw][-y] = nw(southwest[draw-1][-y], southwest[draw][-y+1], biome.southwest[draw][-y]);
			}else if(y>0){
				northwest[draw][y] = nw(northwest[draw-1][y], northwest[draw][y-1], biome.northwest[draw][y]);
			}
		}
		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;

	}

	var genLevel = function(){

		northwest[1][1] = center(biome.northwest[1][1]);
		northeast[1][1] = east(northwest[1][1], biome.northeast[1][1]);
		southeast[1][1] = south(northeast[1][1], biome.southeast[1][1]);
		southwest[1][1] = sw(southeast[1][1], northwest[1][1], biome.southwest[1][1]);

		var origA = 1;
		var origB = 2;
		var a = 1;
		var b = 2;

	for(var loop = 1; loop< draw; loop++){

		while(a!=b){
			if(a==1){
				//northwest
				northwest[a][b] = north(northwest[a][b-1], biome.northwest[a][b]);
				northwest[b][a] = west(northwest[b-1][a], biome.northwest[b][a]);
				//northeast
				northeast[a][b] = ne(northwest[a][b], northeast[a][b-1], biome.northeast[a][b]);
				northeast[b][a] = east(northeast[b-1][a], biome.northeast[b][a]);
				//southeast
				southeast[a][b] = south(southeast[a][b-1], biome.southeast[a][b]);
				southeast[b][a] = se(southeast[b-1][a], northeast[b][a], biome.southeast[b][a]);
				//southwest
				southwest[a][b] = sw(southeast[a][b], southwest[a][b-1], biome.southwest[a][b]);
				southwest[b][a] = sw(southwest[b-1][a], northwest[b][a], biome.southwest[b][a]);
			}else{
				//northwest
				northwest[a][b] = nw(northwest[a-1][b],northwest[a][b-1], biome.northwest[a][b]);
				northwest[b][a] = nw(northwest[b-1][a],northwest[b][a-1], biome.northwest[b][a]);
				//northeast
				northeast[a][b] = ne(northeast[a-1][b], northeast[a][b-1], biome.northeast[a][b]);
				northeast[b][a] = ne(northeast[b-1][a], northeast[b][a-1], biome.northeast[b][a]);
				//southeast
				southeast[a][b] = se(southeast[a-1][b], southeast[a][b-1], biome.southeast[a][b]);
				southeast[b][a] = se(southeast[b-1][a], southeast[b][a-1], biome.southeast[b][a]);
				//southwest
				southwest[a][b] = sw(southwest[a-1][b], southwest[a][b-1], biome.southwest[a][b]);
				southwest[b][a] = sw(southwest[b-1][a], southwest[b][a-1], biome.southwest[b][a]);
			}

			a++;
		}
			//corners
			northwest[b][b] = nw(northwest[b-1][b], northwest[b][b-1], biome.northwest[b][b]);
			northeast[b][b] = ne(northeast[b-1][b], northeast[b][b-1], biome.northeast[b][b]);
			southeast[b][b] = se(southeast[b-1][b], southeast[b][b-1], biome.southeast[b][b]);
			southwest[b][b] = sw(southwest[b-1][b], southwest[b][b-1], biome.southwest[b][b]);
			origB++;
			a = origA;
			b = origB;
	}
	}


	var north = function(ar, bi){
		bio = bi;
		reset();
		skipB = true;
		array = ar;
		//zArray[tlx][tly] = Math.random()*amp;
		//zArray[trx][rty] = Math.random()*amp;
		generate();
		return zArray;
	}

	var east = function(ar, bi){
		bio = bi;
		reset();
		skipL = true;
		array = ar;
		//zArray[brx][bry] = Math.random()*amp;
		//zArray[trx][rty] = Math.random()*amp;
		generate();
		return zArray;
	}

	var south = function(ar, bi){
		bio = bi;
		reset();
		skipT = true;
		array = ar;
		//zArray[tlx][tly] = Math.random()*amp;
		//zArray[trx][rty] = Math.random()*amp;
		generate();
		return zArray;
	}

	var west = function(ar, bi){
		bio = bi;
		reset();
		skipR = true;
		array = ar;
		//zArray[blx][bly] = Math.random()*amp;
		//zArray[tlx][tly] = Math.random()*amp;
		generate();
		return zArray;
	}

	var center = function(bi){
		bio = bi;
		reset();

		//zArray[blx][bly] = Math.random()*amp;
		//zArray[brx][bry] = Math.random()*amp;
		//zArray[tlx][tly] = Math.random()*amp;
		//zArray[trx][rty] = Math.random()*amp;
		generate();
		return zArray;
	}

	var nw = function(ar,ar2, bi){
		bio = bi;
		reset();
		skipR = true;
		skipB = true;
		for(var x = 0; x<=size; x++){
			array[0][x] = ar[0][x];
			array[x][size] = ar2[x][size];
		}

		//zArray[tlx][tly] = Math.random()*amp;

		generate();
		return zArray;
	}

	var ne = function(ar,ar2, bi){
		bio = bi;
		reset();
		skipL = true;
		skipB = true;
		for(var x = 0; x<=size; x++){
			array[size][x] = ar[size][x];
			array[x][size] = ar2[x][size];
		}

		//zArray[trx][rty] = Math.random()*amp;
		generate();
		return zArray;
	}

	var se = function(ar,ar2, bi){
		bio = bi;
		reset();
		skipL = true;
		skipT = true;
		for(var x = 0; x<=size; x++){
			array[size][x] = ar[size][x];
			array[x][0] = ar2[x][0];
		}
		//zArray[brx][bry] = Math.random()*amp;

		generate();
		return zArray;
	}

	var sw = function(ar,ar2, bi){
		bio = bi;
		reset();
		skipR = true;
		skipT = true;
		for(var x = 0; x<=size; x++){
			array[0][x] = ar[0][x];
			array[x][0] = ar2[x][0];
		}
		//zArray[blx][bly] = Math.random()*amp;

		generate();
		return zArray;
	}

	var reset = function(){
			array=[];
			zArray = [];
			for(var x = 0; x <= size; x++){
				zArray[x] = [];
				array[x]=[];
				for (var y = 0; y<=size; y++) {
					zArray[x][y] = 0;
					array[x][y] = 0;
				}
			}



			ns = origNS;
			divider = 1;
			squares = 1;
			blx = 0;
			bly = 0;
			brx = size;
			bry = 0;
			tlx = 0;
			tly = size;
			trx = size;
			rty = size;
			skipR = false;
			skipL = false;
			skipT = false;
			skipB = false;

	}

	var avg2 = function(one,two){
		return (one+two)/2;
	}

	var avg4 = function(one,two,three,four){
		return (one+two+three+four)/4;
	}

	var noise = function(val){
		var rnd;
		if(bio == -1){
			rnd = Math.random();
			if(rnd > 0.2) {rnd = Math.random()*-val;} else {rnd = Math.random()*val;}
		}
		if(bio == 0) rnd = ((Math.random()*val/2) - (val/4));

		if(bio == 1){
			rnd = Math.random();
			if(rnd > 0.2){ rnd = Math.random()*val; }else {rnd = Math.random()*-val;}
		}
		return rnd;
	}

	var ds = function(blx, bly, brx, bry, tlx, tly, trx, rty){

			if(rty>size){
				tly-=size;
				rty-=size;
				bly-=size;
				bry-=size;
			}

			var midx = avg2(blx, trx);
			var midy = avg2(bly, rty);
			var bmx = avg2(blx, brx);
			var bmy = avg2(bly, bry);
			var lmx = avg2(blx, tlx);
			var lmy = avg2(bly, tly);
			var rmx = avg2(brx, trx);
			var rmy = avg2(bry, rty);
			var tmx = avg2(tlx, trx);
			var tmy = avg2(tly, rty);

			zArray[midx][midy] = avg4(zArray[blx][bly], zArray[brx][bry], zArray[tlx][tly], zArray[trx][rty]) + noise(ns);
			if(skipL == true && blx == 0){
				zArray[lmx][lmy] = array[size][rmy];
			}else{
				zArray[lmx][lmy] = avg2(zArray[blx][bly], zArray[tlx][tly]) + noise(ns);
			}

			if(skipR == true && brx == size){
				zArray[rmx][rmy] = array[0][lmy];
			}else{
				zArray[rmx][rmy] = avg2(zArray[brx][bry], zArray[trx][rty]) + noise(ns);
			}

			if(skipT == true && tmy == size){
				zArray[tmx][size] = array[tmx][0];
			}else{
				zArray[tmx][tmy] = avg2(zArray[tlx][tly], zArray[trx][rty]) + noise(ns);
			}

			if(skipB == true && bry == 0){
				zArray[bmx][bmy] = array[tmx][size];
			}else{
				zArray[bmx][bmy] = avg2(zArray[blx][bly], zArray[brx][bry]) + noise(ns);
			}
	}

	var generate = function(){
			for(var loop = 1; loop<=power; loop++){
				var sd = size/divider;
				blx = 0;
				bly = 0;
				brx = sd;
				bry = 0;
				tlx = 0;
				tly = sd;
				trx = sd;
				rty = sd;
				ds(blx, bly, brx, bry, tlx, tly, trx, rty);
				if(squares>1){
					var row = Math.sqrt(squares);
					var currentSq = 1;
					for(var loop2 = 1; loop2<=squares; loop2++){
						if(currentSq == row && loop2!=squares){
							blx = blx + sd;
							bly = 0;
							brx = brx + sd;
							bry = 0;
							tlx = tlx + sd;
							tly = sd;
							trx = trx + sd;
							rty = sd;
							ds(blx, bly, brx, bry, tlx, tly, trx, rty);
							currentSq =1;
						}else {
							bly = bly + sd;
							bry = bry + sd;
							tly = tly + sd;
							rty = rty + sd;
							ds(blx, bly, brx, bry, tlx, tly, trx, rty);
							currentSq++;
					 	}
					}
				}
				ns/=2;
				squares*=4;
				divider*=2;
			}


		}


	var amp = ns;
	var check = size;
	var power = 0;
	var zArray = [];
	var array = [];
	var northwest = [];
	var northeast = [];
	var southeast = [];
	var southwest = [];
	var origNS = ns;
	var divider;
	var squares;
	var blx;
	var bly;
	var brx;
	var bry;
	var tlx;
	var tly;
	var trx;
	var rty;
	var skipR;
	var skipL;
	var skipT;
	var skipB;

	while(check>1){
		check /= 2;
		power++;
	}

	if(check < 1){
		console.log("Size is not a power of 2");
		return 0;
	}else if(check == 1){
		reset();
		for(var x = 0; x <= draw; x++){
				northwest[x] = [];
				northeast[x] = [];
				southeast[x] = [];
				southwest[x] = [];
				for(var y = 0; y<=draw; y++){
					northwest[x][y] = 0;
					northeast[x][y] = 0;
					southeast[x][y] = 0;
					southwest[x][y] = 0;
				}
		}
		genLevel();
		this.northwest = northwest;
		this.northeast = northeast;
		this.southeast = southeast;
		this.southwest = southwest;
	}




}
