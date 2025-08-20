using System.Collections.Generic;

namespace ASP_NET_Core.Models
{
    static class SampleData
    {
        public static List<SalesItem> SalesItems = new List<SalesItem>()
        {
            new SalesItem {
                OrderID = 10248,
                Region = "North America",
                Country = "United States",
                City = "New York",
                Amount = 1740,
                Date = "2013/01/06",
                Approved = false,
            },
            new SalesItem {
                OrderID = 10249,
                Region = "North America",
                Country = "United States",
                City = "Los Angeles",
                Amount = 850,
                Date = "2013/01/13",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10250,
                Region = "North America",
                Country = "United States",
                City = "Denver",
                Amount = 2235,
                Date = "2013/01/07",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10251,
                Region = "North America",
                Country = "Canada",
                City = "Vancouver",
                Amount = 1965,
                Date = "2013/01/03",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10252,
                Region = "North America",
                Country = "Canada",
                City = "Edmonton",
                Amount = 880,
                Date = "2013/01/10",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10253,
                Region = "South America",
                Country = "Brazil",
                City = "Rio de Janeiro",
                Amount = 5260,
                Date = "2013/01/17",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10254,
                Region = "South America",
                Country = "Argentina",
                City = "Buenos Aires",
                Amount = 2790,
                Date = "2013/01/21",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10255,
                Region = "South America",
                Country = "Paraguay",
                City = "Asuncion",
                Amount = 3140,
                Date = "2013/01/01",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10256,
                Region = "Europe",
                Country = "United Kingdom",
                City = "London",
                Amount = 6175,
                Date = "2013/01/24",
                Approved = true,
            },
            new SalesItem {
                OrderID = 10257,
                Region = "Europe",
                Country = "Germany",
                City = "Berlin",
                Amount = 4575,
                Date = "2013/01/11",
                Approved = true,
            }
        };
    }
}
