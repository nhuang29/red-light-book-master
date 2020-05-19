exports.getChapters = (req, res, db) => {
    const chaps = db.prepare("SELECT * FROM chapters");
    res.json(chaps.all());
}

exports.addChapter = (req, res, db) => {
    const chapterid = req.body.chapterid;
    const chapter = req.body.chaptertext;
    const stmt = db.prepare("INSERT INTO chapters(chapterid, chaptertext) VALUES(?,?)");
    try {
      stmt.run(chapterid, chapter);
      res.json("Chapter added");
    } catch (err) {
      res.json("Failed to add chapter, check to make sure chapter number is unique");
    }
}

exports.deleteChapter = (req, res, db) => {
  const chapterID = req.body.chapterid;
  const stmt = db.prepare("DELETE FROM chapters WHERE chapterid=(?)");
  try {
    stmt.run(chapterID);
    res.json("Chapter deleted");
  } catch (err) {
    res.json("Failed to delete chapter, check to make sure chapter number exists");
  }
}

exports.updateChapter = (req, res, db) => {
  const chapterid = req.body.chapterid;
  const chapter = req.body.chaptertext;
  const stmt = db.prepare("UPDATE chapters SET chaptertext=(?) WHERE chapterid=(?)");
  try {
    stmt.run(chapter, chapterid);
    res.json("Chapter updated");
  } catch (err) {
    res.json("Failed to update chapter, check to make sure chapter number is unique");
  }
}