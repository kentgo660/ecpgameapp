"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/trustBuilder.module.css";

export default function TrustBuilder() {
    const router = useRouter();

    const scenarios = [
        {
            question:
                "You accidentally receive confidential information not intended for you.",
            options: [
                "Forward it to teammates",
                "Ignore it",
                "Report it and securely delete it"
            ],
            answer:
                "Report it and securely delete it"
        },
        {
            question:
                "A coworker asks for a shared password to access a system.",
            options: [
                "Share it to help",
                "Decline and direct them to proper access procedures",
                "Write it on paper"
            ],
            answer:
                "Decline and direct them to proper access procedures"
        },
        {
            question:
                "You notice a privacy concern during a meeting.",
            options: [
                "Say nothing",
                "Raise the concern respectfully",
                "Post about it on social media"
            ],
            answer:
                "Raise the concern respectfully"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [trustMeter, setTrustMeter] = useState(0);
    const [selected, setSelected] = useState("");
    const [completed, setCompleted] = useState(false);

    const scenario = scenarios[current];

    const handleAnswer = async (choice) => {

        if (selected) return;

        setSelected(choice);

        let newTrust = trustMeter;

        if (choice === scenario.answer) {
            newTrust += 34;
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
                            stageName: "trustbuilder",
                            score: newTrust
                        })
                    });

                } catch (error) {
                    console.error(error);
                }

                setTrustMeter(newTrust);
                setCompleted(true);
                return;
            }

            setTrustMeter(newTrust);
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

                    <div className={styles.badge}>
                        🤝
                    </div>

                    <h1>Trust Builder Complete</h1>

                    <div className={styles.scoreCircle}>
                        {trustMeter}
                    </div>

                    <h3>
                        Trust Champion Badge Earned
                    </h3>

                    <p>
                        You consistently demonstrated
                        integrity, accountability,
                        and trust-building behaviors.
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
                    BONUS GAME 1
                </div>

                <h1>
                    🤝 Trust Builder Challenge
                </h1>

                <p>
                    Build trust through responsible decisions.
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

            <div className={styles.meterCard}>

                <h3>Trust Meter</h3>

                <div className={styles.trustValue}>
                    {trustMeter}%
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

                {scenario.options.map(
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
                )}

            </div>

        </div>
    );
}