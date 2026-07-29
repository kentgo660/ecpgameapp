"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";

export default function Home() {

    const router = useRouter();

    const [domainId, setDomainId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!domainId.trim()) {
            alert("Please enter your US Domain.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        domainId:
                            domainId.trim()
                    }),
                }
            );

            const data =
                await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            sessionStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            sessionStorage.removeItem(
                "ecpDisclaimerAccepted"
            );

            router.push("/disclaimer");

        } catch (error) {

            console.error(error);

            alert(
                "Unable to login. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>

            <div className={styles.card}>

                <div className={styles.logoSection}>

                    <div className={styles.logo}>
                        🏆
                    </div>

                    <div className={styles.badge}>
                        ECP WEEK 2026
                    </div>

                    <h1 className={styles.title}>
                        Integrity Quest
                    </h1>

                    <p className={styles.subtitle}>
                        Embark on a journey through Ethics,
                        Compliance, Privacy, Accountability,
                        and Integrity.
                    </p>

                </div>

                <div className={styles.formGroup}>

                    <label
                        className={styles.label}
                    >
                        US Domain
                    </label>

                    <input
                        type="text"
                        placeholder="AM12345"
                        value={domainId}
                        className={styles.input}
                        onChange={(e) =>
                            setDomainId(
                                e.target.value.toUpperCase()
                            )
                        }
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !loading
                            ) {
                                handleLogin();
                            }
                        }}
                    />

                </div>

                <button
                    className={styles.button}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Checking In..."
                            : "🎮 Login & Check-In"
                    }
                </button>

                <div className={styles.footer}>

                    <p>
                        Enter your US Domain to
                        participate in Integrity Quest.
                    </p>

                    <div className={styles.version}>
                        ECP Week 2026 • Version 1.0
                    </div>

                </div>

            </div>

        </div>
    );
}