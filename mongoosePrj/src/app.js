const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connection successful...");
}).catch((err) => {
    console.log("connection error: ", err);
});

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error("Videos count cannot be negative");
            }
        }
    },
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

// mongoose model is a wrapper on Mongoose schema
const Playlist = new mongoose.model("Playlist", playlistSchema);

// create document or insert

const createDocument = async() => {
    try{
        const angularPlaylist = new Playlist({
            name: "Angular",
            ctype: "Front End",
            videos: 13,
            author: "Ravi Mule",
            active: true
        });

        const mongoPlaylist = new Playlist({
            name: "Mongo DB",
            ctype: "Back End",
            videos: 14,
            author: "Ravi Mule",
            active: true
        });

        const javaPlaylist = new Playlist({
            name: "JAVA",
            ctype: "Back End",
            videos: 19,
            author: "Ravi Mule",
            active: true
        });
        

        // To insert a single document
        // const result = await angularPlaylist.save();

        // to insert multiple documents
        const result = await Playlist.insertMany([angularPlaylist, mongoPlaylist, javaPlaylist]);
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

const getDocument = async() => {
    try {
        // to get all data
        // const result = await Playlist.find();

        // to get data on ctype
        // const result = await Playlist.find({ ctype: 'Front End'}).select({name: 1}).limit(1);

        // mongodb comparison operators
        // const result = await Playlist.find({ videos: {$gte: 13}});
        const result = await Playlist.find({ name: {$in: ["Mongo DB"]}});

        // mongodb logical operators
        // const result = await Playlist.find({$or: [{ctype: "Back End"}, {name: "Angular"}]}).select({name: 1});

        // sorting and count methods
        // const result = await Playlist.find({$or: [{ctype: "Back End"}, {name: "Angular"}]}).select({name: 1}).countDocuments();
        // const result = await Playlist.find({$or: [{ctype: "Back End"}, {name: "Angular"}]}).select({name: 1}).sort({"name": "1"});
        // const result = await Playlist.find({$or: [{ctype: "Back End"}, {name: "Angular"}]}).select({name: 1}).sort({"name": "-1"});

        console.log(result);
        return result;
    }
    catch(err) {
        console.log(err);
    }
}

/* calling getDcument */
// getDocument();

/* calling createDcument */
createDocument();

const updateDocument = async(_id) => {
    try{
        const result = await Playlist.findByIdAndUpdate({_id}, {
            $set: {
                name: "MongoDB"
            }
        }, {
            new: true
        });
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

const deleteDocument = async(_id) => {
    try{
        // const result = await Playlist.deleteOne({_id});
        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

/* calling updateDcument */
// updateDocument('623206aa52f5f389b82c8f08');

/* calling deleteDcument */
// deleteDocument('62b1dcf5f66c1cf906e633ee');