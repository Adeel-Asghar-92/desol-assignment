import React from "react";
import Spinner from "../Spinner";
import styles from "./LoadingButton.module.css";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={`${styles.loadingButton} ${
        loading ? styles.loadingButtonDisabled : ""
      }`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};
