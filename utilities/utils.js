function getDifferenceInDays(
    date1Str,
    date2Str
) {
    // Convert strings to Date objects
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);

    // Calculate the time difference in milliseconds
    const timeDifference = date2 - date1;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Print the result
    console.log("The difference in days is:", daysDifference);
}

// Input dates as strings
const date1Str = "2023-08-04 20:47:32";
const date2Str = "2024-08-04 20:47:32";

getDifferenceInDays(date1Str, date2Str) // The difference in days is: 366
