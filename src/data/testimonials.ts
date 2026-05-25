export type Testimonial = {
  id: string;
  title: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  text: string;
};

export const carsComReviewsUrl =
  "https://www.cars.com/dealers/191250/brooklyn-auto-sales/#Reviews";

export const testimonials: Testimonial[] = [
  {
    id: "mercedes-g500",
    title: "Mercedes Benz G500",
    author: "Guy Gondre",
    location: "New York, NY",
    date: "November 21, 2019",
    rating: 5,
    text: "As a proud customer of BAS, I am extremely delighted to disclose my positive experience to all customers who appreciate quality service. Recently, my truck couldn't move forward and backward and I had it towed to them. While I was expecting a monster bill, to my big surprise, the invoice was zero. I am proud to recommend BAS to anyone who's purchasing or servicing a motor vehicle. All employees at Brooklyn Auto Sales, notably Adam, are super nice and welcome everyone.",
  },
  {
    id: "best-experience-mike",
    title: "Best car buying experience ever!",
    author: "Mike",
    location: "Kansas City",
    date: "March 19, 2019",
    rating: 5,
    text: "Best car buying experience ever! They are honest, excellent communicators, very responsive, and have a true passion for what they do! Because of Adam I now have the car I've always wanted. If you are looking to buy a car from these guys don't hesitate.",
  },
  {
    id: "financed-vehicle",
    title: "Financed a vehicle",
    author: "Zachary",
    location: "New York",
    date: "May 23, 2018",
    rating: 5,
    text: "Best dealer shop I've dealt with while searching for my car. Gave me zero issues and was very helpful in getting me a finance. Definitely would recommend anyone to purchase from there. Best dealership in Brooklyn.",
  },
  {
    id: "best-purchase-taylor",
    title: "Best Purchase Experience Ever",
    author: "Taylor McGlone",
    location: "Williamstown, NJ",
    date: "March 31, 2018",
    rating: 5,
    text: "Adam was fantastic, stopped at nothing to get me approved on my loan for a car I've wanted for years. He was very cool, funny, and a pleasure to work with. The lot is small and comfortable, and every vehicle on the lot is in absolute pristine condition.",
  },
  {
    id: "supra-al",
    title: "Supra",
    author: "Al",
    location: "Brooklyn, NY",
    date: "January 8, 2018",
    rating: 5,
    text: "Had a great experience at Brooklyn Auto Sales. Very professional and very satisfied with my car! No hidden fees like many dealers! Will definitely buy my next car here. Thank you!",
  },
  {
    id: "purchase-experience-ray",
    title: "Purchase experience",
    author: "Ray",
    location: "Bronx, NY",
    date: "November 21, 2017",
    rating: 5,
    text: "When you walk into the door, you're no longer a customer — you become a friend. No hassling back and forth like the major dealerships. Adam fights with finance companies to get the best deal for the customer. Less than an hour and I was out the door with my new car.",
  },
  {
    id: "great-service-kurva",
    title: "Great Service",
    author: "Kurva",
    location: "Cortlandt Manor, NY",
    date: "October 2, 2017",
    rating: 5,
    text: "Came in to buy my dream car and that's exactly what I did. Buying process was smooth and customer service is one of the best I've seen from any dealership. 100% would recommend.",
  },
  {
    id: "amazing-dealership-ryan",
    title: "Amazing dealership",
    author: "Ryan Jay",
    location: "New York, NY",
    date: "September 22, 2017",
    rating: 5,
    text: "A1 service — these guys go above and beyond for you. They are willing to find the car of your dreams and make it a reality. I couldn't ask for better service. Great dealership!",
  },
];

export function shuffleTestimonials<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
