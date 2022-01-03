const PlantaController = require("./planta");
//const archiver = require("./archiver");
const fs = require("fs");
const archiver = require("archiver");
const glob = require("glob");
const ncp = require("ncp").ncp;
const myslqdump= require("mysqldump");

//Represents the number of pending
// file system requests at a time.
ncp.limit = 16;

const createPages = (listado) => {
  listado.forEach((element) => {
    createOnePage(element);
  });
  return true;
};
const copyFiles = (source, destination) => {
  // ncp(source, destination, callback)
  ncp(source, destination, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Carpetas Copiadas con éxito.");
  });
};
const write = (path, data, filename) => {
  fs.exists(path, (exists) => {
    if (!exists) {
      fs.writeFile(path, data, "utf8", () => {
        console.log(`Archivo ${filename} creado con éxito`);
      });
    } else {
      console.log(`El archivo ${filename} existe. Eliminando...`);
      fs.unlink(path, () => {
        console.log(`Archivo ${filename} eliminado`);
        fs.writeFile(path, data, "utf8", () => {
          console.log(`Archivo ${filename} creado con éxito`);
        });
      });
    }
  });
};
const createOnePage = (element) => {
  let endemica = element.is_endemica ? "SI" : "NO";
  let htmlContent = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="description" content="">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  
      <!-- Title -->
      <title>Jardín Botánico de Matanzas</title>
  
      <!-- Favicon -->
      <link rel="icon" href="../assets/img/core-img/favicon.ico">
  
      <!-- Core Stylesheet -->
      <link rel="stylesheet" href="../assets/style.css">
  
  </head>
  
  <body>
      <!-- Preloader -->
      <div class="preloader d-flex align-items-center justify-content-center">
          <div class="preloader-circle"></div>
          <div class="preloader-img">
              <img src="../assets/img/core-img/leaf.png" alt="">
          </div>
      </div>
  
      <!-- ##### Header Area Start ##### -->
    <header class="header-area">

        <!-- ***** Top Header Area ***** -->


        <!-- ***** Navbar Area ***** -->
        <div class="alazea-main-menu">
            <div class="classy-nav-container breakpoint-off">
                <div class="container">
                    <!-- Menu -->
                    <nav class="classy-navbar justify-content-between" id="alazeaNav">

                        <!-- Nav Brand -->
                        <a href="../index.html" class="nav-brand"><img src="../assets/img/core-img/logo.png" alt=""></a>

                        <!-- Navbar Toggler -->
                        <div class="classy-navbar-toggler">
                            <span class="navbarToggler"><span></span><span></span><span></span></span>
                        </div>

                        <!-- Menu -->
                        <div class="classy-menu">

                            <!-- Close Button -->
                            <div class="classycloseIcon">
                                <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                            </div>

                            <!-- Navbar Start -->
                            <div class="classynav">
                                <ul>
                                    <li><a href="../index.html">Inicio</a></li>
                                    <li><a href="../menu/about.html">Acerca de</a></li>
                                    <li><a href="../menu/listado.html">Listado</a></li>
                                    <li><a href="../menu/contact.html">Contactos</a></li>
                                </ul>



                            </div>
                            <!-- Navbar End -->
                        </div>
                    </nav>

                    <!-- Search Form -->
                    <div class="search-form">
                        <form action="#" method="get">
                            <input type="search" name="search" id="search"
                                placeholder="Type keywords &amp; press enter...">
                            <button type="submit" class="d-none"></button>
                        </form>
                        <!-- Close Icon -->
                        <div class="closeIcon"><i class="fa fa-times" aria-hidden="true"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- ##### Header Area End ##### -->

    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
        <!-- Top Breadcrumb Area -->
        <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center"
            style="background-image: url(../assets/img/bg-img/24.jpg);">
            <h2>Jardín Botánico de Matanzas</h2>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="../index.html"><i class="fa fa-home"></i> Inicio</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Detalles</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <!-- ##### Breadcrumb Area End ##### -->
  
      <!-- ##### Single Product Details Area Start ##### -->
      <section class="single_product_details_area mb-50">
          <div class="produts-details--content mb-50">
              <div class="container">
                  <div class="row justify-content-between">
  
                      <div class="col-12 col-md-6 col-lg-5">
                          <div class="single_product_thumb">
                              <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                                  <div class="carousel-inner">
                                      <div class="carousel-item active">
                                          <a class="product-img" href="../assets/img/imagenes_subidas/vista_detalles/${element.foto_planta}" title="Foto de la Planta">
                                          <img class="d-block w-100" src="../assets/img/imagenes_subidas/vista_detalles/${element.foto_planta}" alt="1">
                                      </a>
                                      </div>
                                      <div class="carousel-item">
                                          <a class="product-img" href="../assets/img/imagenes_subidas/vista_detalles/${element.foto_recuerdo}" title="Foto Recuerdo">
                                          <img class="d-block w-100" src="../assets/img/imagenes_subidas/vista_detalles/${element.foto_planta}" alt="1">
                                      </a>
                                      </div>
                                      
                                      
                                  </div>
                                  <ol class="carousel-indicators">
                                      <li class="active" data-target="#product_details_slider" data-slide-to="0" style="background-image: url(../assets/img/imagenes_subidas/vista_detalles/${element.foto_recuerdo});">
                                      </li>
                                      <li data-target="#product_details_slider" data-slide-to="1" style="background-image: url(../assets/img/imagenes_subidas/vista_detalles/${element.foto_planta});">
                                      </li>                                      
                                  </ol>
                              </div>
                          </div>
                      </div>
  
                      <div class="col-12 col-md-6">
          <div class="single_product_desc">

            <h4 class="title">Información de la Planta</h4>
            
            <div class="products--meta">
              <div class="row">
                <div class="col-md-12">
                  <p><span><strong>Nombre:</strong></span> <span>${element.nombre}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Especie: </strong></span> <span>${element.especie}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Codigo: </strong></span> <span>${element.codigo}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Área: </strong></span> <span>${element.area}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Cantidad: </strong></span> <span>${element.cantidad}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Tipo de Especie: </strong></span> <span>${element.tipo_especie}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Endémica: </strong></span>
                    <span >${endemica}</span>                    
                  </p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Origen: </strong></span> <span>${element.origen}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Utilidad: </strong></span> <span>${element.utilidad}</span></p>
                </div>
                <div class="col-md-12">
                  <p><span><strong>Fecha de registro: </strong></span> <span>${element.fecha_inicio}</span></p>
                </div>                
              </div>
            </div>
          </div>
        </div>
                  </div>
              </div>
          </div>
  
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="product_details_tab clearfix">
          <div class="products--meta">
            <div class="row">
              <div class="col-md-4">
                <p><span><strong>Reino: </strong></span> <span>${element.reino}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>División: </strong></span> <span>${element.division}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Subdivisión: </strong></span> <span>${element.subdivision}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Clase: </strong></span> <span>${element.clase}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Subclase: </strong></span> <span>${element.subclase}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Orden: </strong></span> <span>${element.orden}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Famiia: </strong></span> <span>${element.familia}</span></p>
              </div>
              <div class="col-md-4">
                <p><span><strong>Género: </strong></span> <span>${element.genero}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="product_details_tab clearfix">
                        <!-- Tabs -->
                        <ul class="nav nav-tabs" role="tablist" id="product-details-tab">
                            <li class="nav-item">
                                <a href="#description" class="nav-link active show" data-toggle="tab" role="tab" aria-selected="true">Caracterización</a>
                            </li>
                            <li class="nav-item">
                                <a href="#addi-info" class="nav-link" data-toggle="tab" role="tab" aria-selected="false">Curiosidades</a>
                            </li>
                            
                        </ul>
                        <!-- Tab Content -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active show" id="description">
                                <div class="description_area">
                                    <p>${element.caracterizacion}</p>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="addi-info">
                                <div class="additional_info_area">
                                <p>${element.curiosidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <!-- ##### Single Product Details Area End ##### -->
  
      
      <!-- ##### Footer Area Start ##### -->
    <footer _ngcontent-nfg-c16="" class="footer-area bg-img"
        style="background-image: url(../assets/img/bg-img/3.jpg);">
        <div _ngcontent-nfg-c16="" class="footer-bottom-area">
            <div _ngcontent-nfg-c16="" class="container">
                <div _ngcontent-nfg-c16="" class="row">
                    <div _ngcontent-nfg-c16="" class="col-12">
                        <div _ngcontent-nfg-c16="" class="border-line"></div>
                    </div>
                    <div _ngcontent-nfg-c16="" class="col-12 col-md-8">
                        <div _ngcontent-nfg-c16="" class="copywrite-text">
                            <p _ngcontent-nfg-c16="">© Copyright © Todos los derechos reservados | Este sitio fue
                                desarrollado por: Angel Ernesto Hernández Bandera. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- ##### Footer Area End ##### -->
  
      <!-- ##### All Javascript Files ##### -->
      <!-- jQuery-2.2.4 js -->
      <script src="../assets/js/jquery/jquery-2.2.4.min.js"></script>
      <!-- Popper js -->
      <script src="../assets/js/bootstrap/popper.min.js"></script>
      <!-- Bootstrap js -->
      <script src="../assets/js/bootstrap/bootstrap.min.js"></script>
      <!-- All Plugins js -->
      <script src="../assets/js/plugins/plugins.js"></script>
      <!-- Active js -->
      <script src="../assets/js/active.js"></script>
  </body>
  
  </html>`;
  write(
    `./export/catalogo/pages/${element.codigo}.html`,
    htmlContent,
    `${element.codigo}.html`
  );
  return true;
};
module.exports = {
  compress(req, res) {
    let list = [];
    PlantaController.listado()
      .then((a) => {
        a.map((x) => {
          delete x.dataValues.createdAt;
          delete x.dataValues.updatedAt;
          list.push(x.dataValues);
        });
        console.log("1ok");
        return list;
      })
      .then((listado) => {
        const l = listado;
        const json = JSON.stringify(l);

        write(
          `./export/catalogo/assets/listadoPlantas.json`,
          `data=\'${json}\'`,
          "listadoPlantas.json"
        );
        console.log("2ok");

      })
      .then(() => {
        copyFiles(
          "./public/imagenes_subidas",
          "./export/catalogo/assets/img/imagenes_subidas"
        );
        createPages(list);
        console.log("3ok");

      })
      .then(() => {
        var archive = archiver("zip", {
          zlib: { level: 9 }, // Sets the compression level.
        });
        archive.directory("./export/catalogo/", false);
        archive.on("close", () => {
          console.log(archive.pointer() + " total bytes");
          console.log(
            "archiver has been finalized and the output file descriptor has closed."
          );
        });
        archive.on("end", () => {
          glob("./export/catalogo/**/*", function (er, files) {
            let stats = fs.statSync("./export/catalogo.zip");
            let fileSizeInBytes = stats["size"];
            res.status(200).send({
              ans: fileSizeInBytes / 1000000.0,
              filename: "catalogo.zip",
              dir: files,
            });
          });
        });
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on("warning", (err) => {
          if (err.code === "ENOENT") {
            // log warning
          } else {
            // throw error
            throw err;
          }
        });
        // good practice to catch this error explicitly
        archive.on("error", (err) => {
          throw err;
        });
        // pipe archive data to the file
        let output = fs.createWriteStream("./export/catalogo.zip");
        archive.pipe(output);
        archive.finalize();
        console.log("4ok");

      });
  },
  download(req, res) {
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    res.download("./export/catalogo.zip", (error) => {
      if (!error) console.log("Archivo enviado con exito");
      // else console.log(error);
    });
  },
  backup(req,res){
    myslqdump({
      connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'herbolario',
      },
      dumpToFile: './dump.sql',
    });    
  }
};

