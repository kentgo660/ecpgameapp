"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/badges.module.css";
import Image from "next/image";

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
            image: "/images/rookie-champion.png",
            title: "",
            description:
                "",
            unlocked:
                completedStages.includes(
                    "rookieleague"
                )
        },
        {
            image: "/images/compliance-defender.png",
            title: "",
            description:
                "",
            unlocked:
                completedStages.includes(
                    "compliancedefender"
                )
        },
        {
            image: "/images/privacy-guardian.png",
            title: "",
            description:
                "",
            unlocked:
                completedStages.includes("dataprotectionarena-level1") &&
                completedStages.includes("dataprotectionarena-level2") &&
                completedStages.includes("dataprotectionarena-level3") &&
                completedStages.includes("dataprotectionarena-level4")
        },
        {
            image: "/images/trust-champion.png",
            title: "",
            description:
                "",
            unlocked:
                completedStages.includes(
                    "trustbuilder"
                )
        },
        {
           image: "/images/integrity-hero.png",
            title: "",
            description:
                "",
            unlocked:
                completedStages.includes(
                    "speakuparena"
                )
        },
        {
            image: "/images/integrity-champion.png",
            title: "",
            description:
                "",
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
                <h1>My Badges</h1>
                <p>
                    Unlock badges by completing
                    Integrity Quest challenges.
                </p>
            </div>

            <button
                className={styles.backButton}
                onClick={() =>
                    router.push("/dashboard")
                }
            >
                ← Back To Dashboard
            </button>

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
                                    <Image
                                        src={
                                            badge.unlocked
                                                ? badge.image
                                                : "/images/locked-badge.png"
                                        }
                                        alt={badge.title}
                                        width={120}
                                        height={120}
                                        className={styles.badgeImage}
                                    />
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

        </div>
    );
}