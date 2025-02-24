import React, { useEffect } from "react";
import MontCard from "./MontCardUI";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// Image Imports
import CoverNevadoToluca from "../../images/cover_Mont_nevtol.jpg";
import ModNev1 from "../../images/nevmod1.jpg";
import ModNev2 from "../../images/nevmod2.jpg";
import ModNev3 from "../../images/nevmod3.jpg";
import ModNev4 from "../../images/nevmod4.jpg";
import ModNev5 from "../../images/nevmod5.jpg";

import CoverCitla from "../../images/citlaCover.jpg";
import ModCitla1 from "../../images/citlamod1.jpg";
import ModCitla2 from "../../images/citlamod2.jpg";
import ModCitla3 from "../../images/citMod5.jpg";
import ModCitla4 from "../../images/faltaModal.jpg";
import ModCitla5 from "../../images/faltaModal.jpg";

const MontCards = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the specific card if a hash exists in the URL
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Cards Data
  const montCardsData = [
    {
      imgsrc: CoverNevadoToluca,
      titleKey: "MontCards.titleCard1",
      subtitleKey: "MontCards.titleCard2",
      textKey: "MontCards.textCard1",
      goKey: "Reservar",
      status: "btn btn-outline-success",
      imgsrcs: [ModNev1, ModNev2, ModNev3, ModNev4, ModNev5],
      descriptionKey: "montCards.descriptionCard1",
      requirements: {
        gral: "MontCards.requireCard1.gral",
        fisico: "MontCards.requireCard1.fisico",
        previos: "MontCards.requireCard1.previos",
        equipo: "MontCards.requireCard1.equipo",
        medicos: "MontCards.requireCard1.medicos",
      },
      altitudeKey: "MontCards.altitudeCard1",
      costKey: "MontCards.costCard1",
      lengthKey: "MontCards.lengthCard1",
      usd: "$ 170 USD",
      eur: "$ 150 EU",
      id: "nevado",
    },
    {
      imgsrc: CoverCitla,
      titleKey: "MontCards.titleCard2",
      subtitleKey: "MontCards.subtitleCard2",
      textKey: "MontCards.textCard2",
      goKey: "Reservar",
      status: "btn btn-outline-success",
      imgsrcs: [ModCitla1, ModCitla2, ModCitla3, ModCitla4, ModCitla5],
      descriptionKey: "MontCards.descriptionCard2",
      requirements: {
        gral: "MontCards.requireCard2.gral",
        fisico: "MontCards.requireCard2.fisico",
        previos: "MontCards.requireCard2.previos",
        equipo: "MontCards.requireCard2.equipo",
        medicos: "MontCards.requireCard2.medicos",
      },
      altitudeKey: "MontCards.altitudeCard2",
      costKey: "MontCards.costCard2",
      lengthKey: "MontCards.lengthCard2",
      usd: "$ 180 USD",
      eur: "$ 160 EU",
      id: "citlaltepetl",
    },
  ];

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        {montCardsData.map((card, index) => (
          <div key={index} className={`col-lg-4 col-md-6 col-sm-12 pt-2 ${index >= 3 ? "pt-4" : ""}`} id={card.id}>
            <MontCard
              imgsrc={card.imgsrc}
              title={t(card.titleKey)}
              subtitle={t(card.subtitleKey)}
              text={t(card.textKey)}
              go={t(card.goKey)}
              status={card.status}
              imgsrc1={card.imgsrcs[0]}
              imgsrc2={card.imgsrcs[1]}
              imgsrc3={card.imgsrcs[2]}
              imgsrc4={card.imgsrcs[3]}
              imgsrc5={card.imgsrcs[4]}
              description={t(card.descriptionKey)}
              require={t(card.requirements.gral)}
              requiref={t(card.requirements.fisico)}
              requirep={t(card.requirements.previos)}
              requiree={t(card.requirements.equipo)}
              requirem={t(card.requirements.medicos)}
              altitude={t(card.altitudeKey)}
              cost={t(card.costKey)}
              length={t(card.lengthKey)}
              usd={card.usd}
              eur={card.eur}
              id={card.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MontCards;
