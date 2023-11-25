const { PrismaClient, prisma } = require("@prisma/client");

const { parc } = new PrismaClient();
const { sendError, sendResponse } = require('./baseController')

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { nom_parc } = req.body
  try {
    const parc_ = await parc.create({
      data: {
        nom_parc
      },
    });
    console.log(parc_);
    sendResponse(res, parc_, "Ajout avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};


//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const parc_ = await parc.findMany();
    console.log(parc_);
    sendResponse(res, parc_, "Liste des parcs");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const parc_ = await parc.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(parc_);
    sendResponse(res, parc_, "Info sur le parc");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { nom_parc } = req.body
  try {
    const parc_ = await parc.update({
      where:{
        id : +req.params.id
      },
      data: {
        nom_parc
      },
    });
    console.log(parc_);
    sendResponse(res, parc_, "Mise à jour avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const parc_ = await parc.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, parc_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
