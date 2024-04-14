const {QueryTypes} = require('sequelize');
const sequelize = require('../connection/connection');

module.exports.userDetails = async (data) => {
    try {
        let query = `SELECT u."userId",json_agg(json_build_object(
                  'firstName',u."firstName",'lastName',u."lastName",'about',u."about",'profilePicture',u."profilePicture",
                  'petId',p."petId",'name',p."name",'petPicture',p."petPicture",'typeId',p."typeId",'breedId',p."breedId",'type',t."type",'typeSp',t."typeSp",'breed',b."breed",'breedSp',b."breedSp",'gender',p."gender"
                 )) as item,
                          (
                            SELECT  COUNT(*) FROM friends AS f
                            WHERE ( f."userId1"::text = '${data.userId}' OR f."userId2"::text = '${data.userId}')
                            AND f."isFriend" = true
                          ) AS "totalFriends",
                          (
                            SELECT COUNT(*) FROM offers AS o
                            WHERE o."userId"::text = '${data.userId}' AND o."isOfferRequest" = true 
                          ) AS "totalHelp"
                     FROM users as u
                     LEFT JOIN pets as p ON p."userId"::text = '${data.userId}' AND p.status = 1
                     LEFT JOIN pet_types AS t ON t."petTypeId"::text = p."typeId"::text AND t.status = 1
                     LEFT JOIN pet_breeds AS b ON b."petBreedId"::text = p."breedId"::text AND b.status = 1
                     WHERE u."userId"::text = '${data.userId}' AND u.status = 1
                     GROUP BY u."userId"`

        let viewUser = await sequelize.query(
            query,
            {
                type: QueryTypes.SELECT
            }
        );

        return viewUser
    } catch (e) {
        console.log(e)
    }
};
