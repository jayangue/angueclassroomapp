var MESSAGE_COLLECTION = [];

function getCollection()
{
    return MESSAGE_COLLECTION;
}

function start(data)
{
    MESSAGE_COLLECTION.push(data);
    console.log(`SVComp_Chat >> ${data}`);
}

//===================================================================================//

module.exports = 
{
    start:start,
    getCollection:getCollection
};