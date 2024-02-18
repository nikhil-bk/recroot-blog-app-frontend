export const convertUtcToLocal = (utcTimeString) => {
    const utcDate = new Date(utcTimeString);

    const year = utcDate.getFullYear();
    const month = utcDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = utcDate.getDate();
    const hour = utcDate.getHours();
    const minute = utcDate.getMinutes();

    // Format the string using the extracted values
    const formattedTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    return formattedTime;
};