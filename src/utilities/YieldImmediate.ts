import { Promise } from "bluebird";
import "setimmediate";

const yieldImmediate = Promise.promisify(setImmediate);

export default yieldImmediate;
