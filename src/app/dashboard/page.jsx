"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/dashboard.module.css";

export default function Dashboard() {

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const storedUser =
                sessionStorage.getItem("user");

            if (!storedUser) {
                router.push("/");
                return;
            }

            const userData =
                JSON.parse(storedUser);

            setUser(userData);

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
                            userData.domainId
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
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading Dashboard...
            </div>
        );
    }

    if (!user) return null;

    const completedStages =
        progress?.completedStages || [];

    const gameCompleted =
        completedStages.includes(
            "integritycupfinals"
        );

    const rookieComplete =
        completedStages.includes(
            "rookieleague"
        );

    const complianceComplete =
        completedStages.includes(
            "compliancedefender"
        );

    const dataProtectionComplete =
        completedStages.includes(
            "dataprotectionarena-level1"
        ) &&
        completedStages.includes(
            "dataprotectionarena-level2"
        ) &&
        completedStages.includes(
            "dataprotectionarena-level3"
        ) &&
        completedStages.includes(
            "dataprotectionarena-level4"
        );

    let completedMainStages = 0;

    if (rookieComplete)
        completedMainStages++;

    if (complianceComplete)
        completedMainStages++;

    if (dataProtectionComplete)
        completedMainStages++;

    const progressPercent =
        (completedMainStages / 3) * 100;

    const totalScore =
        progress?.totalScore || 0;

    return (
        <div className={styles.page}>

            <div className={styles.heroCard}>

                <div className={styles.logo}>
                    🏆
                </div>

                <h1>
                    Integrity Quest
                </h1>

                <p>
                    ECP Week 2026
                </p>

            </div>

            <div className={styles.welcomeCard}>

                <h2>
                    Welcome,
                    {" "}
                    {user.firstName}
                </h2>

                <span>
                    {user.position}
                </span>

            </div>

            <div className={styles.statsGrid}>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        ⭐
                    </div>

                    <h3>
                        {totalScore}
                    </h3>

                    <p>Total Score</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        🎯
                    </div>

                    <h3>
                        {completedMainStages}/3
                    </h3>

                    <p>Main Stages</p>
                </div>

            </div>

            <div className={styles.progressCard}>

                <h3>
                    Quest Progress
                </h3>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width:
                                `${progressPercent}%`
                        }}
                    />
                </div>

                <p>
                    {progressPercent}% Complete
                </p>

            </div>

            <div className={styles.profileCard}>

                <div className={styles.infoRow}>
                    <span>Domain</span>
                    <strong>
                        {user.domainId}
                    </strong>
                </div>

                <div className={styles.infoRow}>
                    <span>Group</span>
                    <strong>
                        {user.group}
                    </strong>
                </div>

                <div className={styles.infoRow}>
                    <span>Tower</span>
                    <strong>
                        {user.tower}
                    </strong>
                </div>

            </div>

            <div className={styles.menuGrid}>

                <button
                    className={styles.startButton}
                    onClick={() =>
                        gameCompleted
                            ? router.push("/gamecompleted")
                            : router.push("/stages")
                    }
                >
                    {
                        gameCompleted
                            ? "👑 View Achievement"
                            : "▶ Continue Adventure"
                    }
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() =>
                        router.push("/leaderboard")
                    }
                >
                    🏅 Leaderboard
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() =>
                        router.push("/badges")
                    }
                >
                    🎖 My Badges
                </button>

            </div>

        </div>
    );
}