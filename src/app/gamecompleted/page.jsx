"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/gameCompleted.module.css";

export default function GameCompleted() {

    const router = useRouter();

    const [progress, setProgress] = useState(null);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {

        try {

            const user = JSON.parse(
                sessionStorage.getItem("user")
            );

            const response = await fetch(
                "/api/getprogress",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        domainId:
                            user.domainId
                    })
                }
            );

            const data =
                await response.json();

            if (data.success) {
                setProgress(data.progress);
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (!progress)
        return null;

    return (
        <div className={styles.page}>

            <div className={styles.card}>

                <div className={styles.crown}>
                    👑
                </div>

                <h1>
                    Integrity Quest Completed
                </h1>

                <h2>
                    🏆 Integrity Cup Champion
                </h2>

                <div className={styles.scoreCircle}>
                    {progress.totalScore}
                </div>

                <div className={styles.statsGrid}>

                    <div className={styles.stat}>
                        <strong>
                            {
                                progress
                                    .completedStages
                                    .length
                            }
                        </strong>

                        <span>
                            Completed Challenges
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <strong>
                            6
                        </strong>

                        <span>
                            Badges Earned
                        </span>
                    </div>

                </div>

                <div className={styles.badges}>

                    🏅 Ethical Decision Maker

                    <br />

                    🛡 Compliance Shield

                    <br />

                    🔒 Privacy Guardian

                    <br />

                    🤝 Trust Champion

                    <br />

                    📢 Integrity Champion

                    <br />

                    👑 Integrity Cup Champion

                </div>

                <button
                    className={styles.leaderboardButton}
                    onClick={() =>
                        router.push(
                            "/dashboard"
                        )
                    }
                >
                    🏅 View Leaderboard
                </button>

            </div>

        </div>
    );
}