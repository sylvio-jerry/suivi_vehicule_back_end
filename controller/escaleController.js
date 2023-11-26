const { PrismaClient, prisma } = require("@prisma/client");

const { escale } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");
const moment = require("moment");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let {
    date_arrive_navire,
    date_depart_navire,
    date_debut_operation,
    date_fin_operation,
    navire_id,
  } = req.body;

  date_arrive_navire = new Date(date_arrive_navire);
  date_depart_navire = new Date(date_depart_navire);
  date_debut_operation = date_debut_operation
    ? new Date(date_debut_operation)
    : date_debut_operation;
  date_fin_operation = date_fin_operation
    ? new Date(date_fin_operation)
    : date_fin_operation;

  try {
    const escale_ = await escale.create({
      data: {
        date_arrive_navire,
        date_depart_navire,
        date_debut_operation,
        date_fin_operation,
        navire_id,
      },
    });
    console.log(escale_);
    sendResponse(res, escale_, "Ajout avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const escale_ = await escale.findMany({
      orderBy: {
        date_arrive_navire: "desc",
      },
      include: {
        navire: true,
      },
    });
    console.log(escale_);
    sendResponse(res, escale_, "Liste des escale");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const escale_ = await escale.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(escale_);
    sendResponse(res, escale_, "Info sur l'escale");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let {
    date_arrive_navire,
    date_depart_navire,
    date_debut_operation,
    date_fin_operation,
    navire_id,
  } = req.body;

  date_arrive_navire = new Date(date_arrive_navire);
  date_depart_navire = new Date(date_depart_navire);
  date_debut_operation = date_debut_operation
    ? new Date(date_debut_operation)
    : date_debut_operation;
  date_fin_operation = date_fin_operation
    ? new Date(date_fin_operation)
    : date_fin_operation;

  try {
    const escale_ = await escale.update({
      where: {
        id: +req.params.id,
      },
      data: {
        date_arrive_navire,
        date_depart_navire,
        date_debut_operation,
        date_fin_operation,
        navire_id,
      },
    });
    console.log(escale_);
    sendResponse(res, escale_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "ce escale existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const escale_ = await escale.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, escale_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
