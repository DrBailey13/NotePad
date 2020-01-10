const fs = require("fs");
var notesdata = require("../db/db.json");
module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
       return res.json(notesdata);
      });
    app.post("/api/notes", function(req,res){
        let newNote = req.body;
        console.log(newNote);
        notesdata.push(newNote);
        console.log(notesdata);
        addId();
        let save = JSON.stringify(notesdata);
        fs.writeFileSync("./db/db.json",save)
        res.redirect('back');
    });
    app.delete("/api/notes/:id", function (req,res) {
        console.log(req.params.id);
        notesdata.splice((req.params.id -1),1);
        fs.writeFileSync("./db/db.json",save);
        res.redirect('back');
    });
    function addId() {
        notesdata.forEach((element,i) => {
            element.id = i+1;
        });
    }
};