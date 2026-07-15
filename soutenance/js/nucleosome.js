"use strict";

/*
  Correspondance des chaînes :

  H3  : A et E → cyan
  H4  : B et F → vert
  H2A : C et G → jaune
  H2B : D et H → rouge
  ADN : I et J → gris
*/


document.addEventListener("DOMContentLoaded", async () => {
  const viewerElement = document.getElementById(
    "nucleosome-viewer"
  );

  const messageElement = document.getElementById(
    "viewer-message"
  );

  /*
    Création du visualiseur NGL.
  */

  const stage = new NGL.Stage(viewerElement, {
    backgroundColor: "white",
    quality: "high",
    sampleLevel: 2
  });


  /*
    Ajuster automatiquement le visualiseur
    lorsque la fenêtre change de taille.
  */

  window.addEventListener("resize", () => {
    stage.handleResize();
  });


  try {
    /*
      Chargement du PDB depuis le dossier structures.
    */

    const component = await stage.loadFile(
      "structures/nucleosome.pdb",
      {
        ext: "pdb",
        defaultRepresentation: false
      }
    );


    /*
      Faire disparaître le message de chargement.
    */

    if (messageElement) {
      messageElement.style.display = "none";
    }


    /*
      ADN — chaînes I et J — gris.

      La représentation "cartoon" permet
      d'afficher les acides nucléiques sous
      une forme structurale claire.
    */

    component.addRepresentation("cartoon", {
      sele: ":I or :J",
      colorValue: 0xb8b8b8,
      quality: "high",
      opacity: 1,
      smoothSheet: true,
      aspectRatio: 4.2
    });


    /*
      H3 — chaînes A et E — cyan.
    */

    component.addRepresentation("cartoon", {
      sele: ":A or :E",
      colorValue: 0x18b7c9,
      quality: "high",
      opacity: 1,
      smoothSheet: true
    });


    /*
      H4 — chaînes B et F — vert.
    */

    component.addRepresentation("cartoon", {
      sele: ":B or :F",
      colorValue: 0x2fa84f,
      quality: "high",
      opacity: 1,
      smoothSheet: true
    });


    /*
      H2A — chaînes C et G — jaune.
    */

    component.addRepresentation("cartoon", {
      sele: ":C or :G",
      colorValue: 0xf2c300,
      quality: "high",
      opacity: 1,
      smoothSheet: true
    });


    /*
      H2B — chaînes D et H — rouge.
    */

    component.addRepresentation("cartoon", {
      sele: ":D or :H",
      colorValue: 0xd6261c,
      quality: "high",
      opacity: 1,
      smoothSheet: true
    });


    /*
      Centrer automatiquement la structure.
    */

    component.autoView();


    /*
      Légère diminution du zoom pour éviter
      que le nucléosome touche les bords.
    */

    stage.viewerControls.zoom(-0.12);


    /*
      Rotation automatique.

      La structure reste également manipulable
      avec la souris.
    */

    stage.setSpin(true);


    /*
      Désactiver le clipping trop proche.
    */

    stage.setParameters({
      clipNear: 0,
      clipFar: 100,
      cameraType: "perspective"
    });


  } catch (error) {
    console.error(
      "Erreur lors du chargement du nucléosome :",
      error
    );

    if (messageElement) {
      messageElement.innerHTML =
        "Impossible de charger le fichier PDB.<br>" +
        "Vérifie que le fichier existe sous :<br>" +
        "<strong>structures/nucleosome.pdb</strong>";
    }
  }
});
