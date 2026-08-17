"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";
import Image from "next/image";

export default function Home() {

    const router = useRouter();

    const [domainId, setDomainId] = useState("");
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!domainId.trim()) {
            alert("Please enter US Domain.");
            return;
        }

        if (!fullName.trim()) {
            alert("Please enter Full Name.");
            return;
        }

        if (!country) {
            alert("Please select Country.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        domainId:
                            domainId.trim(),

                        fullName:
                            fullName.trim(),

                        country
                    }),
                }
            );

            const data =
                await response.json();

            if (!data.success) {
                alert(
                    data.message ||
                    "Registration failed."
                );
                return;
            }

            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    domainId,
                    fullName,
                    country
                })
            );
            document.cookie =
                `ecpUser=${domainId}; path=/`;

            sessionStorage.removeItem(
                "ecpDisclaimerAccepted"
            );

            router.push("/disclaimer");

        } catch (error) {

            console.error(error);

            alert(
                "Unable to register."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className={styles.page}>

            <div className={styles.card}>

                <div className={styles.logoSection}>

                <Image
                        src="/images/integrity-quest-logo.png"
                        alt="Integrity Quest"
                        width={250}
                        height={250}
                        className={styles.heroLogo}
                        priority
                        loading="eager"
                />


                </div>

                <div className={styles.formGroup}>

                    <label className={styles.label}>
                        US Domain
                    </label>

                <input
                    type="text"
                    placeholder="AL12345"
                    value={domainId}
                    className={styles.input}
                    maxLength={7}
                    onChange={(e) =>
                        setDomainId(
                            e.target.value
                                .replace(/\s/g, "")
                                .replace(/[^A-Za-z0-9]/g, "")
                                .toUpperCase()
                                .slice(0, 7)
                        )
                    }
                />

                </div>

                <div className={styles.formGroup}>

                    <label className={styles.label}>
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={fullName}
                        className={styles.input}
                        onChange={(e) =>
                            setFullName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className={styles.formGroup}>

                    <label className={styles.label}>
                        Country
                    </label>

                    <select
                        value={country}
                        className={styles.input}
                        onChange={(e) =>
                            setCountry(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Select Country
                        </option>

                        <option value="India">
                            India
                        </option>

                        <option value="Puerto Rico">
                            Puerto Rico
                        </option>

                    </select>

                </div>

                <button
                    className={styles.button}
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Registering..."
                            : "🎮 Register & Check-In"
                    }
                </button>

                <div className={styles.footer}>

                    <p>
                        Complete your registration
                        to participate in Integrity Quest.
                    </p>

                    <div className={styles.version}>
                        ECP Week 2026 • Version 1.0
                    </div>

                </div>

            </div>

        </div>
    );
}