-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 25 nov. 2023 à 04:45
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `suivi_vehicule`
--

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `matricule` varchar(10) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `tel` varchar(10) DEFAULT NULL,
  `adresse` varchar(75) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `agent`
--

INSERT INTO `agent` (`id`, `matricule`, `nom`, `prenom`, `tel`, `adresse`, `role`) VALUES
(1, '1234567891', 'agent_4', NULL, NULL, 'ddzdz', 'chauffeur'),
(3, '6985', 'agent_4', NULL, NULL, 'ddzdz', 'chauffeur'),
(4, 'zaza42', 'agent_42', 'yes', '0348596582', 'ddzdz', 'driver expertise'),
(5, '9999', 'agent_4', NULL, NULL, 'ddzdz', 'chauffeur'),
(6, '1252', 'agent_4', NULL, NULL, 'ddzdz', 'chauffeur');

-- --------------------------------------------------------

--
-- Structure de la table `compagnie`
--

CREATE TABLE `compagnie` (
  `id` int(11) NOT NULL,
  `nom_compagnie` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compagnie`
--

INSERT INTO `compagnie` (`id`, `nom_compagnie`) VALUES
(1, 'EUROPA'),
(2, 'EUROPA2'),
(3, 'EUROPA3');

-- --------------------------------------------------------

--
-- Structure de la table `escale`
--

CREATE TABLE `escale` (
  `id` int(11) NOT NULL,
  `date_arrive_navire` date NOT NULL,
  `date_depart_navire` date NOT NULL,
  `date_debut_operation` date DEFAULT NULL,
  `date_fin_operation` date DEFAULT NULL,
  `navire_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `escale`
--

INSERT INTO `escale` (`id`, `date_arrive_navire`, `date_depart_navire`, `date_debut_operation`, `date_fin_operation`, `navire_id`) VALUES
(1, '2022-02-13', '2023-02-13', '2024-02-13', '2025-02-13', 3),
(2, '2020-02-10', '2020-02-10', '2020-02-10', '2020-02-10', 3);

-- --------------------------------------------------------

--
-- Structure de la table `fcav`
--

CREATE TABLE `fcav` (
  `id` int(11) NOT NULL,
  `nombre_cle` int(11) NOT NULL,
  `km_compteur` int(11) NOT NULL,
  `plaque_numeralogique` varchar(20) NOT NULL,
  `piece_manquant` varchar(75) DEFAULT NULL,
  `piece_endommagee` varchar(75) DEFAULT NULL,
  `vehicule_id` int(11) NOT NULL,
  `annotation` varchar(100) DEFAULT NULL,
  `date_suivi` datetime NOT NULL DEFAULT current_timestamp(),
  `lieu_id` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fcav`
--

INSERT INTO `fcav` (`id`, `nombre_cle`, `km_compteur`, `plaque_numeralogique`, `piece_manquant`, `piece_endommagee`, `vehicule_id`, `annotation`, `date_suivi`, `lieu_id`, `utilisateur_id`) VALUES
(1, 3, 1253, 'plaque zaza', 'piece_manquant u', 'piece_endommagee u', 5, 'annotation', '2023-11-25 05:26:31', 2, 3),
(15, 3, 1253, 'plaque u', 'piece_manquant', 'piece_endommagee', 6, 'annotation', '2023-11-25 05:30:06', 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `fst`
--

CREATE TABLE `fst` (
  `id` int(11) NOT NULL,
  `num_dossier` varchar(10) NOT NULL,
  `colis_interieur` varchar(150) DEFAULT NULL,
  `etat_de_marche` varchar(50) NOT NULL,
  `num_parking` int(5) NOT NULL,
  `annotation` varchar(100) DEFAULT NULL,
  `date_suivi` datetime NOT NULL DEFAULT current_timestamp(),
  `vehicule_id` int(11) NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  `lieu_id` int(11) DEFAULT NULL,
  `parc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fst`
--

INSERT INTO `fst` (`id`, `num_dossier`, `colis_interieur`, `etat_de_marche`, `num_parking`, `annotation`, `date_suivi`, `vehicule_id`, `agent_id`, `utilisateur_id`, `lieu_id`, `parc_id`) VALUES
(1, 'FST-0001', 'colis', 'etat', 20, 'anno', '2023-11-25 01:56:13', 3, 3, 3, 2, 1),
(14, 'FST-0014', 'colis u', 'etat u', 23, 'u anno', '2023-11-25 05:08:21', 5, 6, 7, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `groupe_lieu`
--

CREATE TABLE `groupe_lieu` (
  `id` int(11) NOT NULL,
  `nom_groupe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `groupe_lieu`
--

INSERT INTO `groupe_lieu` (`id`, `nom_groupe`) VALUES
(1, 'grp 1'),
(2, 'grp 2'),
(3, 'grp 3');

-- --------------------------------------------------------

--
-- Structure de la table `lieu`
--

CREATE TABLE `lieu` (
  `id` int(11) NOT NULL,
  `code_lieu` varchar(10) NOT NULL,
  `nom_lieu` varchar(75) NOT NULL,
  `logo` varchar(20) NOT NULL,
  `groupe_lieu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `lieu`
--

INSERT INTO `lieu` (`id`, `code_lieu`, `nom_lieu`, `logo`, `groupe_lieu_id`) VALUES
(2, '1288', 'lieu oioi', 'oi', 3),
(3, '126', 'lieu ah', 'ro', 1),
(4, '127', 'lieu fafa', 'fa', 2);

-- --------------------------------------------------------

--
-- Structure de la table `navire`
--

CREATE TABLE `navire` (
  `id` int(11) NOT NULL,
  `matricule` varchar(10) NOT NULL,
  `nom_navire` varchar(75) NOT NULL,
  `type_navire` varchar(50) NOT NULL,
  `compagnie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `navire`
--

INSERT INTO `navire` (`id`, `matricule`, `nom_navire`, `type_navire`, `compagnie_id`) VALUES
(1, '12345', 'navire vaovao', 'RORO', 1),
(3, '1234', 'navire uuu', 'big bag', 3);

-- --------------------------------------------------------

--
-- Structure de la table `parc`
--

CREATE TABLE `parc` (
  `id` int(11) NOT NULL,
  `nom_parc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `parc`
--

INSERT INTO `parc` (`id`, `nom_parc`) VALUES
(1, 'parck'),
(2, 'parck 1');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `agent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `is_admin`, `agent_id`) VALUES
(1, 'nabo.sylvio@gmail.com', '$2a$10$QFTKtxk3fana5ntQVtw8OOCgMkwl7Sx88NY2gLM8j52vsI464YDs2', 1, 6),
(3, 'naboo.sylvio@gmail.com', '$2a$10$IeF2k3oy46/n46Zt3iVfXe29xdew3B8s64lStK9OZuMRRz28xfFP2', 0, 3),
(7, 'naboi.sylvio@gmail.com', '$2a$10$Ory3WIKBObXP6uBh/5CUzOSfa3pY7Isqi6/ZKZoBS7WrxPN3FTNQa', 1, 4),
(10, 'nabozaza.sylvio@gmail.com', '$2a$10$iY.S6mWqdmwmfrtZsMQ/ie34icN9P7nYr1cmAWeIhFikFexpyXUyO', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

CREATE TABLE `vehicule` (
  `id` int(11) NOT NULL,
  `num_chassi` varchar(20) NOT NULL,
  `marque` varchar(50) NOT NULL,
  `modele` varchar(50) NOT NULL,
  `couleur` varchar(20) NOT NULL,
  `nombre_place` int(2) NOT NULL,
  `etat_vehicule` varchar(50) NOT NULL,
  `genre_vehicule` varchar(50) NOT NULL,
  `type_vehicule` varchar(50) NOT NULL,
  `navire_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vehicule`
--

INSERT INTO `vehicule` (`id`, `num_chassi`, `marque`, `modele`, `couleur`, `nombre_place`, `etat_vehicule`, `genre_vehicule`, `type_vehicule`, `navire_id`) VALUES
(3, '128', 'marque fafa', 'fa', 'blue', 18, 'NEUVE', 'za', 'MERZ', 1),
(5, '129', 'marque fafa', 'fa', 'blue', 18, 'NEUVE', 'za', 'MERZ', 1),
(6, '130', 'marque fafa', 'fa', 'blue', 18, 'NEUVE', 'za', 'MERZ', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule_agent` (`matricule`);

--
-- Index pour la table `compagnie`
--
ALTER TABLE `compagnie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `escale`
--
ALTER TABLE `escale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shift_navire` (`navire_id`);

--
-- Index pour la table `fcav`
--
ALTER TABLE `fcav`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plaque_numeralogique` (`plaque_numeralogique`),
  ADD UNIQUE KEY `vehicule_id` (`vehicule_id`),
  ADD KEY `fk_fcav_utilisateur` (`utilisateur_id`),
  ADD KEY `fk_fcav_lieu` (`lieu_id`);

--
-- Index pour la table `fst`
--
ALTER TABLE `fst`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `num_parking` (`num_parking`),
  ADD UNIQUE KEY `num_dossier` (`num_dossier`),
  ADD UNIQUE KEY `vehicule_id` (`vehicule_id`),
  ADD KEY `fk_fst_parc` (`parc_id`),
  ADD KEY `fk_fst_utilisateur` (`utilisateur_id`),
  ADD KEY `fk_fst_agent` (`agent_id`),
  ADD KEY `fk_fst_lieu` (`lieu_id`);

--
-- Index pour la table `groupe_lieu`
--
ALTER TABLE `groupe_lieu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lieu`
--
ALTER TABLE `lieu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lieu_groupe_lieu` (`groupe_lieu_id`);

--
-- Index pour la table `navire`
--
ALTER TABLE `navire`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`),
  ADD KEY `fk_navire_compagnie` (`compagnie_id`);

--
-- Index pour la table `parc`
--
ALTER TABLE `parc`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_user` (`email`),
  ADD UNIQUE KEY `agent_id` (`agent_id`);

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `num_chassi` (`num_chassi`),
  ADD KEY `fk_vehicule_navire` (`navire_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `compagnie`
--
ALTER TABLE `compagnie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `escale`
--
ALTER TABLE `escale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `fcav`
--
ALTER TABLE `fcav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `fst`
--
ALTER TABLE `fst`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `groupe_lieu`
--
ALTER TABLE `groupe_lieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `lieu`
--
ALTER TABLE `lieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `navire`
--
ALTER TABLE `navire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `parc`
--
ALTER TABLE `parc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `escale`
--
ALTER TABLE `escale`
  ADD CONSTRAINT `fk_shift_navire` FOREIGN KEY (`navire_id`) REFERENCES `navire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fcav`
--
ALTER TABLE `fcav`
  ADD CONSTRAINT `fk_fcav_lieu` FOREIGN KEY (`lieu_id`) REFERENCES `lieu` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_fcav_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_fcav_vehicule` FOREIGN KEY (`vehicule_id`) REFERENCES `vehicule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fst`
--
ALTER TABLE `fst`
  ADD CONSTRAINT `fk_fst_agent` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_fst_lieu` FOREIGN KEY (`lieu_id`) REFERENCES `lieu` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_fst_parc` FOREIGN KEY (`parc_id`) REFERENCES `parc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fst_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_fst_vehicule` FOREIGN KEY (`vehicule_id`) REFERENCES `vehicule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `lieu`
--
ALTER TABLE `lieu`
  ADD CONSTRAINT `fk_lieu_groupe_lieu` FOREIGN KEY (`groupe_lieu_id`) REFERENCES `groupe_lieu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `navire`
--
ALTER TABLE `navire`
  ADD CONSTRAINT `fk_navire_compagnie` FOREIGN KEY (`compagnie_id`) REFERENCES `compagnie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_agent_utilisateur` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD CONSTRAINT `fk_vehicule_navire` FOREIGN KEY (`navire_id`) REFERENCES `navire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
