const { PrismaClient, prisma } = require("@prisma/client");
const moment = require("moment");
const { equipe } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { nom_equipe, date_operation,observation, shift_id, docker_id,is_jour_ferie } = req.body;
  date_operation = new Date(date_operation);

  try {
    const equipe_ = await equipe.create({
      data: {
        nom_equipe,
        date_operation,
        observation,
        shift_id,
        is_jour_ferie,
        equipe_detail: {
          createMany: {
            data: data_docker_,
          },
        },
      },
    });
    console.log(equipe_);
    sendResponse(res, equipe_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "le equipe est déjà enregistré !");
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { nom_equipe, date_operation,observation, shift_id, docker_id,is_jour_ferie } = req.body;
  date_operation = new Date(date_operation);
  data_docker_ = [];

  docker_id.map((id_) => {
    data_docker_.push({
      docker_id: id_,
    });
  });

  const { id } = req.params;
  try {
    const equipe_ = await equipe.update({
      where: {
        id: +id,
      },
      data: {
        nom_equipe,
        date_operation,
        observation,
        shift_id,
        is_jour_ferie,
        equipe_detail: {
          deleteMany: {},
          createMany: {
            data: data_docker_,
          },
        },
      },
    });
    console.log(equipe_);
    sendResponse(res, equipe_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "le equipe est déjà enregistré !");
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    let equipeData = []
    const equipe_ = await equipe.findMany({
      orderBy: [
        {
          date_operation: "desc",
        },
        {
          shift_id: "asc",
        },
      ],
      include: {
        equipe_detail: {
          include: {
            docker: true,
          },
        },
        shift:true,
        pointage:true
      },
    });
    if(equipe_){   
      equipeData = equipe_.map((equipe__) => {
        return {
          id: equipe__.id,
          nom_equipe: equipe__.nom_equipe,
          equipe:`${equipe__.nom_equipe}-${moment(equipe__.date_operation).format("DD/MM/YYYY")}`,
          date_operation: equipe__.date_operation,
          shift_id: equipe__.shift_id,
          observation: equipe__.observation,
          is_jour_ferie: equipe__.is_jour_ferie,
          docker: equipe__.equipe_detail.map((detail) => {
            return {
              id: detail.docker.id,
              nom: detail.docker.nom,
              prenom: detail.docker.prenom,
              num_cin: detail.docker.num_cin,
              num_docker: detail.docker.num_docker,
            };
          }),
          shift: {
            id: equipe__.shift.id,
            num_shift: equipe__.shift.num_shift,
            description: equipe__.shift.description,
          },
          pointage:equipe__.pointage
        };
      });
      
      console.log(equipeData);
      
    }
    console.log("EQUIPE",equipe_);
    console.log("equipeData",equipeData);
    sendResponse(res, equipeData, "Liste des equipes");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

// exports.findAll = async (req, res, next) => {
//   try {
//     const equipes = await equipe.findMany({
//       orderBy: {
//         date_operation: "asc",
//       },
//       include: {
//         equipe_detail: {
//           include: {
//             docker: true,
//           },
//         },
//       },
//     });

//     // Organisez les données en fonction de la date d'opération de groupe et du shift
//     const timelineData = [];
//     equipes.forEach((equipe) => {
//       // Recherchez si la date d'opération de groupe existe dans timelineData
//       const existingDate = timelineData.find(
//         (item) => item.date_operation === equipe.date_operation && item.shift_id === equipe.shift_id
//       );

//       if (existingDate) {
//         // La date d'opération de groupe existe, ajoutez le groupe et le docker à cet élément
//         existingDate.groupes.push({
//           nom_equipe: equipe.nom_equipe,
//           docker_count: equipe.equipe_detail.length,
//           dockers: equipe.equipe_detail.map((detail) => ({
//             id: detail.docker.id,
//             nom: detail.docker.nom,
//             num_cin: detail.docker.num_cin,
//           })),
//         });
//       } else {
//         // La date d'opération de groupe n'existe pas, créez un nouvel élément
//         timelineData.push({
//           date_operation: equipe.date_operation,
//           shift_id: equipe.shift_id,
//           equipes: [
//             {
//               nom_equipe: equipe.nom_equipe,
//               docker_count: equipe.equipe_detail.length,
//               dockers: equipe.equipe_detail.map((detail) => ({
//                 id: detail.docker.id,
//                 nom: detail.docker.nom,
//                 num_cin: detail.docker.num_cin,
//               })),
//             },
//           ],
//         });
//       }
//     });

//     console.log(timelineData);
//     sendResponse(res, timelineData, "Liste des équipes pour la timeline");
//   } catch (error) {
//     console.log(error);
//     sendError(res);
//   }
// };

//FINDONE

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const equipe_ = await equipe.findUnique({
      where: {
        id: +id,
      },
      include: {
        equipe_detail: {
          include: {
            docker: true,
          },
        },
      },
    });
    console.log(equipe_);
    sendResponse(res, equipe_, "Info sur le equipe");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const equipe_ = await equipe.delete({
      where: {
        id: +id,
      },
    });
    sendResponse(res, equipe_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};
