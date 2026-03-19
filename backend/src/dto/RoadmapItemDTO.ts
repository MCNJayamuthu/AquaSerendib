export interface RoadmapItemDTO {
  title: string;
  description: string;
  stage: "Planned" | "Working" | "Completed" | "Backlog";
}