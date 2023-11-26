const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendError, sendResponse } = require("./baseController");
const { PrismaClient } = require("@prisma/client");
const { utilisateur } = new PrismaClient();
const { send_mail } = require("../tools/send_mail");
//send mail for creating user, send password to the user
//password forgot send confirmation code

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const all_utilisateur = await utilisateur.findMany({
        include:{
          agent:true
        }
      });
      sendResponse(res, all_utilisateur, "Liste des utilisateurs");
    } catch (error) {
      console.log("erorrrrrrrr", error);
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const utilisateur_ = await utilisateur.findFirst({
        where: { id: +id },
        include:{
          agent:true
        }
      });

      sendResponse(res, utilisateur_, "Information utilisateur");
    } catch (error) {
      next(error);
    }
  },
  getByEmail: async (req, res, next) => {
    try {
      const { email } = req.params;
      const utilisateur_ = await utilisateur.findFirst({
        where: { email: email },
      });

      sendResponse(res, utilisateur_, "Information utilisateur");
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    // Request validation

    const { email, is_admin, agent_id } = req.body;

    const password = generatePassword();

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    if (!is_admin) {
      try {
        const newUser = await utilisateur.create({
          data: {
            email,
            is_admin,
            agent_id,
            password: hashedPassword,
          },
        });

        delete newUser.password;
        if (newUser) {
          send_mail(
            email,
            "SMMC PORT TOAMASINA | SUIVI VEHICULE",
            `<p>Voici votre mot de passe pour vous connecter : <strong>${password}</strong> </p><br><p>Vous pouvez le modifier à tout moment !</p>`
          );
          message = `Utilisateur créer avec succès, le mot de passe est consultable via son adresse email : ${newUser.email}  !`;
          sendResponse(res, newUser, message);
        }
      } catch (error) {
        console.log("ERROR ", error);
        if (error.code === "P2002")
          return sendError(res, "L'utilisateur dispose déjà un compte");
        return sendError(res, error);
      }
    } else {
      //verifySuperAdminCount, should be less than 4 super Admin
      let superAdminCount = 0;
      try {
        const superAdminCount_ = await utilisateur.count({
          where: {
            is_admin: true,
          },
        });
        superAdminCount = superAdminCount_;
      } catch (error) {
        console.log(error);
      }

      if (superAdminCount < 3) {
        // Create new user
        try {
          const newUser = await utilisateur.create({
            data: {
              email,
              is_admin,
              agent_id,
              password: hashedPassword,
            },
          });

          delete newUser.password;
          if (newUser) {
            send_mail(
              email,
              "SMMC PORT TOAMASINA | SUIVI VEHICULE",
              `<p>Voici votre mot de passe pour vous connecter : <strong>${password}</strong> </p><br><p>Vous pouvez le modifier à tout moment !</p>`
            );
            message = `Utilisateur créer avec succès, le mot de passe est consultable via son adresse email : ${newUser.email}  !`;
            sendResponse(res, newUser, message);
          }
        } catch (error) {
          console.log("ERROR ", error);
          if (error.code === "P2002")
            return sendError(res, "L'utilisateur dispose déjà un compte");
          return sendError(res, error);
        }
      } else {
        sendError(res, "Le nombre d'admin est limité à 3 !");
      }
    }
  },
  login: async (req, res, next) => {
    // Request validation

    const { email, password } = req.body;
    if (!email || !password)
      sendError(res, "Veuillez remplir correctement le formulaire");
    else {
      // Check if the pseudo exists
      const user = await utilisateur.findUnique({
        where: { email }
      });

      console.log("io izy",user);
      if (!user) sendError(res, "Veuillez créer un compte pour vous connecter");
      else {
        // Check if the password correct
        bcrypt.compare(password, user.password, async (err, result) => {
          if (err) sendError(res, new Error(err));
          else if (result) {
            sendResponse(res, user, `Bienvenue ${user.email} !`);
          } else {
            sendError(res, "Mot de passe invalide");
          }
        });
      }
    }
  },
  
  update: async (req, res, next) => {
    const { id } = req.params;

    const { email, is_admin, agent_id } = req.body;

    const password = generatePassword();

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    if (!is_admin) {
      try {
        // Update password
        const updatedUser = await utilisateur.update({
          where: { id: +id },
          data: {
            email,
            is_admin,
            agent_id,
            password: hashedPassword,
          },
        });

        delete updatedUser.password;
        if (updatedUser) {
          send_mail(
            email,
            "SMMC PORT TOAMASINA | SUIVI VEHICULE",
            `<p>Votre compte a été modifié par un admin, voici votre nouveau mot de passe pour vous connecter : <strong>${password}</strong> </p><br><p>Vous pouvez le modifier à tout moment !</p>`
          );
          message = `Mise à jour avec succès, un nouveau mot de passe a été envoyé à son adresse email : ${updatedUser.email}  !`;
          sendResponse(res, updatedUser, message);
        }
      } catch (error) {
        console.log("error", error);
        if (error.code === "P2002")
        return sendError(res, "L'utilisateur dispose déjà un compte");
        sendError(res);
        // next(error)
      }
    } else {
      //verifySuperAdminCount, should be less than 4 super Admin
      let superAdminCount = 0;
      try {
        const superAdminCount_ = await utilisateur.count({
          where: {
            id: {
              not: {
                equals: +id,
              },
            },
            is_admin: true,
          },
        });
        superAdminCount = superAdminCount_;
      } catch (error) {
        console.log(error);
      }
      if (superAdminCount < 3) {
        try {
          // Update password
          const updatedUser = await utilisateur.update({
            where: { id: +id },
            data: {
              email,
              is_admin,
              agent_id,
              password: hashedPassword,
            },
          });

          delete updatedUser.password;
          if (updatedUser) {
            send_mail(
              email,
              "SMMC PORT TOAMASINA | SUIVI VEHICULE",
              `<p>Votre compte a été modifié par un admin, voici votre nouveau mot de passe pour vous connecter : <strong>${password}</strong> </p><br><p>Vous pouvez le modifier à tout moment !</p>`
            );
            message = `Mise à jour avec succès, un nouveau mot de passe a été envoyé à son adresse email : ${updatedUser.email}  !`;
            sendResponse(res, updatedUser, message);
          }
        } catch (error) {
          console.log("error", error);
          if (error.code === "P2002")
          return sendError(res, "L'utilisateur dispose déjà un compte");
          sendError(res);
          // next(error)
        }
        // sendResponse(res,superAdminCount,"admin ")
      } else {
        sendError(res, "Le nombre d' admin est limité à 3 !");
        //   console.log("update user ++++++++++++, notttttt inferieur",superAdminCount);
      }
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    // Delete  record
    try {
      const deleted_utilisateur = await utilisateur.delete({
        where: { id: +id }, // convert id to number <===> parseInt(id), Number(id)
      });
      return sendResponse(res, deleted_utilisateur, "Suppression avec succès");
    } catch (error) {
      sendError(res, error);
    }
  },
};

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
