import UserModel from "../model/User.model.js";

export async function upsert(userObj) {
  try {
    const result = await UserModel.updateOne(
      { _id: userObj._id },
      {
        $set: { ...userObj },
      },
      { upsert: true }
    );
    return result.acknowledged ? true : false;
  } catch (error) {
    console.log("Error at upsert ", error);
    throw error;
  }
}

export async function find(query) {
  try {
    const result = await UserModel.findOne(query);
    return result;
  } catch (error) {
    console.log("Error at find ", error);
    throw error;
  }
}
