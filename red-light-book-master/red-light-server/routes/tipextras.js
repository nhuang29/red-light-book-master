exports.getTipExtra = (req, res, db) => {
    const tipid = req.params.tipid;
    const stmt = db.prepare("SELECT * from tipextra WHERE tipid=?").get(tipid);
    res.json(stmt);
}

exports.addTipExtra = (req, res, db) => {
    const tipid = req.body.tipid;
    const tipextratext = req.body.tipextratext;
    try {
        const stmt = db.prepare("INSERT INTO tipextra(tipid, tipextratext) VALUES(?,?)");
        stmt.run(tipid, tipextratext);
        res.json("Extra tip info successfully inserted");
    } catch (err) {
        res.json("Extra tip info failed to insert");
    }
}

exports.deleteTipExtra = (req, res, db) => {
    const tipid = req.body.tipid;
    try {
        const stmt = db.prepare("DELETE FROM tipextra WHERE tipid=(?)");
        stmt.run(tipid);
        res.json("Extra tip info successfully deleted");
    } catch (err) {
        res.json("Extra tip info failed to delete");
    }
}

exports.updateTipExtra = (req, res, db) => {
    const tipid = req.body.tipid;
    const tipextratext = req.body.tipextratext;
    try {
        const stmt = db.prepare("UPDATE tipextra SET tipextratext=(?) WHERE tipid=(?)");
        stmt.run(tipextratext, tipid);
        res.json("Extra tip info successfully updated");
    } catch (err) {
        res.json("Extra tip info failed to update");
    }
}