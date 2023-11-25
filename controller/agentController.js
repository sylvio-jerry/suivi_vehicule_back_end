const { PrismaClient, prisma } = require("@prisma/client");

const { agent } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");

//AJOUT
exports.create = async (req, res, next) => {
  //CREATE
  let { matricule, nom, prenom, tel, adresse, role } = req.body;
  try {
    const agent_ = await agent.create({
      data: { matricule, nom, prenom, tel, adresse, role },
    });
    console.log(agent_);
    sendResponse(res, agent_, "Ajout avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "l'agent est déjà enregistré !");
    console.log(error);
    return sendError(res);
  }
};

//FINDALL
exports.findAll = async (req, res, next) => {
  try {
    const agent_ = await agent.findMany();
    console.log(agent_);
    sendResponse(res, agent_, "Liste des agents");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//FINDONE
exports.findOne = async (req, res, next) => {
  try {
    const agent_ = await agent.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    console.log(agent_);
    sendResponse(res, agent_, "Info sur l'agent");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};

//UPDATE
exports.update = async (req, res, next) => {
  let { matricule, nom, prenom, tel, adresse, role } = req.body;
  try {
    const agent_ = await agent.update({
      where: {
        id: +req.params.id,
      },
      data: { matricule, nom, prenom, tel, adresse, role },
    });
    console.log(agent_);
    sendResponse(res, agent_, "Mise à jour avec succès");
  } catch (error) {
    if (error.code === "P2002")
      return sendError(res, "le agent est déjà enregistré !");
    console.log(error);
    return sendError(res);
  }
};

//DELETE
exports.delete = async (req, res, next) => {
  try {
    const agent_ = await agent.delete({
      where: {
        id: +req.params.id,
      },
    });
    sendResponse(res, agent_, "Suppression avec succès");
  } catch (error) {
    console.log(error);
    return sendError(res);
  }
};