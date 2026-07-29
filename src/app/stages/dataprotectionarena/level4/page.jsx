"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/dataProtectionLevel4.module.css";

export default function Level4() {

    const router = useRouter();

    const [selected, setSelected] = useState("");
    const [completed, setCompleted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const handleAnswer = async (answer) => {

        if (selected) return;

        setSelected(answer);

        const isCorrect =
            answer === "Report";

        setCorrect(isCorrect);

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
                            "dataprotectionarena-level4",
                        score:
                            isCorrect ? 100 : 50
                    })
                }
            );

        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setCompleted(true);
        }, 1500);
    };

    if (completed) {
        return (
            <div className={styles.page}>

                <div className={styles.resultCard}>

                    <div className={styles.trophy}>
                        🛡
                    </div>

                    <h1>
                        Privacy Escape Room Cleared!
                    </h1>

                    <h2>
                        Privacy Guardian Badge Earned
                    </h2>

                    <p>
                        You successfully completed
                        all Data Protection Arena
                        challenges.
                    </p>

                    <button
                        className={styles.continueButton}
                        onClick={() =>
                            router.push(
                                "/stages/dataprotectionarena"
                            )
                        }
                    >
                        Return To Arena
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <div className={styles.levelBadge}>
                    LEVEL 4
                </div>

                <h1>
                    🚨 Privacy Incident Response
                </h1>

                <p>
                    Choose the best action.
                </p>

            </div>

            <div className={styles.scenarioCard}>

                <div className={styles.scenarioTitle}>
                    INCIDENT REPORT
                </div>

                <p>
                    You accidentally received
                    an email attachment containing
                    Protected Health Information (PHI)
                    intended for another employee.
                </p>

                <p>
                    What should you do?
                </p>

            </div>

            <div className={styles.options}>

                <button
                    className={
                        selected === "Forward"
                            ? styles.wrongButton
                            : styles.optionButton
                    }
                    onClick={() =>
                        handleAnswer("Forward")
                    }
                >
                    📤 Forward to Team Members
                </button>

                <button
                    className={
                        selected === "Ignore"
                            ? styles.wrongButton
                            : styles.optionButton
                    }
                    onClick={() =>
                        handleAnswer("Ignore")
                    }
                >
                    🙈 Ignore the Email
                </button>

                <button
                    className={
                        selected === "Delete"
                            ? styles.wrongButton
                            : styles.optionButton
                    }
                    onClick={() =>
                        handleAnswer("Delete")
                    }
                >
                    🗑 Delete Without Reporting
                </button>

                <button
                    className={
                        selected === "Report"
                            ? styles.correctButton
                            : styles.optionButton
                    }
                    onClick={() =>
                        handleAnswer("Report")
                    }
                >
                    ✅ Report to Privacy Office and Follow Incident Procedures
                </button>

            </div>

            {
                selected && (
                    <div className={styles.feedbackCard}>

                        {
                            correct ? (
                                <>
                                    <h3>
                                        ✅ Correct
                                    </h3>

                                    <p>
                                        Potential privacy incidents
                                        should be reported immediately
                                        using approved company procedures.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3>
                                        ❌ Incorrect
                                    </h3>

                                    <p>
                                        Deleting, ignoring, or forwarding
                                        PHI can increase privacy risk.
                                        Follow official reporting procedures.
                                    </p>
                                </>
                            )
                        }

                    </div>
                )
            }

        </div>
    );
}