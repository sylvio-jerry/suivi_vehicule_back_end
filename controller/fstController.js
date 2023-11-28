const { PrismaClient, prisma } = require("@prisma/client");
const moment = require("moment");
const { fst } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let {
    etat_de_marche,
    colis_interieur,
    num_parking,
    annotation,
    vehicule_id,
    agent_id,
    lieu_id,
    utilisateur_id,
    parc_id,
  } = req.body;
  const num_dossier = await generateNumDossierFst();
  // let date_suivi = new Date(moment());
  let date_suivi = new Date(moment().add(3, "hours"));
  try {
    const fst_ = await fst.create({
      data: {
        date_suivi,
        etat_de_marche,
        colis_interieur,
        num_parking,
        annotation,
        vehicule_id,
        agent_id,
        lieu_id,
        utilisateur_id,
        parc_id,
        num_dossier,
      },
    });
    console.log(fst_);
    sendResponse(res, fst_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta.target === "num_parking") {
        return sendError(res, "le parking est déjà reservé !");
      } else if (error.meta.target === "vehicule_id") {
        return sendError(res, "le fst de ce vehicule est déjà enregistré !");
      }
    }
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    let fst_ = await fst.findMany({
      include:{
        vehicule:{
          include:{
            fcav:{
              include:{
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
            },
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
        parc:true,
        agent:true,
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
    console.log(fst_);
    if(fst_){
      fst_ = fst_.map((fst__) => {
        const { etat_de_marche,...rest } = fst__;
    
        return {
          ...rest,
          etat_de_marche: { etat: etat_de_marche }
        };
      });
    }
    sendResponse(res, fst_, "Liste des fst");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const fst_ = await fst.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(fst_);
    sendResponse(res, fst_, "Info sur le fst");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let {
    etat_de_marche,
    colis_interieur,
    num_parking,
    annotation,
    vehicule_id,
    agent_id,
    lieu_id,
    utilisateur_id,
    parc_id,
  } = req.body;
  try {
    const fst_ = await fst.update({
      where: {
        id: +req.params.id,
      },
      data: {
        etat_de_marche,
        colis_interieur,
        num_parking,
        annotation,
        vehicule_id,
        agent_id,
        lieu_id,
        utilisateur_id,
        parc_id,
      },
    });
    console.log(fst_);
    sendResponse(res, fst_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta.target === "num_parking") {
        return sendError(res, "le parking est déjà reservé !");
      } else if (error.meta.target === "vehicule_id") {
        return sendError(res, "le fst de ce vehicule est déjà enregistré !");
      }
    }
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const fst_ = await fst.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, fst_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//NEW NUMERO
exports.generateNewNumfst = async (req, res, next) => {
  try {
    let num_dossier = await generateNumDossierFst();
    sendResponse(res, num_dossier, "Nouveau numero fst");
  } catch (error) {
    console.log(error);
  }
};

const generateNumDossierFst = async () => {
  const lastfst = await fst.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  const newId = lastfst ? lastfst.id + 1 : 1;
  const paddedId = String(newId).padStart(4, "0");

  return `FST-${paddedId}`;
};
