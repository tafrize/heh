import React from 'react';

export const AddTeamImg = (players) => {
    players.forEach(player => {
      // Ajoute la propriété "teamImg" avec la source de l'image correspondante
      if (player.tlol === "Jean-Michel Crapauds") {
        player.teamImg = "/assets/agem.png";
      } else if (player.tlol === "Annyeonghaseyo") {
        player.teamImg = "/assets/agem.png";
      } else if (player.tlol ==="Lunastra") {
        player.teamImg = "/assets/agem.png";
      }
    });
    console.log("helllll");
    return players;
};

  