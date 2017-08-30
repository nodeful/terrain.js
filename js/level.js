Level = function(resolution, space, draw, noise){
	var prevX = 1;
	var prevY = 1;
	var nex = draw;
	var ney = draw;
	var sex = draw;
	var sey = draw;
	var swx = draw;
	var swy = draw;
	var nwx = draw;
	var nwy = draw;



	var convert = function(nx,ny){
		if(nx == 0) nx=1;
		if(ny == 0) ny=1;
		if(nx!=prevX || ny!=prevY){
			if(nx > prevX){
				shiftEast();
			}
			if(nx < prevX){
				shiftWest();
			}
			if(ny > prevY){
				shiftSouth();
			}
			if(ny < prevY){
				shiftNorth();
			}
			prevX = nx;
			prevY = ny;
		}

	}

	var shiftNorth = function(){
		bio.shiftNorth();
		ds.setBiome(bio);
		ds.shiftNorth();
		for(var x = 1; x<=draw; x++){
			southeast[x][0]=northeast[x][1];
			southwest[x][0]=northwest[x][1];
			northeast[x].shift();
			northwest[x].shift();
			northeast[x][0]=0;
			northwest[x][0]=0;
			southeast[x].unshift(0);
			southwest[x].unshift(0);
			northwest[x][draw] = southwest[x][draw+1];
			northeast[x][draw] = southeast[x][draw+1];
			southwest[x].pop();
			southeast[x].pop();
			northwest[x][draw].getObject().position.z = northwest[x][draw].getObject().position.z - 2*draw*space;
			northeast[x][draw].getObject().position.z = northeast[x][draw].getObject().position.z - 2*draw*space;
		}
		for(var x = 1; x <= draw; x++){
				northwest[x][draw].updateGeometry(ds.northwest[x][draw]);
				northeast[x][draw].updateGeometry(ds.northeast[x][draw]);
		}
	}

	var shiftSouth = function(){
		bio.shiftSouth();
		ds.setBiome(bio);
		ds.shiftSouth();
		for(var x = 1; x<=draw; x++){
			northeast[x][0]=southeast[x][1];
			northwest[x][0]=southwest[x][1];
			southeast[x].shift();
			southwest[x].shift();
			southeast[x][0]=0;
			southwest[x][0]=0;
			northeast[x].unshift(0);
			northwest[x].unshift(0);
			southwest[x][draw] = northwest[x][draw+1];
			southeast[x][draw] = northeast[x][draw+1];
			northwest[x].pop();
			northeast[x].pop();
			southwest[x][draw].getObject().position.z = southwest[x][draw].getObject().position.z + 2*draw*space;
			southeast[x][draw].getObject().position.z = southeast[x][draw].getObject().position.z + 2*draw*space;
		}
		for(var x = 1; x <= draw; x++){
				southeast[x][draw].updateGeometry(ds.southeast[x][draw]);
				southwest[x][draw].updateGeometry(ds.southwest[x][draw]);
		}
	}

	var shiftEast = function(){
		bio.shiftEast();
		ds.setBiome(bio);
		ds.shiftEast();

		northwest[0] = northeast[1];
		southwest[0] = southeast[1];
		northeast.shift();
		southeast.shift();
		northeast[0]=0;
		southeast[0]=0;
		northwest.unshift(0);
		southwest.unshift(0);
		northeast[draw] = northwest[draw+1];
		southeast[draw] = southwest[draw+1];
		northwest.pop();
		southwest.pop();

		for(var y = 1; y <= draw; y++){
			northeast[draw][y].getObject().position.x = northeast[draw][y].getObject().position.x + 2*draw*space;
			northeast[draw][y].updateGeometry(ds.northeast[draw][y]);
			southeast[draw][y].getObject().position.x = southeast[draw][y].getObject().position.x + 2*draw*space;
			southeast[draw][y].updateGeometry(ds.southeast[draw][y]);
		}


	}

	var shiftWest = function(){
		bio.shiftWest();
		ds.setBiome(bio);
		ds.shiftWest();

		northeast[0] = northwest[1];
		southeast[0] = southwest[1];
		northwest.shift();
		southwest.shift();
		northwest[0]=0;
		southwest[0]=0;
		northeast.unshift(0);
		southeast.unshift(0);
		northwest[draw] = northeast[draw+1];
		southwest[draw] = southeast[draw+1];
		northeast.pop();
		southeast.pop();

		for(var y = 1; y <= draw; y++){
			northwest[draw][y].getObject().position.x = northwest[draw][y].getObject().position.x - 2*draw*space;
			northwest[draw][y].updateGeometry(ds.northwest[draw][y]);
			southwest[draw][y].getObject().position.x = southwest[draw][y].getObject().position.x - 2*draw*space;
			southwest[draw][y].updateGeometry(ds.southwest[draw][y]);
		}
	}



	this.updateLoc = function(pos){
		convert(Math.round(pos.x/space), Math.round(pos.z/space));
	}
	var bio = new Biome(draw);
	var ds = new DiamondSquare(resolution, noise, draw, bio);

	var levelObject = new THREE.Object3D();
	levelObject.position.x = 0;
	levelObject.position.y = 0;
	levelObject.position.z = 0;


	var hspace = space/2;

	var x = 1;
	var y = 1;
	var northwest = [];
	var northeast = [];
	var southeast = [];
	var southwest = [];

	for(var x = 0; x<=draw; x++){
		northwest[x] = [];
		northeast[x] = [];
		southeast[x] = [];
		southwest[x] = [];
		for(var y = 0; y<=draw; y++){
			northwest[x][y] = [];
			northeast[x][y] = [];
			southeast[x][y] = [];
			southwest[x][y] = [];
		}
	}




	northwest[1][1] = new Chunk(noise, bio.northwest[1][1],resolution, space, ds.northwest[1][1], -hspace, -hspace);
	northeast[1][1] = new Chunk(noise, bio.northeast[1][1],resolution, space, ds.northeast[1][1],  hspace, -hspace);
	southeast[1][1] = new Chunk(noise, bio.southeast[1][1],resolution, space, ds.southeast[1][1],  hspace, hspace);
	southwest[1][1] = new Chunk(noise, bio.southwest[1][1],resolution, space, ds.southwest[1][1], -hspace, hspace);




	var origA = 1;
	var origB = 2;
	var a = 1;
	var b = 2;

	for(var loop = 1; loop< draw; loop++){

		while(a!=b){
			if(a==1){
				//northwest
				northwest[a][b] = new Chunk(noise, bio.northwest[a][b],resolution, space, ds.northwest[a][b], -a*space+hspace, -b*space+hspace);
				northwest[b][a] = new Chunk(noise, bio.northwest[b][a],resolution, space, ds.northwest[b][a], -b*space+hspace, -a*space+hspace);
				//northeast
				northeast[a][b] = new Chunk(noise, bio.northeast[a][b],resolution, space, ds.northeast[a][b], a*space-hspace, -b*space+hspace);
				northeast[b][a] = new Chunk(noise, bio.northeast[b][a],resolution, space, ds.northeast[b][a], b*space-hspace, -a*space+hspace);
				//southeast
				southeast[a][b] = new Chunk(noise, bio.southeast[a][b],resolution, space, ds.southeast[a][b], a*space-hspace, b*space-hspace);
				southeast[b][a] = new Chunk(noise, bio.southeast[b][a],resolution, space, ds.southeast[b][a], b*space-hspace, a*space-hspace);
				//southwest
				southwest[a][b] = new Chunk(noise, bio.southwest[a][b],resolution, space, ds.southwest[a][b], -a*space+hspace, b*space-hspace);
				southwest[b][a] = new Chunk(noise, bio.southwest[b][a],resolution, space, ds.southwest[b][a], -b*space+hspace, a*space-hspace);
			}else{
				//northwest
				northwest[a][b] = new Chunk(noise, bio.northwest[a][b],resolution, space, ds.northwest[a][b], -a*space+hspace, -b*space+hspace);
				northwest[b][a] = new Chunk(noise, bio.northwest[b][a],resolution, space, ds.northwest[b][a], -b*space+hspace, -a*space+hspace);
				//northeast
				northeast[a][b] = new Chunk(noise, bio.northeast[a][b],resolution, space, ds.northeast[a][b], a*space-hspace, -b*space+hspace);
				northeast[b][a] = new Chunk(noise, bio.northeast[b][a],resolution, space, ds.northeast[b][a], b*space-hspace, -a*space+hspace);
				//southeast
				southeast[a][b] = new Chunk(noise, bio.southeast[a][b],resolution, space, ds.southeast[a][b], a*space-hspace, b*space-hspace);
				southeast[b][a] = new Chunk(noise, bio.southeast[b][a],resolution, space, ds.southeast[b][a], b*space-hspace, a*space-hspace);
				//southwest
				southwest[a][b] = new Chunk(noise, bio.southwest[a][b],resolution, space, ds.southwest[a][b], -a*space+hspace, b*space-hspace);
				southwest[b][a] = new Chunk(noise, bio.southwest[b][a],resolution, space, ds.southwest[b][a], -b*space+hspace, a*space-hspace);
			}

			a++;
		}
			//corners
			northwest[b][b] = new Chunk(noise, bio.northwest[b][b],resolution, space, ds.northwest[b][b], -b*space+hspace, -b*space+hspace);
			northeast[b][b] = new Chunk(noise, bio.northeast[b][b],resolution, space, ds.northeast[b][b], b*space-hspace, -b*space+hspace);
			southeast[b][b] = new Chunk(noise, bio.southeast[b][b],resolution, space, ds.southeast[b][b], b*space-hspace, b*space-hspace);
			southwest[b][b] = new Chunk(noise, bio.southwest[b][b],resolution, space, ds.southwest[b][b], -b*space+hspace, b*space-hspace);
			origB++;
			a = origA;
			b = origB;
	}



	for(var x = 1; x <= draw; x++){
		for(var y = 1; y<=draw; y++){
				levelObject.add(northwest[x][y].getObject());
				levelObject.add(northeast[x][y].getObject());
				levelObject.add(southeast[x][y].getObject());
				levelObject.add(southwest[x][y].getObject());
		}
	}





	this.getObject = function(){
		return levelObject;
	}


}
