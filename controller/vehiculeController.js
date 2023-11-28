const { PrismaClient, prisma } = require("@prisma/client");

const { vehicule } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let {
    num_chassi,
    marque,
    modele,
    escale_id,
    couleur,
    nombre_place,
    etat_vehicule,
    genre_vehicule,
    type_vehicule,
  } = req.body;
  try {
    const vehicule_ = await vehicule.create({
      data: {
        num_chassi,
        marque,
        modele,
        escale_id,
        couleur,
        nombre_place,
        etat_vehicule,
        genre_vehicule,
        type_vehicule,
      },
    });
    console.log(vehicule_);
    sendResponse(res, vehicule_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "Ce vehicule existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    let vehicule_ = await vehicule.findMany({
      orderBy: {
        escale: {
          date_arrive_navire: "desc",
        },
      },
      include: {
        escale: {
          include: {
            navire: {
              include:{
                compagnie:true
              }
            },
          },
        },
        fst: {
          include: {
            parc: true,
            agent: true,
            lieu: {
              include: {
                groupe_lieu: true,
              },
            },
            utilisateur: {
              include: {
                agent: true,
              },
            },
          },
        },
        fcav: {
          include: {
            lieu: {
              include: {
                groupe_lieu: true,
              },
            },
            utilisateur: {
              include: {
                agent: true,
              },
            },
          },
        },
      },
    });
    console.log(vehicule_);
    if (vehicule_) {
      vehicule_ = vehicule_.map((vehicule__) => {
        const { genre_vehicule, etat_vehicule, type_vehicule, ...rest } =
          vehicule__;

        return {
          ...rest,
          genre_vehicule: { genre: genre_vehicule },
          etat_vehicule: { etat: etat_vehicule },
          type_vehicule: { type: type_vehicule },
        };
      });
    }
    sendResponse(res, vehicule_, "Liste des vehicule");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const vehicule_ = await vehicule.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(vehicule_);
    sendResponse(res, vehicule_, "Info sur le vehicule");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let {
    num_chassi,
    marque,
    modele,
    escale_id,
    couleur,
    nombre_place,
    etat_vehicule,
    genre_vehicule,
    type_vehicule,
  } = req.body;
  try {
    const vehicule_ = await vehicule.update({
      where: {
        id: +req.params.id,
      },
      data: {
        num_chassi,
        marque,
        modele,
        escale_id,
        couleur,
        nombre_place,
        etat_vehicule,
        genre_vehicule,
        type_vehicule,
      },
    });
    console.log(vehicule_);
    sendResponse(res, vehicule_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "ce vehicule existe déjà !");
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const vehicule_ = await vehicule.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, vehicule_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
