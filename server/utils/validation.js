var isRealString = function(param){
    return typeof param === 'string' && param.trim().length > 0
}

module.exports = {isRealString}