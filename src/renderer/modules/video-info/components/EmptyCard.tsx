import ImgYouDeer from "@client/static/you-deer.jpg";
import { Card } from "@mantine/core";

export const EmptyCard = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      className="flex items-center justify-center flex-1 gap-2 overflow-y-auto scrollbar-stable bottom-container"
    >
      <img src={ImgYouDeer} className="rounded-lg w-80" />
      <div className="text-lg font-semibold">Nothing found here... 🦌</div>
    </Card>
  );
};
