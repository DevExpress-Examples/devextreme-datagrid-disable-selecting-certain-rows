namespace ASP_NET_Core.Models
{
    public class SalesItem
    {
        public int OrderID { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Amount { get; set; }
        public string Date { get; set; }
        public bool Approved { get; set; }
    }
}
