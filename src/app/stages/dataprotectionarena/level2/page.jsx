"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/dataProtectionLevel2.module.css";

export default function Level2() {

    const router = useRouter();

    const scenarios = [
        {
            question:
                "You need to send employee payroll data to HR.",
            options: [
                "Personal Gmail",
                "Teams Chat Screenshot",
                "Approved encrypted company email",
                "Personal USB"
            ],
            answer:
                "Approved encrypted company email"
        },
        {
            question:
                "You need to share patient information with an authorized business partner.",
            options: [
                "WhatsApp",
                "Approved secure file transfer portal",
                "Personal cloud account",
                "Text message"
            ],
            answer:
                "Approved secure file transfer portal"
        },
        {
            question:
                "You need to send a confidential report to a colleague.",
            options: [
                "Verify recipient and use company-approved tools",
                "Send to personal email first",
                "Upload to public sharing site",
                "Share using personal Google Drive"
            ],
            answer:
                "Verify recipient and use company-approved tools"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [completed, setCompleted] = useState(false);

    const scenario = scenarios[current];

    const handleAnswer = async (choice) => {

        if (showResult) return;

        setSelected(choice);
        setShowResult(true);

        let newScore = score;

        if (choice === scenario.answer) {
            newScore += 25;
            setScore(newScore);
        }

        setTimeout(async () => {

            if (current === scenarios.length - 1) {

                try {

                    const user = JSON.parse(
                        sessionStorage.getItem("user")
                    );

                    await fetch(
                        "/api/saveprogress",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                domainId:
                                    user.domainId,
                                stageName:
                                    "dataprotectionarena-level2",
                                score:
                                    newScore
                            })
                        }
                    );

                } catch (error) {
                    console.error(error);
                }

                setCompleted(true);
                return;
            }

            setCurrent(prev => prev + 1);
            setSelected("");
            setShowResult(false);

        }, 1500);
    };

    const progress =
        ((current + 1) / scenarios.length) * 100;

    if (completed) {
        return (
            <div className={styles.page}>

                <div className={styles.resultCard}>

                    <div className={styles.icon}>
                        🔐
                    </div>

                    <h1>
                        Level 2 Complete
                    </h1>

                    <div className={styles.scoreCircle}>
                        {score}
                    </div>

                    <p>
                        Secure Sharing Champion
                    </p>

                    <button
                        className={styles.continueButton}
                        onClick={() =>
                            router.push(
                                "/stages/dataprotectionarena"
                            )
                        }
                    >
                        Back To Arena
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.topCard}>

                <div className={styles.levelBadge}>
                    LEVEL 2
                </div>

                <h1>
                    🔐 Secure Sharing Methods
                </h1>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>

                <div className={styles.counter}>
                    Scenario {current + 1}
                    of {scenarios.length}
                </div>

            </div>

            <div className={styles.questionCard}>

                <div className={styles.question}>
                    {scenario.question}
                </div>

            </div>

            <div className={styles.options}>

                {scenario.options.map(
                    (option, index) => (

                        <button
                            key={index}
                            className={`${styles.optionButton}
                            ${
                                selected === option
                                    ? option === scenario.answer
                                        ? styles.correct
                                        : styles.wrong
                                    : ""
                            }`}
                            onClick={() =>
                                handleAnswer(option)
                            }
                        >
                            {option}
                        </button>

                    )
                )}

            </div>

            <div className={styles.scoreBoard}>
                ⭐ Score: {score}
            </div>

        </div>
    );
}