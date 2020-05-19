exports.getTips = (req, res, db) => {
    const sectionid = req.params.sectionid;
    const tip = db.prepare("SELECT * FROM tips WHERE sectionid=?").all(sectionid);
    res.json(tip);
}

exports.addTip = (req, res, db) => {
    const sectionid = req.body.sectionid;
    const tipid = req.body.tipid;
    const tiptext = req.body.tiptext;
    try {
        const stmt = db.prepare("INSERT INTO tips(sectionid, tipid, tiptext) VALUES(?,?,?)");
        stmt.run(sectionid, tipid, tiptext);
        res.json("Tip successfully added");
    } catch (err) {
        res.json("Failed to add tip");
    }
}

exports.deleteTip = (req, res, db) => {
    const tipid = req.body.tipid;
    try {
        const stmt = db.prepare("DELETE FROM tips WHERE tipid=(?)");
        stmt.run(tipid);
        res.json("Tip successfully deleted");
    } catch (err) {
        res.json("Failed to delete tip");
    }
}

exports.updateTip = (req, res, db) => {
    const sectionid = req.body.sectionid;
    const tipid = req.body.tipid;
    const tiptext = req.body.tiptext;
    try {
        const stmt = db.prepare("UPDATE tips SET tiptext=(?), sectionid=(?) WHERE tipid=(?)");
        stmt.run(tiptext, sectionid, tipid);
        res.json("Tip successfully updated");
    } catch (err) {
        res.json("Failed to update tip");
    }
}