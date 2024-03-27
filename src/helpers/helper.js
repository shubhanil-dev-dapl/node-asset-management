const { Asset } = require('../../models/Asset');
const { Op } = require('sequelize');

function generateSlugToString(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens

    return str;
}


function generateAssetCode(slug, category_type_id) {
    const assetsCount = Asset.count({
        where: {
            [Op.and]: [
                { category_type_id: { [Op.eq]: category_type_id } },
                { slug: { [Op.ne]: slug } }
            ]
        }
    });

    let assetCode = 1;

    if (assetsCount > 0) {
        assetCode = 'DAPL' + '-' + 'Asset-' + assetsCount;
    } else {
        assetCode = 'DAPL' + '-' + 'Asset-' + assetCode;
    }

    return assetCode;
}

module.exports = {
    generateSlugToString, generateAssetCode
}