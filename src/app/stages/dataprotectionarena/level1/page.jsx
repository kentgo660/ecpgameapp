"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/dataProtectionLevel1.module.css";

export default function Level1() {
    const router = useRouter();

    const questions = [
        { item: "Medical Record Number", answer: "PHI" },
        { item: "Account Balance", answer: "PFI" },
        { item: "Social Security Number", answer: "PII" },
        { item: "Treatment Notes", answer: "PHI" },
        { item: "Credit Rating", answer: "PFI" },
        { item: "Passport Number", answer: "PII" },
        { item: "Pharmacy Record", answer: "PHI" },
        { item: "Debit Card Number", answer: "PFI" },
        { item: "Driver's License Number", answer: "PII" },
        { item: "Health Plan Enrollment Record", answer: "PHI" }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [completed, setCompleted] = useState(false);

    const question = questions[currentQuestion];

    const handleAnswer = async (choice) => {
        if (showAnswer) return;

        setSelected(choice);
        setShowAnswer(true);

        let newScore = score;

        if (choice === question.answer) {
            newScore += 10;
            setScore(newScore);
        }

        setTimeout(async () => {
            if (currentQuestion === questions.length - 1) {

                try {
                    const user = JSON.parse(
                        sessionStorage.getItem("user")
                    );

                    await fetch("/api/saveprogress", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            domainId: user.domainId,
                            stageName:
                                "dataprotectionarena-level1",
                            score: newScore
                        })
                    });

                } catch (error) {
                    console.error(error);
                }

                setCompleted(true);
                return;
            }

            setCurrentQuestion(prev => prev + 1);
            setSelected("");
            setShowAnswer(false);

        }, 1500);
    };

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;

    if (completed) {
        return (
            <div className={styles.page}>

                <div className={styles.resultCard}>

                    <div className={styles.trophy}>
                        🏆
                    </div>

                    <h1>Level 1 Complete</h1>

                    <div className={styles.scoreCircle}>
                        {score}
                    </div>

                    <p>
                        Data Classification Master
                    </p>

                    <button
                        className={styles.continueButton}
                        onClick={() =>
                            router.push(
                                "/stages/dataprotectionarena/level2"
                            )
                        }
                    >
                        Continue to Level 2
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.topCard}>

                <div className={styles.levelBadge}>
                    LEVEL 1
                </div>

                <h1>📂 Classify Data</h1>

                <p>
                    Choose the correct classification.
                </p>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>

                <div className={styles.questionCounter}>
                    Question {currentQuestion + 1}
                    of {questions.length}
                </div>

            </div>

            <div className={styles.questionCard}>

                <div className={styles.questionLabel}>
                    DATA ITEM
                </div>

                <div className={styles.questionText}>
                    {question.item}
                </div>

            </div>

            <div className={styles.answerGrid}>

                <button
                    className={`${styles.answerButton}
                    ${
                        selected === "PHI"
                            ? question.answer === "PHI"
                                ? styles.correct
                                : styles.wrong
                            : ""
                    }`}
                    onClick={() =>
                        handleAnswer("PHI")
                    }
                >
                    🏥 PHI
                </button>

                <button
                    className={`${styles.answerButton}
                    ${
                        selected === "PFI"
                            ? question.answer === "PFI"
                                ? styles.correct
                                : styles.wrong
                            : ""
                    }`}
                    onClick={() =>
                        handleAnswer("PFI")
                    }
                >
                    💳 PFI
                </button>

                <button
                    className={`${styles.answerButton}
                    ${
                        selected === "PII"
                            ? question.answer === "PII"
                                ? styles.correct
                                : styles.wrong
                            : ""
                    }`}
                    onClick={() =>
                        handleAnswer("PII")
                    }
                >
                    🪪 PII
                </button>

            </div>

            <div className={styles.scoreCard}>
                ⭐ Score: {score}
            </div>

        </div>
    );
}