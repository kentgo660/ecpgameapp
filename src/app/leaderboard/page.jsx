"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/leaderboard.module.css";

export default function Leaderboard() {

    const router = useRouter();

    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {

        try {

            const response = await fetch(
                "/api/leaderboard",
                {
                    method: "POST",
                    headers : {
                    "Content-Type":
                        "application/json",
                    },
                }
            );

            const data =
                await response.json();

            if (data.success) {
                setLeaders(
                    data.leaderboard || []
                );
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    Loading Leaderboard...
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <h1>
                    🏅 Leaderboard
                </h1>

                <p>
                    Top Integrity Quest Players
                </p>

            </div>

            
            <button
                className={styles.backButton}
                onClick={() =>
                    router.push(
                        "/dashboard"
                    )
                }
            >
                ← Back To Dashboard
            </button>

            <div className={styles.board}>

                {leaders.length === 0 ? (

                    <div className={styles.emptyCard}>
                        No leaderboard data available.
                    </div>

                ) : (

                    leaders.map(
                        (player, index) => {

                            const rankIcon =
                                index === 0
                                    ? "🥇"
                                    : index === 1
                                    ? "🥈"
                                    : index === 2
                                    ? "🥉"
                                    : "🎖";

                            const isChampion =
                                player.completedStages?.includes(
                                    "integritycupfinals"
                                );

                            return (

                                <div
                                    key={
                                        player.domainId ||
                                        index
                                    }
                                    className={styles.playerCard}
                                >

                                    <div className={styles.rank}>

                                        <div>
                                            {rankIcon}
                                        </div>

                                        <small>
                                            #{index + 1}
                                        </small>

                                    </div>

                                    <div className={styles.playerInfo}>

                                        <h3>
                                            {player.fullName ||
                                                "Unknown Player"}
                                        </h3>

                                        <span>
                                            🌎 {player.country || "N/A"}
                                        </span>

                                        <small>
                                            {player.domainId}
                                        </small>

                                    </div>

                                    {isChampion && (

                                        <div
                                            className={
                                                styles.championBadge
                                            }
                                        >
                                            👑 Champion
                                        </div>

                                    )}

                                    <div className={styles.score}>
                                        ⭐ {player.totalScore || 0}
                                    </div>

                                </div>

                            );

                        }
                    )

                )}

            </div>

        </div>
    );
}