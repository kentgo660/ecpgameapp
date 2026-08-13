"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/dashboard.module.css";
import Image from "next/image";

export default function Dashboard() {

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const handleLogout = () => {

        sessionStorage.clear();

        document.cookie =
            "ecpUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.cookie =
            "ecpDisclaimerAccepted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.replace("/");

    };

    const loadDashboard = async () => {

        try {

            const disclaimerAccepted =
                sessionStorage.getItem(
                    "ecpDisclaimerAccepted"
                );

            if (!disclaimerAccepted) {
                router.push("/disclaimer");
                return;
            }

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

    const trustBuilderComplete =
        completedStages.includes(
            "trustbuilder"
        );

    const speakUpArenaComplete =
        completedStages.includes(
            "speakuparena"
        );

    const championshipComplete =
        completedStages.includes(
            "integritycupfinals"
        );

    const gameCompleted =
        championshipComplete;
    
    const bonusUnlocked =
        rookieComplete &&
        complianceComplete &&
        dataProtectionComplete;

    let completedChallenges = 0;

    if (rookieComplete)
        completedChallenges++;

    if (complianceComplete)
        completedChallenges++;

    if (dataProtectionComplete)
        completedChallenges++;

    if (championshipComplete)
        completedChallenges++;

    const progressPercent =
        Math.round(
            (completedChallenges / 4) * 100
        );

    const totalScore =
        progress?.totalScore || 0;

    return (
        <div className={styles.page}>

            <div className={styles.heroCard}>

                <Image
                src="/images/integrity-quest-logo.png"
                alt="Integrity Quest"
                width={250}
                height={250}
                className={styles.heroLogo}
                />
            </div>

            <div className={styles.welcomeCard}>

                <h2>
                    Welcome,
                    {" "}
                    {user.fullName}
                </h2>

                <span>
                    Ready for today's challenge?
                </span>

            </div>

            {gameCompleted && (

                <div className={styles.championBanner}>

                    👑 CONGRATULATIONS!

                    <br />

                    You have completed
                    Integrity Quest and earned
                    the Integrity Cup Champion title.

                </div>

            )}

            
            <div className={styles.profileCard}>

                <div className={styles.infoRow}>
                    <span>
                        US Domain
                    </span>

                    <strong>
                        {user.domainId}
                    </strong>
                </div>

                <div className={styles.infoRow}>
                    <span>
                        Full Name
                    </span>

                    <strong>
                        {user.fullName}
                    </strong>
                </div>

                <div className={styles.infoRow}>
                    <span>
                        Country
                    </span>

                    <strong>
                        {user.country}
                    </strong>
                </div>

            </div>

            <div className={styles.statsGrid}>

                <div className={styles.statCard}>

                    <div className={styles.statIcon}>
                        ⭐
                    </div>

                    <h3>
                        {totalScore}
                    </h3>

                    <p>
                        Total Score
                    </p>

                </div>

                <div className={styles.statCard}>

                    <div className={styles.statIcon}>
                        🎯
                    </div>

                    <h3>
                        {completedChallenges}/4
                    </h3>

                    <p>
                        Challenges Completed
                    </p>

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

            <div className={styles.stageTracker}>

                <h3>🎮 Quest Journey</h3>

                <div className={styles.stageList}>

                    <div
                        className={`${styles.stageItem}
                        ${
                            rookieComplete
                                ? styles.completedStage
                                : ""
                        }
                        ${
                            gameCompleted
                                ? styles.lockedStage
                                : ""
                        }`}
                        onClick={() => {

                            if (gameCompleted) return;

                            router.push(
                                "/stages/rookieleague"
                            );

                        }}
                    >
                        {
                            rookieComplete
                                ? "✅"
                                : "🏅"
                        }

                        {" "}
                        Rookie League
                    </div>

                        <div
                            className={`${styles.stageItem}
                            ${
                                complianceComplete
                                    ? styles.completedStage
                                    : ""
                            }
                            ${
                                !rookieComplete ||
                                gameCompleted
                                    ? styles.lockedStage
                                    : ""
                            }`}
                            onClick={() => {

                                if (!rookieComplete)
                                    return;

                                if (gameCompleted)
                                    return;

                                router.push(
                                    "/stages/compliancedefender"
                                );

                            }}
                        >
                            {
                                complianceComplete
                                    ? "✅"
                                    : "🛡"
                            }

                            {" "}
                            Compliance Defender
                        </div>

                        <div
                            className={`${styles.stageItem}
                            ${
                                dataProtectionComplete
                                    ? styles.completedStage
                                    : ""
                            }
                            ${
                                !complianceComplete ||
                                gameCompleted
                                    ? styles.lockedStage
                                    : ""
                            }`}
                            onClick={() => {

                                if (!complianceComplete)
                                    return;

                                if (gameCompleted)
                                    return;

                                router.push(
                                    "/stages/dataprotectionarena"
                                );

                            }}
                        >
                            {
                                dataProtectionComplete
                                    ? "✅"
                                    : !complianceComplete
                                        ? "🔒"
                                        : "🔓"
                            }

                            {" "}

                            Data Protection Arena
                        </div>



                        <div
                            className={`${styles.stageItem}
                            ${
                                championshipComplete
                                    ? styles.completedStage
                                    : ""
                            }
                            ${
                                !trustBuilderComplete ||
                                !speakUpArenaComplete ||
                                gameCompleted
                                    ? styles.lockedStage
                                    : ""
                            }`}
                            onClick={() => {

                                if (!trustBuilderComplete)
                                    return;

                                if (!speakUpArenaComplete)
                                    return;

                                if (gameCompleted)
                                    return;

                                router.push(
                                    "/championship"
                                );

                            }}
                        >
                            {
                                championshipComplete
                                    ? "✅"
                                    : !trustBuilderComplete ||
                                    !speakUpArenaComplete
                                        ? "🔒"
                                        : "🏆"
                            }

                            {" "}

                            Integrity Cup Finals
                        </div>



                </div>

                <div className={styles.bonusTracker}>

                    <h3>Bonus Games</h3>
                    
                    <div className={styles.stageList}>
                        <div
                            className={`${styles.stageItem}
                            ${
                                trustBuilderComplete
                                    ? styles.completedStage
                                    : ""
                            }
                            ${
                                !bonusUnlocked
                                    ? styles.lockedStage
                                    : ""
                            }`}
                            onClick={() => {

                                if (!bonusUnlocked)
                                    return;

                                if (trustBuilderComplete)
                                    return;

                                router.push(
                                    "/bonus/trustbuilder"
                                );

                            }}
                        >
                            {
                                trustBuilderComplete
                                    ? "✅"
                                    : !bonusUnlocked
                                        ? "🔒"
                                        : "🤝"
                            }

                            {" "}
                            Trust Builder Challenge
                        </div>

                        <div
                            className={`${styles.stageItem}
                            ${
                                speakUpArenaComplete
                                    ? styles.completedStage
                                    : ""
                            }
                            ${
                                !bonusUnlocked
                                    ? styles.lockedStage
                                    : ""
                            }`}
                            onClick={() => {

                                if (!bonusUnlocked)
                                    return;

                                if (speakUpArenaComplete)
                                    return;

                                router.push(
                                    "/bonus/speakuparena"
                                );

                            }}
                        >
                            {
                                speakUpArenaComplete
                                    ? "✅"
                                    : !bonusUnlocked
                                        ? "🔒"
                                        : "📢"
                            }

                            {" "}

                            Speak Up Arena
                        </div>
                    
                    </div>
                    
                </div>

            </div>

            <div className={styles.menuGrid}>

                <button
                    className={styles.menuButton}
                    onClick={() =>
                        router.push(
                            "/leaderboard"
                        )
                    }
                >
                    🏅 Leaderboard
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() =>
                        router.push(
                            "/badges"
                        )
                    }
                >
                    🎖 My Badges
                </button>

                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </div>

        </div>
    );
}