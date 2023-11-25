const { PrismaClient, prisma } = require("@prisma/client");

const { groupe_lieu } = new PrismaClient();
const { sendError, sendResponse } = require('./baseController')

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { nom_groupe } = req.body
  try {
    const groupe_lieu_ = await groupe_lieu.create({
      data: {
        nom_groupe
      },
    });
    console.log(groupe_lieu_);
    sendResponse(res, groupe_lieu_, "Ajout avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};


//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const groupe_lieu_ = await groupe_lieu.findMany();
    console.log(groupe_lieu_);
    sendResponse(res, groupe_lieu_, "Liste des groupe lieu");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const groupe_lieu_ = await groupe_lieu.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(groupe_lieu_);
    sendResponse(res, groupe_lieu_, "Info sur le groupe_lieu");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { nom_groupe } = req.body
  try {
    const groupe_lieu_ = await groupe_lieu.update({
      where:{
        id : +req.params.id
      },
      data: {
        nom_groupe
      },
    });
    console.log(groupe_lieu_);
    sendResponse(res, groupe_lieu_, "Mise à jour avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const groupe_lieu_ = await groupe_lieu.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, groupe_lieu_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
