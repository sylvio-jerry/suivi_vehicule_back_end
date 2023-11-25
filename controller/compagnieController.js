const { PrismaClient, prisma } = require("@prisma/client");

const { compagnie } = new PrismaClient();
const { sendError, sendResponse } = require('./baseController')

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { nom_compagnie } = req.body
  try {
    const compagnie_ = await compagnie.create({
      data: {
        nom_compagnie
      },
    });
    console.log(compagnie_);
    sendResponse(res, compagnie_, "Ajout avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};


//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const compagnie_ = await compagnie.findMany();
    console.log(compagnie_);
    sendResponse(res, compagnie_, "Liste des compagnies");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const compagnie_ = await compagnie.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(compagnie_);
    sendResponse(res, compagnie_, "Info sur le compagnie");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { nom_compagnie } = req.body
  try {
    const compagnie_ = await compagnie.update({
      where:{
        id : +req.params.id
      },
      data: {
        nom_compagnie
      },
    });
    console.log(compagnie_);
    sendResponse(res, compagnie_, "Mise à jour avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const compagnie_ = await compagnie.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, compagnie_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
