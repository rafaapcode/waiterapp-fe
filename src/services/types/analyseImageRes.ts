export interface AnalyseImageResponse {
  message: string;
  analyse: {
    name: string;
    description: string;
    new_ingredients: boolean;
    ingredients: { id: string; name: string }[];
  };
}
