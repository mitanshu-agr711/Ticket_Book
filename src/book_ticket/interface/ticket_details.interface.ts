export interface TicketDetails {
  title: string; // Ticket title (must be unique)
  description: string; // Ticket description
  rate: number; // Rating (0-10)
  price: number; // Ticket price
  comments?: string; // Optional comments
  image: string; // Image URL
}
