const Planta = require("../models").Planta;
const Estado = require("../models").Estado;
const Foto = require("./foto");
const Planta_log = require("../models").Planta_Log;
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = {
  list(req, res) {
   // console.log(req);
    let { currentPage, pageSize } = req.params;
    let limit = pageSize * 1;
    let offset = (currentPage - 1) * pageSize;
    Planta.findAndCountAll({
      limit: pageSize * 1,
      offset: (currentPage - 1) * pageSize,
      where: {
        [Op.and]: [
          { nombre: { [Op.like]: `%${req.body.nombre}%` } },
          { codigo: { [Op.like]: `%${req.body.codigo}%` } },
          { especie: { [Op.like]: `%${req.body.especie}%` } },
          { familia: { [Op.like]: `%${req.body.familia}%` } },
          { tipo_especie: { [Op.like]: `%${req.body.tipo_especie}%` } },
          { utilidad: { [Op.like]: `%${req.body.utilidad}%` } },
      ],
      },
      include: [
        {
          model: Estado,
          as: "estados_asociados",
          order: [["createdAt", "DESC"]],
          limit: 100000,
        },
      ],
      order:[['nombre',req.body.nombreSort?'ASC':'DESC']],
    })
      .then((plantas) => {
        res.status(200).send({ total: plantas.count, data: plantas.rows });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  similares(req, res) {
    return Planta.findByPk(req.params.id)
      .then((p) => {
        const DATA = p.dataValues;
        //console.log(DATA);
        return Planta.findAll({
          limit: 4,
          where: {
            familia: DATA.familia,
            nombre: {
              [Op.ne]: DATA.nombre,
            },
            codigo: {
              [Op.ne]: DATA.codigo,
            },
            especie: {
              [Op.ne]: DATA.especie,
            },
          },
        });
      })
      .then((plantas) => {
        res.status(200).send(plantas);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    var id = req.params.id;

    Planta.findByPk(id, {
      include: [
        {
          model: Estado,
          as: "estados_asociados",
          order: [["createdAt", "DESC"]],
          limit: 100000,
        },
        {
          model: Planta_log,
          as: "historial",
          order: [["createdAt", "DESC"]],
          limit: 100000,
          include: [{ model: Estado, as: "estadoAsociado" }],
        },
      ],
      group: ["id"],
    })
      .then((planta) => res.send({ planta: planta }))
      .catch((error) => res.status(400).send(error));
  },

  add(req, res, next) {
    let id_planta;
    const file = req.files.uploadedImage[0];
    file.originalname == "nophoto.jpg"
      ? (file.filename = file.originalname)
      : false;
    const file1 = req.files.uploadedImage1[0];
    file1.originalname == "nophoto.jpg"
      ? (file1.filename = file1.originalname)
      : false;
    let planta_data = JSON.parse(req.body.planta);
    Planta.findOrCreate({
      where: {
        nombre: planta_data.nombre,
      },
      defaults: {
        nombre: planta_data.nombre,
        caracterizacion: planta_data.caracterizacion,
        origen: planta_data.origen,
        cantidad: planta_data.cantidad,
        tipo_especie: planta_data.tipo_especie,
        codigo: planta_data.codigo,
        reino: planta_data.reino,
        division: planta_data.division,
        subdivision: planta_data.subdivision,
        clase: planta_data.clase,
        subclase: planta_data.subclase,
        orden: planta_data.orden,
        familia: planta_data.familia,
        genero: planta_data.genero,
        especie: planta_data.especie,
        area: planta_data.area,
        utilidad: planta_data.utilidad,
        is_endemica: planta_data.is_endemica,
        curiosidad: planta_data.curiosidad,
        foto_planta: file.filename,
        foto_recuerdo: file1.filename,
        fecha_inicio: planta_data.fecha_inicio,
      },
    })
      .then((planta) => {
        id_planta = planta[0].dataValues.id;
        Estado.findOrCreate({
          where: {
            causa: "Registro de la planta en el sistema",
            estado: "Existente",
            id_planta: id_planta,
          },
          defaults: {
            causa: "Registro de la planta en el sistema",
            estado: "Existente",
            id_planta: id_planta,
          },
        })
          .then((es) => {
            if (es[1]) {
              let nodePath = "./public/imagenes_subidas";
              Foto.ubicarFotos(nodePath, file1, file, planta_data);
            }
            //console.log(planta_data, es[0].dataValues.id);
            Planta_log.findOrCreate({
              where: {
                id_estado: es[0].dataValues.id,
                id_planta: id_planta,
                operacion: "Registrada",
              },
              defaults: {
                id_estado: es[0].dataValues.id,
                id_planta: id_planta,
                operacion: "Registrada",
                nombre: planta_data.nombre,
                caracterizacion: planta_data.caracterizacion,
                origen: planta_data.origen,
                cantidad: planta_data.cantidad,
                tipo_especie: planta_data.tipo_especie,
                codigo: planta_data.codigo,
                reino: planta_data.reino,
                division: planta_data.division,
                subdivision: planta_data.subdivision,
                clase: planta_data.clase,
                subclase: planta_data.subclase,
                orden: planta_data.orden,
                familia: planta_data.familia,
                genero: planta_data.genero,
                especie: planta_data.especie,
                area: planta_data.area,
                utilidad: planta_data.utilidad,
                is_endemica: planta_data.is_endemica,
                curiosidad: planta_data.curiosidad,
                foto_planta: file.filename,
                foto_recuerdo: file1.filename,
                fecha_inicio: planta_data.fecha_inicio,
              },
            })
              .then((a) => {
                res.status(200).send({
                  statusCode: 200,
                  status: "success",
                  uploadedFiles: [file, file1],
                });
              })
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    var id = req.params.id;

    Planta.findByPk(id)
      .then((compra) => {
        if (!compra) {
          return res.status(400).send({
            status: false,
            mensaje:
              "La compra a eliminar no se encuentra en la base de datos.",
          });
        }
        return compra
          .destroy()
          .then(() =>
            res.status(204).send({
              status: true,
              mensaje: "La compra se ha eliminado correctamente.",
            })
          )
          .catch((error) =>
            res.status(400).send({
              status: false,
              mensaje: "Falló la eliminación de la compra.",
            })
          );
      })
      .catch((error) =>
        res.status(400).send({
          status: false,
          mensaje: "Falló la eliminación de la compra.",
        })
      );
  },
  darBaja(req, res) {
    let id_planta = req.params.id;
    let id_estado;
    let dataValues;
    let newEstado = {
      causa: req.body.causa,
      estado: "Baja",
      id_planta: id_planta,
    };

    return Estado.create(newEstado)
      .then((estado) => {
        //console.log(estado);
        id_estado = estado.dataValues.id;
        return Planta.findByPk(id_planta);
      })
      .then((planta) => {
        return planta.update({ cantidad: 0 });
      })
      .then((planta_update) => {
        dataValues = planta_update.dataValues;
        dataValues.id_estado = id_estado * 1;
        (dataValues.id_planta = id_planta * 1),
          (dataValues.operacion = "Actualizada");
        delete dataValues.id;
        delete dataValues.createdAt;
        delete dataValues.updatedAt;
        return Planta_log.create(dataValues);
      })
      .then((result) => {
        res.status(200).send({
          statusCode: 200,
          status: "success",
        });
      });
  },
  quitarBaja(req, res) {
    let id_planta = req.params.id;
    let id_estado;
    let dataValues;
    let newEstado = {
      causa: req.body.causa,
      estado: "Existencia",
      id_planta: id_planta,
    };
    //console.log(req);
    //console.log(req.body);

    return Estado.create(newEstado)
      .then((estado) => {
        //console.log(estado);
        id_estado = estado.dataValues.id;
        return Planta.findByPk(id_planta);
      })
      .then((planta) => {
        return planta.update({ cantidad: req.body.cantidad * 1 });
      })
      .then((planta_update) => {
        dataValues = planta_update.dataValues;
        dataValues.id_estado = id_estado * 1;
        (dataValues.id_planta = id_planta * 1),
          (dataValues.operacion = "Actualizada");
        delete dataValues.id;
        delete dataValues.createdAt;
        delete dataValues.updatedAt;
        return Planta_log.create(dataValues);
      })
      .then((result) => {
        res.status(200).send({
          statusCode: 200,
          status: "success",
        });
      });
  },
  update(req, res) {
    let id = req.params.id;
    let planta_data = JSON.parse(req.body.planta);
    const file = req.files.uploadedImage[0];
    const file1 = req.files.uploadedImage1[0];
    let f1;
    let f2;
    Planta.findByPk(id, {
      include: [
        {
          model: Estado,
          as: "estados_asociados",
          order: [["createdAt", "DESC"]],
          limit: 100000,
        },
      ],
      group: ["id"],
    })
      .then((planta) => {
        f1 =
          file.originalname === planta.dataValues.foto_planta
            ? file.originalname
            : file.filename;
        f2 =
          file1.originalname === planta.dataValues.foto_recuerdo
            ? file1.originalname
            : file1.filename;

        return planta.update({
          nombre: planta_data.nombre,
          caracterizacion: planta_data.caracterizacion,
          origen: planta_data.origen,
          cantidad: planta_data.cantidad,
          tipo_especie: planta_data.tipo_especie,
          codigo: planta_data.codigo,
          reino: planta_data.reino,
          division: planta_data.division,
          subdivision: planta_data.subdivision,
          clase: planta_data.clase,
          subclase: planta_data.subclase,
          orden: planta_data.orden,
          familia: planta_data.familia,
          genero: planta_data.genero,
          especie: planta_data.especie,
          area: planta_data.area,
          utilidad: planta_data.utilidad,
          is_endemica: planta_data.is_endemica,
          curiosidad: planta_data.curiosidad,
          foto_planta: f1,
          foto_recuerdo: f2,
          fecha_inicio: planta_data.fecha_inicio,
        });
      })
      .then((p) => {
        let b1 = true;
        let b2 = true;
        let nodePath = "./public/imagenes_subidas";
        for (const v in p._changed) {
          v === "foto_planta" ? (b1 = p._changed.foto_planta) : true;
          v === "foto_recuerdo" ? (b2 = p._changed.foto_recuerdo) : true;
        }
        if (!b1) {
          file1.originalname = "nophoto.jpg";
          Foto.ubicarFotos(nodePath, file1, file, planta_data);
        }
        if (!b2) {
          file.originalname = "nophoto.jpg";
          Foto.ubicarFotos(nodePath, file1, file, planta_data);
        }
        /*if (p.dataValues.cantidad == 0) {
          return Estado.create({
            causa: "La cantidad de esta planta se encuentra en 0",
            estado: "Baja",
            id_planta: id,
          });
        }*/

        return Estado.findOne({
          where: {
            causa: "Registro de la planta en el sistema",
            estado: "Existente",
            id_planta: id,
          },
        });
      })
      .then((e) => {
        return Planta_log.create({
          id_estado: e.dataValues.id,
          id_planta: id,
          operacion: "Actualizada",
          nombre: planta_data.nombre,
          caracterizacion: planta_data.caracterizacion,
          origen: planta_data.origen,
          cantidad: planta_data.cantidad,
          tipo_especie: planta_data.tipo_especie,
          codigo: planta_data.codigo,
          reino: planta_data.reino,
          division: planta_data.division,
          subdivision: planta_data.subdivision,
          clase: planta_data.clase,
          subclase: planta_data.subclase,
          orden: planta_data.orden,
          familia: planta_data.familia,
          genero: planta_data.genero,
          especie: planta_data.especie,
          area: planta_data.area,
          utilidad: planta_data.utilidad,
          is_endemica: planta_data.is_endemica,
          curiosidad: planta_data.curiosidad,
          foto_planta: f1,
          foto_recuerdo: f2,
          fecha_inicio: planta_data.fecha_inicio,
        });
      })
      .then((pl) => {
        res.status(200).send({
          statusCode: 200,
          status: "success",
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  getImageFile(req, res) {
    var name = req.params.name;
    var folder = req.params.folder;
    var image_file = req.params.imageFile;
    var path_file = `./public/imagenes_subidas/${folder}/${image_file}`;
    fs.exists(path_file, (exists) => {
      if (exists) {
        res.sendFile(path.resolve(path_file));
      } else {
        res.status(200).send({ message: "NO existe la imagen!!!" });
      }
    });
  },
  listado(){
    return Planta.findAll();
  }
};
