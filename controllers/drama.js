// CRUD Controllers
import { Sequelize } from "sequelize";
import Drama from "../models/drama.js";
import Review from "../models/review.js";
import fetch from "node-fetch";

//get all Drama
export function getDramas(req, res, next) {
    Drama.findAll()
        .then((dramas) => {
            res.status(200).json({ dramas: dramas });
        })
        .catch((err) => console.log(err));
}

export const searchByDramaName = (req, res) => {
    console.log("QUERY REQUEST", req.query);
    const query = req.query.q;

    Drama.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: `%${query}%`,
            },
        },
    })
        .then((dramas) => {
            res.status(200).json({ dramas: dramas });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Internal server error" });
        });
};

// get Drama by id
export function getDrama(req, res, next) {
    const dramaId = Number(req.params.dramaId);
    console.log("drama id: ", dramaId);
    Drama.findByPk(dramaId)
        .then((drama) => {
            if (!drama) {
                return res.status(404).json({ message: "Drama not found!" });
            } else {
                res.status(200).json({ drama: drama });
            }
        })
        .catch((err) => console.log(err));
}

export const getDramaByChinese = async (req, res) => {
    const languageToSearch = "Chinese";

    try {
        const dramas = await Drama.findAll({
            where: {
                language: languageToSearch, // Filter by language 'Chinese'
            },
        });

        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting Chinese dramas", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDramaChineseNewest = async (req, res) => {
    const language = "Chinese";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaChineseOldest = async (req, res) => {
    const language = "Chinese";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaChineseMostReviews = async (req, res) => {
    const language = "Chinese";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaChineseHighestRating = async (req, res) => {
    const language = "Chinese";
    console.log("HIGHEST RATING");
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                language: language,
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaByJapanese = async (req, res) => {
    const languageToSearch = "Japanese";
    try {
        const dramas = await Drama.findAll({
            where: {
                language: languageToSearch, // Filter by language 'Chinese'
            },
        });

        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting Japanese dramas", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDramaJapaneseNewest = async (req, res) => {
    const language = "Japanese";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaJapaneseOldest = async (req, res) => {
    const language = "Japanese";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaJapaneseMostReviews = async (req, res) => {
    const language = "Japanese";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaJapaneseHighestRating = async (req, res) => {
    const language = "Japanese";
    console.log("HIGHEST RATING");
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                language: language,
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaByEnglish = async (req, res) => {
    const languageToSearch = "English";
    try {
        const dramas = await Drama.findAll({
            where: {
                language: languageToSearch, // Filter by language 'English'
            },
        });

        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting english dramas", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDramaEnglishNewest = async (req, res) => {
    const language = "English";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting english dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaEnglishOldest = async (req, res) => {
    const language = "English";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting english dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaEnglishMostReviews = async (req, res) => {
    const language = "English";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting english dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaEnglishHighestRating = async (req, res) => {
    const language = "English";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                language: language,
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaByKorean = async (req, res) => {
    const languageToSearch = "Korean";
    try {
        const dramas = await Drama.findAll({
            where: {
                language: languageToSearch, // Filter by language 'Chinese'
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting Korean dramas", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDramaKoreanNewest = async (req, res) => {
    const language = "Korean";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaKoreanOldest = async (req, res) => {
    const language = "Korean";
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaKoreanMostReviews = async (req, res) => {
    const language = "Korean";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                language: language,
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting Chinese dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramaKoreanHighestRating = async (req, res) => {
    const language = "Korean";
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                language: language,
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const createDrama = async (req, res, next) => {
    console.log(JSON.stringify(req.body));

    const name = req.body.name;
    const description = req.body.description;
    const year = req.body.year;
    const genres = req.body.genres;
    const castMembers = req.body.castMembers;
    const language = req.body.language;
    const imgUrl = req.body.imgUrl;

    Drama.create({
        name: name,
        description: description,
        year: year,
        castMembers: castMembers,
        genres: genres,
        language: language,
        imgUrl: imgUrl,
    })
        .then((result) => {
            console.log("Created Drama");
            res.status(201).json({
                message: "Drama created successfully!",
                drama: result,
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Error creating drama: " + err,
            });
            console.log("Error creating drama: " + err);
        });
};

//update drama
// export const updateDrama = (req, res, next) => {
//     const dramaId = req.params.dramaId;
//     const updatedName = req.body.name;
//     const updatedDescription = req.body.description;
//     const updatedYear = req.body.year;
//     const updatedLanguage = req.body.language;
//     Drama.findByPk(dramaId)
//         .then((drama) => {
//             if (!drama) {
//                 return res.status(404).json({ message: "Drama not found!" });
//             }
//             drama.name = updatedName;
//             drama.description = updatedDescription;
//             drama.year = updatedYear;
//             drama.language = updatedLanguage;
//             return drama.save();
//         })
//         .then((result) => {
//             res.status(200).json({ message: "Drama updated!", drama: result });
//         })
//         .catch((err) => console.log(err));
// };

// Dramas by genre

// Action Dramas

export const getDramasByActionGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Action"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByActionGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Action"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByActionGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Action"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByActionGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Action"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByActionGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Action"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

// COMEDY DRAMAS

export const getDramasByComedyGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Comedy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByComedyGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Comedy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByComedyGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Comedy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByComedyGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Comedy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByComedyGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Comedy"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting comedy dramas with highest ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};

// Romance Dramas

export const getDramasByRomanceGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Romance"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByRomanceGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Romance"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByRomanceGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Romance"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByRomanceGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Romance"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByRomanceGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Romance"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting comedy dramas with highest ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};

// SCI-FI Dramas

export const getDramasBySciFiGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["sci-fi"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasBySciFiGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["sci-fi"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasBySciFiGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["sci-fi"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasBySciFiGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["sci-fi"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasBySciFiGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["sci-fi"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting comedy dramas with highest ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};

// ADVENTURE DRAMAS

export const getDramasByAdventureGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Adventure"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error("Error getting dramas with average ratings", error);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByAdventureGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Adventure"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting action dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByAdventureGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Adventure"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting adventure dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByAdventureGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Adventure"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting adventure dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByAdventureGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Adventure"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting adventure dramas with highest ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};

// FANTASY DRAMAS

export const getDramasByFantasyGenre = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Fantasy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting fantasy dramas with average ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByFantasyGenreNewest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "desc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Fantasy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting fantasy dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByFantasyGenreOldest = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            order: [["year", "asc"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Fantasy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting fantasy dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByFantasyGenreMostReviews = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviews"],
            ],
            include: [{ model: Review, as: "reviews", attributes: [] }],
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Fantasy"],
                },
            },
        });
        res.status(200).json({ dramas });
    } catch (e) {
        console.error("Error getting fantasy dramas", e);
        res.status(500).json({ e: "Internal Server Error" });
    }
};

export const getDramasByFantasyGenreHighestRating = async (req, res) => {
    try {
        const dramas = await Drama.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "year",
                "imgUrl",
                [
                    Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                    "reviews",
                ],
            ],
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: [],
                },
            ],
            where: {
                genres: {
                    [Sequelize.Op.contains]: ["Fantasy"],
                },
            },
            group: ["Drama.id", "Drama.name"],
            order: [[Sequelize.literal("reviews"), "DESC"]],
        });
        res.status(200).json({ dramas });
    } catch (error) {
        console.error(
            "Error getting fantasy dramas with highest ratings",
            error
        );
        res.status(500).json({ e: "Internal Server Error" });
    }
};
