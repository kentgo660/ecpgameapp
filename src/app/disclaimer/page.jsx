"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/disclaimer.module.css";

export default function DisclaimerPage() {

    const router = useRouter();

    const [agreed, setAgreed] = useState(false);

    const handleProceed = () => {

        sessionStorage.setItem(
            "ecpDisclaimerAccepted",
            "true"
        );

        router.push("/dashboard");
    };

    return (
        <div className={styles.page}>

            <div className={styles.card}>

                <div className={styles.icon}>
                    📜
                </div>

                <h1>
                    ECP Week Participation Disclaimer
                </h1>

                <div className={styles.content}>

                    <p>
                        Welcome to Integrity Quest –
                        ECP Week 2026.
                    </p>

                    <p>
                        This activity is intended to
                        reinforce ethical decision-making,
                        compliance awareness, data privacy,
                        accountability, teamwork, and
                        integrity.
                    </p>

                    <p>
                        By participating in this game,
                        you acknowledge that:
                    </p>

                    <ul>
                        <li>
                            Your progress and scores may
                            be recorded for engagement
                            tracking purposes.
                        </li>

                        <li>
                            Participation should reflect
                            your own knowledge and
                            decision-making.
                        </li>

                        <li>
                            All scenarios are for learning
                            and awareness purposes only.
                        </li>

                        <li>
                            Company policies remain the
                            official source of guidance.
                        </li>
                    </ul>

                </div>

                <div className={styles.checkboxContainer}>

                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={(e) =>
                            setAgreed(
                                e.target.checked
                            )
                        }
                    />

                    <label htmlFor="agree">
                        I have read and agree to the
                        ECP Week Participation Disclaimer.
                    </label>

                </div>

                <button
                    className={styles.proceedButton}
                    disabled={!agreed}
                    onClick={handleProceed}
                >
                    Proceed To Dashboard
                </button>

            </div>

        </div>
    );
}