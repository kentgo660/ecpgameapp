"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/rookieLeague.module.css";

export default function RookieLeague() {
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(30);
    const [gameFinished, setGameFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [resultTitle, setResultTitle] = useState("");
    const [resultItems, setResultItems] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (gameFinished) return;

        const countdown = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);

                    setGameFinished(true);

                    setResultTitle("⏱ Time Expired");

                    setResultItems([
                        "No score awarded.",
                        "Scenario not completed.",
                        "Challenge failed."
                    ]);

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [gameFinished]);

    const saveProgress = async (earnedScore) => {
        try {
            const user = JSON.parse(
                sessionStorage.getItem("user")
            );

            if (!user) return;

            await fetch("/api/saveprogress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    domainId: user.domainId,
                    stageName: "rookieleague",
                    score: earnedScore,
                }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnswer = async (choice) => {

        if (saving || gameFinished) return;

        setSaving(true);

        if (choice === "B") {

            let earnedScore = 100;

            if (timeLeft >= 20) {
                earnedScore += 20;
            }

            setScore(earnedScore);

            setResultTitle("✅ Correct Decision");

            setResultItems([
                "Control maintained",
                "Risk reduced",
                "Accountability demonstrated",
                "Trust strengthened",
            ]);

            await saveProgress(earnedScore);

        } else {

            setScore(0);

            setResultTitle("❌ Wrong Decision");

            setResultItems([
                "Required control bypassed",
                "Increased business risk",
                "Documentation gap",
                "Potential audit finding",
            ]);
        }

        setGameFinished(true);
        setSaving(false);
    };

    return (
        <div className={styles.page}>

            <div className={styles.container}>

                <div className={styles.header}>

                    <h1>🏆 Rookie League</h1>

                    <h2>
                        Ethical Decision-Making
                    </h2>

                    <p>
                        Choose the most ethical action
                        before time runs out.
                    </p>

                </div>

                {!gameFinished && (
                    <>
                        <div className={styles.timerCard}>
                            ⏱ {timeLeft}s Remaining
                        </div>

                        <div className={styles.scenarioCard}>

                            <div className={styles.chatBox}>

                                <div className={styles.managerBubble}>
                                    <strong>Manager</strong>
                                    <br />
                                    Hi Jimin, I sent you a request.
                                    Please forward it to procurement today.
                                </div>

                                <div className={styles.associateBubble}>
                                    <strong>Associate</strong>
                                    <br />
                                    Everything is ready except the
                                    final approval.
                                </div>

                                <div className={styles.managerBubble}>
                                    <strong>Manager</strong>
                                    <br />
                                    We don't have time.
                                    Submit it now and we'll
                                    obtain approval later.
                                </div>

                            </div>

                            <div className={styles.question}>
                                What would you do?
                            </div>

                            <button
                                className={styles.optionButton}
                                onClick={() =>
                                    handleAnswer("A")
                                }
                            >
                                Proceed with the request and
                                skip approval
                            </button>

                            <button
                                className={styles.optionButton}
                                onClick={() =>
                                    handleAnswer("B")
                                }
                            >
                                Respectfully explain that
                                approval is required before
                                proceeding
                            </button>

                        </div>

                    </>
                )}

                {gameFinished && (

                    <div className={styles.resultCard}>

                        <div
                            className={
                                score > 0
                                    ? styles.success
                                    : styles.failure
                            }
                        >
                            {resultTitle}
                        </div>

                        <div className={styles.score}>
                            ⭐ Score: {score}
                        </div>

                        <ul className={styles.resultList}>

                            {resultItems.map(
                                (item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                )
                            )}

                        </ul>

                        <button
                            className={styles.continueButton}
                            onClick={() =>
                                router.push("/stages/compliancedefender")
                            }
                        >
                            Proceed to Stage 2
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}