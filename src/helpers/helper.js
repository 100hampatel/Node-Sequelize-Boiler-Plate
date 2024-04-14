const {
    IMAGE_LINK,
    PAGINATION_LIMIT,
    ACTIVE_STATUS
} = require("../../config/key");
const path = require("path");
const fs = require("fs");
const {Op} = require("sequelize");

module.exports = {
    toUpperCaseValidation: (str) => {
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "";
    },

    validationMessageKey: (apiTag, error) => {
        let key = module.exports.toUpperCaseValidation(
            error.details[0].context.key
        );
        let type = error.details[0].type.split(".");
        type[1] = type[1] === "empty" ? "required" : type[1];
        type = module.exports.toUpperCaseValidation(type[1]);
        key = apiTag + key + type;
        return key;
    },
    compareDomains:(domain1, domain2)=> {
        // Parse the domains
        const parsedDomain1 = new URL(domain1);
        const parsedDomain2 = new URL(domain2);

        return parsedDomain1.hostname === parsedDomain2.hostname;
    },
    imageURL: (imageName, fileName) => {
        let urlData = "";
        urlData = `${IMAGE_LINK}${fileName}/${imageName}`;
        return urlData;
    },

    otpFunction: async () => {
        let otp = Math.floor(Math.random() * 9000) + 1000;
        otp = parseInt(otp);
        return otp;
    },

   

    getUrlCode : (url) => {
        const petUrl = url.split("/").pop()
        return petUrl
    },

    deleteFile: (data) => {
        if (data.name !== "") {
                const filePath = path.join(__dirname, `../../public/uploads/${data.folderName}/${data.name}`);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        }
    },

    getFileName: async (file) => {
        return (file) ? ((process.env.STORAGE == "s3") ? file.key : file.filename) : "";
    },


    helpToString : (help,language)=>{
        let helpType
        if(help === "feed") helpType =(language === "en") ?  "Feed" : "Alimentar"
        if(help === "walk") helpType =(language === "en") ?  "Walk" : "Caminar"
        if(help === "sit") helpType =(language === "en") ?  "Sit" : "Cuidar"
        return helpType
    },

    helpToStringForNotification : (help,language)=>{
        let helpType
        if(help === "feed") helpType =(language === "en") ?  "Feeding" : "Alimentar"
        if(help === "walk") helpType =(language === "en") ?  "Walking" : "Caminar"
        if(help === "sit") helpType =(language === "en") ?  "Sitting" : "Cuidar"
        return helpType
    },

    sizeEnumToStringForNotification : (size,language)=>{
        let sizeType
        if(size === "small") sizeType = (language === "en") ? "Small" : "Pequeño"
        if(size === "medium") sizeType = (language === "en") ? "Medium" : "Mediano"
        if(size === "big") sizeType = (language === "en") ? "Big" : "Grande"
        return sizeType
    },



    

    getPageAndLimit: (page, limit) => {
        if (!page) page = 1;
        if (!limit) limit = PAGINATION_LIMIT;
        let limitCount = limit * 1;
        let skipCount = (page - 1) * limitCount;
        return {limitCount, skipCount};
    },

    
    makeFolderOnLocal : (fileUploadPath) => {
        if (!fs.existsSync(fileUploadPath)) {
            fs.mkdirSync(fileUploadPath, { recursive: true });
        }
    },
    searchHelper: (searchField, fields) => {
        let orArr = [];
        let search = [];

        searchField = searchField.replace(/[\*()+?[]/g, "")
        searchField = searchField.replace("]", "");
        search[0] = searchField.trim()

        fields.forEach((element1) => {
            search.forEach((element) => {
                orArr.push({[element1]: {[Op.like]: `%${element}%`}});
            });
        });
        return {[Op.or]: orArr}
    },

    sortBy: (sortBy, sortKey) => {
        let sortArr = [];
        sortBy = sortBy || "DESC";
        sortKey = sortKey || "createdAt";
        sortArr[0] = sortKey;
        sortArr[1] = sortBy;
        return sortArr;
    },
}
