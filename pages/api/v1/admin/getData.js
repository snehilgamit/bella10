import bellaUser from "@/models/User";
import connectDB from "@/util/mongoDB";
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            if (!token) return res.json({ message: "Token not found", status: false });
            await connectDB();

            const verify = jwt.verify(token, process.env.SECRET);
            if (!verify) return res.json({ message: "unAuthorised", status: false });

            const find = await bellaUser.findOne({ email: verify.email }, { isAdmin: true });
            if (!find) return res.json({ message: "You are not admin!", status: false });
            if (!find.isAdmin) return res.json({ message: "You are not admin!", status: false });

            const findUser = await bellaUser.find({}, "orders");
            const orders = [];
            const mergeData = {};
            findUser.forEach(el => el.orders.forEach(e => orders.push(e)));
            orders.forEach(el => {
                el.time = new Date(el.time).setHours(0, 0, 0, 0);
                el.time = new Date(el.time);
            })
            orders.forEach((el) => {
                if (!mergeData[el.time]) {
                    mergeData[el.time] = 1
                }
                else {
                    mergeData[el.time] = mergeData[el.time] + 1;
                }
            });
            const data = [];
            for(let i in mergeData){
                const splitDate = i.split(" ");
                data.push({name:splitDate[1]+splitDate[2],count:mergeData[i]})
            }
            const monthOrder = {
                Jan: 1,
                Feb: 2,
                Mar: 3,
                Apr: 4,
                May: 5,
                Jun: 6,
                Jul: 7,
                Aug: 8,
                Sep: 9,
                Oct: 10,
                Nov: 11,
                Dec: 12
              };
              
              data.sort((a, b) => {
                const [aMonth, aDay] = [a.name.slice(0, 3), a.name.slice(3)];
                const [bMonth, bDay] = [b.name.slice(0, 3), b.name.slice(3)];
              
                if (monthOrder[aMonth] !== monthOrder[bMonth]) {
                  return monthOrder[aMonth] - monthOrder[bMonth];
                }
                return aDay - bDay;
              });

            // findUser.forEach(el => el.forEach(ell=>orders.push(ell.orders)))
            return res.status(200).json({ status: true, data:data.splice(-6)});
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Error", status: false });
        }
    }
    return res.status(200).json({ message: "Invalid method", status: false });
}