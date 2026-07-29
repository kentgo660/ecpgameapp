"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/dataProtectionLevel3.module.css";

export default function Level3() {

    const router = useRouter();

    const [foundFlags, setFoundFlags] = useState([]);
    const [completed, setCompleted] = useState(false);

    const clues = {
        1: "Unknown Sender",
        2: "Sense of Urgency",
        3: "Unexpected Request",
        4: "Suspicious URL"
    };

    const handleClueClick = async (id) => {

        if (foundFlags.includes(id))
            return;

        const updatedFlags = [
            ...foundFlags,
            id
        ];

        setFoundFlags(updatedFlags);

        if (updatedFlags.length === 4) {

            try {

                const user = JSON.parse(
                    sessionStorage.getItem("user")
                );

                await fetch(
                    "/api/saveprogress",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            domainId:
                                user.domainId,
                            stageName:
                                "dataprotectionarena-level3",
                            score: 100
                        })
                    }
                );

            } catch (error) {
                console.error(error);
            }

            setCompleted(true);
        }
    };

    return (
        <div className={styles.page}>

            <div className={styles.header}>

                <div className={styles.levelBadge}>
                    LEVEL 3
                </div>

                <h1>
                    🎣 Spot The Phishing Email
                </h1>

                <p>
                    Find all phishing indicators.
                </p>

            </div>

            <div className={styles.progressCard}>
                Found Red Flags:
                <strong>
                    {" "}
                    {foundFlags.length}/4
                </strong>
            </div>

            <div className={styles.emailCard}>

                {/* Sender */}

                <div
                    className={
                        foundFlags.includes(1)
                            ? styles.found
                            : styles.clickable
                    }
                    onClick={() =>
                        handleClueClick(1)
                    }
                >
                    <strong>From:</strong>
                    ITSupport@CareLone.com
                </div>

                <div className={styles.emailLine}>
                    <strong>Subject:</strong>
                    Urgent! Your Account Will Be Disabled
                </div>

                <hr />

                <div className={styles.emailBody}>

                    <p>Hello,</p>

                    <div
                        className={
                            foundFlags.includes(2)
                                ? styles.found
                                : styles.clickable
                        }
                        onClick={() =>
                            handleClueClick(2)
                        }
                    >
                        Your password has expired.
                        Please respond within
                        30 minutes to avoid
                        account suspension.
                    </div>

                    <br />

                    <div
                        className={
                            foundFlags.includes(3)
                                ? styles.found
                                : styles.clickable
                        }
                        onClick={() =>
                            handleClueClick(3)
                        }
                    >
                        Verify your account
                        immediately.
                    </div>

                    <br />

                    <div
                        className={
                            foundFlags.includes(4)
                                ? styles.found
                                : styles.clickable
                        }
                        onClick={() =>
                            handleClueClick(4)
                        }
                    >
                        www.accountverify-now.com
                    </div>

                    <br />

                    <p>
                        Thank you,
                        <br />
                        IT Support
                    </p>

                </div>

            </div>

            <div className={styles.foundPanel}>

                <h3>
                    Detected Phishing Indicators
                </h3>

                <ul>
                    {
                        foundFlags.map((item) => (
                            <li key={item}>
                                ✅ {clues[item]}
                            </li>
                        ))
                    }
                </ul>

            </div>

            {
                completed && (
                    <div className={styles.resultCard}>

                        <div className={styles.icon}>
                            🏆
                        </div>

                        <h2>
                            Level 3 Complete
                        </h2>

                        <h3>
                            Phishing Detective
                        </h3>

                        <p>
                            All phishing red flags
                            identified successfully.
                        </p>

                    <button
                        className={styles.continueButton}
                        onClick={() =>
                            router.push(
                                "/stages/dataprotectionarena/level4"
                            )
                        }
                    >
                        Continue To Level 4 →
                    </button>

                    </div>
                )
            }

        </div>
    );
}