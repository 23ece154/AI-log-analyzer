
const express = require("express");
const multer = require("multer");
const db = require("../database/db");

const router = express.Router();

const sanitizeLog = require("../utils/sanitizeLog");
const generateHash = require("../utils/hashLog");
const analyzeError = require("../utils/aiAnalyzer");

// Store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("logfile"), async (req, res) => {

    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {

        const logContent = req.file.buffer.toString();

        const lines = logContent.split("\n");

        const errors = lines.filter(line =>
            line.match(/\b(ERROR|Exception|WARN)\b/)
        );

        const newErrors = [];
        const duplicateErrors = [];

        for (const err of errors) {

            // 1️⃣ sanitize log
            const sanitized = sanitizeLog(err);

            // 2️⃣ generate hash
            const hash = generateHash(sanitized);

            // 3️⃣ check database for duplicate
            const existing = await new Promise((resolve, reject) => {
                db.get(
                    "SELECT * FROM errors WHERE hash = ?",
                    [hash],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    }
                );
            });

            if (existing) {

                console.log("DB DUPLICATE FOUND:", sanitized);

                duplicateErrors.push({
                    error: sanitized,
                    hash: hash,
                    analysis: existing.analysis
                });

            } else {

                console.log("AI CALLED:", sanitized);

                // 4️⃣ call AI
                const aiAnalysis = await analyzeError(sanitized);

                // 5️⃣ store in database
                await new Promise((resolve, reject) => {
                    db.run(
                        "INSERT INTO errors (hash, error, analysis) VALUES (?, ?, ?)",
                        [hash, sanitized, aiAnalysis],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });

                newErrors.push({
                    error: sanitized,
                    hash: hash,
                    analysis: aiAnalysis
                });
            }

        }

        res.json({
            message: "Log analyzed successfully",
            filename: req.file.originalname,
            totalLines: lines.length,
            totalErrors: errors.length,
            newErrors: newErrors.slice(0, 5),
            duplicateErrors: duplicateErrors.slice(0, 5)
        });

    } catch (error) {

        console.error("Processing error:", error);

        res.status(500).json({
            error: "Log processing failed"
        });

    }

});

module.exports = router;