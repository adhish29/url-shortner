import UrlModel from "../model/Url.model.js";

export async function upsert(urlObj) {
  try {
    const result = await UrlModel.updateOne(
      { _id: urlObj._id },
      {
        $set: { ...urlObj },
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
    const result = await UrlModel.findOne(query);
    return result;
  } catch (error) {
    console.log("Error at find ", error);
    throw error;
  }
}
