const { PrismaClient, prisma } = require("@prisma/client");

const { navire, agent, vehicule, pointage } = new PrismaClient();
const { sendError, sendResponse } = require("./baseController");
const moment = require("moment");

//GET REVIEW
exports.getReview = async (req, res, next) => {

  let { date_debut, date_fin } = req.body;

  date_debut = new Date(moment(date_debut).startOf("day"));
  date_fin = new Date(moment(date_fin).endOf("day"));

  try {
    const navire_ = await getNavireCount();
    const chauffeur = await getAgentCount("Chauffeur");
    const driver_expertise_ = await getAgentCount("Agent expertise");
    const all_vehicule_ = await getVehicule(date_debut,date_fin);
    let vehicule_with_fst = 0;
    let vehicule_with_fcav = 0;
    let vehicule_traited = 0;
    let vehicule_not_traited = 0;
    let vehicule_count = 0;

    if(all_vehicule_){
      vehicule_count = all_vehicule_.length || 0 
      vehicule_with_fst = all_vehicule_.filter((vehicule_=>vehicule_.fst!==null)).length || 0 
      vehicule_with_fcav = all_vehicule_.filter((vehicule_=>vehicule_.fcav!==null)).length || 0 
      vehicule_traited = all_vehicule_.filter((vehicule_=>(vehicule_.fst!==null) && (vehicule_.fcav!==null))).length || 0 
      vehicule_not_traited = all_vehicule_.filter((vehicule_=>(vehicule_.fst===null) || (vehicule_.fcav===null))).length || 0 
    }

    let review = {
      navire_count: navire_,
      chauffeur_count: chauffeur,
      driver_expertise_count: driver_expertise_,
      fiche_data: [vehicule_count, vehicule_with_fst,vehicule_with_fcav,vehicule_not_traited,vehicule_traited],
      agent:[chauffeur,driver_expertise_]
    };
    sendResponse(res, review, "Review");
  } catch (error) {
    console.log(error);
    sendError(res);
  }
};

//GET NAVIRE COUNT
const getNavireCount = async () => {
  let navire_count = 0;
  try {
    const navire_ = await navire.count();
    navire_count = navire_;
  } catch (error) {
    console.log(error);
  }
  return navire_count;
};

//GET AGENT COUNT
const getAgentCount = async (role) => {
  let agent_count = 0;
  try {
    const agent_ = await agent.count({
      where: {
        role: {
          equals: role,
        },
      },
    });
    agent_count = agent_;
  } catch (error) {
    console.log(error);
  }
  return agent_count;
};

//GET VEHICULE BETWEEN TWO DATE
const getVehicule = async (date_debut,date_fin) => {
  try {
    let vehicule_ = await vehicule.findMany({
      where:{
        escale:{
          date_arrive_navire: {
            gte: date_debut,
            lte: date_fin,
          },
        }
      },
      include: {
        fst: true,
        fcav: true
      },
    });
    return vehicule_;
  } catch (error) {
    console.log(error);
  }

};
