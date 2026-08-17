"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../../styles/complianceDefender.module.css";

export default function ComplianceDefender() {
    const router = useRouter();

    const [foundRisks, setFoundRisks] = useState([]);
    const [finished, setFinished] = useState(false);

    const riskNames = {
        1: "Improper Vendor Gift",
        2: "Conflict of Interest",
        3: "Expense Fraud",
        4: "Missing Approval",
        5: "Confidential Client Data",
    };

    const handleRiskClick = async (riskId) => {
        if (foundRisks.includes(riskId)) {
            return;
        }

        const updatedRisks = [
            ...foundRisks,
            riskId,
        ];

        setFoundRisks(updatedRisks);

        if (updatedRisks.length === 5) {
            try {
                const user = JSON.parse(
                    sessionStorage.getItem("user")
                );

                await fetch("/api/saveprogress", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        domainId:
                            user.domainId,
                        stageName:
                            "compliancedefender",
                        score: 100,
                    }),
                });
            } catch (error) {
                console.error(error);
            }

            setFinished(true);
        }
    };

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <div className={styles.stageBadge}>
                    STAGE 2
                </div>

                <h1>
                    🛡 Compliance Defender
                </h1>

                <p>
                    Find all hidden compliance risks.
                </p>

            </div>

            <div className={styles.scorePanel}>
                Risks Found:
                <strong>
                    {" "}
                    {foundRisks.length} / 5
                </strong>
            </div>

            <div className={styles.imageWrapper}>

                <Image
                    src="/images/compliance-scene.png"
                    alt="Compliance Defender"
                    width={1365}
                    height={768}
                    className={styles.sceneImage}
                    priority
                    />

                {/* Risk 1 Gift Box */}

                <div
                    className={`
                        ${styles.hotspot}
                        ${styles.risk1}
                        ${
                            foundRisks.includes(1)
                                ? styles.hotspotFound
                                : ""
                        }
                    `}
                    onClick={() =>
                        handleRiskClick(1)
                    }
                />

                {/* Risk 2 Conflict of Interest */}

                <div
                    className={`
                        ${styles.hotspot}
                        ${styles.risk2}
                        ${
                            foundRisks.includes(2)
                                ? styles.hotspotFound
                                : ""
                        }
                    `}
                    onClick={() =>
                        handleRiskClick(2)
                    }
                />

                {/* Risk 3 Expense Fraud */}

                <div
                    className={`
                        ${styles.hotspot}
                        ${styles.risk3}
                        ${
                            foundRisks.includes(3)
                                ? styles.hotspotFound
                                : ""
                        }
                    `}
                    onClick={() =>
                        handleRiskClick(3)
                    }
                />

                {/* Risk 4 Missing Approval */}

                <div
                    className={`
                        ${styles.hotspot}
                        ${styles.risk4}
                        ${
                            foundRisks.includes(4)
                                ? styles.hotspotFound
                                : ""
                        }
                    `}
                    onClick={() =>
                        handleRiskClick(4)
                    }
                />

                {/* Risk 5 Confidential Data */}

                    {/* Risk 5 - Email */}

                    <div
                        className={`
                            ${styles.hotspot}
                            ${styles.risk5Email}
                            ${
                                foundRisks.includes(5)
                                    ? styles.hotspotFound
                                    : ""
                            }
                        `}
                        onClick={() =>
                            handleRiskClick(5)
                        }
                    />

                    {/* Risk 5 - Password */}

                    <div
                        className={`
                            ${styles.hotspot}
                            ${styles.risk5Password}
                            ${
                                foundRisks.includes(5)
                                    ? styles.hotspotFound
                                    : ""
                            }
                        `}
                        onClick={() =>
                            handleRiskClick(5)
                        }
                    />

                    {/* Risk 5 - Confidential Folder */}

                    <div
                        className={`
                            ${styles.hotspot}
                            ${styles.risk5Folder}
                            ${
                                foundRisks.includes(5)
                                    ? styles.hotspotFound
                                    : ""
                            }
                        `}
                        onClick={() =>
                            handleRiskClick(5)
                        }
                    />

            </div>

            <div className={styles.foundPanel}>

                <h3>
                    Identified Risks
                </h3>

                <ul>
                    {foundRisks.map((risk) => (
                        <li key={risk}>
                            ✅ {riskNames[risk]}
                        </li>
                    ))}
                </ul>

            </div>

            {finished && (
                <div className={styles.resultCard}>

                    <h2>
                        🎉 Mission Complete
                    </h2>

                    <div className={styles.scoreCircle}>
                        100
                    </div>

                    <h3>
                        🛡 Compliance Shield Badge Earned
                    </h3>

                    <p>
                        You successfully identified
                        all compliance risks.
                    </p>

                    <button
                        className={
                            styles.continueButton
                        }
                        onClick={() =>
                            router.push("/stages/dataprotectionarena")
                        }
                    >
                        Proceed to Stage 3 
                    </button>

                </div>
            )}

        </div>
    );
}