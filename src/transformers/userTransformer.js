const helper = require("../helpers/helper")

exports.userTransformer = (data) => {
    return {
        email: data?.email ? data.email : "",
    };
};

exports.userViewTransformer = (arrayData) => {
    let data = null;
    if (arrayData) {
        data = this.userTransformer(arrayData);
    }
    arrayData = data;
    return arrayData;
};

