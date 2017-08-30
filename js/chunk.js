Chunk = function (noise, bio, resolution, size, zArray, posx, posz) {
  var object = new THREE.Object3D()
  var geometry = new THREE.PlaneGeometry(size, size, resolution, resolution)
  var geometryOutline = new THREE.PlaneGeometry(size, size, 1, 1)
  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    wireframe: false

  })

  var lowGeometry = new THREE.PlaneGeometry(size, size, 2, 2)
  var water_mesh
  var setHeight = function () {
    object.remove(water_mesh)
    var water_geometry = new THREE.PlaneGeometry(space, space)
    var water_material = new THREE.MeshBasicMaterial({
      color: 0x3366aa,
      transparent: true,
      opacity: 0.7
    })

    water_mesh = new THREE.Mesh(water_geometry, water_material)
    water_mesh.rotation.x = -Math.PI / 2
    water_mesh.position.y = -100
    object.add(water_mesh)

    geometry = new THREE.PlaneGeometry(size, size, resolution, resolution)
    loop = 0
    for (var x = 0; x <= resolution; x++) {
      for (var y = 0; y <= resolution; y++) {
        geometry.vertices[loop].z = zArray[x][y]
        loop++
      }
    }
    for (var loop = 0; loop < geometry.faces.length; loop++) {
      var a = geometry.faces[loop].a
      var b = geometry.faces[loop].b
      var c = geometry.faces[loop].c
      var min = Math.min(geometry.vertices[a].z, geometry.vertices[b].z, geometry.vertices[c].z)
      var max = Math.max(geometry.vertices[a].z, geometry.vertices[b].z, geometry.vertices[c].z)
      var minL
      var maxL
      switch (min) {
        case geometry.vertices[a].z:
          minL = a
          break
        case geometry.vertices[b].z:
          minL = b
          break
        case geometry.vertices[c].z:
          minL = c
          break
      }
      switch (max) {
        case geometry.vertices[a].z:
          maxL = a
          break
        case geometry.vertices[b].z:
          maxL = b
          break
        case geometry.vertices[c].z:
          maxL = c
          break
      }

      if (geometry.vertices[minL].x == geometry.vertices[maxL].x) {
        var oppositeSide = geometry.vertices[maxL].z - geometry.vertices[minL].z
        var adjacentSide = geometry.vertices[maxL].y - geometry.vertices[minL].y
        if (adjacentSide < 0) adjacentSide = adjacentSide * -1
        var angle = Math.atan(oppositeSide / adjacentSide) * 57.3
      } else {
        var oppositeSide = geometry.vertices[maxL].z - geometry.vertices[minL].z
        var side = geometry.vertices[minL].x - geometry.vertices[maxL].x
        if (side < 0) side = side * -1
        var adjacentSide = Math.sqrt(side * side + side * side)
        var angle = Math.atan(oppositeSide / adjacentSide) * 57.3
      }

      var avg = (max + min) / 2
      var rnd = 1 - angle / 120

      if (avg > 0.8 * noise) {
        geometry.faces[loop].color = new THREE.Color(0.9 * rnd, 0.9 * rnd, 0.9 * rnd)
      } else if (avg > 0.2 * noise) {
        geometry.faces[loop].color = new THREE.Color(0.4 * rnd, 0.4 * rnd, 0.4 * rnd)
      } else if (avg > -0.1 * noise) {
        geometry.faces[loop].color = new THREE.Color(0, 0.6 * rnd, 0)
      } else if (avg > -0.2 * noise) {
        geometry.faces[loop].color = new THREE.Color(0.4 * rnd, 0.3 * rnd, 0.08 * rnd)
      } else {
        geometry.faces[loop].color = new THREE.Color(0.93, 0.87, 0.44)
      }
    }
  }

  var waterHeight = -50
  var loop = 0

  setHeight()

  var plane = new THREE.Mesh(geometry, material)

  plane.rotation.x = -Math.PI / 2

  object.position.x = posx
  object.position.z = posz
  object.rotation.y = Math.PI / 2
  object.add(plane)

  this.getObject = function () {
    	return object
  }

  this.updateGeometry = function (ar) {
    zArray = ar
    setHeight()
    object.remove(plane)
    plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI / 2
    object.add(plane)
  }
}
