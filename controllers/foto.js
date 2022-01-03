const Jimp = require("jimp");

const colocar_foto_carpeta = (path_in, x, y, path_out) => {
  // open a file called "lenna.png"
  Jimp.read(path_in, (err, imagen) => {
    if (err) throw err;
    imagen
      .resize(x, y) // resize
      .write(path_out); // save
  });
};
module.exports = {
  ubicarFotos(routeNode, file1, file, planta_data) {
    if(file.originalname!="nophoto.jpg"&&file.size!=0){
    colocar_foto_carpeta(
      `./my_uploaded_files/${file.filename}`,
      100,
      100,
      `${routeNode}/vista_listado/${file.filename}`
    );
    colocar_foto_carpeta(
      `./my_uploaded_files/${file.filename}`,
      500,
      500,
      `${routeNode}/vista_detalles/${file.filename}`
    );
    colocar_foto_carpeta(
      `./my_uploaded_files/${file.filename}`,
      270,
      320,
      `${routeNode}/vista_otras/${file.filename}`
    );
    colocar_foto_carpeta(
      `./my_uploaded_files/${file.filename}`,
      270,
      320,
      `${routeNode}/vista_home/${file.filename}`
    );
    }
    if(file1.originalname!="nophoto.jpg" &&file1.size!=0){
    colocar_foto_carpeta(
      `./my_uploaded_files/${file1.filename}`,
      500,
      500,
      `${routeNode}/recuerdo/${file1.filename}`
    );
    }
    console.log("Fotos ubicadas correctamente en el Servidor");
  },
};
