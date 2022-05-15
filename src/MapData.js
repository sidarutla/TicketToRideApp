export const connections = [
    {
        source:"Vancouver",
        destination:"Calgary",
        pathway1:[[84,60,114,58],[119,57,148,53],[154,53,184,50]]
    },
    {
        source:"Calgary",
        destination:"Winnipeg",
        pathway1:[[206,47,233,36], [237,32,268,26], [272,25,300,25], [307,25,334,26], [341,26,371,37], [375,41,400,50]]
    },
    {
        source:"Winnipeg",
        destination:"Saint St. Marie",
        pathway1:[[423,56,452,62], [458,65,487,70], [492,72,521,78], [527,80,556,86], [561,86,590,93], [597,93,625,99]]
    },
    {
        source:"Vancouver",
        destination:"Seattle",
        pathway1:[[66,80,67,106]],
        pathway2:[[79,78,81,107]]
    },
    {
        source:"Seattle",
        destination:"Portland",
        pathway1:[[59,128,51,155]],
        pathway2:[[71,131,64,157]]
    }
]


export const getConnection = (source, destination) => {
    const theCon = connections.find((connection)=>{
        const c1 = source === connection.source && destination === connection.destination;
        const c2 = source === connection.destination && destination === connection.source
        return c1 || c2;
    })
    return theCon;
}
