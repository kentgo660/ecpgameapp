"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/dataProtectionArena.module.css";

export default function DataProtectionArena() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const storedUser =
                sessionStorage.getItem("user");

            if (!storedUser) {
                router.push("/");
                return;
            }

            const user =
                JSON.parse(storedUser);

            const response = await fetch(
                "/api/getprogress",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        domainId:
                            user.domainId,
                    }),
                }
            );

            const data =
                await response.json();

            if (
                data.success &&
                data.progress
            ) {
                setProgress(
                    data.progress
                );
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const completedStages =
        progress?.completedStages || [];

    const level1Complete =
        completedStages.includes(
            "dataprotectionarena-level1"
        );

    const level2Complete =
        completedStages.includes(
            "dataprotectionarena-level2"
        );

    const level3Complete =
        completedStages.includes(
            "dataprotectionarena-level3"
        );

    const level4Complete =
        completedStages.includes(
            "dataprotectionarena-level4"
        );

    const level2Unlocked =
        level1Complete;

    const level3Unlocked =
        level2Complete;

    const level4Unlocked =
        level3Complete;

    let completedCount = 0;

    if (level1Complete) completedCount++;
    if (level2Complete) completedCount++;
    if (level3Complete) completedCount++;
    if (level4Complete) completedCount++;

    const progressPercent =
        (completedCount / 4) * 100;

    const badgeUnlocked =
        level1Complete &&
        level2Complete &&
        level3Complete &&
        level4Complete;

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    Loading Arena...
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.hero}>

                <div className={styles.stageBadge}>
                    STAGE 3
                </div>

                <h1>
                    🔒 DATA PROTECTION ARENA
                </h1>

                <h2>
                    ACCOUNTABILITY & OWNERSHIP
                </h2>

                <p>
                    Complete all 4 levels to earn
                    the Privacy Guardian Badge.
                </p>

            </div>

            <div className={styles.progressCard}>

                <h3>
                    Arena Progress
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
                    {completedCount} / 4 Levels Completed
                </p>

            </div>

            <div className={styles.levelGrid}>

                {/* LEVEL 1 */}

                <div className={styles.levelCard}>

                    <div className={styles.levelNumber}>
                        LEVEL 1
                    </div>

                    <h3>
                        📂 Classify Data
                    </h3>

                    <p>
                        PHI • PFI • PII
                    </p>

                    {
                        level1Complete ? (
                            <button
                                className={styles.completedButton}
                                disabled
                            >
                                ✅ Completed
                            </button>
                        ) : (
                            <button
                                className={styles.playButton}
                                onClick={() =>
                                    router.push(
                                        "/stages/dataprotectionarena/level1"
                                    )
                                }
                            >
                                ▶ Start Level
                            </button>
                        )
                    }

                </div>

                {/* LEVEL 2 */}

                <div className={styles.levelCard}>

                    <div className={styles.levelNumber}>
                        LEVEL 2
                    </div>

                    <h3>
                        🔐 Secure Sharing
                    </h3>

                    <p>
                        Choose secure methods.
                    </p>

                    {
                        level2Complete ? (
                            <button
                                className={styles.completedButton}
                                disabled
                            >
                                ✅ Completed
                            </button>
                        ) : level2Unlocked ? (
                            <button
                                className={styles.playButton}
                                onClick={() =>
                                    router.push(
                                        "/stages/dataprotectionarena/level2"
                                    )
                                }
                            >
                                ▶ Start Level
                            </button>
                        ) : (
                            <button
                                className={styles.lockButton}
                                disabled
                            >
                                🔒 Locked
                            </button>
                        )
                    }

                </div>

                {/* LEVEL 3 */}

                <div className={styles.levelCard}>

                    <div className={styles.levelNumber}>
                        LEVEL 3
                    </div>

                    <h3>
                        🎣 Spot Phishing Email
                    </h3>

                    <p>
                        Find all phishing clues.
                    </p>

                    {
                        level3Complete ? (
                            <button
                                className={styles.completedButton}
                                disabled
                            >
                                ✅ Completed
                            </button>
                        ) : level3Unlocked ? (
                            <button
                                className={styles.playButton}
                                onClick={() =>
                                    router.push(
                                        "/stages/dataprotectionarena/level3"
                                    )
                                }
                            >
                                ▶ Start Level
                            </button>
                        ) : (
                            <button
                                className={styles.lockButton}
                                disabled
                            >
                                🔒 Locked
                            </button>
                        )
                    }

                </div>

                {/* LEVEL 4 */}

                <div className={styles.levelCard}>

                    <div className={styles.levelNumber}>
                        LEVEL 4
                    </div>

                    <h3>
                        🚨 Privacy Incident
                    </h3>

                    <p>
                        Respond correctly.
                    </p>

                    {
                        level4Complete ? (
                            <button
                                className={styles.completedButton}
                                disabled
                            >
                                ✅ Completed
                            </button>
                        ) : level4Unlocked ? (
                            <button
                                className={styles.playButton}
                                onClick={() =>
                                    router.push(
                                        "/stages/dataprotectionarena/level4"
                                    )
                                }
                            >
                                ▶ Start Level
                            </button>
                        ) : (
                            <button
                                className={styles.lockButton}
                                disabled
                            >
                                🔒 Locked
                            </button>
                        )
                    }

                </div>

            </div>

            <div className={styles.badgeSection}>

                <h2>
                    🛡 Privacy Guardian Badge
                </h2>

                {
                    badgeUnlocked ? (
                        <div className={styles.badgeUnlocked}>
                            ✅ Badge Unlocked
                        </div>
                    ) : (
                        <div className={styles.badgeLocked}>
                            Complete all 4 levels
                        </div>
                    )
                }

            </div>

        </div>
    );
}