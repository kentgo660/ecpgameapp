"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/speakUpArena.module.css";

export default function SpeakUpArena() {

    const router = useRouter();

    const scenarios = [
        {
            question:
                "You notice a coworker altering official records.",
            options: [
                "Ignore it",
                "Report through approved channels",
                "Post about it online"
            ],
            answer:
                "Report through approved channels"
        },
        {
            question:
                "A manager asks you to bypass a required control.",
            options: [
                "Follow instructions",
                "Speak up and raise concern",
                "Delete the documentation"
            ],
            answer:
                "Speak up and raise concern"
        },
        {
            question:
                "You become aware of a possible privacy violation.",
            options: [
                "Stay silent",
                "Escalate using company procedures",
                "Tell friends"
            ],
            answer:
                "Escalate using company procedures"
        },
        {
            question:
                "You witness potential vendor misconduct.",
            options: [
                "Ignore it",
                "Report and seek guidance",
                "Share confidential details externally"
            ],
            answer:
                "Report and seek guidance"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [reputation, setReputation] = useState(0);
    const [selected, setSelected] = useState("");
    const [completed, setCompleted] = useState(false);

    const scenario = scenarios[current];

    const handleAnswer = async (choice) => {

        if (selected) return;

        setSelected(choice);

        let newReputation = reputation;

        if (choice === scenario.answer) {
            newReputation += 25;
        }

        setTimeout(async () => {

            if (current === scenarios.length - 1) {

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
                            stageName: "speakuparena",
                            score: newReputation
                        })
                    });

                } catch (error) {
                    console.error(error);
                }

                setReputation(newReputation);
                setCompleted(true);
                return;
            }

            setReputation(newReputation);
            setCurrent(prev => prev + 1);
            setSelected("");

        }, 1500);

    };

    const progress =
        ((current + 1) / scenarios.length) * 100;

    if (completed) {
        return (
            <div className={styles.page}>

                <div className={styles.resultCard}>

                    <div className={styles.icon}>
                        📢
                    </div>

                    <h1>Speak Up Arena Complete</h1>

                    <div className={styles.scoreCircle}>
                        {reputation}
                    </div>

                    <h3>
                        Integrity Champion Badge Earned
                    </h3>

                    <p>
                        You demonstrated courage and accountability.
                    </p>

                    <button
                        className={styles.continueButton}
                        onClick={() =>
                            router.push("/stages")
                        }
                    >
                        Return To Stages
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <div className={styles.gameBadge}>
                    BONUS GAME 2
                </div>

                <h1>
                    📢 Speak Up Arena
                </h1>

                <p>
                    Build your reputation through ethical actions.
                </p>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>

                <div className={styles.progressText}>
                    Scenario {current + 1} of {scenarios.length}
                </div>

            </div>

            <div className={styles.reputationCard}>

                <h3>Integrity Reputation</h3>

                <div className={styles.reputationValue}>
                    {reputation}
                </div>

            </div>

            <div className={styles.questionCard}>

                <div className={styles.questionLabel}>
                    SCENARIO
                </div>

                <h2>
                    {scenario.question}
                </h2>

            </div>

            <div className={styles.optionContainer}>

                {
                    scenario.options.map(
                        (option, index) => (

                            <button
                                key={index}
                                className={`${styles.optionButton}
                                ${
                                    selected === option
                                        ? option === scenario.answer
                                            ? styles.correctAnswer
                                            : styles.wrongAnswer
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

        </div>
    );
}