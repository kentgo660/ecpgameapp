"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/stages.module.css";

export default function StagesPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const storedUser = sessionStorage.getItem("user");

            if (!storedUser) {
                router.push("/");
                return;
            }

            const user = JSON.parse(storedUser);

            const response = await fetch(
                "/api/getprogress",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        domainId: user.domainId,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setProgress(data.progress);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

const completedStages =
    progress?.completedStages || [];

const totalScore =
    progress?.totalScore || 0;

const currentStage =
    progress?.currentStage || 1;

/* MAIN STAGE 1 */

const rookieComplete =
    completedStages.includes(
        "rookieleague"
    );

/* MAIN STAGE 2 */

const complianceComplete =
    completedStages.includes(
        "compliancedefender"
    );

/* DATA PROTECTION SUB LEVELS */

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

/* MAIN STAGE 3 */

const dataProtectionComplete =
    level1Complete &&
    level2Complete &&
    level3Complete &&
    level4Complete;

/* UNLOCK LOGIC */

const stage2Unlocked =
    rookieComplete;

const stage3Unlocked =
    complianceComplete;

/* MAIN STAGE PROGRESS */

let completedMainStages = 0;

if (rookieComplete)
    completedMainStages++;

if (complianceComplete)
    completedMainStages++;

if (dataProtectionComplete)
    completedMainStages++;

const progressPercent =
    (completedMainStages / 3) * 100;

/* BONUS GAME UNLOCK */

const allStagesComplete =
    rookieComplete &&
    complianceComplete &&
    dataProtectionComplete;

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    Loading Stages...
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>
                <h1>🎮 ECP Game Stages</h1>

                <p>
                    Complete all three main stages
                    to unlock the Integrity Cup Finals.
                </p>
            </div>

            <div className={styles.summaryCard}>

                <div className={styles.summaryRow}>
                    <span>Total Score</span>
                    <strong>{totalScore}</strong>
                </div>

                <div className={styles.summaryRow}>
                    <span>Current Stage</span>
                    <strong>{currentStage}</strong>
                </div>

                <div className={styles.summaryRow}>
                    <span>Progress</span>
                    <strong>
                        {Math.round(progressPercent)}%
                    </strong>
                </div>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${progressPercent}%`,
                        }}
                    />
                </div>

            </div>

            <div className={styles.stageContainer}>

                {/* Stage 1 */}

            <div className={styles.stageCard}>

            <div className={styles.stageNumber}>
                Stage 1
            </div>

            <h2>Rookie League</h2>

            <p>
                Ethical Decision-Making
            </p>

            <div className={styles.status}>
                {
                    rookieComplete
                        ? "✅ Completed"
                        : "🔓 Available"
                }
            </div>

            {
                rookieComplete ? (
                    <div className={styles.completedContainer}>

                        <div className={styles.completedText}>
                            Stage Completed
                        </div>

                        <button
                            className={styles.completedButton}
                            disabled
                        >
                            ✅ Completed
                        </button>

                    </div>
                ) : (
                    <button
                        className={styles.playButton}
                        onClick={() =>
                            router.push(
                                "/stages/rookieleague"
                            )
                        }
                    >
                        Play Stage
                    </button>
                )
            }

        </div>

{/* Stage 2 */}

<div className={styles.stageCard}>

    <div className={styles.stageNumber}>
        Stage 2
    </div>

    <h2>Compliance Defender</h2>

    <p>
        Fair Play & Compliance
    </p>

    <div className={styles.status}>
        {
            complianceComplete
                ? "✅ Completed"
                : stage2Unlocked
                    ? "🔓 Unlocked"
                    : "🔒 Locked"
        }
    </div>

    {
        complianceComplete ? (
            <button
                className={styles.completedButton}
                disabled
            >
                ✅ Completed
            </button>
        ) : (
            <button
                className={
                    stage2Unlocked
                        ? styles.playButton
                        : styles.lockButton
                }
                disabled={!stage2Unlocked}
                onClick={() =>
                    router.push(
                        "/stages/compliancedefender"
                    )
                }
            >
                {
                    stage2Unlocked
                        ? "▶ Play Stage"
                        : "🔒 Locked"
                }
            </button>
        )
    }

</div>

{/* Stage 3 */}

<div className={styles.stageCard}>

    <div className={styles.stageNumber}>
        Stage 3
    </div>

    <h2>Data Protection Arena</h2>

    <p>
        Accountability & Ownership
    </p>

    <div className={styles.status}>
        {
            dataProtectionComplete
                ? "✅ Completed"
                : stage3Unlocked
                    ? "🔓 Unlocked"
                    : "🔒 Locked"
        }
    </div>

    {
        dataProtectionComplete ? (
            <button
                className={styles.completedButton}
                disabled
            >
                ✅ Completed
            </button>
        ) : (
            <button
                className={
                    stage3Unlocked
                        ? styles.playButton
                        : styles.lockButton
                }
                disabled={!stage3Unlocked}
                onClick={() =>
                    router.push(
                        "/stages/dataprotectionarena"
                    )
                }
            >
                {
                    stage3Unlocked
                        ? "▶ Play Stage"
                        : "🔒 Locked"
                }
            </button>
        )
    }

</div>

</div>

{/* Bonus Games */}

<div className={styles.bonusSection}>

    <h2>⭐ Bonus Games</h2>

    <div className={styles.bonusGrid}>

        <div className={styles.bonusCard}>

            <h3>
                Trust Builder Challenge
            </h3>

            <p>
                Teamwork & Shared Responsibility
            </p>

            {
                allStagesComplete ? (
                    <button
                        className={styles.playButton}
                        onClick={() =>
                            router.push(
                                "/bonus/trustbuilder"
                            )
                        }
                    >
                        ▶ Play Bonus Game
                    </button>
                ) : (
                    <button
                        className={styles.lockButton}
                        disabled
                    >
                        🔒 Complete Main Stages First
                    </button>
                )
            }

        </div>

        <div className={styles.bonusCard}>

            <h3>
                Speak Up Arena
            </h3>

            <p>
                Building Trust Through Action
            </p>

            {
                allStagesComplete ? (
                    <button
                        className={styles.playButton}
                        onClick={() =>
                            router.push(
                                "/bonus/speakuparena"
                            )
                        }
                    >
                        ▶ Play Bonus Game
                    </button>
                ) : (
                    <button
                        className={styles.lockButton}
                        disabled
                    >
                        🔒 Complete Main Stages First
                    </button>
                )
            }

        </div>

    </div>

</div>

{/* Championship */}

<div className={styles.finalCard}>

    <h2>
        🏆 Integrity Cup Finals
    </h2>

    {
        allStagesComplete ? (
            <>
                <p>
                    Congratulations! All main stages have been completed.
                </p>

                <button
                    className={styles.playButton}
                    onClick={() =>
                        router.push(
                            "/championship"
                        )
                    }
                >
                    🏆 Enter Championship
                </button>
            </>
        ) : (
            <>
                <p>
                    Complete all 3 Main Stages to unlock the finals.
                </p>

                <button
                    className={styles.lockButton}
                    disabled
                >
                    🔒 Locked
                </button>
            </>
        )
    }

</div>

</div>
);
}
       