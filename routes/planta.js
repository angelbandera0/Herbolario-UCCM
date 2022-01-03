var express = require("express");
var router = express.Router();
var plantaController = require("../controllers").planta;
var upload = require("../middleware/subida");
var verifyPlant = require("../middleware/verificarPlanta");

//router.post('/add',upload.single('uploadedImage'),plantaController.add);
router.post(
  "/",
  [
    upload.fields([
      { name: "uploadedImage", maxCount: 1 },
      { name: "uploadedImage1", maxCount: 1 },
    ]),
    verifyPlant.verifyNombre,
    verifyPlant.verifyCodigo,
  ],
  plantaController.add
);
router.post("/baja/:id", plantaController.darBaja);
router.post("/entrar/:id", plantaController.quitarBaja);

router.get("/similares/:id", plantaController.similares);
router.get("/getfoto/:folder/:imageFile", plantaController.getImageFile);
router.post("/list/:currentPage/:pageSize", plantaController.list);
router.get("/:id", plantaController.getById);

router.put(
  "/:id",
[upload.fields([
    { name: "uploadedImage", maxCount: 1 },
    { name: "uploadedImage1", maxCount: 1 },
  ]),verifyPlant.verifyDataUpdateCodigo,verifyPlant.verifyDataUpdateNombre],
  plantaController.update
);

router.delete("/:id", plantaController.delete);

module.exports = router;
