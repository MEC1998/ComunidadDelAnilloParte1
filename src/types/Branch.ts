export interface Branch {
    id: string;
    name: string;
    openingTime: string;
    closingTime: string;
    companyName: string;
    image: string | File | null;
    street?: string;
}
  