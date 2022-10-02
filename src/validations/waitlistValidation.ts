import Joi from "joi";
import { WaitlistInterface } from "../utilities/interface";

const vailidateWaitlist = (waitlist: WaitlistInterface) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(waitlist);
};

export default vailidateWaitlist;
