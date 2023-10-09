import { model } from 'mongoose';

import { userSchema } from '../schemas/index.js';

const User = model('User', userSchema);

export default User;
