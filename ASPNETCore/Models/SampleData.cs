using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models {
    static class SampleData {
        public static List<Order> Orders = new List<Order>() {
		   new Order {
				OrderID = 10248,
				OrderDate = new DateTime(1996, 7, 4),
				ShipCountry = "France",
				ShipCity = "Reims",
				CustomerName = "Paul Henriot",
				Approved = true
			},
			new Order {
				OrderID = 10249,
				OrderDate = new DateTime(1996, 7, 5),
				ShipCountry = "Germany",
				ShipCity = "Münster",
				CustomerName = "Karin Josephs",
				Approved = false
			},
			new Order {
				OrderID = 10250,
				OrderDate = new DateTime(1996, 7, 8),
				ShipCountry = "Brazil",
				ShipCity = "Rio de Janeiro",
				CustomerName = "Mario Pontes",
				Approved = true
			}
		};
    }
}
