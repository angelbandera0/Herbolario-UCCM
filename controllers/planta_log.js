const Planta = require("../models").Planta;
const Estado = require("../models").Estado;
const Planta_Log= require("../models").Planta_Log;
var moment = require("moment");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = {
  list(req, res) {
    Planta.findAll({
      /*include: [
        {
          model: Tacsonomia,
          as: "tacsonomia_asociada",
        },
      ],*/
    })
      .then((plantas) => {
        //gastos = JSON.stringify(gastos);
        res.status(201).send(plantas);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  /*getById(req, res) {
        var id = req.params.id;

        //Gasto.findAll({ where: { id: id },include: [
        Compra.findByPk(id, {
            include: [
                {
                    model: Producto,
                    as: "producto_asociado"
                },
                {
                    model: Productor,
                    as: "productor_asociado"
                },
                {
                    model: Turno,
                    as: "turno_asociado"
                },

            ],
        })
            .then(gastos => res.send({"compra": gastos}))
            .catch(error => res.status(400).send(error));
    },*/

  registrarOperacion(tipo,id_planta,id_estado,planta_data) {
    
    Planta_Log.findOrCreate({
      where: {
        id_estado: id_estado,
        id_planta: id_planta,
        operacion: "Registrada"
      },
      defaults: {
        id_estado: id_estado,
        id_planta: id_planta,
        operacion: tipo,
        nombre: planta_data.nombre,
        nombre_cientifico: planta_data.nombre_cientifico,
        caracterizacion: planta_data.caracterizacion,
        origen: planta_data.origen,
        cantidad: 0,
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
        foto_planta: req.file.filename,
        foto_recuerdo: "req.file.filename",
        fecha_inicio: planta_data.fecha_inicio,
      },
    })
      
  },
  /*delete(req, res) {
        var compra_data = req.params.id;

        Compra.findByPk(compra_data)
            .then(compra => {

                if (!compra) {
                    return res.status(400).send({
                        status: false,
                        mensaje: "La compra a eliminar no se encuentra en la base de datos."
                    });
                }
                return compra
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            status: true,
                            mensaje: "La compra se ha eliminado correctamente."
                        })
                    )
                    .catch(error =>
                        res.status(400).send({
                            status: false,
                            mensaje: ("Falló la eliminación de la compra.")
                        })
                    );
            })
            .catch(error =>
                res.status(400).send({
                    status: false,
                    mensaje: ("Falló la eliminación de la compra.")
                })
            );
    },
    update(req, res) {
        let compra_data = req.body;
        let id_turno;
        let id_producto;
        let id_productor;
        Turno.findOrCreate({
            where: {
                fecha_inicio: compra_data.fecha_inicio
            },
            defaults: {
                fecha_inicio: compra_data.fecha_inicio,
                fecha_fin: compra_data.fecha_fin
            }
        })
            .then((turno) => {
                id_turno = turno[0].dataValues.id;
                Productor.findOrCreate({
                    where: {
                        nombre: compra_data.productor_nuevo,
                    },
                    defaults: {
                        nombre: compra_data.productor_nuevo,
                    }
                }).then((productor) => {
                    id_productor = productor[0].dataValues.id;
                    Producto.findOrCreate({
                        where: {
                            nombre: compra_data.producto_nuevo,
                        },
                        defaults: {
                            nombre: compra_data.producto_nuevo,
                        }
                    }).then((producto) => {
                        id_producto = producto[0].dataValues.id;
                        Compra.findByPk(req.params.id)
                            .then(compra => {
                                compra.update({
                                    id_producto: id_producto,
                                    id_productor: id_productor,
                                    id_turno: id_turno,
                                    cantidadc: compra_data.cantidad,
                                    costo: compra_data.costo
                                })
                                    .then(compra_up => res.send({"status": true, "compra": compra_up}))
                                    .catch(error => res.status(400).send(error));
                            })
                            .catch(error => res.status(400).send(error));
                    })
                        .catch(error => res.status(400).send(error));
                })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    listByIdProducto(req, res) {
        var id = req.params.id;

        //Gasto.findAll({ where: { id: id },include: [
        Compra.findAll({
            include: [
                {
                    model: Producto,
                    as: "producto_asociado"
                },
                {
                    model: Productor,
                    as: "productor_asociado"
                },
                {
                    model: Turno,
                    as: "turno_asociado"
                },

            ],
            where:{
                id_producto:id,
            }
        })
            .then(compras => {

                let arr=[];
                compras.forEach((element)=>{
                    let obj=[];
                    obj.push(element.dataValues.producto_asociado.dataValues.nombre);
                    obj.push(element.dataValues.productor_asociado.dataValues.nombre);
                    obj.push(element.dataValues.costo);
                    obj.push(element.dataValues.cantidadc);
                    obj.push(element.dataValues.turno_asociado.dataValues.fecha_inicio);
                    obj.push(element.dataValues.turno_asociado.dataValues.fecha_fin);
                    //console.log(element.dataValues.producto_asociado.dataValues.nombre)
                    arr.push(obj);
                })
                res.send({"compra": arr})
            })
            .catch(error => res.status(400).send(error));
    },
    listByIdProductor(req, res) {
        var id = req.params.id;

        //Gasto.findAll({ where: { id: id },include: [
        Compra.findAll({
            include: [
                {
                    model: Producto,
                    as: "producto_asociado"
                },
                {
                    model: Productor,
                    as: "productor_asociado"
                },
                {
                    model: Turno,
                    as: "turno_asociado"
                },

            ],
            where:{
                id_productor:id,
            }
        })
            .then(compras => {

                let arr=[];
                compras.forEach((element)=>{
                    let obj=[];
                    obj.push(element.dataValues.productor_asociado.dataValues.nombre);
                    obj.push(element.dataValues.producto_asociado.dataValues.nombre);
                    obj.push(element.dataValues.costo);
                    obj.push(element.dataValues.cantidadc);
                    obj.push(element.dataValues.cantidadc*element.dataValues.costo);
                    obj.push(element.dataValues.turno_asociado.dataValues.fecha_inicio);
                    obj.push(element.dataValues.turno_asociado.dataValues.fecha_fin);
                    //console.log(element.dataValues.producto_asociado.dataValues.nombre)
                    arr.push(obj);
                })
                res.send({"compra": arr})
            })
            .catch(error => res.status(400).send(error));
    },*/
};
