"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileUp } from "lucide-react";

interface ExportButtonProps<T> {
    data: T[];
    filename?: string;
    buttonText?: string;
    className?: string;
}

/**
 * A reusable export button that converts any data array to CSV/Excel format
 * @param data The data array to export
 * @param filename Optional filename (defaults to "export-data")
 * @param buttonText Optional button text (defaults to "Export Data")
 * @param className Optional additional CSS classes
 */
export function ExportButton<T extends Record<string, any>>({
    data,
    filename = "export-data",
    buttonText = "Export Data",
    className = "",
}: ExportButtonProps<T>) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            console.warn("No data to export");
            return;
        }

        try {
            // Get headers from the first data object
            const headers = Object.keys(data[0]);

            // Convert data to CSV format
            const csvRows = [];

            // Add headers row
            csvRows.push(headers.join(","));

            // Add data rows
            for (const row of data) {
                const values = headers.map(header => {
                    const value = row[header];
                    // Handle special cases (null, undefined, objects, etc.)
                    if (value === null || value === undefined) {
                        return '';
                    } else if (typeof value === 'object') {
                        // Convert objects to JSON strings
                        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                    } else if (typeof value === 'string') {
                        // Escape quotes and wrap in quotes
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    // Return other values as is
                    return value;
                });
                csvRows.push(values.join(","));
            }

            // Combine rows into a CSV string
            const csvString = csvRows.join("\n");

            // Create a Blob from the CSV string
            const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

            // Create a download link
            const link = document.createElement("a");

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Set link properties
            link.setAttribute("href", url);
            link.setAttribute("download", `${filename}.csv`);
            link.style.visibility = "hidden";

            // Add link to document
            document.body.appendChild(link);

            // Click the link to trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting data:", error);
        }
    };

    return (
        <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${className}`}
        >
            <FileUp size={16} />
            {buttonText}
        </Button>
    );
}