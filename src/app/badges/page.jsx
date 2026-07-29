"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/badges.module.css";

export default function BadgesPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [completedStages, setCompletedStages] = useState([]);

    useEffect(() => {
        loadBadges();
    }, []);

    const loadBadges = async () => {

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
                        domainId: user.domainId
                    })
                }
            );

            const data =
                await response.json();

            if (
                data.success &&
                data.progress
            ) {
                setCompletedStages(
                    data.progress.completedStages || []
                );
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    const badges = [
        {
            icon: "🏅",
            title: "Ethical Decision Maker",
            description:
                "Completed Rookie League",
            unlocked:
                completedStages.includes(
                    "rookieleague"
                )
        },
        {
            icon: "🛡",
            title: "Compliance Shield",
            description:
                "Completed Compliance Defender",
            unlocked:
                completedStages.includes(
                    "compliancedefender"
                )
        },
        {
            icon: "🔒",
            title: "Privacy Guardian",
            description:
                "Completed Data Protection Arena",
            unlocked:
                completedStages.includes("dataprotectionarena-level1") &&
                completedStages.includes("dataprotectionarena-level2") &&
                completedStages.includes("dataprotectionarena-level3") &&
                completedStages.includes("dataprotectionarena-level4")
        },
        {
            icon: "🤝",
            title: "Trust Champion",
            description:
                "Completed Trust Builder Challenge",
            unlocked:
                completedStages.includes(
                    "trustbuilder"
                )
        },
        {
            icon: "📢",
            title: "Integrity Champion",
            description:
                "Completed Speak Up Arena",
            unlocked:
                completedStages.includes(
                    "speakuparena"
                )
        },
        {
            icon: "👑",
            title: "Integrity Cup Champion",
            description:
                "Completed Championship Finals",
            unlocked:
                completedStages.includes(
                    "integritycupfinals"
                )
        }
    ];

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading Badges...
            </div>
        );
    }

    return (
        <div className={styles.page}>

            <div className={styles.header}>
                <h1>🎖 My Badges</h1>
                <p>
                    Unlock badges by completing
                    Integrity Quest challenges.
                </p>
            </div>

            <div className={styles.badgeGrid}>

                {badges.map(
                    (badge, index) => (

                        <div
                            key={index}
                            className={
                                badge.unlocked
                                    ? styles.badgeCard
                                    : styles.lockedBadge
                            }
                        >

                            <div className={styles.badgeIcon}>
                                {
                                    badge.unlocked
                                        ? badge.icon
                                        : "🔒"
                                }
                            </div>

                            <h3>
                                {badge.title}
                            </h3>

                            <p>
                                {badge.description}
                            </p>

                            <span>
                                {
                                    badge.unlocked
                                        ? "Unlocked"
                                        : "Locked"
                                }
                            </span>

                        </div>

                    )
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