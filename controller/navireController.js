const { PrismaClient, prisma } = require("@prisma/client");

const { navire } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { matricule, nom_navire, type_navire, compagnie_id } = req.body;
  try {
    const navire_ = await navire.create({
      data: {
        matricule,
        nom_navire,
        type_navire,
        compagnie_id,
      },
    });
    console.log(navire_);
    sendResponse(res, navire_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "Ce navire existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    let navire_ = await navire.findMany({
      include:{
        compagnie:true
      }
    });
    console.log(navire_);
    if(navire_){
      navire_ = navire_.map((navire__) => {
        const { type_navire, ...rest } = navire__;
    
        return {
          ...rest,
          type_navire: { type: type_navire }
        };
      });
    }
    sendResponse(res, navire_, "Liste des navires");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const navire_ = await navire.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(navire_);
    sendResponse(res, navire_, "Info sur le navire");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { matricule, nom_navire, type_navire, compagnie_id } = req.body;
  try {
    const navire_ = await navire.update({
      where: {
        id: +req.params.id,
      },
      data: {
        matricule,
        nom_navire,
        type_navire,
        compagnie_id,
      },
    });
    console.log(navire_);
    sendResponse(res, navire_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "ce navire existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const navire_ = await navire.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, navire_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
