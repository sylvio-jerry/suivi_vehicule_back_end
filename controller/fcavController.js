const { PrismaClient, prisma } = require("@prisma/client");
const moment = require("moment");
const { fcav } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let {
    nombre_cle,
    km_compteur,
    plaque_numeralogique,
    piece_manquant,
    piece_endommagee,
    vehicule_id,
    lieu_id,
    utilisateur_id,
    annotation
  } = req.body;

  // let date_suivi = new Date(moment());
  let date_suivi = new Date(moment().add(3, "hours"));
  try {
    const fcav_ = await fcav.create({
      data: {
        date_suivi,
        nombre_cle,
        km_compteur,
        plaque_numeralogique,
        piece_manquant,
        piece_endommagee,
        vehicule_id,
        lieu_id,
        utilisateur_id,
        annotation
      },
    });
    sendResponse(res, fcav_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta.target === "plaque_numeralogique") {
        return sendError(res, "le plaque_numeralogique est déjà attribué à un véhicule !");
      } else if (error.meta.target === "vehicule_id") {
        return sendError(res, "le fcav de ce vehicule est déjà enregistré !");
      }
    }
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const fcav_ = await fcav.findMany({
      include:{
        vehicule:{
          include:{
            fst:true,
            escale:{
              include:{
                navire:{
                  include:{
                    compagnie:true
                  }
                }
              }
            }
          }
        },
        lieu:{
          include:{
            groupe_lieu:true
          }
        },
        utilisateur:{
          include:{
            agent:true
          }
        }
      }
    });
    console.log(fcav_);
    sendResponse(res, fcav_, "Liste des fcavs");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const fcav_ = await fcav.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(fcav_);
    sendResponse(res, fcav_, "Info sur le fcav");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let {
    nombre_cle,
    km_compteur,
    plaque_numeralogique,
    piece_manquant,
    piece_endommagee,
    vehicule_id,
    lieu_id,
    utilisateur_id,
    annotation
  } = req.body;
  try {
    const fcav_ = await fcav.update({
      where: {
        id: +req.params.id,
      },
      data: {
        nombre_cle,
        km_compteur,
        plaque_numeralogique,
        piece_manquant,
        piece_endommagee,
        vehicule_id,
        lieu_id,
        utilisateur_id,
        annotation
      },
    });
    console.log(fcav_);
    sendResponse(res, fcav_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta.target === "plaque_numeralogique") {
        return sendError(res, "le plaque_numeralogique est déjà attribué à un véhicule !");
      } else if (error.meta.target === "vehicule_id") {
        return sendError(res, "le fcav de ce vehicule est déjà enregistré !");
      }
    }
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const fcav_ = await fcav.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, fcav_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
