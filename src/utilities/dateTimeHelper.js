export const calculateTimeDifference = (createdAt) => {
  const currentDate = new Date();
  const chapterDate = new Date(createdAt);
  const timeDifference = Math.abs(currentDate - chapterDate);
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 50) {
    return `${minutesDifference} minutes ago`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hours ago`;
  } else {
    const daysDifference = Math.floor(minutesDifference / 1440);
    return `${daysDifference} days ago`;
  }
};
