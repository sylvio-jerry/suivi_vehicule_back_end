const { PrismaClient, prisma } = require("@prisma/client");

const { lieu } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { code_lieu, nom_lieu, logo, groupe_lieu_id } = req.body;
  try {
    const lieu_ = await lieu.create({
      data: {
        code_lieu,
        nom_lieu,
        logo,
        groupe_lieu_id,
      },
    });
    console.log(lieu_);
    sendResponse(res, lieu_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "Ce lieu existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const lieu_ = await lieu.findMany();
    console.log(lieu_);
    sendResponse(res, lieu_, "Liste des lieu");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const lieu_ = await lieu.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(lieu_);
    sendResponse(res, lieu_, "Info sur le lieu");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { code_lieu, nom_lieu, logo, groupe_lieu_id } = req.body;
  try {
    const lieu_ = await lieu.update({
      where: {
        id: +req.params.id,
      },
      data: { code_lieu, nom_lieu, logo, groupe_lieu_id },
    });
    console.log(lieu_);
    sendResponse(res, lieu_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "ce lieu existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const lieu_ = await lieu.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, lieu_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
