import Joi from "joi";
import { NewslistInterface } from "../utilities/interface";

const vailidateNewslist = (newslist: NewslistInterface) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(newslist);
};

export default vailidateNewslist;
