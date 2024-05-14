import {
    getDramas,
    getDrama,
    createDrama,
    // updateDrama,
    getDramaByChinese,
    getDramaChineseHighestRating,
    getDramaChineseMostReviews,
    getDramaChineseNewest,
    getDramaChineseOldest,
    getDramaByKorean,
    getDramaKoreanNewest,
    getDramaKoreanOldest,
    getDramaKoreanMostReviews,
    getDramaKoreanHighestRating,
    getDramaByJapanese,
    getDramaJapaneseNewest,
    getDramaJapaneseOldest,
    getDramaJapaneseHighestRating,
    getDramaJapaneseMostReviews,
    getDramaByEnglish,
    searchByDramaName,
    getDramaEnglishNewest,
    getDramaEnglishOldest,
    getDramaEnglishHighestRating,
    getDramaEnglishMostReviews,
    getDramasByActionGenre,
    getDramasByActionGenreNewest,
    getDramasByActionGenreOldest,
    getDramasByActionGenreHighestRating,
    getDramasByActionGenreMostReviews,
    getDramasByAdventureGenre,
    getDramasByAdventureGenreNewest,
    getDramasByAdventureGenreOldest,
    getDramasByAdventureGenreHighestRating,
    getDramasByAdventureGenreMostReviews,
    getDramasByRomanceGenre,
    getDramasByRomanceGenreNewest,
    getDramasByRomanceGenreOldest,
    getDramasByRomanceGenreHighestRating,
    getDramasByRomanceGenreMostReviews,
    getDramasBySciFiGenre,
    getDramasBySciFiGenreNewest,
    getDramasBySciFiGenreOldest,
    getDramasBySciFiGenreHighestRating,
    getDramasBySciFiGenreMostReviews,
    getDramasByFantasyGenre,
    getDramasByFantasyGenreNewest,
    getDramasByFantasyGenreOldest,
    getDramasByFantasyGenreMostReviews,
    getDramasByFantasyGenreHighestRating,
    getDramasByComedyGenre,
    getDramasByComedyGenreNewest,
    getDramasByComedyGenreOldest,
    getDramasByComedyGenreHighestRating,
    getDramasByComedyGenreMostReviews,
} from "../controllers/drama.js";
import express from "express";
const dramaRouter = express.Router();

dramaRouter.get("/", getDramas);
dramaRouter.get("/dramaId=:dramaId", getDrama);
dramaRouter.post("/", createDrama);
dramaRouter.get("/search", searchByDramaName);

// Chinese
dramaRouter.get("/chinese", getDramaByChinese);
dramaRouter.get("/chinese/newest", getDramaChineseNewest);
dramaRouter.get("/chinese/oldest", getDramaChineseOldest);
dramaRouter.get("/chinese/highestRating", getDramaChineseHighestRating);
dramaRouter.get("/chinese/mostReviewed", getDramaChineseMostReviews);
// Korean
dramaRouter.get("/korean", getDramaByKorean);
dramaRouter.get("/korean/newest", getDramaKoreanNewest);
dramaRouter.get("/korean/oldest", getDramaKoreanOldest);
dramaRouter.get("/korean/highestRating", getDramaKoreanHighestRating);
dramaRouter.get("/korean/mostReviewed", getDramaKoreanMostReviews);
// Japanese
dramaRouter.get("/japanese", getDramaByJapanese);
dramaRouter.get("/japanese/newest", getDramaJapaneseNewest);
dramaRouter.get("/japanese/oldest", getDramaJapaneseOldest);
dramaRouter.get("/japanese/highestRating", getDramaJapaneseHighestRating);
dramaRouter.get("/japanese/mostReviewed", getDramaJapaneseMostReviews);
// english
dramaRouter.get("/english", getDramaByEnglish);
dramaRouter.get("/english/newest", getDramaEnglishNewest);
dramaRouter.get("/english/oldest", getDramaEnglishOldest);
dramaRouter.get("/english/highestRating", getDramaEnglishHighestRating);
dramaRouter.get("/english/mostReviewed", getDramaEnglishMostReviews);
// action
dramaRouter.get("/action", getDramasByActionGenre);
dramaRouter.get("/action/newest", getDramasByActionGenreNewest);
dramaRouter.get("/action/oldest", getDramasByActionGenreOldest);
dramaRouter.get("/action/highestRating", getDramasByActionGenreHighestRating);
dramaRouter.get("/action/mostReviewed", getDramasByActionGenreMostReviews);
// sci-fi
dramaRouter.get("/sci-fi", getDramasBySciFiGenre);
dramaRouter.get("/sci-fi/newest", getDramasBySciFiGenreNewest);
dramaRouter.get("/sci-fi/oldest", getDramasBySciFiGenreOldest);
dramaRouter.get("/sci-fi/highestRating", getDramasBySciFiGenreHighestRating);
dramaRouter.get("/sci-fi/mostReviewed", getDramasBySciFiGenreMostReviews);
// fantasy
dramaRouter.get("/fantasy", getDramasByFantasyGenre);
dramaRouter.get("/fantasy/newest", getDramasByFantasyGenreNewest);
dramaRouter.get("/fantasy/oldest", getDramasByFantasyGenreOldest);
dramaRouter.get("/fantasy/highestRating", getDramasByFantasyGenreHighestRating);
dramaRouter.get("/fantasy/mostReviewed", getDramasByFantasyGenreMostReviews);
// adventure
dramaRouter.get("/adventure", getDramasByAdventureGenre);
dramaRouter.get("/adventure/newest", getDramasByAdventureGenreNewest);
dramaRouter.get("/adventure/oldest", getDramasByAdventureGenreOldest);
dramaRouter.get(
    "/adventure/highestRating",
    getDramasByAdventureGenreHighestRating
);
dramaRouter.get(
    "/adventure/mostReviewed",
    getDramasByAdventureGenreMostReviews
);
// romance
dramaRouter.get("/romance", getDramasByRomanceGenre);
dramaRouter.get("/romance/newest", getDramasByRomanceGenreNewest);
dramaRouter.get("/romance/oldest", getDramasByRomanceGenreOldest);
dramaRouter.get("/romance/highestRating", getDramasByRomanceGenreHighestRating);
dramaRouter.get("/romance/mostReviewed", getDramasByRomanceGenreMostReviews);
// comedy
dramaRouter.get("/comedy", getDramasByComedyGenre);
dramaRouter.get("/comedy/newest", getDramasByComedyGenreNewest);
dramaRouter.get("/comedy/oldest", getDramasByComedyGenreOldest);
dramaRouter.get("/comedy/highestRating", getDramasByComedyGenreHighestRating);
dramaRouter.get("/comedy/mostReviewed", getDramasByComedyGenreMostReviews);
export default dramaRouter;
