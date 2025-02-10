export type Dates = {
    title: string;
    description: string;
    day: string;
    img: string;
};
  
export type Month = {
    number: string;
    label: string;
    id: string;
}

export type Memory = {
    month: Month;
    dates: Dates[];
};