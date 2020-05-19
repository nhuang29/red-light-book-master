exports.getSections = (req, res, db) => {
    var chid = req.params.chid;
    console.log(chid);
    const stmt = db.prepare("SELECT * FROM chaptersections").all();
    res.json(stmt);
}

exports.addSection = (req, res, db) => {
    const sectionid = req.body.sectionid;
    const sectiontext = req.body.sectiontext;
    const chapterid = req.body.chapterid;
    try {
        if (!sectionid) {
            sectionid = db.prepare("SELECT seq from SQLITE_SEQUENCE WHERE name = 'chaptersections' LIMIT 1").get();
        }
        const stmt = db.prepare("INSERT INTO chaptersections(sectionid, sectiontext, chapterid) VALUES(?,?,?)");
        stmt.run(sectionid, sectiontext, chapterid);
        res.json("Section with id: " + sectionid + "added");
    } catch (err) {
        res.json("Failed to add section");
    }
}

exports.deleteSection = (req, res, db) => {
    const sectionid = req.body.sectionid;
    try {
        const stmt = db.prepare("DELETE FROM chaptersections WHERE sectionid=(?)")
        stmt.run(sectionid);
        res.json("Section deleted");
    } catch (err) {
        res.json("Failed to delete section");
    }
}

exports.updateSection = (req, res, db) => {
    const sectionid = req.body.sectionid;
    const sectiontext = req.body.sectiontext;
    const chapterid = req.body.chapterid;
    try {
        const stmt = db.prepare("UPDATE chaptersections SET sectiontext=(?), chapterid=(?) WHERE sectionid=(?)");
        stmt.run(sectiontext, chapterid, sectionid);
        res.json("Section with id: " + sectionid + "updated");
    } catch (err) {
        res.json("Failed to add section");
    }
}