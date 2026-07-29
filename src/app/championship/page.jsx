"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/championship.module.css";

export default function Championship() {

    const router = useRouter();

    const challenges = [
        {
            question:
                "A vendor offers you an expensive watch after a successful contract award.",
            options: [
                "Accept the gift",
                "Decline and report appropriately",
                "Sell the gift",
                "Keep it private"
            ],
            answer:
                "Decline and report appropriately"
        },
        {
            question:
                "You need to send payroll information securely.",
            options: [
                "Personal Gmail",
                "Encrypted Company Email",
                "Personal USB",
                "WhatsApp"
            ],
            answer:
                "Encrypted Company Email"
        },
        {
            question:
                "An email asks you to verify your password immediately through a strange website.",
            options: [
                "Click the link",
                "Forward to friends",
                "Report as phishing",
                "Enter your credentials"
            ],
            answer:
                "Report as phishing"
        },
        {
            question:
                "You witness possible misconduct by a coworker.",
            options: [
                "Ignore it",
                "Post about it online",
                "Report through approved channels",
                "Tell everyone"
            ],
            answer:
                "Report through approved channels"
        },
        {
            question:
                "You accidentally receive PHI that doesn't belong to you.",
            options: [
                "Forward it",
                "Ignore it",
                "Delete and report the incident",
                "Save a copy"
            ],
            answer:
                "Delete and report the incident"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState("");
    const [completed, setCompleted] = useState(false);

    const challenge = challenges[current];

    const handleAnswer = async (choice) => {

        if (selected) return;

        setSelected(choice);

        let newScore = score;

        if (choice === challenge.answer) {
            newScore += 20;
        }

        setTimeout(async () => {

            if (current === challenges.length - 1) {

                try {

                    const user = JSON.parse(
                        sessionStorage.getItem("user")
                    );

                    await fetch(
                        "/api/saveprogress",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                domainId: user.domainId,
                                stageName: "integritycupfinals",
                                score: newScore
                            })
                        }
                    );

                } catch (error) {
                    console.error(error);
                }

                setScore(newScore);
                setCompleted(true);
                return;
            }

            setScore(newScore);
            setCurrent(prev => prev + 1);
            setSelected("");

        }, 1200);

    };

    if (completed) {

        return (
            <div className={styles.page}>

                <div className={styles.victoryCard}>

                    <div className={styles.crown}>
                        👑
                    </div>

                    <h1>
                        Integrity Cup Champion
                    </h1>

                    <div className={styles.scoreCircle}>
                        {score}
                    </div>

                    <h2>
                        🏆 ECP Week Champion
                    </h2>

                    <p>
                        Congratulations! You completed
                        all ECP Week challenges.
                    </p>

                    <button
                        className={styles.homeButton}
                        onClick={() =>
                            router.push("/dashboard")
                        }
                    >
                        Return To Dashboard
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <div className={styles.finalBadge}>
                    FINAL CHAMPIONSHIP
                </div>

                <h1>
                    🏆 Integrity Cup Finals
                </h1>

                <p>
                    One final challenge remains.
                </p>

            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{
                        width:
                            `${((current + 1) / challenges.length) * 100}%`
                    }}
                />
            </div>

            <div className={styles.questionCard}>

                <h2>
                    {challenge.question}
                </h2>

            </div>

            <div className={styles.options}>

                {
                    challenge.options.map(
                        (option, index) => (

                            <button
                                key={index}
                                className={`${styles.optionButton}
                                ${
                                    selected === option
                                        ? option === challenge.answer
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
                    )
                }

            </div>

            <div className={styles.scoreBoard}>
                ⭐ Score: {score}
            </div>

        </div>
    );
}