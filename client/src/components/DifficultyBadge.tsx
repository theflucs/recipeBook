type DifficultyBadgeProps = {
  difficultyId: string;
};

function DifficultyCardBadge({ difficultyId }: DifficultyBadgeProps) {
  const calcDifficulty = (
    difficultyId: string
  ): { text: string; colorClass: string } => {
    let difficultyLevel = "";
    let colorClass = "";

    switch (difficultyId) {
      case "1":
        difficultyLevel = "Easy";
        colorClass = "bg-green-500";
        break;
      case "2":
        difficultyLevel = "Medium";
        colorClass = "bg-orange-500";
        break;
      case "3":
        difficultyLevel = "Hard";
        colorClass = "bg-red-500";
        break;
      default:
        difficultyLevel = "Unknown";
        colorClass = "bg-gray-500";
        break;
    }

    return { text: difficultyLevel, colorClass };
  };

  const { text: difficultyLevel, colorClass } = calcDifficulty(difficultyId);

  return (
    <div className="flex items-center">
      <h3 className="mr-1">Difficulty:</h3>
      <div
        className={`px-2 py-1 rounded-full ${colorClass} text-white text-sm w-fit`}
      >
        {difficultyLevel}
      </div>
    </div>
  );
}

export default DifficultyCardBadge;
