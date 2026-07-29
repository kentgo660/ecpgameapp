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
                "/api/leaderboard"
            );

            const data =
                await response.json();

            if (data.success) {
                setLeaders(
                    data.leaderboard
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

            <div className={styles.board}>

                {leaders.map(
                    (player, index) => {

                        let rankIcon = "🎖";

                        if (index === 0)
                            rankIcon = "🥇";

                        if (index === 1)
                            rankIcon = "🥈";

                        if (index === 2)
                            rankIcon = "🥉";

                        return (

                            <div
                                key={player.domainId}
                                className={styles.playerCard}
                            >

                                <div className={styles.rank}>
                                    {rankIcon}
                                </div>

                                <div className={styles.playerInfo}>

                                    <h3>
                                        {player.firstName} {player.lastName}
                                    </h3>

                                    <span>
                                        {player.group}
                                    </span>

                                </div>

                                <div className={styles.score}>

                                    {player.totalScore}

                                </div>

                            </div>

                        );
                    }
                )}

            </div>

            <button
                className={styles.backButton}
                onClick={() =>
                    router.push("/dashboard")
                }
            >
                ← Back To Dashboard
            </button>

        </div>
    );
}