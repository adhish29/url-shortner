import mongoose from "mongoose";

// const connect = () => {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("connected to MongoDB successfully✅"))
//     .catch((err) => console.log(err));
// };

// export default connect;

export default function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to MongoDB successfully✅"))
    .catch((err) => console.log(err));
}
