
import mongoose from "mongoose";
import configEnviron from "./configEnviron.js";


// configEnv
const { db} = configEnviron;

export const mongoDBCon = async ()=>{
    return mongoose.connect(db
        // , { useNewUrlParser: true, useUnifiedTopology: true }
        )
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));
}

// export default mongoDBCon